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

    // Buscar paciente vinculado al userId
    const patient = await prisma.patient.findFirst({
      where: { User_idUser: userId },
    });

    if (!patient) {
      return res.status(404).json({ error: "No se encontró información del paciente." });
    }

    // Buscar historia médica del paciente
    const medicalHistory = await prisma.medicalHistory.findFirst({
      where: {
        patient_idPaciente: patient.id,
      },
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
          },
        },
      },
    });

    if (!medicalHistory) {
      return res.status(404).json({ error: "No se encontró historial médico." });
    }

    // Obtener un especialista por defecto
    const defaultSpecialist = await prisma.specialist.findFirst({
      include: {
        User: true,
        SpecialistHasSpecialty: {
          include: {
            Specialty: true,
          },
        },
      },
    });

    // Agregar información del doctor a cada consulta
    const consultationsWithDoctors = medicalHistory.consultations.map((consultation) => {
      let doctorName = "Dr. Pendiente";
      let specialtyName = "Consulta General";

      if (defaultSpecialist) {
        doctorName = `Dr. ${defaultSpecialist.User.firstname} ${defaultSpecialist.User.lastname}`;
        if (defaultSpecialist.SpecialistHasSpecialty.length > 0) {
          specialtyName = defaultSpecialist.SpecialistHasSpecialty[0].Specialty.name;
        }
      }

      return {
        ...consultation,
        doctorName,
        specialtyName,
      };
    });

    console.log(`📋 Enviando ${consultationsWithDoctors.length} consulta(s) con doctor: ${consultationsWithDoctors[0]?.doctorName || 'N/A'}`);

    return res.status(200).json({ consultations: consultationsWithDoctors });
  } catch (error: any) {
    console.error("Error al obtener historial de consultas:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
      details: error?.message || error,
    });
  }
};