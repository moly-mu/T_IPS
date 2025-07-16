import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  const {
<<<<<<< HEAD
    email,document,
    firstname,second_firstname, lastname,second_lastname, age, gender,password,
    sex, languaje, document_type, phone
=======
    firstname,
    lastname,
    document_type,
    document,
    email,
    password,
    age,
    gender,
    phone
>>>>>>> 3330d1433069eb06f87ccddcc66f91a0ee9ede86
  } = req.body || {};

  if (!firstname || !lastname || !document_type || !document || !email || !password || !age || !gender || !phone) {
    return res.status(400).json({
      error: "Todos los campos son obligatorios: nombre, apellido, tipo de documento, documento, correo, contraseña, edad, género y teléfono."
    });
  }

  // Validación de longitud para document
  const documentLength = document.toString().length;
  if (documentLength < 4 || documentLength > 13) {
    return res.status(400).json({
      error: "El número de documento debe tener entre 4 y 13 dígitos."
    });
  }

  // Validación de longitud para phone
  if (phone.length < 5 || phone.length > 15) {
    return res.status(400).json({
      error: "El número de teléfono debe tener entre 5 y 15 caracteres."
    });
  }

  try {
    const existingEmail = await prisma.credentialUser.findUnique({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: "Correo ya registrado." });
    }

    const existingDocument = await prisma.credentialUser.findUnique({ where: { document } });
    if (existingDocument) {
      return res.status(400).json({ message: "Documento ya registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const credentials = await prisma.credentialUser.create({
      data: { email, password: hashedPassword, document }
    });

    const rol = await prisma.rol.findFirst({ where: { rol_name: "usuario" } });
    if (!rol) {
      return res.status(500).json({ error: "Rol 'usuario' no encontrado en la base de datos." });
    }

    const user = await prisma.user.create({
      data: {
        firstname,
        second_firstname,
        lastname,
        second_lastname,
        age,
        gender,
        sex: gender,
        language: "español",
        document_type,
        phone,
        credential_users_idcredential_users: credentials.id,
        rol_idrol: rol.id
      }
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" });

    return res.status(201).json({ token, user });

  } catch (err: any) {
    console.error("ERROR EN REGISTER:", err);
    return res.status(500).json({
      error: "Error al registrar el usuario",
      details: err?.message || err
    });
  }
};