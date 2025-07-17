import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const updateUserProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstname, lastname, age, phone } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        firstname,
        lastname,
        age,
        phone,
      },
      include: {
        credential_users: true,
        rol: true
      }
    });

    // Quitar contraseña
    const sanitizedUser = {
      ...updatedUser,
      credential_users: updatedUser.credential_users
        ? { ...updatedUser.credential_users, password: undefined }
        : null
    };

    return res.status(200).json({ user: sanitizedUser });

  } catch (err: any) {
    console.error("ERROR AL ACTUALIZAR USUARIO:", err);
    return res.status(500).json({
      error: "Error al actualizar la información del usuario",
      details: err?.message || err
    });
  }
};
