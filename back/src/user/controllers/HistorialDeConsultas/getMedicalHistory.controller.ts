import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getMedicalConsultations = async (
  req: Request & { userId?: number },
  res: Response
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Usuario no autenticado." });
    }

    // 1) Buscar paciente vinculado al userId
    const patient = await prisma.patient.findFirst({
      where: { User_idUser: userId },
      select: { id: true },
    });

    if (!patient) {
      return res.status(404).json({ error: "No se encontró información del paciente." });
    }

    // 2) Buscar historia médica del paciente con consultas + cita + especialista + especialidad
    const medicalHistory = await prisma.medicalHistory.findFirst({
      where: { patient_idPaciente: patient.id },
      include: {
        consultations: {
          orderBy: { startTime: "desc" },
          select: {
            id: true,
            startTime: true,
            endTime: true,
            reason: true,
            medicalNote: true,
            vitalSigns: true,
            consultationMode: true,
            location: true,
            summary: true,
            appointment: {
              select: {
                id: true,
                appoint_init: true,
                appoint_finish: true,
                Specialty: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
                Specialist: {
                  select: {
                    id: true,
                    User: {
                      select: {
                        firstname: true,
                        second_firstname: true,
                        lastname: true,
                        second_lastname: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!medicalHistory) {
      return res.status(404).json({ error: "No se encontró historial médico." });
    }

    // 3) Opcional: aplanar respuesta para el front (nombre completo del especialista + especialidad)
    const consultations = medicalHistory.consultations.map((c) => {
      const u = c.appointment?.Specialist?.User;
      const fullName = u
        ? [u.firstname, u.second_firstname, u.lastname, u.second_lastname]
            .filter(Boolean)
            .join(" ")
        : null;

      return {
        id: c.id,
        startTime: c.startTime,
        endTime: c.endTime,
        reason: c.reason,
        medicalNote: c.medicalNote,
        vitalSigns: c.vitalSigns,
        consultationMode: c.consultationMode,
        location: c.location,
        summary: c.summary,
        appointmentId: c.appointment?.id ?? null,
        specialist: fullName, // ← nombre del especialista
        specialistId: c.appointment?.Specialist?.id ?? null,
        specialty: c.appointment?.Specialty?.name ?? null, // ← nombre de la especialidad
        appointmentInit: c.appointment?.appoint_init ?? null,
        appointmentFinish: c.appointment?.appoint_finish ?? null,
      };
    });

    return res.status(200).json({ consultations });
  } catch (error: any) {
    console.error("Error al obtener historial de consultas:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
      details: error?.message || String(error),
    });
  }
};
