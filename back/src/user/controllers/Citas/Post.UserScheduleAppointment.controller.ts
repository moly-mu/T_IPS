//FaltaHacerlo
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const UserScheduleAppointmentCreate = async (req: Request, res: Response) => {
  const {
    specialistId,
    fecha,  // formato: "2025-07-16"
    hora,   // formato: "14:00"
  } = req.body;

  if (!specialistId || !fecha || !hora) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }

  try {
    const fechaHora = new Date(`${fecha}T${hora}:00`);

    // Verificar si ya existe una cita en ese horario
    const existe = await prisma.appointment.findFirst({
      where: {
        Specialist_idEspecialista: specialistId,
        appoint_init: fechaHora,
      },
    });

    if (existe) {
      return res.status(409).json({ error: "Ese horario ya está reservado." });
    }

    // Crear la cita


    return res.status(201).json({ message: "Cita creada correctamente",  });
  } catch (error) {
    console.error("Error al crear cita:", error);
    return res.status(500).json({ error: "Error interno al crear la cita." });
  }
};
