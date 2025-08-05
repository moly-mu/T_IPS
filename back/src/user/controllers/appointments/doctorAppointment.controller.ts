import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener detalles de una cita específica
export const getAppointmentDetails = async (
  req: Request & { userId?: number },
  res: Response
) => {
  try {
    const { appointmentId } = req.params;
    
    console.log('=== DEBUG INFO ===');
    console.log('User ID from token:', req.userId);
    console.log('Appointment ID requested:', appointmentId);
    console.log('Full req.params:', req.params);
    console.log('Full req.url:', req.url);
    console.log('Request method:', req.method);
    
    if (!req.userId) {
      console.log('ERROR: User ID missing from token');
      return res.status(401).json({ 
        success: false,
        error: "No autenticado. El ID de usuario no fue proporcionado." 
      });
    }

    if (!appointmentId) {
      console.log('ERROR: Appointment ID missing from params');
      return res.status(400).json({ 
        success: false,
        error: "ID de cita requerido." 
      });
    }

    // Validar que appointmentId sea un número válido
    const appointmentIdNum = parseInt(appointmentId);
    if (isNaN(appointmentIdNum)) {
      console.log('ERROR: Appointment ID is not a valid number:', appointmentId);
      return res.status(400).json({ 
        success: false,
        error: "ID de cita debe ser un número válido." 
      });
    }

    console.log('Parsed appointment ID:', appointmentIdNum);

    // Buscar la cita con todos los datos relacionados
    const appointment = await prisma.appointment.findUnique({
      where: {
        id: appointmentIdNum
      },
      include: {
        Paciente: {
          include: {
            pac_data: true,
            User: {
              include: {
                credential_users: true
              }
            }
          }
        },
        Specialist: {
          include: {
            User: {
              select: {
                firstname: true,
                lastname: true,
                second_firstname: true,
                second_lastname: true
              }
            },
            spec_data: true
          }
        },
        Specialty: true
      }
    });

    console.log('Appointment found:', appointment ? 'Yes' : 'No');
    if (appointment) {
      console.log('Patient User ID:', appointment.Paciente.User_idUser);
      console.log('Specialist User ID:', appointment.Specialist.User_idUser);
    }

    if (!appointment) {
      return res.status(404).json({ 
        success: false,
        error: "Cita no encontrada." 
      });
    }

    // Verificar que el usuario tiene acceso a esta cita (es el paciente o el especialista)
    const isPatient = appointment.Paciente.User_idUser === req.userId;
    const isSpecialist = appointment.Specialist.User_idUser === req.userId;

    // Para desarrollo: permitir acceso si es un ID de prueba (1) o si el usuario está autenticado
    const isTestAppointment = parseInt(appointmentId) === 1;
    
    if (!isPatient && !isSpecialist && !isTestAppointment) {
      return res.status(403).json({ 
        success: false,
        error: "No tienes permisos para acceder a esta cita." 
      });
    }

    // Calcular edad del paciente
    const calculateAge = (birthdate: Date) => {
      const today = new Date();
      const birth = new Date(birthdate);
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      return age;
    };

    // Formatear fecha y hora
    const formatDate = (date: Date) => {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      return date.toLocaleDateString('es-ES', options);
    };

    const formatTime = (date: Date) => {
      return date.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    };

    // Construir respuesta
    const patientData = {
      nombre: `${appointment.Paciente.User.firstname} ${appointment.Paciente.User.second_firstname || ''} ${appointment.Paciente.User.lastname} ${appointment.Paciente.User.second_lastname || ''}`.trim(),
      edad: `${calculateAge(appointment.Paciente.User.birthdate)} años`,
      identificacion: appointment.Paciente.User.credential_users.document?.toString() || 'N/A',
      telefono: appointment.Paciente.User.phone || 'No registrado',
      email: appointment.Paciente.User.credential_users.email,
      direccion: appointment.Paciente.pac_data.Direction || 'No registrada',
      especialidad: appointment.Specialty.name,
      fecha: formatDate(appointment.appoint_init),
      hora: formatTime(appointment.appoint_init),
      historialMedico: appointment.Paciente.pac_data.allergies || 'Sin antecedentes registrados',
      estado: appointment.state,
      linkZoom: appointment.linkZoom,
      especialista: `${appointment.Specialist.User.firstname} ${appointment.Specialist.User.lastname}`,
      duracion: appointment.Specialty.duration || 30,
      precio: appointment.Specialty.price || 0
    };

    res.status(200).json({
      success: true,
      data: {
        appointmentId: appointment.id,
        patientData,
        isSpecialist,
        isPatient
      }
    });

  } catch (error: any) {
    console.error('Error getting appointment details:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      details: error?.message || error
    });
  }
};

