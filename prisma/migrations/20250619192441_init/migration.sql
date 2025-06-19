-- CreateTable
CREATE TABLE "uix" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hashtags" TEXT[],
    "category" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "uix_pkey" PRIMARY KEY ("id")
);
