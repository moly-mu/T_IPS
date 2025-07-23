// src/admin/controller/profesional.controller.ts

import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los profesionales (opcionalmente útil para admin)
export const getAllProfessionals = async (_req: Request, res: Response) => {
  try {
    const professionals = await prisma.profesional.findMany({
      include: {
        prof_data: true,
        User: true,
        ProfesionalHasSpecialty: {
          include: {
            Specialty: true,
          },
        },
      },
    });
    res.json(professionals);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los profesionales", details: error });
  }
};

// Obtener un profesional por ID (admin)
export const getProfessionalById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const professional = await prisma.profesional.findUnique({
      where: { id },
      include: {
        prof_data: true,
        User: true,
        ProfesionalHasSpecialty: {
          include: {
            Specialty: true,
          },
        },
      },
    });

    if (!professional) return res.status(404).json({ error: "Profesional no encontrado" });
    res.json(professional);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar el profesional", details: error });
  }
};

// Crear nuevo profesional
export const createProfessional = async (req: Request, res: Response) => {
  const {
    User_idUser,
    User_credential_users_idcredential_users,
    User_rol_idrol,
    prof_data_idprof_data,
    specialty_idspecialty,
  } = req.body;

  try {
    const profesional = await prisma.profesional.create({
      data: {
        User_idUser,
        User_credential_users_idcredential_users,
        User_rol_idrol,
        prof_data_idprof_data,
        ProfesionalHasSpecialty: {
          create: {
            specialty_idspecialty,
          },
        },
      },
    });
    res.status(201).json(profesional);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el profesional", details: error });
  }
};

// Actualizar el estado del profesional (en tabla USER)
export const updateProfessionalStatus = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  try {
    const professional = await prisma.profesional.findUnique({
      where: { id },
      include: {
        User: true,
      },
    });

    if (!professional) {
      return res.status(404).json({ error: "Profesional no encontrado" });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: professional.User.id,
      },
      data: {
        status: status,
      },
    });

    res.json({ message: "Estado actualizado", user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar estado del profesional", details: error });
  }
};

// Eliminar profesional
export const deleteProfessional = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await prisma.profesional.delete({ where: { id } });
    res.json({ message: "Profesional eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar el profesional", details: error });
  }
};

// Obtener profesionales por especialidad (con datos mapeados para el frontend)
export const getProfessionalsBySpecialty = async (req: Request, res: Response) => {
  const specialtyId = Number(req.params.specialtyId);

  try {
    const professionals = await prisma.profesional.findMany({
      where: {
        ProfesionalHasSpecialty: {
          some: {
            specialty_idspecialty: specialtyId,
          },
        },
      },
      include: {
        prof_data: true,
        User: true,
        ProfesionalHasSpecialty: {
          include: {
            Specialty: true,
          },
        },
      },
    });

    // Mapear datos para el frontend
    const mapped = await Promise.all(
      professionals.map(async (pro) => {
        const reviews = await prisma.specialtyReview.findMany({
          where: {
            specialty_id: specialtyId,
            user_id: pro.User.id,
            user_cred_id: pro.User.credential_users_idcredential_users,
            user_rol_id: pro.User.rol_idrol,
          },
        });

        const avgRating = reviews.length > 0
          ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
          : "0.0";

        return {
          id: pro.id,
          name: `${pro.User.firstname} ${pro.User.lastname}`,
          specialty: pro.ProfesionalHasSpecialty[0]?.Specialty.name ?? "Sin especialidad",
          experience: pro.prof_data.working_experience,
          rating: avgRating,
          education: Buffer.from(pro.prof_data.educational_certificates).toString("utf8"),
          certifications: [Buffer.from(pro.prof_data.degrees).toString("utf8")],
          consultations: pro.prof_data.consultations,
          status: pro.User.status.toLowerCase(),
        };
      })
    );

    res.json(mapped);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener profesionales por especialidad",
      details: error,
    });
  }
};