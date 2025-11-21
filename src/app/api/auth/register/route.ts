import { NextRequest, NextResponse } from "next/server";
import { registerStep1Schema, registerStep2Schema } from "@/lib/api/auth";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados de entrada
    const step1Data = registerStep1Schema.parse(body);
    const step2Data = registerStep2Schema.parse(body);
    
    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: step1Data.email },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { message: "Email já cadastrado" },
        { status: 409 }
      );
    }
    
    // Hash da senha
    const hashedPassword = await bcrypt.hash(step1Data.password, 10);
    
    // Criar novo usuário no banco de dados
    const newUser = await prisma.user.create({
      data: {
        name: step1Data.name,
        email: step1Data.email,
        password: hashedPassword,
        birthdate: step2Data.birthdate,
        gender: step2Data.gender,
        weight: step2Data.weight,
        height: step2Data.height,
      },
    });
    
    // Gerar token (em produção, use JWT)
    const token = Buffer.from(`${newUser.id}:${Date.now()}`).toString("base64");
    
    return NextResponse.json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar: undefined,
      },
      token,
    }, { status: 201 });
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
