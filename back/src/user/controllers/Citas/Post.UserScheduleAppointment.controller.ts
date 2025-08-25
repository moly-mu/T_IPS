//Controlador para crear una nueva cita
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import  createZoomMeeting  from "../../../admin/utils/createMeetZoom";
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
    // Log para debug del specialistId recibido
    console.log('specialistId recibido:', specialistId, 'tipo:', typeof specialistId);
    
    //Configuracion para manejar zona horaria UTC
    const [year, month, day] = fecha.split("-").map(Number);
    const [hours, minutes] = hora.split(":").map(Number);

    // Crear fecha y hora de inicio y fin
    const fechaHoraInicio = new Date(Date.UTC(year, month - 1, day, hours, minutes));
    const fechaHoraFin = new Date(fechaHoraInicio.getTime() + duration * 60 * 1000);

    // Verificar si ya existe una cita en ese horario para el especialista
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        Specialist_idEspecialista: parseInt(specialistId),
        appoint_init: fechaHoraInicio,
      },
    });

    if (existingAppointment) {
      return res.status(409).json({ error: "Ese horario ya está reservado." });
    }

    // Log antes de buscar especialista
    console.log('Buscando especialista con ID:', parseInt(specialistId));

    // Obtener información del especialista para validar
    const specialist = await prisma.specialist.findUnique({
      where: { id: parseInt(specialistId) },
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

    console.log('Resultado de búsqueda de especialista:', specialist ? 'Encontrado' : 'No encontrado');

    if (!specialist) {
      // Buscar todos los especialistas para debug
      const allSpecialists = await prisma.specialist.findMany({
        select: { id: true },
        take: 10
      });
      console.log('IDs de especialistas disponibles:', allSpecialists.map(s => s.id));
      return res.status(404).json({ 
        error: "Especialista no encontrado.",
        debug: {
          specialistIdReceived: specialistId,
          specialistIdParsed: parseInt(specialistId),
          availableIds: allSpecialists.map(s => s.id)
        }
      });
    }

    // Obtener información del paciente
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: {
        Paciente: true,
        rol: true,
        credential_users: true
      },
    });

    console.log('Usuario encontrado:', user ? 'Sí' : 'No');
    console.log('ID del usuario:', req.userId);
    console.log('Rol del usuario:', user?.rol?.rol_name);
    console.log('Pacientes asociados:', user?.Paciente?.length || 0);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Si el usuario no tiene un paciente asociado, crearlo
    let patient;
    if (!user.Paciente || user.Paciente.length === 0) {
      console.log('Creando registro de paciente para el usuario...');
      
      // Primero crear PacData por defecto
      const pacData = await prisma.pacData.create({
        data: {
          medical_history: Buffer.from('Historia médica inicial'),
          Direction: 'Dirección pendiente de actualizar',
          bloodType: 'O_POS', // Valor por defecto
          allergies: null,
          emergency_contact: null,
          eps_type: 'Ninguna',
          profession: null,
          ethnicgroup: null
        }
      });

      // Crear el registro de paciente
      patient = await prisma.patient.create({
        data: {
          pac_data_idpac_data: pacData.id,
          User_idUser: user.id,
          User_credential_users_idcredential_users: user.credential_users_idcredential_users,
          User_rol_idrol: user.rol_idrol,
        },
      });

      console.log('Paciente creado con ID:', patient.id);
    } else {
      patient = user.Paciente[0];
      console.log('Paciente existente con ID:', patient.id);
    }

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
        linkZoom: await createZoomMeeting(),
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
