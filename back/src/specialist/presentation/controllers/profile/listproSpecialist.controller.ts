import { PrismaClient } from "@prisma/client";
import {Request, Response}from "express";
const prisma = new PrismaClient();

export const getProfile = async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        credential_users: true,
        rol: true,
      },
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener perfil', details: err });
  }
};