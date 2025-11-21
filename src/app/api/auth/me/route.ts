import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(request: NextRequest) {
  try {
    // Obter token do header Authorization
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Token não fornecido" },
        { status: 401 }
      );
    }
    
    const token = authHeader.substring(7);
    
    // Decodificar token e buscar usuário
    try {
      const decoded = Buffer.from(token, "base64").toString("utf-8");
      const [userId] = decoded.split(":");
      
      // Buscar usuário no banco de dados
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
        },
      });
      
      if (!user) {
        return NextResponse.json(
          { message: "Usuário não encontrado" },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || undefined,
      });
    } catch {
      return NextResponse.json(
        { message: "Token inválido" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
