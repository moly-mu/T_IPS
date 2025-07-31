import { PrismaClient } from "@prisma/client";
import {Request, Response}from "express";
const prisma = new PrismaClient();

export const getProfile = async (req: Request, res: Response) => {
  const userId = req.userId;
  
  if (!userId) {
    return res.status(400).json({ error: 'UserId no encontrado en el token' });
  }
  
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        credential_users: true,
        rol: true,
      },
    });
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json(user);
  } catch (err) {
    console.error("❌ Error al obtener perfil:", err);
    res.status(500).json({ error: 'Error al obtener perfil', details: err });
  }
};