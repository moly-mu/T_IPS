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

    // Buscar historia médica del paciente con especialistas
    const medicalHistory = await prisma.medicalHistory.findFirst({
      where: {
        patient_idPaciente: patient.id,
      },
      include: {
        consultations: {
          orderBy: { startTime: "desc" },
          include: {
            specialist: {
              include: {
                User: {
                  select: {
                    firstname: true,
                    lastname: true,
                  },
                },
                SpecialistHasSpecialty: {
                  include: {
                    Specialty: {
                      select: {
                        name: true,
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

    // Formatear los datos con información real del especialista
    const consultationsWithDoctors = medicalHistory.consultations.map((consultation) => {
      let doctorName = "Dr. Sin asignar";
      let specialtyName = "Consulta General";

      if (consultation.specialist) {
        const { User, SpecialistHasSpecialty } = consultation.specialist;
        doctorName = `Dr. ${User.firstname} ${User.lastname}`;
        
        if (SpecialistHasSpecialty.length > 0) {
          specialtyName = SpecialistHasSpecialty[0].Specialty.name;
        }
      }

      return {
        id: consultation.id,
        startTime: consultation.startTime,
        endTime: consultation.endTime,
        reason: consultation.reason,
        medicalNote: consultation.medicalNote,
        vitalSigns: consultation.vitalSigns,
        consultationMode: consultation.consultationMode,
        location: consultation.location,
        summary: consultation.summary,
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