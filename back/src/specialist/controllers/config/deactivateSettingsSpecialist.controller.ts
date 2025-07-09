import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const deactivateAccount = async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { status: "Inactivo" },
    });
    res.json({ message: "Cuenta desactivada" });
  } catch (err) {
    res.status(500).json({ error: "Error al desactivar cuenta", details: err });
  }
};