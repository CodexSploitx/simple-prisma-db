import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, hashtags, category, code, code_animate=null } = body;

    // Validación básica
    if (!name || !Array.isArray(hashtags) || !category || !code) {
      return NextResponse.json(
        { error: "Campos faltantes o inválidos." },
        { status: 400 }
      );
    }

    const newUix = await prisma.uix.create({
      data: {
        name,
        hashtags,
        category,
        code,
        code_animate,
      },
    });

    return NextResponse.json(
      {
        message: "UIX component created successfully",
        data: newUix,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Error al guardar UIX:", err);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allUix = await prisma.uix.findMany();
    return NextResponse.json(allUix, { status: 200 });
  } catch (error) {
    console.error("Error fetching UIX records:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
