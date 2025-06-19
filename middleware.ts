import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "No autorizado: token faltante" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  const AUTH_SECRET = process.env.AUTH_SECRET;

  if (!AUTH_SECRET) {
    console.error("AUTH_SECRET no está definido en .env");
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }

  if (token !== AUTH_SECRET) {
    return NextResponse.json(
      { error: "No autorizado: token inválido" },
      { status: 401 }
    );
  }

  // Token válido, deja pasar la petición
  return NextResponse.next();
}

// Aplica el middleware solo a las rutas API que quieras proteger
export const config = {
  matcher: ["/api/uix/:path*"],
};
