import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  const {
    email, password, document,
    firstname, lastname, age, gender,
    sex, languaje, document_type
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingEmail = await prisma.credentialUser.findUnique({ where: { email } });
    if (existingEmail) return res.status(400).json({ message: "Email ya registrado" });

    const credentials = await prisma.credentialUser.create({
      data: { email, password: hashedPassword, document }
    });

    const rol = await prisma.rol.findFirst({ where: { rol_name: "usuario" } }); // o "paciente"

    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        age,
        gender,
        sex,
        languaje,
        document_type,
        credential_users_idcredential_users: credentials.id,
        rol_idrol: rol?.id || 1 // fallback
      }
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" });

    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: "Error al registrar", details: err });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const cred = await prisma.credentialUser.findUnique({ where: { email } });
    if (!cred) return res.status(404).json({ message: "Credenciales no encontradas" });

    const isMatch = await bcrypt.compare(password, cred.password);
    if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

    const user = await prisma.user.findFirst({
      where: { credential_users_idcredential_users: cred.id },
      include: { rol: true }
    });

    const token = jwt.sign({ id: user?.id }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: "Error al iniciar sesión", details: err });
  }
};
