import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUserReviewPostAppointment = async (
  req: Request & { userId?: number; userCredId?: number; userRolId?: number },
  res: Response
) => {
  try {
    const userId = req.userId;
    const userCredId = req.userCredId;
    const userRolId = req.userRolId;

    if (!userId || !userCredId || !userRolId) {
      return res.status(400).json({ error: "Datos de usuario no proporcionados." });
    }

    const { appointmentId, q1, q2, q3, q4, comment } = req.body;

    if (!appointmentId) {
      return res.status(400).json({ error: "ID de cita es requerido." });
    }

    const calificaciones = [q1, q2, q3, q4].map(Number);
    if (calificaciones.some(c => isNaN(c) || c < 1 || c > 5)) {
      return res.status(400).json({ error: "Todas las calificaciones deben estar entre 1 y 5." });
    }

    const rating = parseFloat(
      (calificaciones.reduce((acc, val) => acc + val, 0) / calificaciones.length).toFixed(2)
    );

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      select: {
        appoint_init: true, // 👈 Fecha/hora de la cita
        state: true,
        Paciente_User_idUser: true,
        Paciente_User_credential_users_idcredential_users: true,
        Paciente_User_rol_idrol: true,
        Specialist_User_idUser: true,
        Specialist_User_credential_users_idcredential_users: true,
        Specialist_User_rol_idrol: true,
        Specialist: {
          include: { User: true }
        },
        Paciente: true
      }
    });

    if (!appointment) {
      return res.status(404).json({ error: "Cita no encontrada." });
    }

    if (appointment.state !== "Completada") {
      return res.status(400).json({ error: "Solo puedes reseñar citas que han sido completadas." });
    }

    if (
      appointment.Paciente_User_idUser !== userId ||
      appointment.Paciente_User_credential_users_idcredential_users !== userCredId ||
      appointment.Paciente_User_rol_idrol !== userRolId
    ) {
      return res.status(403).json({ error: "Solo puedes reseñar tus propias citas." });
    }

    const existingReview = await prisma.userReview.findUnique({
      where: { appointmentId }
    });

    if (existingReview) {
      return res.status(409).json({ error: "Esta cita ya tiene una reseña." });
    }

    const newReview = await prisma.userReview.create({
      data: {
        appointmentId,
        reviewer_id: userId,
        reviewer_cred_id: userCredId,
        reviewer_rol_id: userRolId,
        reviewed_id: appointment.Specialist_User_idUser,
        reviewed_cred_id: appointment.Specialist_User_credential_users_idcredential_users,
        reviewed_rol_id: appointment.Specialist_User_rol_idrol,
        rating,
        comment: comment || null
      },
      include: {
        reviewed: {
          select: {
            firstname: true,
            second_firstname: true,
            lastname: true,
            second_lastname: true,
            phone: true
          }
        }
      }
    });

    const reviewedUser = newReview.reviewed;
    const fullName = [
      reviewedUser.firstname,
      reviewedUser.second_firstname,
      reviewedUser.lastname,
      reviewedUser.second_lastname
    ].filter(Boolean).join(" ");

    const formattedReview = {
      id: newReview.id,
      rating: newReview.rating,
      comment: newReview.comment,
      createdAt: newReview.createdAt,
      appointmentDate: appointment.appoint_init, // 👈 Aquí devolvemos la fecha
      reviewedSpecialist: {
        fullName,
        phone: reviewedUser.phone
      }
    };

    res.status(201).json({
      message: "Reseña creada exitosamente",
      review: formattedReview
    });

  } catch (error) {
    console.error("Error al crear la reseña:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};