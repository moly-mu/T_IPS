import {PrismaClient} from "@prisma/client";
import { Request, Response } from "express";

const prisma= new PrismaClient;

export const updateProfile = async (req: Request, res: Response) => {
  const userId = req.userId;
  console.log("📌 userId recibido en el controlador:", userId); //! Eliminar log
  if (!userId) { //! Eliminar control de flujo 
    res.status(400).json({ message: "Falta userId, posible error en token o middleware" });
    return;
  }
  const {
    firstname,
    lastname,
    age,
    gender,
    sex,
    languaje,
    document_type,
    phone,
  } = req.body;

  try {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        firstname,
        lastname,
        age,
        gender,
        sex,
        languaje,
        document_type,
        phone,
      },
    });
    res.json({ message: "Perfil actualizado", user: updated });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar perfil", details: err });
  }
};