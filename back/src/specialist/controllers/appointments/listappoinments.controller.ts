import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAppointments = async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        Paciente_User_idUser: userId,
      },
      include: {
        Specialist: {
          include: {
            User: true, // incluye los datos del profesional
          },
        },
        Specialty: true, // incluye la especialidad directamente de Appointment
      },
    });

    const formatted = appointments.map((appointment) => ({
      fecha: appointment.appoint_init.toISOString().split("T")[0],
      hora: appointment.appoint_init.toISOString().split("T")[1].substring(0, 5),
      especialidad: appointment.Specialty?.name || "No asignada",
      profesional: appointment.Specialist?.User ? `${appointment.Specialist.User.firstname} ${appointment.Specialist.User.lastname}`: "Sin nombre",
      estado: appointment.state,
      reprogramar: true,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Error al obtener las citas:", error);
    res.status(500).json({
      message: "Error al obtener las citas del paciente",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
