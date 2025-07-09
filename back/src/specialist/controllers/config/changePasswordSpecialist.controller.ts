import {Request,Response} from "express";
import {PrismaClient} from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const changePassword = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { newPassword } = req.body;
  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.credentialUser.update({
      where: { id: userId },
      data: { password: hashed },
    });
    res.json({ message: "Contraseña actualizada" });
  } catch (err) {
    res.status(500).json({ error: "Error al cambiar contraseña", details: err });
  }
};