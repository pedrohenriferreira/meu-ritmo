import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // TODO: Em produção, invalidar token no banco de dados
    // ou adicionar à blacklist
    
    return NextResponse.json(
      { message: "Logout realizado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
