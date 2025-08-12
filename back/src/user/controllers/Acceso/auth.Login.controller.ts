import "dotenv/config";
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
    const credential = await prisma.credentialUser.findUnique({
      where: { email },
      include: {
        User: true
      }
    });

    if (!credential) {
      return res.status(400).json({ error: "Correo o contraseña incorrectos." });
    }

    const isMatch = await bcrypt.compare(password, credential.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Correo o contraseña incorrectos." });
    }

    const user = credential.User[0];
    if (!user) {
      return res.status(404).json({ error: "No se encontró el perfil de usuario asociado." });
    }

    // Generar token con más datos
    const token = jwt.sign(
      {
        id: user.id,              // ID de la tabla User
        credId: credential.id,    // ID de la tabla credentialUser
        rolId: user.rol_idrol,    // ID del rol
        email: credential.email
      },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    // Crear objeto sanitizado (sin ids internos)
    const sanitizedUser = {
      firstname: user.firstname,
      second_firstname: user.second_firstname,
      lastname: user.lastname,
      second_lastname: user.second_lastname,
      birthdate: user.birthdate,
      gender: user.gender,
      sex: user.sex,
      language: user.language,
      document_type: user.document_type,
      phone: user.phone,
      status: user.status,
      joinDate: user.joinDate,
      email: credential.email,
      document: credential.document
    };

    return res.status(200).json({ token, user: sanitizedUser });

  } catch (err: any) {
    console.error("ERROR EN LOGIN:", err);
    return res.status(500).json({
      error: "Error al iniciar sesión",
      details: err?.message || err
    });
  }
};
