import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSpecDataByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const specialist = await prisma.specialist.findFirst({
      where: {
        User_idUser: userId,
      },
      include: {
        spec_data: true,
      },
    });

    if (!specialist) {
      return res.status(404).json({ message: "Especialista no encontrado" });
    }

    return res.json(specialist.spec_data);
  } catch (error) {
    console.error("❌ Error al obtener datos del especialista:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};