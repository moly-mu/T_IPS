import {Request,Response} from "express";
import {PrismaClient} from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const changePassword = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { newPassword } = req.body;
  console.log("📦 Body completo recibido:", req.body);

  console.log("👉 userId recibido:", userId);
  console.log("👉 newPassword recibido:", newPassword); //! Borrar dato sensible

  if (!userId) {
    return res.status(400).json({ message: "Falta userId (token inválido o no enviado)" });
  }

  if (!newPassword) {
    return res.status(400).json({ message: "La nueva contraseña es obligatoria" });
  }
  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.credentialUser.update({
      where: { id: userId },
      data: { password: hashed },
    });
    res.json({ message: "Contraseña actualizada" });
  } catch (err) {
    console.error("❌ Error al actualizar contraseña:", err);
    res.status(500).json({ error: "Error al cambiar contraseña", details: err });
  }
};