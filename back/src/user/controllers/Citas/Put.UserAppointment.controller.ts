import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const UsercancelAppointment = async (
  req: Request & { userId?: number },
  res: Response
) => {
  const { appointmentId } = req.body; // ahora lo leemos del body

  if (!appointmentId) {
    return res.status(400).json({ error: "El ID de la cita es requerido." });
  }

  try {
    // Buscar la cita
    const appointment = await prisma.appointment.findUnique({
      where: { id: Number(appointmentId) },
      include: {
        Specialist: {
          include: {
            User: true,
            SpecialistHasSpecialty: {
              include: { Specialty: true }
            }
          }
        },
        Paciente: true
      }
    });

    if (!appointment) {
      return res.status(404).json({ error: "Cita no encontrada." });
    }

    // Actualizar el estado a "Cancelada"
    const updatedAppointment = await prisma.appointment.update({
      where: { id: Number(appointmentId) },
      data: { state: "Cancelada" }
    });

    // Obtener la primera especialidad del especialista
    const specialty = appointment.Specialist?.SpecialistHasSpecialty[0]?.Specialty?.name || null;

    // Formatear la respuesta
    const responseData = {
      id: updatedAppointment.id,
      fecha: updatedAppointment.appoint_init,
      horaInicio: updatedAppointment.appoint_init,
      horaFin: updatedAppointment.appoint_finish,
      estado: updatedAppointment.state,
      especialista: appointment.Specialist
        ? `${appointment.Specialist.User.firstname} ${appointment.Specialist.User.lastname}`
        : null,
      especialidad: specialty,
      paciente: appointment.Paciente ? appointment.Paciente.id : null,
      linkZoom: updatedAppointment.linkZoom
    };

    return res.status(200).json({
      message: "Cita cancelada correctamente",
      appointment: responseData
    });

  } catch (error: any) {
    console.error("Error al cancelar la cita:", error);
    return res.status(500).json({
      error: "Error interno al cancelar la cita.",
      details: error?.message || error
    });
  }
};
