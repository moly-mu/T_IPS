import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSpecialistRequest = async (req: Request, res: Response) => {
  const userId = req.userId; // Inyectado por middleware verifyToken
  const { message } = req.body;

  try {
    const existing = await prisma.specialistRequest.findFirst({
      where: {
        userId,
        status: "pendiente"
      }
    });

    if (existing){
        res.status(400).json({ message: "Ya existe una solicitud pendiente" });
        return;
    } 
    const request = await prisma.specialistRequest.create({
      data: {
        userId,
        message,
      }
    });
    res.status(201).json(request);
    return;
  } catch (err) {
    res.status(500).json({ message: "Error creando solicitud", error: err });
    return;
    }
};