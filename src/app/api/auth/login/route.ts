import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/api/auth";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados de entrada
    const validatedData = loginSchema.parse(body);
    
    // Buscar usuário no banco de dados
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    
    if (!user || !(await bcrypt.compare(validatedData.password, user.password))) {
      return NextResponse.json(
        { message: "Email ou senha incorretos" },
        { status: 401 }
      );
    }
    
    // Gerar token (em produção, use JWT)
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString("base64");
    
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || undefined,
      },
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.issues[0].message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