// Iniciar consulta (actualizar estado y generar link de Zoom si no existe)
export const startConsultation = async (
  req: Request & { userId?: number },
  res: Response
) => {
  try {
    const { appointmentId } = req.params;
    
    console.log('Start consultation - User ID:', req.userId);
    console.log('Start consultation - Appointment ID:', appointmentId);
    
    if (!req.userId) {
      return res.status(401).json({ 
        success: false,
        error: "No autenticado." 
      });
    }

    if (!appointmentId) {
      return res.status(400).json({ 
        success: false,
        error: "ID de cita requerido." 
      });
    }

    // Validar que appointmentId sea un número válido
    const appointmentIdNum = parseInt(appointmentId);
    if (isNaN(appointmentIdNum)) {
      return res.status(400).json({ 
        success: false,
        error: "ID de cita debe ser un número válido." 
      });
    }

    // Buscar la cita
    const appointment = await prisma.appointment.findUnique({
      where: {
        id: appointmentIdNum
      },
      include: {
        Specialist: {
          include: {
            User: true
          }
        },
        Paciente: {
          include: {
            User: true
          }
        }
      }
    });

    if (!appointment) {
      return res.status(404).json({ 
        success: false,
        error: "Cita no encontrada." 
      });
    }

    // Verificar que el usuario es el especialista
    if (appointment.Specialist.User_idUser !== req.userId) {
      return res.status(403).json({ 
        success: false,
        error: "Solo el especialista puede iniciar la consulta." 
      });
    }

    // Generar link de Zoom si no existe
    let zoomLink = appointment.linkZoom;
    if (!zoomLink) {
      // Generar un ID de meeting simple (en producción usarías la API de Zoom)
      const meetingId = Date.now().toString().slice(-10);
      zoomLink = `https://zoom.us/j/${meetingId}`;
    }

    // Actualizar la cita
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: appointmentIdNum
      },
      data: {
        state: 'En curso',
        linkZoom: zoomLink
      }
    });

    res.status(200).json({
      success: true,
      message: 'Consulta iniciada exitosamente',
      data: {
        appointmentId: updatedAppointment.id,
        estado: updatedAppointment.state,
        linkZoom: updatedAppointment.linkZoom
      }
    });

  } catch (error: any) {
    console.error('Error starting consultation:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      details: error?.message || error
    });
  }
};

// Finalizar consulta
export const endConsultation = async (
  req: Request & { userId?: number },
  res: Response
) => {
  try {
    const { appointmentId } = req.params;
    
    console.log('End consultation - User ID:', req.userId);
    console.log('End consultation - Appointment ID:', appointmentId);
    
    if (!req.userId) {
      return res.status(401).json({ 
        success: false,
        error: "No autenticado." 
      });
    }

    if (!appointmentId) {
      return res.status(400).json({ 
        success: false,
        error: "ID de cita requerido." 
      });
    }

    // Validar que appointmentId sea un número válido
    const appointmentIdNum = parseInt(appointmentId);
    if (isNaN(appointmentIdNum)) {
      return res.status(400).json({ 
        success: false,
        error: "ID de cita debe ser un número válido." 
      });
    }

    // Buscar la cita
    const appointment = await prisma.appointment.findUnique({
      where: {
        id: appointmentIdNum
      },
      include: {
        Specialist: {
          include: {
            User: true
          }
        }
      }
    });

    if (!appointment) {
      return res.status(404).json({ 
        success: false,
        error: "Cita no encontrada." 
      });
    }

    // Verificar que el usuario es el especialista
    if (appointment.Specialist.User_idUser !== req.userId) {
      return res.status(403).json({ 
        success: false,
        error: "Solo el especialista puede finalizar la consulta." 
      });
    }

    // Actualizar la cita
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: appointmentIdNum
      },
      data: {
        state: 'Completada',
        appoint_finish: new Date()
      }
    });

    res.status(200).json({
      success: true,
      message: 'Consulta finalizada exitosamente',
      data: {
        appointmentId: updatedAppointment.id,
        estado: updatedAppointment.state,
        fechaFinalizacion: updatedAppointment.appoint_finish
      }
    });

  } catch (error: any) {
    console.error('Error ending consultation:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      details: error?.message || error
    });
  }
};

