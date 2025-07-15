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
        Profesional: {
          include: {
            User: true,
          },
        },
      },
    });

    const formatted = appointments.map((a) => ({
      fecha: a.appoint_init.toISOString().split('T')[0],
      hora: a.appoint_init.toISOString().split('T')[1].substring(0, 5),
      especialidad: a.Profesional.ProfesionalHasSpecialty[0]?.Specialty?.name || "N/A",
      estado: a.state,
      reprogramar: true,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener citas', details: err });
  }
};