import { PrismaClient, Gender, Language, DocumentType, Sex, BloodType, Eps } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

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
    BloodType: bloodType,
  } = req.body || {};

  const errors: string[] = [];

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
  if (!bloodType) errors.push("El tipo de sangre es obligatorio.");

  const docStr = document?.toString();
  if (docStr && (docStr.length < 4 || docStr.length > 13)) {
    errors.push("El documento debe tener entre 4 y 13 caracteres.");
  }

  if (phone && (phone.length < 5 || phone.length > 15)) {
    errors.push("El teléfono debe tener entre 5 y 15 caracteres.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errors.push("El correo no tiene un formato válido.");
  }

  if (birthdate && isNaN(Date.parse(birthdate))) {
    errors.push("La fecha de nacimiento no es válida.");
  }

  const enums = [
    { value: gender, valid: Object.values(Gender), name: "Género" },
    { value: sex, valid: Object.values(Sex), name: "Sexo" },
    { value: language, valid: Object.values(Language), name: "Idioma" },
    { value: document_type, valid: Object.values(DocumentType), name: "Tipo de documento" },
    { value: bloodType, valid: Object.values(BloodType), name: "Tipo de sangre" },
  ];

for (const { value, valid, name } of enums as { value: any, valid: string[], name: string }[]) {
  if (value && !valid.includes(value)) {
    errors.push(`${name} inválido. Valores válidos: ${valid.join(", ")}`);
  }
}

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
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

      const rol = await tx.rol.findFirst({ where: { rol_name: "Paciente" } });
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

      const pacData = await tx.pacData.create({
        data: {
          bloodType,
          medical_history: Buffer.from(""),
          Direction: "",
          allergies: "",
          emergency_contact: "",
          eps_type: Eps.Ninguna,
          profession: "",
          ethnicgroup: "",
        },
      });

      await tx.patient.create({
        data: {
          id: pacData.id,
          User_idUser: user.id,
          User_credential_users_idcredential_users: credentials.id,
          User_rol_idrol: rol.id,
          pac_data_idpac_data: pacData.id,
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
