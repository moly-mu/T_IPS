// src/admin/controller/specialistRequest.controller.ts

import type { Request, Response } from "express";
import { PrismaClient, UserStatus } from "@prisma/client";

const prisma = new PrismaClient();

//* Obtener todas las solicitudes de especialistas
export const getAllSpecialistRequests = async (
  _req: Request,
  res: Response
) => {
  try {
    const requests = await prisma.specialistRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            credential_users: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });

    const formatted = requests.map((r) => ({
      id: r.id,
      userId: r.userId,
      firstname: r.user.firstname,
      lastname: r.user.lastname,
      email: r.user.credential_users?.email,
      status: r.status,
      specialty: r.specialty,
      price: r.price,
      biography: r.biography,
      graduationYear: r.graduationYear,
      workExperience: r.workExperience,
      languages: r.languages,
      education: r.education,
      skills: r.skills,
      references: r.references ? JSON.parse(r.references) : null,
      documentInfo: r.documentInfo ? JSON.parse(r.documentInfo) : null,
      personalInfo: r.personalInfo ? JSON.parse(r.personalInfo) : null,
      personalRefs: r.personalRefs ? JSON.parse(r.personalRefs) : null,
      createdAt: r.createdAt,
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Error al obtener solicitudes:", error);
    res.status(500).json({ error: "Error al obtener solicitudes" });
  }
};


//* Actualizar el estado de una solicitud de especialista */
export const updateSpecialistRequestStatus = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  if (!status || !Object.values(UserStatus).includes(status)) {
    return res.status(400).json({ error: "Estado inválido" });
  }

  try {
    const updated = await prisma.specialistRequest.update({
      where: { id },
      data: { status },
    });

    res.json({
      message: `Solicitud actualizada a ${status}`,
      data: updated,
    });
  } catch (error) {
    console.error("Error al actualizar solicitud:", error);
    res.status(500).json({ error: "Error al actualizar solicitud", details: error });
  }
};
