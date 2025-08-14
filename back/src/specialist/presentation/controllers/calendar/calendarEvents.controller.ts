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

    // Obtener eventos personalizados del calendario
    const customEvents = await prisma.calendarEvent.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        date: 'asc'
      }
    });

    // Transformar las citas a formato de eventos del calendario
    const appointmentEvents = appointments.map(appointment => ({
      id: `appointment_${appointment.id}`,
      title: `Cita - ${appointment.Paciente.User.firstname} ${appointment.Paciente.User.lastname}`,
      date: appointment.appoint_init.toISOString().split('T')[0],
      time: new Date(appointment.appoint_init).toLocaleTimeString('en-US', { 
        hour12: true, 
        hour: 'numeric', 
        minute: '2-digit' 
      }).toLowerCase().replace(' ', ''),
      color: appointment.state === 'Confirmada' ? 'green' : 
             appointment.state === 'Pendiente' ? 'yellow' : 
             appointment.state === 'Cancelada' ? 'red' : 'blue',
      type: 'appointment',
      specialty: appointment.Specialty.name,
      patientName: `${appointment.Paciente.User.firstname} ${appointment.Paciente.User.lastname}`,
      startTime: appointment.appoint_init,
      endTime: appointment.appoint_finish,
      state: appointment.state,
      linkZoom: appointment.linkZoom
    }));

    // Transformar eventos personalizados
    const personalEvents = customEvents.map(event => ({
      id: `custom_${event.id}`,
      title: event.title,
      description: event.description,
      date: event.date.toISOString().split('T')[0],
      time: event.time,
      color: event.color,
      type: event.type,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt
    }));

    // Combinar ambos tipos de eventos
    const allEvents = [...appointmentEvents, ...personalEvents];

    res.json(allEvents);
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
  const { title, description, date, time, color, type } = req.body;

  if (!title || !date) {
    return res.status(400).json({ 
      error: "Título y fecha son requeridos" 
    });
  }

  if (!userId) {
    return res.status(401).json({ 
      error: "Usuario no autenticado" 
    });
  }

  try {
    // Crear el evento en la base de datos usando Prisma
    const newEvent = await prisma.calendarEvent.create({
      data: {
        title,
        description: description || null,
        date: new Date(date),
        time: time || 'all-day',
        color: color || '#3B82F6',
        type: type || 'personal',
        userId: userId
      }
    });

    // Transformar la respuesta para el frontend
    const responseEvent = {
      id: `custom_${newEvent.id}`,
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date.toISOString().split('T')[0],
      time: newEvent.time,
      color: newEvent.color,
      type: newEvent.type,
      createdAt: newEvent.createdAt,
      updatedAt: newEvent.updatedAt
    };

    res.status(201).json({
      message: "Evento creado exitosamente",
      event: responseEvent
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
  const userId = req.userId;
  const { title, description, date, time, color, type } = req.body;

  if (!userId) {
    return res.status(401).json({ 
      error: "Usuario no autenticado" 
    });
  }

  // Extraer el ID numérico del evento (quitar el prefijo 'custom_')
  const eventId = id.startsWith('custom_') ? parseInt(id.replace('custom_', '')) : parseInt(id);

  if (isNaN(eventId)) {
    return res.status(400).json({ 
      error: "ID de evento inválido" 
    });
  }

  try {
    // Verificar que el evento existe y pertenece al usuario
    const existingEvent = await prisma.calendarEvent.findFirst({
      where: {
        id: eventId,
        userId: userId
      }
    });

    if (!existingEvent) {
      return res.status(404).json({ 
        error: "Evento no encontrado o no autorizado" 
      });
    }

    // Actualizar el evento
    const updatedEvent = await prisma.calendarEvent.update({
      where: {
        id: eventId
      },
      data: {
        title: title || existingEvent.title,
        description: description !== undefined ? description : existingEvent.description,
        date: date ? new Date(date) : existingEvent.date,
        time: time || existingEvent.time,
        color: color || existingEvent.color,
        type: type || existingEvent.type
      }
    });

    // Transformar la respuesta para el frontend
    const responseEvent = {
      id: `custom_${updatedEvent.id}`,
      title: updatedEvent.title,
      description: updatedEvent.description,
      date: updatedEvent.date.toISOString().split('T')[0],
      time: updatedEvent.time,
      color: updatedEvent.color,
      type: updatedEvent.type,
      createdAt: updatedEvent.createdAt,
      updatedAt: updatedEvent.updatedAt
    };

    res.json({
      message: "Evento actualizado exitosamente",
      event: responseEvent
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
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ 
      error: "Usuario no autenticado" 
    });
  }

  // Extraer el ID numérico del evento (quitar el prefijo 'custom_')
  const eventId = id.startsWith('custom_') ? parseInt(id.replace('custom_', '')) : parseInt(id);

  if (isNaN(eventId)) {
    return res.status(400).json({ 
      error: "ID de evento inválido" 
    });
  }

  try {
    // Verificar que el evento existe y pertenece al usuario
    const existingEvent = await prisma.calendarEvent.findFirst({
      where: {
        id: eventId,
        userId: userId
      }
    });

    if (!existingEvent) {
      return res.status(404).json({ 
        error: "Evento no encontrado o no autorizado" 
      });
    }

    // Eliminar el evento
    await prisma.calendarEvent.delete({
      where: {
        id: eventId
      }
    });

    res.json({
      message: "Evento eliminado exitosamente",
      eventId: `custom_${eventId}`
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
