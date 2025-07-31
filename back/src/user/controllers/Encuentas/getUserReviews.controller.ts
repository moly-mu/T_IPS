import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserReviews = async (
  req: Request & { userId?: number },
  res: Response
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ error: "ID de usuario no proporcionado." });
    }

    const reviews = await prisma.userReview.findMany({
      where: {
        reviewer_id: userId,
      },
      include: {
        reviewed: {
          select: {
            firstname: true,
            second_firstname: true,
            lastname: true,
            second_lastname: true,
            phone: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const filteredReviews = reviews.map((review) => {
      const r = review.reviewed;

      if (!r) return null; // por seguridad

      const fullName = [
        r.firstname,
        r.second_firstname,
        r.lastname,
        r.second_lastname,
      ]
        .filter(Boolean)
        .join(" ");

      return {
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
        reviewedUser: {
          fullName,
          phone: r.phone,
        },
      };
    }).filter(Boolean); // elimina nulos

    res.status(200).json({ reviews: filteredReviews });
  } catch (error) {
    console.error("Error al obtener las reseñas del usuario:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};
