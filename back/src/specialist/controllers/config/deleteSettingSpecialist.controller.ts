import { PrismaClient } from "@prisma/client";
import {Request,Response} from "express";

const prisma = new PrismaClient();

export const deleteAccount = async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    res.json({ message: "Cuenta eliminada" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar cuenta", details: err });
  }
};