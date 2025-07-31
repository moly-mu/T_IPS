import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Obtener todos los eventos del calendario para un especialista
export const getCalendarEvents = async (req: Request, res: Response) => {
  const userId = req.userId;
  
  try {
    // Obtener citas programadas del especialista
    const appointments = await prisma.appointment.findMany({
      where: {
        Specialist: {
          User_idUser: userId
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
      }
    });

    // Transformar las citas a formato de eventos del calendario
    const events = appointments.map(appointment => ({
      id: appointment.id,
      title: `Cita - ${appointment.Paciente.User.firstname} ${appointment.Paciente.User.lastname}`,
      date: appointment.appoint_init.toISOString().split('T')[0],
      time: new Date(appointment.appoint_init).toLocaleTimeString('en-US', { 
        hour12: true, 
        hour: 'numeric', 
        minute: '2-digit' 
      }).toLowerCase().replace(' ', ''),
      color: appointment.state === 'confirmada' ? 'green' : 
             appointment.state === 'pendiente' ? 'yellow' : 
             appointment.state === 'cancelada' ? 'red' : 'blue',
      type: 'appointment',
      specialty: appointment.Specialty.name,
      patientName: `${appointment.Paciente.User.firstname} ${appointment.Paciente.User.lastname}`,
      startTime: appointment.appoint_init,
      endTime: appointment.appoint_finish,
      state: appointment.state,
      linkZoom: appointment.linkZoom
    }));

    res.json(events);
  } catch (error) {
    console.error("Error al obtener eventos del calendario:", error);
    res.status(500).json({ 
      error: "Error al obtener eventos del calendario", 
      details: error 
    });
  }
};

// Crear un evento personalizado en el calendario
export const createCalendarEvent = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { title, date, time, color } = req.body;

  if (!title || !date) {
    return res.status(400).json({ 
      error: "Título y fecha son requeridos" 
    });
  }

  try {
    // Por ahora, como no hay tabla específica para eventos personalizados,
    // retornamos el evento creado para que el frontend lo maneje
    // En el futuro se podría crear una tabla 'calendar_events'
    
    const newEvent = {
      id: Date.now(), // ID temporal
      title,
      date,
      time: time || 'all-day',
      color: color || 'blue',
      type: 'custom',
      userId
    };

    res.status(201).json({
      message: "Evento creado exitosamente",
      event: newEvent
    });
  } catch (error) {
    console.error("Error al crear evento:", error);
    res.status(500).json({ 
      error: "Error al crear evento", 
      details: error 
    });
  }
};

// Actualizar un evento personalizado
export const updateCalendarEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, date, time, color } = req.body;

  try {
    // Por ahora retornamos el evento actualizado
    // En el futuro se implementaría con base de datos
    
    const updatedEvent = {
      id: parseInt(id),
      title,
      date,
      time: time || 'all-day',
      color: color || 'blue',
      type: 'custom'
    };

    res.json({
      message: "Evento actualizado exitosamente",
      event: updatedEvent
    });
  } catch (error) {
    console.error("Error al actualizar evento:", error);
    res.status(500).json({ 
      error: "Error al actualizar evento", 
      details: error 
    });
  }
};

// Eliminar un evento personalizado
export const deleteCalendarEvent = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Por ahora solo confirmamos la eliminación
    // En el futuro se implementaría con base de datos
    
    res.json({
      message: "Evento eliminado exitosamente",
      eventId: parseInt(id)
    });
  } catch (error) {
    console.error("Error al eliminar evento:", error);
    res.status(500).json({ 
      error: "Error al eliminar evento", 
      details: error 
    });
  }
};

// Obtener disponibilidad del especialista
export const getSpecialistAvailability = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { date } = req.query;

  try {
    const specialist = await prisma.specialist.findFirst({
      where: {
        User_idUser: userId
      },
      include: {
        SpecialistHasSpecialty: {
          include: {
            Specialty: true
          }
        }
      }
    });

    if (!specialist) {
      return res.status(404).json({ error: "Especialista no encontrado" });
    }

    // Obtener citas del día específico si se proporciona fecha
    let appointments: Array<{
      appoint_init: Date;
      appoint_finish: Date;
      state: string;
    }> = [];
    
    if (date) {
      const targetDate = new Date(date as string);
      const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

      appointments = await prisma.appointment.findMany({
        where: {
          Specialist_idEspecialista: specialist.id,
          appoint_init: {
            gte: startOfDay,
            lte: endOfDay
          }
        },
        select: {
          appoint_init: true,
          appoint_finish: true,
          state: true
        }
      });
    }

    // Horarios típicos de trabajo (esto debería venir de la configuración del especialista)
    const workSchedule = {
      start: '08:00',
      end: '18:00',
      appointments: appointments.map(apt => ({
        start: apt.appoint_init,
        end: apt.appoint_finish,
        state: apt.state
      }))
    };

    res.json(workSchedule);
  } catch (error) {
    console.error("Error al obtener disponibilidad:", error);
    res.status(500).json({ 
      error: "Error al obtener disponibilidad", 
      details: error 
    });
  }
};
