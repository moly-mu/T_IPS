import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { number } from "zod";

const prisma = new PrismaClient();

// Obtener todas las citas programadas para un especialista
export const getScheduledAppointments = async (req: Request, res: Response) => {
  const specialistUserId = req.userId; // ID del usuario especialista desde el middleware de auth

  try {
    console.log('Usuario ID recibido:', specialistUserId);
    console.log('Tipo de userId:', typeof specialistUserId);
    
    // Convertir a número si es string
    
    // Debug: Ver todos los especialistas
    const allSpecialists = await prisma.specialist.findMany({
      select: {
        id: true,
        User_idUser: true,
        User: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            credential_users: {
              select: {
                email: true,
                document: true,
              }
            }
          }
        }
      }
    });
    console.log('Especialistas en BD:', JSON.stringify(allSpecialists, null, 2));

    // También busquemos el usuario que está haciendo la petición
    const requestingUser = await prisma.user.findUnique({
      where: {
        id: specialistUserId,
      },
      include: {
        credential_users: {
          select: {
            email: true,
            document: true,
          }
        },
        rol: true,
      }
    });
    console.log('Usuario de la petición:', JSON.stringify(requestingUser, null, 2));

    // Primero obtenemos el registro del especialista
    const specialist = await prisma.specialist.findFirst({
      where: {
        User: {
          id: specialistUserId,
        }
      },
      include: {
        User: {
          include: {
            credential_users: true,
          }
        },
        spec_data: true,
      }
    });

    console.log('Especialista encontrado:', JSON.stringify(specialist, null, 2));

    if (!specialist) {
      return res.status(404).json({
        message: "Especialista no encontrado",
        debug: {
          searchedUserId: specialistUserId,
          originalUserId: specialistUserId,
          requestingUser: requestingUser,
          availableSpecialists: allSpecialists,
          suggestion: "Verifica que el token JWT corresponda a un usuario que sea especialista"
        }
      });
    }

    // Obtenemos todas las citas del especialista
    const appointments = await prisma.appointment.findMany({
      where: {
        Specialist_idEspecialista: specialist.id as number,
      },
      include: {
        Paciente: {
          include: {
            User: {
              include: {
                credential_users: {
                  select: {
                    email: true,
                    document: true,
                  }
                },
              },
            },
            pac_data: true,
          },
        },
        Specialty: true,
      },
      orderBy: [
        { appoint_init: 'asc' },
      ],
    });

    // Formatear los datos para el frontend
    const formattedAppointments = appointments.map((appointment) => ({
      id: appointment.id,
      patientName: `${appointment.Paciente.User.firstname} ${appointment.Paciente.User.lastname}`,
      date: appointment.appoint_init.toISOString().split('T')[0],
      time: appointment.appoint_init.toTimeString().substring(0, 5),
      confirmed: appointment.state.toLowerCase() === 'confirmada',
      specialty: appointment.Specialty.name,
      appointmentState: appointment.state,
      linkZoom: appointment.linkZoom,
      patientDetails: {
        age: appointment.Paciente.User.birthdate ? 
          new Date().getFullYear() - new Date(appointment.Paciente.User.birthdate).getFullYear() : 0,
        phone: appointment.Paciente.User.phone,
        email: appointment.Paciente.User.credential_users?.email || '',
        address: appointment.Paciente.pac_data.Direction,
        identification: appointment.Paciente.User.credential_users?.document?.toString() || '',
        bloodType: appointment.Paciente.pac_data.bloodType,
        allergies: appointment.Paciente.pac_data.allergies,
        emergencyContact: appointment.Paciente.pac_data.emergency_contact,
        eps: appointment.Paciente.pac_data.eps_type,
        profession: appointment.Paciente.pac_data.profession,
        ethnicgroup: appointment.Paciente.pac_data.ethnicgroup,
      },
    }));

    // Estadísticas para el dashboard
    const stats = {
      total: appointments.length,
      confirmed: appointments.filter(apt => apt.state.toLowerCase() === 'confirmada').length,
      pending: appointments.filter(apt => apt.state.toLowerCase() === 'pendiente').length,
      cancelled: appointments.filter(apt => apt.state.toLowerCase() === 'cancelada').length,
    };

    res.status(200).json({
      appointments: formattedAppointments,
      stats,
    });

  } catch (error) {
    console.error("Error al obtener las citas programadas:", error);
    res.status(500).json({
      message: "Error al obtener las citas programadas",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Confirmar una cita
export const confirmAppointment = async (req: Request, res: Response) => {
  const { appointmentId } = req.params;
  const specialistUserId = req.userId;

  try {
    // Convertir a número si es string
    const numericUserId = typeof specialistUserId === 'string' ? parseInt(specialistUserId) : specialistUserId;
    
    // Verificar que la cita pertenece al especialista
    const specialist = await prisma.specialist.findFirst({
      where: {
        User: {
          id: numericUserId,
        }
      },
    });

    if (!specialist) {
      return res.status(404).json({
        message: "Especialista no encontrado",
      });
    }

    const appointment = await prisma.appointment.findFirst({
      where: {
        id: parseInt(appointmentId),
        Specialist_idEspecialista: specialist.id,
      },
    });

    if (!appointment) {
      return res.status(404).json({
        message: "Cita no encontrada o no pertenece al especialista",
      });
    }

    // Actualizar el estado de la cita
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: parseInt(appointmentId),
      },
      data: {
        state: "Confirmada",
      },
      include: {
        Paciente: {
          include: {
            User: true,
          },
        },
        Specialty: true,
      },
    });

    res.status(200).json({
      message: "Cita confirmada exitosamente",
      appointment: {
        id: updatedAppointment.id,
        patientName: `${updatedAppointment.Paciente.User.firstname} ${updatedAppointment.Paciente.User.lastname}`,
        date: updatedAppointment.appoint_init.toISOString().split('T')[0],
        time: updatedAppointment.appoint_init.toTimeString().substring(0, 5),
        specialty: updatedAppointment.Specialty.name,
        state: updatedAppointment.state,
      },
    });

  } catch (error) {
    console.error("Error al confirmar la cita:", error);
    res.status(500).json({
      message: "Error al confirmar la cita",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Reprogramar una cita
export const rescheduleAppointment = async (req: Request, res: Response) => {
  const { appointmentId } = req.params;
  const { newDate, newTime } = req.body;
  const specialistUserId = req.userId;

  try {
    // Convertir a número si es string
    const numericUserId = typeof specialistUserId === 'string' ? parseInt(specialistUserId) : specialistUserId;
    
    // Verificar que la cita pertenece al especialista
    const specialist = await prisma.specialist.findFirst({
      where: {
        User_idUser: numericUserId,
      },
    });

    if (!specialist) {
      return res.status(404).json({
        message: "Especialista no encontrado",
      });
    }

    const appointment = await prisma.appointment.findFirst({
      where: {
        id: parseInt(appointmentId),
        Specialist_idEspecialista: specialist.id,
      },
    });

    if (!appointment) {
      return res.status(404).json({
        message: "Cita no encontrada o no pertenece al especialista",
      });
    }

    // Crear la nueva fecha y hora
    const newDateTime = new Date(`${newDate}T${newTime}:00`);
    const newEndTime = new Date(newDateTime.getTime() + 30 * 60000); // Agregar 30 minutos

    // Actualizar la cita
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: parseInt(appointmentId),
      },
      data: {
        appoint_init: newDateTime,
        appoint_finish: newEndTime,
        state: "Reagendada",
      },
      include: {
        Paciente: {
          include: {
            User: true,
          },
        },
        Specialty: true,
      },
    });

    res.status(200).json({
      message: "Cita reprogramada exitosamente",
      appointment: {
        id: updatedAppointment.id,
        patientName: `${updatedAppointment.Paciente.User.firstname} ${updatedAppointment.Paciente.User.lastname}`,
        date: updatedAppointment.appoint_init.toISOString().split('T')[0],
        time: updatedAppointment.appoint_init.toTimeString().substring(0, 5),
        specialty: updatedAppointment.Specialty.name,
        state: updatedAppointment.state,
      },
    });

  } catch (error) {
    console.error("Error al reprogramar la cita:", error);
    res.status(500).json({
      message: "Error al reprogramar la cita",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Cancelar una cita
export const cancelAppointment = async (req: Request, res: Response) => {
  const { appointmentId } = req.params;
  const { reason } = req.body;
  const specialistUserId = req.userId;

  try {
    // Convertir a número si es string
    const numericUserId = typeof specialistUserId === 'string' ? parseInt(specialistUserId) : specialistUserId;
    
    // Verificar que la cita pertenece al especialista
    const specialist = await prisma.specialist.findFirst({
      where: {
        User_idUser: numericUserId,
      },
    });

    if (!specialist) {
      return res.status(404).json({
        message: "Especialista no encontrado",
      });
    }

    const appointment = await prisma.appointment.findFirst({
      where: {
        id: parseInt(appointmentId),
        Specialist_idEspecialista: specialist.id,
      },
    });

    if (!appointment) {
      return res.status(404).json({
        message: "Cita no encontrada o no pertenece al especialista",
      });
    }

    // Actualizar el estado de la cita
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: parseInt(appointmentId),
      },
      data: {
        state: "Cancelada",
      },
      include: {
        Paciente: {
          include: {
            User: true,
          },
        },
        Specialty: true,
      },
    });

    res.status(200).json({
      message: "Cita cancelada exitosamente",
      appointment: {
        id: updatedAppointment.id,
        patientName: `${updatedAppointment.Paciente.User.firstname} ${updatedAppointment.Paciente.User.lastname}`,
        date: updatedAppointment.appoint_init.toISOString().split('T')[0],
        time: updatedAppointment.appoint_init.toTimeString().substring(0, 5),
        specialty: updatedAppointment.Specialty.name,
        state: updatedAppointment.state,
      },
      reason,
    });

  } catch (error) {
    console.error("Error al cancelar la cita:", error);
    res.status(500).json({
      message: "Error al cancelar la cita",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Crear una nueva cita
export const createAppointment = async (req: Request, res: Response) => {
  const {
    patientId,
    specialtyId,
    appointmentDate,
    appointmentTime,
    linkZoom,
  } = req.body;
  const specialistUserId = req.userId;

  try {
    // Convertir a número si es string
    const numericUserId = typeof specialistUserId === 'string' ? parseInt(specialistUserId) : specialistUserId;
    
    // Verificar que el especialista existe
    const specialist = await prisma.specialist.findFirst({
      where: {
        User_idUser: numericUserId,
      },
    });

    if (!specialist) {
      return res.status(404).json({
        message: "Especialista no encontrado",
      });
    }

    // Verificar que el paciente existe
    const patient = await prisma.patient.findFirst({
      where: {
        id: parseInt(patientId),
      },
    });

    if (!patient) {
      return res.status(404).json({
        message: "Paciente no encontrado",
      });
    }

    // Crear la fecha y hora de la cita
    const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}:00`);
    const appointmentEndTime = new Date(appointmentDateTime.getTime() + 30 * 60000); // 30 minutos después

    // Crear la nueva cita
    const newAppointment = await prisma.appointment.create({
      data: {
        state: "Pendiente",
        appoint_specialtyId: parseInt(specialtyId),
        Paciente_idPaciente: patient.id,
        Paciente_pac_data_idpac_data: patient.pac_data_idpac_data,
        Paciente_User_idUser: patient.User_idUser,
        Paciente_User_credential_users_idcredential_users: patient.User_credential_users_idcredential_users,
        Paciente_User_rol_idrol: patient.User_rol_idrol,
        Specialist_idEspecialista: specialist.id,
        Specialist_spec_data_idspec_data: specialist.spec_data_idspec_data,
        Specialist_User_idUser: specialist.User_idUser,
        Specialist_User_credential_users_idcredential_users: specialist.User_credential_users_idcredential_users,
        Specialist_User_rol_idrol: specialist.User_rol_idrol,
        appoint_init: appointmentDateTime,
        appoint_finish: appointmentEndTime,
        linkZoom: linkZoom || null,
      },
      include: {
        Paciente: {
          include: {
            User: true,
          },
        },
        Specialty: true,
      },
    });

    res.status(201).json({
      message: "Cita creada exitosamente",
      appointment: {
        id: newAppointment.id,
        patientName: `${newAppointment.Paciente.User.firstname} ${newAppointment.Paciente.User.lastname}`,
        date: newAppointment.appoint_init.toISOString().split('T')[0],
        time: newAppointment.appoint_init.toTimeString().substring(0, 5),
        specialty: newAppointment.Specialty.name,
        state: newAppointment.state,
        linkZoom: newAppointment.linkZoom,
      },
    });

  } catch (error) {
    console.error("Error al crear la cita:", error);
    res.status(500).json({
      message: "Error al crear la cita",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Obtener detalles específicos de una cita
export const getAppointmentDetails = async (req: Request, res: Response) => {
  const { appointmentId } = req.params;
  const specialistUserId = req.userId;

  try {
    // Convertir a número si es string
    const numericUserId = typeof specialistUserId === 'string' ? parseInt(specialistUserId) : specialistUserId;
    
    // Verificar que la cita pertenece al especialista
    const specialist = await prisma.specialist.findFirst({
      where: {
        User_idUser: numericUserId,
      },
    });

    if (!specialist) {
      return res.status(404).json({
        message: "Especialista no encontrado",
      });
    }

    const appointment = await prisma.appointment.findFirst({
      where: {
        id: parseInt(appointmentId),
        Specialist_idEspecialista: specialist.id,
      },
      include: {
        Paciente: {
          include: {
            User: {
              include: {
                credential_users: {
                  select: {
                    email: true,
                    document: true,
                  }
                },
              },
            },
            pac_data: true,
            MedicalHistories: {
              include: {
                consultations: true,
                diagnoses: true,
                prescriptions: true,
              },
            },
          },
        },
        Specialty: true,
      },
    });

    if (!appointment) {
      return res.status(404).json({
        message: "Cita no encontrada o no pertenece al especialista",
      });
    }

    // Formatear los datos detallados
    const detailedAppointment = {
      id: appointment.id,
      patientName: `${appointment.Paciente.User.firstname} ${appointment.Paciente.User.lastname}`,
      date: appointment.appoint_init.toISOString().split('T')[0],
      time: appointment.appoint_init.toTimeString().substring(0, 5),
      confirmed: appointment.state.toLowerCase() === 'confirmada',
      specialty: appointment.Specialty.name,
      state: appointment.state,
      linkZoom: appointment.linkZoom,
      patientDetails: {
        age: appointment.Paciente.User.birthdate ? 
          new Date().getFullYear() - new Date(appointment.Paciente.User.birthdate).getFullYear() : 0,
        phone: appointment.Paciente.User.phone,
        email: appointment.Paciente.User.credential_users?.email || '',
        address: appointment.Paciente.pac_data.Direction,
        identification: appointment.Paciente.User.credential_users?.document?.toString() || '',
        bloodType: appointment.Paciente.pac_data.bloodType,
        allergies: appointment.Paciente.pac_data.allergies,
        emergencyContact: appointment.Paciente.pac_data.emergency_contact,
        eps: appointment.Paciente.pac_data.eps_type,
        profession: appointment.Paciente.pac_data.profession,
        ethnicgroup: appointment.Paciente.pac_data.ethnicgroup,
        medicalHistory: appointment.Paciente.MedicalHistories.map(history => ({
          id: history.id,
          consultations: history.consultations.length,
          diagnoses: history.diagnoses.length,
          prescriptions: history.prescriptions.length,
        })),
      },
    };

    res.status(200).json(detailedAppointment);

  } catch (error) {
    console.error("Error al obtener los detalles de la cita:", error);
    res.status(500).json({
      message: "Error al obtener los detalles de la cita",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
