import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const UserProfile = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        credential_users: true,
        rol: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Eliminar la contraseña del credential_users si existe
    const sanitizedUser = {
      ...user,
      credential_users: user.credential_users
        ? { ...user.credential_users, password: undefined }
        : null
    };

    return res.status(200).json({ user: sanitizedUser });

  } catch (err: any) {
    console.error("ERROR AL OBTENER USUARIO:", err);
    return res.status(500).json({
      error: "Error al obtener la información del usuario",
      details: err?.message || err
    });
  }
};
