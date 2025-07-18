// src/controllers/userController.ts
import { PrismaClient } from "@prisma/client"; // Ajusta si tu prisma está en otro path
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUserProfileByToken = async (req: Request, res: Response) => {
  const userId = req.userId; // ← Esto viene del middleware validateToken

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstname: true,
        second_firstname: true,
        lastname: true,
        second_lastname: true,
        joinDate: true,
        rol: {
          select: {
            rol_name: true,
          },
        },
        credential_users: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const sanitizedUser = {
      ...user,
      credential_users: user.credential_users
        ? { ...user.credential_users, password: undefined }
        : null,
    };

    return res.status(200).json({ user: sanitizedUser });
  } catch (err: any) {
    console.error("❌ Error al obtener perfil:", err);
    return res.status(500).json({
      error: "Error al obtener la información del usuario",
      details: err.message,
    });
  }
};
