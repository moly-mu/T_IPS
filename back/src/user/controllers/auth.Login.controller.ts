import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: "Correo y contraseña son requeridos." });
  }

  try {
    // Buscar usuario por email
    const credential = await prisma.credentialUser.findUnique({
      where: { email },
      include: {
        User: true
      }
    });

    if (!credential) {
      return res.status(400).json({ error: "Correo o contraseña incorrectos." });
    }

    // Validar contraseña
    const isMatch = await bcrypt.compare(password, credential.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Correo o contraseña incorrectos." });
    }

    // Obtener el primer User asociado
    const user = credential.User[0];
    if (!user) {
      return res.status(404).json({ error: "No se encontró el perfil de usuario asociado." });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, email: credential.email, role: user.rol_idrol },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    return res.status(200).json({ token, user });

  } catch (err: any) {
    console.error("ERROR EN LOGIN:", err);
    return res.status(500).json({
      error: "Error al iniciar sesión",
      details: err?.message || err
    });
  }
};
