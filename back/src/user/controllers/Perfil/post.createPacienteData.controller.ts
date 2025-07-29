import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createPatientData = async (
  req: Request & { userId?: number },
  res: Response
) => {
  try {
    const {
      direction = "",
      bloodType = "O_POS", // Ajusta a un valor válido por defecto
      allergies = null,
      emergency_contact = null,
    } = req.body;

    if (!req.userId) {
      return res.status(401).json({ error: "Token inválido o no proporcionado." });
    }

    // Buscar el usuario por ID para obtener todas las claves necesarias
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        credential_users_idcredential_users: true,
        rol_idrol: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Crear PacData
    const newPacData = await prisma.pacData.create({
      data: {
        Direction: direction,
        bloodType,
        allergies,
        emergency_contact,
        medical_history: Buffer.from(""), // Puedes modificar esto si tienes historial real
      },
    });

    // Crear Patient
    const newPatient = await prisma.patient.create({
      data: {
        pac_data_idpac_data: newPacData.id,
        User_idUser: user.id,
        User_credential_users_idcredential_users: user.credential_users_idcredential_users,
        User_rol_idrol: user.rol_idrol,
      },
    });

    return res.status(201).json({
      message: "Paciente creado exitosamente.",
      patient: newPatient,
    });
  } catch (error: any) {
    console.error("Error al crear paciente:", error);
    return res.status(500).json({
      error: "Error al crear datos del paciente.",
      details: error?.message || error,
    });
  }
};
