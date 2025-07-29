import { PrismaClient, Gender, Language, DocumentType, Sex, BloodType } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
//BloodType
const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  const {
    firstname,
    second_firstname,
    lastname,
    second_lastname,
    gender,
    sex,
    language,
    phone,
    document_type,
    document,
    email,
    password,
    birthdate,
  } = req.body || {};

  const errors: string[] = [];

  // Validar campos obligatorios
  if (!firstname) errors.push("El nombre es obligatorio.");
  if (!lastname) errors.push("El apellido es obligatorio.");
  if (!document_type) errors.push("El tipo de documento es obligatorio.");
  if (!document) errors.push("El documento es obligatorio.");
  if (!email) errors.push("El correo es obligatorio.");
  if (!password) errors.push("La contraseña es obligatoria.");
  if (!gender) errors.push("El género es obligatorio.");
  if (!sex) errors.push("El sexo es obligatorio.");
  if (!language) errors.push("El idioma es obligatorio.");
  if (!birthdate) errors.push("La fecha de nacimiento es obligatoria.");
  if (!phone) errors.push("El número de teléfono es obligatorio.");
  if (!BloodType) errors.push("El tipo de sangre es obligatorio.");
  // Validar longitud de documento
  const docStr = document?.toString();
  if (docStr && (docStr.length < 4 || docStr.length > 13)) {
     errors.push(`El documento es demasiado corto. Mínimo: 4 caracteres. Recibido: ${docStr.length}`);
    } else if (docStr.length > 13) {
      errors.push(`El documento es demasiado largo. Máximo: 13 caracteres. Recibido: ${docStr.length}`);
    }
  
  // Validar longitud de teléfono
  if (phone && (phone.length < 5 || phone.length > 15)) {
      errors.push(`El teléfono es demasiado corto. Mínimo: 5 caracteres. Recibido: ${phone.length}`);
    } else if (phone.length > 15) {
      errors.push(`El teléfono es demasiado largo. Máximo: 15 caracteres. Recibido: ${phone.length}`);
    }

  // Validar email formato
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errors.push("El correo no tiene un formato válido.");
  }

  // Validar fecha de nacimiento
  if (birthdate && isNaN(Date.parse(birthdate))) {
    errors.push("La fecha de nacimiento no es válida.");
  }

  // Validar enums
  const validGenders = Object.values(Gender);
  if (gender && !validGenders.includes(gender)) {
    errors.push(`Género inválido. Valores válidos: ${validGenders.join(", ")}`);
  }

  const validSex = Object.values(Sex);
  if (sex && !validSex.includes(sex)) {
    errors.push(`Sexo inválido. Valores válidos: ${validSex.join(", ")}`);
  }

  const validLang = Object.values(Language);
  if (language && !validLang.includes(language)) {
    errors.push(`Idioma inválido. Valores válidos: ${validLang.join(", ")}`);
  }

  const validDocTypes = Object.values(DocumentType);
  if (document_type && !validDocTypes.includes(document_type)) {
    errors.push(`Tipo de documento inválido. Valores válidos: ${validDocTypes.join(", ")}`);
  }

  // Si hay errores, devolverlos todos
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    // Validación de duplicados en DB
    const existingEmail = await prisma.credentialUser.findUnique({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ errors: ["El correo ya está registrado."] });
    }

    const existingDoc = await prisma.credentialUser.findFirst({ where: { document: Number(document) } });
    if (existingDoc) {
      return res.status(400).json({ errors: ["El documento ya está registrado."] });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.$transaction(async (tx) => {
      const credentials = await tx.credentialUser.create({
        data: {
          email,
          password: hashedPassword,
          document: Number(document),
        },
      });

      const rol = await tx.rol.findFirst({
        where: { rol_name: "Paciente" },
      });

      if (!rol) throw new Error("Rol 'Paciente' no encontrado.");

      const user = await tx.user.create({
        data: {
          firstname,
          second_firstname,
          lastname,
          second_lastname,
          gender,
          sex,
          language,
          document_type,
          phone,
          birthdate: new Date(birthdate),
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
