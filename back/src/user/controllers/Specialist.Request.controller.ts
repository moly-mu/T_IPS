import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const requestSpecialist = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { message } = req.body;

    if (!userId){
       res.status(401).json({ message: "No autenticado" });
      return;
    } 

    const existing = await prisma.specialistRequest.findFirst({ where: { userId } });
    if (existing){
      res.status(400).json({ message: "Ya has enviado una solicitud" });
      return;
    } 
    const request = await prisma.specialistRequest.create({
      data: { userId, message }
    });

    res.status(201).json({ message: "Solicitud enviada", request });
  } catch (err) {
    res.status(500).json({ error: "Error al enviar solicitud", details: err });
  }
};
