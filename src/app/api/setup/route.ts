import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";

// Rota para criar usuário admin (remover em produção)
export async function GET() {
  try {
    // Verificar se admin já existe
    const existingAdmin = await prisma.user.findUnique({
      where: { email: "admin@example.com" },
    });

    if (existingAdmin) {
      return NextResponse.json({
        message: "Usuário admin já existe",
        user: {
          email: existingAdmin.email,
          name: existingAdmin.name,
        },
      });
    }

    // Criar admin
    const hashedPassword = await bcrypt.hash("Admin123", 10);
    
    const admin = await prisma.user.create({
      data: {
        email: "admin@example.com",
        name: "Admin",
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "✅ Usuário admin criado com sucesso!",
      credentials: {
        email: "admin@example.com",
        password: "Admin123",
      },
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { 
        message: "Erro ao criar admin",
        error: error.message 
      },
      { status: 500 }
    );
  }
}
