import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listSpecialistRequests = async (_req: Request, res: Response) => {
  try {
    const requests = await prisma.specialistRequest.findMany({
      where: { status: "Pendiente" },
      include: { user: true },
    });
    res.json(requests);
    return;
  } catch (err) {
    res.status(500).json({ message: "Error listando solicitudes", error: err });
    return;
    }
};