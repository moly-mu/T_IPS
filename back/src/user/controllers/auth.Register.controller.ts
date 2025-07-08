import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  const {
    email,document,
    firstname, lastname, age, gender,password,
    sex, languaje, document_type, phone
  } = req.body || {};

  // Validación de campos requeridos
    if (!email  || !document || !firstname || !lastname) {
      return res.status(400).json({ 
        error: "Campos requeridos: email, document, firstname, lastname" 
      });
    }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingEmail = await prisma.credentialUser.findUnique({ where: { email } });
    if (existingEmail){
      res.status(400).json({ message: "Email ya registrado" });
      return;
    }

    const existingDocument = await prisma.credentialUser.findUnique({ where: { document } });
    if (existingDocument) {
      res.status(400).json({ message: "Documento ya registrado" });
      return;
    }
      

    const credentials = await prisma.credentialUser.create({
      data: { email, password: hashedPassword, document }
    });

    

    const rol = await prisma.rol.findFirst({ where: { rol_name: "usuario" } }); // o "paciente"
    if (!rol) {
      return res.status(500).json({ error: "Rol 'usuario' no encontrado. Crea el rol en la base de datos." });
    }

    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        age,
        gender,
        sex,
        languaje,
        document_type,
        phone,
        credential_users_idcredential_users: credentials.id,
        rol_idrol: rol?.id || 1 // fallback
      }
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" });

    res.status(201).json({ token, user });
  }catch (err: any) {
  console.error("ERROR EN REGISTER:", err);
  res.status(500).json({
    error: "Error al registrar",
    details: err?.message || err
  });
  }
}