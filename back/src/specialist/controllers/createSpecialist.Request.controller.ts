import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSpecialistRequest = async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Usuario no autenticado" });
  }

  const {
    biography,
    picture,
    specialty,
    price,
    graduationYear,
    workExperience,
    languages,
    education,
    skills,
    references,
    certificates,
    documentInfo,
    personalInfo,
    personalRefs,
  } = req.body;

  try {
    // Verifica que no exista una solicitud pendiente
    const existing = await prisma.specialistRequest.findFirst({
      where: { userId, status: "pendiente" },
    });

    if (existing) {
      return res.status(400).json({ message: "Ya existe una solicitud pendiente" });
    }

    // Procesar campos base64 (imagen y PDF)
    let pictureBuffer: Buffer | undefined;
    let certificatesBuffer: Buffer | undefined;

    if (typeof picture === "string" && picture.startsWith("data:image/")) {
      pictureBuffer = Buffer.from(picture.replace(/^data:image\/[a-z]+;base64,/, ""), "base64");
    }

    if (typeof certificates === "string" && certificates.startsWith("data:application/pdf")) {
      certificatesBuffer = Buffer.from(certificates.replace(/^data:application\/pdf;base64,/, ""), "base64");
    }

    // Convertir arrays y objetos a string (porque el modelo los define como String?)
    const stringifyIfNeeded = (input: any) => (input ? JSON.stringify(input) : null);

    const newRequest = await prisma.specialistRequest.create({
      data: {
        userId,
        biography,
        picture: pictureBuffer,
        specialty,
        price,
        graduationYear,
        workExperience,
        languages: stringifyIfNeeded(languages),
        education: stringifyIfNeeded(education),
        skills: stringifyIfNeeded(skills),
        references: stringifyIfNeeded(references),
        certificates: certificatesBuffer,
        documentInfo: stringifyIfNeeded(documentInfo),
        personalInfo: stringifyIfNeeded(personalInfo),
        personalRefs: stringifyIfNeeded(personalRefs),
      },
    });

    return res.status(201).json({
      message: "Solicitud enviada exitosamente",
      newRequest: {
        id: newRequest.id,
        userId: newRequest.userId,
        specialty: newRequest.specialty,
        price: newRequest.price,
        status: newRequest.status,
        createdAt: newRequest.createdAt,
      },
    });
  } catch (error: any) {
    console.error("❌ Error al crear solicitud:", error);

    return res.status(500).json({
      message: "Error al crear solicitud",
      error: error.message,
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
  }
};
