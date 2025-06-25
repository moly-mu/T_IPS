import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createSpecialtyService(name: string) {
  return await prisma.specialty.create({
    data: { name },
  });
}

export async function changeUserStatusService(userId: number, newStatus: string) {
  return await prisma.profesional.update({
    where: { id: userId },
    data: { status: newStatus },
  });
}
