import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSpecialistRequest = async (req: Request, res: Response) => {
  const userId = req.userId; // Asegúrate de que el middleware populatea esto
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
    const existing = await prisma.specialistRequest.findFirst({
      where: { userId, status: "pendiente" },
    });

    if (existing) {
      return res.status(400).json({ message: "Ya existe una solicitud pendiente" });
    }

    const newRequest = await prisma.specialistRequest.create({
      data: {
        userId,
        biography,
        picture: picture ? Buffer.from(picture, 'base64') : undefined,
        specialty,
        price,
        graduationYear,
        workExperience,
        languages,
        education,
        skills,
        references: JSON.stringify(references),
        certificates: certificates ? Buffer.from(certificates, 'base64') : undefined,
        documentInfo: JSON.stringify(documentInfo),
        personalInfo: JSON.stringify(personalInfo),
        personalRefs: JSON.stringify(personalRefs),
      },
    });

    return res.status(201).json({ message: "Solicitud enviada", newRequest });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear solicitud", error });
  }
};