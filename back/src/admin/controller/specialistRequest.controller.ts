import type { Request, Response } from "express";
import { PrismaClient, UserStatus } from "@prisma/client";
import { validateRequestStatus } from "../utils/validators";

const prisma = new PrismaClient();

//* Helper para parsear campos JSON de forma segura
const safeJsonParse = (jsonString: string | null) => {
  if (!jsonString) return null;
  try {
    return JSON.parse(jsonString);
  } catch {
    return null;
  }
};

//* Formatear datos de respuesta
const formatSpecialistRequest = (request: any) => ({
  id: request.id,
  userId: request.userId,
  firstname: request.user.firstname,
  lastname: request.user.lastname,
  email: request.user.credential_users?.email,
  status: request.status,
  specialty: request.specialty,
  price: request.price,
  biography: request.biography,
  graduationYear: request.graduationYear,
  workExperience: request.workExperience,
  languages: request.languages,
  education: request.education,
  skills: request.skills,
  references: safeJsonParse(request.references),
  documentInfo: safeJsonParse(request.documentInfo),
  personalInfo: safeJsonParse(request.personalInfo),
  personalRefs: safeJsonParse(request.personalRefs),
  createdAt: request.createdAt,
  updatedAt: request.updatedAt,
});

//* Obtener todas las solicitudes de especialistas con paginación
export const getAllSpecialistRequests = async (
  req: Request,
  res: Response
) => {
  const { status, page = 1, limit = 10 } = req.query;
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  
  try {
    const whereClause = status 
      ? { status: status as UserStatus } 
      : {};

    const [requests, totalCount] = await Promise.all([
      prisma.specialistRequest.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              credential_users: { select: { email: true } },
            },
          },
        },
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber,
      }),
      prisma.specialistRequest.count({ where: whereClause })
    ]);

    const formattedRequests = requests.map(formatSpecialistRequest);

    res.json({
      data: formattedRequests,
      pagination: {
        total: totalCount,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(totalCount / limitNumber),
      },
    });
  } catch (error) {
    console.error("Error al obtener solicitudes:", error);
    res.status(500).json({ 
      error: "Error al obtener solicitudes",
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

//* Obtener una solicitud por ID
export const getSpecialistRequestById = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const request = await prisma.specialistRequest.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            credential_users: { select: { email: true } },
          },
        },
      },
    });

    if (!request) {
      return res.status(404).json({ error: "Solicitud no encontrada" });
    }

    res.json(formatSpecialistRequest(request));
  } catch (error) {
    console.error("Error al obtener solicitud:", error);
    res.status(500).json({ 
      error: "Error al obtener solicitud",
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

//* Actualizar el estado de una solicitud de especialista
export const updateSpecialistRequestStatus = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  const validationError = validateRequestStatus(status);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const existingRequest = await prisma.specialistRequest.findUnique({
      where: { id }
    });

    if (!existingRequest) {
      return res.status(404).json({ error: "Solicitud no encontrada" });
    }

    const updatedRequest = await prisma.specialistRequest.update({
      where: { id },
      data: { status },
      include: {
        user: {
          select: {
            firstname: true,
            lastname: true,
            credential_users: { select: { email: true } },
          },
        },
      },
    });

    // Ejemplo: Notificar al usuario sobre el cambio de estado
    if (existingRequest.status !== status) {
      // Aquí podrías agregar lógica para notificar al usuario
    }

    res.json({
      message: `Estado actualizado a ${status}`,
      data: formatSpecialistRequest(updatedRequest),
    });
  } catch (error) {
    console.error("Error al actualizar solicitud:", error);
    res.status(500).json({ 
      error: "Error al actualizar solicitud",
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};