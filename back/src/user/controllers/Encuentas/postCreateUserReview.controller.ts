import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUserReview = async (
  req: Request & { userId?: number },
  res: Response
) => {
  try {
    const userId = req.userId;
    const userCredId = Number(req.headers["x-credential-id"]);
    const userRolId = Number(req.headers["x-role-id"]);

    if (!userId || !userCredId || !userRolId) {
      return res.status(400).json({ error: "Datos de autenticación incompletos." });
    }

    const {
      reviewed_id,
      reviewed_cred_id,
      reviewed_rol_id,
      rating,
      comment,
    } = req.body;

    if (
      !reviewed_id || !reviewed_cred_id || !reviewed_rol_id ||
      typeof rating !== "number"
    ) {
      return res.status(400).json({ error: "Datos incompletos o inválidos para la reseña." });
    }

    // Verificar que no exista una reseña duplicada
    const existingReview = await prisma.userReview.findUnique({
      where: {
        reviewer_id_reviewer_cred_id_reviewer_rol_id_reviewed_id_reviewed_cred_id_reviewed_rol_id: {
          reviewer_id: userId,
          reviewer_cred_id: userCredId,
          reviewer_rol_id: userRolId,
          reviewed_id,
          reviewed_cred_id,
          reviewed_rol_id,
        }
      }
    });

    if (existingReview) {
      return res.status(409).json({ error: "Ya has dejado una reseña para este especialista." });
    }

    // Crear la reseña
    const newReview = await prisma.userReview.create({
      data: {
        reviewer_id: userId,
        reviewer_cred_id: userCredId,
        reviewer_rol_id: userRolId,
        reviewed_id,
        reviewed_cred_id,
        reviewed_rol_id,
        rating,
        comment,
      },
    });

    res.status(201).json({ message: "Reseña creada exitosamente.", review: newReview });
  } catch (error) {
    console.error("Error al crear la reseña:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};
