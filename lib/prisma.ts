import { PrismaClient } from "@prisma/client";

declare global {
  // Evita redefinir PrismaClient en modo desarrollo con recarga en caliente
  // @ts-ignore
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"], // opcional para ver queries en consola
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
