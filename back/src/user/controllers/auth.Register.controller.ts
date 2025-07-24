import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  const {
    email,
    document,
    firstname,
    second_firstname,
    lastname,
    second_lastname,
    age,
    gender,
    password,
    sex,
    languaje,
    document_type,
    phone,
  } = req.body || {};

  // Validación de campos obligatorios
  if (
    !firstname ||
    !lastname ||
    !document_type ||
    !document ||
    !email ||
    !password ||
    !age ||
    !gender ||
    !phone
  ) {
    return res.status(400).json({
      error:
        "Todos los campos son obligatorios: nombre, apellido, tipo de documento, documento, correo, contraseña, edad, género y teléfono.",
    });
  }

  // Validación de longitud del documento
  const documentLength = document.toString().length;
  if (documentLength < 4 || documentLength > 13) {
    return res.status(400).json({
      error: "El número de documento debe tener entre 4 y 13 dígitos.",
    });
  }

  // Validación de longitud del teléfono
  if (phone.length < 5 || phone.length > 15) {
    return res.status(400).json({
      error: "El número de teléfono debe tener entre 5 y 15 caracteres.",
    });
  }

  try {
    // Validar si el email o documento ya existen
    const existingEmail = await prisma.credentialUser.findUnique({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: "Correo ya registrado." });
    }

    const existingDocument = await prisma.credentialUser.findUnique({ where: { document } });
    if (existingDocument) {
      return res.status(400).json({ message: "Documento ya registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Ejecutar todo el proceso en una transacción
    const result = await prisma.$transaction(async (tx) => {
      const credentials = await tx.credentialUser.create({
        data: {
          email,
          password: hashedPassword,
          document,
        },
      });

      const rol = await tx.rol.findFirst({
        where: { rol_name: "Paciente" },
      });

      if (!rol) {
        throw new Error("Rol 'usuario' no encontrado en la base de datos.");
      }

      const user = await tx.user.create({
        data: {
          firstname,
          second_firstname,
          lastname,
          second_lastname,
          gender,
          sex: gender,
          language: languaje || "español",
          document_type,
          phone,
          credential_users_idcredential_users: credentials.id,
          rol_idrol: rol.id,
        },
      });

      return { user };
    });

    const token = jwt.sign({ id: result.user.id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1d",
    });

    return res.status(201).json({ token, user: result.user });
  } catch (err: any) {
    console.error("ERROR EN REGISTER:", err);
    return res.status(500).json({
      error: "Error al registrar el usuario",
      details: err?.message || err,
    });
  }
};
