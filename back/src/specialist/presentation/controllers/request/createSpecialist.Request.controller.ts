import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const createSpecialistRequest = async (req: Request, res: Response) => {
  // Convertir arrays y objetos a string (porque el modelo los define como String?)
  const stringifyIfNeeded = (input: any) => (input ? JSON.stringify(input) : null);
  const userId = req.userId;

  if (!userId) {
     res.status(401).json({ message: "Usuario no autenticado" });
    return;
  }

  const {
    biography,
    picture,
    specialty,
    price,
    graduationYear,
    workExperience,
  language,
    education,
    skills,
    references,
    certificates,
    documentInfo,
    personalInfo,
    personalRefs,
  } = req.body;

  if (!specialty || !price || !graduationYear) {
    res.status(400).json({ 
      message: "Faltan campos obligatorios",
      missing: { specialty: !specialty, price: !price, graduationYear: !graduationYear }
    });
    return;
  }
  
  try {
    // Verifica que no exista una solicitud pendiente
    const existing = await prisma.specialistRequest.findFirst({
  where: { userId, status: "Pendiente" },
    });

    if (existing) {
       res.status(400).json({ message: "Ya existe una solicitud pendiente" });
      return;
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

    // Validar language solo si viene (opcional)
    const validLanguages = ["Espanol", "Ingles", "Frances", "Aleman", "Portugues"];
    if (language && !validLanguages.includes(language)) {
      return res.status(400).json({
        message: "El campo 'language' debe ser uno de: " + validLanguages.join(", ")
      });
    }

    const newRequest = await prisma.specialistRequest.create({
      data: {
        userId,
        biography,
        picture: pictureBuffer,
        specialty,
        price,
        graduationYear,
        workExperience,
        language,
        education: stringifyIfNeeded(education)|| "",
        skills: stringifyIfNeeded(skills)|| "",
        references: stringifyIfNeeded(references)|| "",
        certificates: certificatesBuffer,
        documentInfo: stringifyIfNeeded(documentInfo)|| "",
        personalInfo: stringifyIfNeeded(personalInfo)|| "",
        personalRefs: stringifyIfNeeded(personalRefs)|| "",
      },
    });

     res.status(201).json({
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

     res.status(500).json({
      message: "Error al crear solicitud",
      error: error.message,
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
    return;
  }
};
