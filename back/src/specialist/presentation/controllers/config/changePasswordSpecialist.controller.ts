import {Request,Response} from "express";
import {PrismaClient} from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const changePassword = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { newPassword } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "Falta userId (token inválido o no enviado)" });
  }

  if (!newPassword) {
    return res.status(400).json({ error: "La nueva contraseña es obligatoria" });
  }

  try {
    // Buscar el usuario y obtener su credential_users_id
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        credential_users: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Hashear la nueva contraseña
    const hashed = await bcrypt.hash(newPassword, 10);
    
    // Actualizar la contraseña en credential_users
    await prisma.credentialUser.update({
      where: { id: user.credential_users_idcredential_users },
      data: { password: hashed },
    });
    
    res.json({ message: "Contraseña actualizada exitosamente" });
  } catch (err) {
    console.error("❌ Error al actualizar contraseña:", err);
    res.status(500).json({ error: "Error al cambiar contraseña", details: err });
  }
};