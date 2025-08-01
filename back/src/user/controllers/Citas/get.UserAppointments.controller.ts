import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUserAppointments = async (
  req: Request & { userId?: number },
  res: Response
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "No autenticado. El ID de usuario no fue proporcionado." });
    }

    // Obtener información del usuario y sus citas
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: {
        Paciente: {
          include: {
            Appointments: {
              include: {
                Specialist: {
                  include: {
                    User: true,
                    SpecialistHasSpecialty: {
                      include: {
                        Specialty: true
                      }
                    }
                  }
                },
                Specialty: true
              },
              orderBy: {
                appoint_init: 'asc'
              }
            }
          }
        }
      }
    });

    if (!user || !user.Paciente || user.Paciente.length === 0) {
      return res.status(404).json({ error: "Paciente no encontrado." });
    }

    const patient = user.Paciente[0];
    const appointments = patient.Appointments || [];

    // Formatear las citas para el frontend
    const formattedAppointments = appointments.map((appointment) => {
      const specialist = appointment.Specialist;
      const specialty = appointment.Specialty || specialist.SpecialistHasSpecialty[0]?.Specialty;

      return {
        id: appointment.id,
        fecha: appointment.appoint_init.toISOString().split('T')[0], // YYYY-MM-DD
        hora: appointment.appoint_init.toTimeString().slice(0, 5), // HH:MM
        doctor: `${specialist.User.firstname} ${specialist.User.lastname}`,
        especialidad: specialty?.name || 'Sin especialidad',
        estado: appointment.state.toLowerCase(),
        price: specialty?.price || 0,
        linkZoom: appointment.linkZoom,
        fechaFin: appointment.appoint_finish,
        duration: specialty?.duration || 30
      };
    });

    return res.status(200).json({
      message: "Citas obtenidas correctamente",
      appointments: formattedAppointments
    });

  } catch (error: any) {
    console.error("Error al obtener citas del usuario:", error);
    return res.status(500).json({
      error: "Error al obtener las citas del usuario.",
      details: error?.message || error
    });
  }
};