// Obtener próximas citas del especialista/paciente
export const getUpcomingAppointments = async (
  req: Request & { userId?: number },
  res: Response
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ 
        success: false,
        error: "No autenticado." 
      });
    }

    const now = new Date();
    
    // Buscar si es especialista o paciente
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: {
        Especialista: true,
        Paciente: true
      }
    });

    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: "Usuario no encontrado." 
      });
    }

    let appointments;

    if (user.Especialista && user.Especialista.length > 0) {
      // Es especialista
      appointments = await prisma.appointment.findMany({
        where: {
          Specialist_User_idUser: req.userId,
          appoint_init: {
            gte: now
          },
          state: {
            in: ['Confirmada', 'Pendiente']
          }
        },
        include: {
          Paciente: {
            include: {
              User: true
            }
          },
          Specialty: true
        },
        orderBy: {
          appoint_init: 'asc'
        },
        take: 5
      });
    } else if (user.Paciente && user.Paciente.length > 0) {
      // Es paciente
      appointments = await prisma.appointment.findMany({
        where: {
          Paciente_User_idUser: req.userId,
          appoint_init: {
            gte: now
          },
          state: {
            in: ['Confirmada', 'Pendiente']
          }
        },
        include: {
          Specialist: {
            include: {
              User: true
            }
          },
          Specialty: true
        },
        orderBy: {
          appoint_init: 'asc'
        },
        take: 5
      });
    } else {
      return res.status(404).json({ 
        success: false,
        error: "Usuario no es ni especialista ni paciente." 
      });
    }

    const formattedAppointments = appointments.map(apt => {
      let persona = '';
      
      if (user.Especialista && user.Especialista.length > 0) {
        // Si es especialista, mostrar paciente
        if ('Paciente' in apt) {
          persona = `${apt.Paciente.User.firstname} ${apt.Paciente.User.lastname}`;
        }
      } else {
        // Si es paciente, mostrar especialista
        if ('Specialist' in apt) {
          persona = `${apt.Specialist.User.firstname} ${apt.Specialist.User.lastname}`;
        }
      }

      return {
        id: apt.id,
        fecha: apt.appoint_init.toLocaleDateString('es-ES'),
        hora: apt.appoint_init.toLocaleTimeString('es-ES', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        especialidad: apt.Specialty.name,
        estado: apt.state,
        persona,
        linkZoom: apt.linkZoom
      };
    });

    res.status(200).json({
      success: true,
      data: formattedAppointments
    });

  } catch (error: any) {
    console.error('Error getting upcoming appointments:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      details: error?.message || error
    });
  }
};

// Obtener todas las citas (para debugging)
export const getAllAppointments = async (
  req: Request & { userId?: number },
  res: Response
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ 
        success: false,
        error: "No autenticado." 
      });
    }

    const appointments = await prisma.appointment.findMany({
      include: {
        Paciente: {
          include: {
            User: {
              select: {
                id: true,
                firstname: true,
                lastname: true
              }
            }
          }
        },
        Specialist: {
          include: {
            User: {
              select: {
                id: true,
                firstname: true,
                lastname: true
              }
            }
          }
        },
        Specialty: {
          select: {
            name: true
          }
        }
      },
      take: 10,
      orderBy: {
        id: 'asc'
      }
    });

    const formattedAppointments = appointments.map(apt => ({
      id: apt.id,
      pacienteId: apt.Paciente.User_idUser,
      pacienteNombre: `${apt.Paciente.User.firstname} ${apt.Paciente.User.lastname}`,
      especialistaId: apt.Specialist.User_idUser,
      especialistaNombre: `${apt.Specialist.User.firstname} ${apt.Specialist.User.lastname}`,
      especialidad: apt.Specialty.name,
      fecha: apt.appoint_init,
      estado: apt.state
    }));

    res.status(200).json({
      success: true,
      data: formattedAppointments,
      userInfo: {
        userId: req.userId,
        message: 'Lista de todas las citas disponibles para debugging'
      }
    });

  } catch (error: any) {
    console.error('Error getting all appointments:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      details: error?.message || error
    });
  }
};
