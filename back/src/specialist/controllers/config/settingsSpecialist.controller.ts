import { PrismaClient } from '@prisma/client'
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getSettings = async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        status: true,
        credential_users: {
          select: { email: true },
        },
      },
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener configuraciones', details: err });
  }
};