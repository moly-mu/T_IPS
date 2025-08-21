//Controlador para crear una nueva cita
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const UserScheduleAppointmentCreate = async (
  req: Request & { userId?: number },
  res: Response
) => {
  const {
    specialistId,
    fecha,  // formato: "2025-07-16"
    hora,   // formato: "14:00"
    specialtyId,
    duration = 30 // duración en minutos, por defecto 30
  } = req.body;

  if (!req.userId) {
    return res.status(401).json({ error: "No autenticado. El ID de usuario no fue proporcionado." });
  }

  if (!specialistId || !fecha || !hora) {
    return res.status(400).json({ error: "Faltan campos obligatorios: specialistId, fecha, hora." });
  }

  try {
    //Configuracion para manejar zona horaria UTC
    const [year, month, day] = fecha.split("-").map(Number);
    const [hours, minutes] = hora.split(":").map(Number);

    // Crear fecha y hora de inicio y fin
    const fechaHoraInicio = new Date(Date.UTC(year, month - 1, day, hours, minutes));
    const fechaHoraFin = new Date(fechaHoraInicio.getTime() + duration * 60 * 1000);

    // Verificar si ya existe una cita en ese horario para el especialista
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        Specialist_idEspecialista: specialistId,
        appoint_init: fechaHoraInicio,
      },
    });

    if (existingAppointment) {
      return res.status(409).json({ error: "Ese horario ya está reservado." });
    }

    // Obtener información del especialista para validar
    const specialist = await prisma.specialist.findUnique({
      where: { id: specialistId },
      include: {
        User: true,
        spec_data: true,
        SpecialistHasSpecialty: {
          include: {
            Specialty: true
          }
        }
      },
    });

    if (!specialist) {
      return res.status(404).json({ error: "Especialista no encontrado." });
    }

    // Obtener información del paciente
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: {
        Paciente: true
      },
    });

    if (!user || !user.Paciente || user.Paciente.length === 0) {
      return res.status(404).json({ error: "Paciente no encontrado." });
    }

    const patient = user.Paciente[0];

    // Obtener la especialidad (usar la proporcionada o la primera del especialista)
    const specialty = specialtyId 
      ? await prisma.specialty.findUnique({ where: { id: specialtyId } })
      : specialist.SpecialistHasSpecialty[0]?.Specialty;

    if (!specialty) {
      return res.status(404).json({ error: "Especialidad no encontrada." });
    }

    // Crear la cita
    const newAppointment = await prisma.appointment.create({
      data: {
        state: "Pendiente",
        appoint_specialtyId: specialty.id,
        appoint_init: fechaHoraInicio,
        appoint_finish: fechaHoraFin,
        linkZoom: `https://zoom.us/j/${Date.now()}`, // Generar link único
        // Datos del paciente
        Paciente_idPaciente: patient.id,
        Paciente_pac_data_idpac_data: patient.pac_data_idpac_data,
        Paciente_User_idUser: patient.User_idUser,
        Paciente_User_credential_users_idcredential_users: patient.User_credential_users_idcredential_users,
        Paciente_User_rol_idrol: patient.User_rol_idrol,
        // Datos del especialista
        Specialist_idEspecialista: specialist.id,
        Specialist_spec_data_idspec_data: specialist.spec_data_idspec_data,
        Specialist_User_idUser: specialist.User_idUser,
        Specialist_User_credential_users_idcredential_users: specialist.User_credential_users_idcredential_users,
        Specialist_User_rol_idrol: specialist.User_rol_idrol,
      },
    });

    return res.status(201).json({ 
      message: "Cita creada correctamente",
      appointment: {
        id: newAppointment.id,
        fecha: fecha,
        hora: hora,
        especialista: `${specialist.User.firstname} ${specialist.User.lastname}`,
        especialidad: specialty.name,
        estado: newAppointment.state,
        linkZoom: newAppointment.linkZoom,
        precio: specialty.price
      }
    });

  } catch (error: any) {
    console.error("Error al crear cita:", error);
    return res.status(500).json({ 
      error: "Error interno al crear la cita.",
      details: error?.message || error
    });
  }
};
