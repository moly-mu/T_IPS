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

    return res.status(200).json({ user });

  } catch (err: any) {
    console.error("ERROR AL OBTENER USUARIO:", err);
    return res.status(500).json({
      error: "Error al obtener la información del usuario",
      details: err?.message || err
    });
  }
};
