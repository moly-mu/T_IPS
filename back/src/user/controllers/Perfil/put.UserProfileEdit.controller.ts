import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const updateUserProfile = async (
  req: Request & { userId?: number },
  res: Response
) => {
  try {
    const {
      firstname,
      second_firstname,
      lastname,
      second_lastname,
      birthdate,
      gender,
      sex,
      language,
      document_type,
      phone,
      Direction,
      bloodType,
      allergies,
      emergency_contact,
      eps_type,
      profession,
      ethnic_group
    } = req.body;

    if (!req.userId) {
      return res.status(401).json({ error: "No autenticado. El ID de usuario no fue proporcionado." });
    }

    // Validación de fecha
    if (birthdate && isNaN(Date.parse(birthdate))) {
      return res.status(400).json({ error: "Fecha de nacimiento inválida. Usa formato ISO 8601 (YYYY-MM-DD)." });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: {
        Paciente: {
          include: {
            pac_data: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado en la base de datos." });
    }

    const patient = user.Paciente?.[0];
    if (!patient || !patient.pac_data) {
      return res.status(404).json({ error: "Datos del paciente no encontrados." });
    }

    const userData = {
      firstname,
      second_firstname,
      lastname,
      second_lastname,
      birthdate: birthdate ? new Date(birthdate) : undefined,
      gender,
      sex,
      language,
      document_type,
      phone
    };

    const pacData = {
      Direction,
      bloodType,
      allergies,
      emergency_contact,
      eps_type,
      profession,
      ethnicgroup: ethnic_group
    };

    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: Object.fromEntries(
        Object.entries(userData).filter(([_, v]) => v !== undefined)
      ),
      select: {
        id: true,
        firstname: true,
        second_firstname: true,
        lastname: true,
        second_lastname: true,
        birthdate: true,
        gender: true,
        sex: true,
        language: true,
        document_type: true,
        phone: true
      }
    });

    const updatedPacData = await prisma.pacData.update({
      where: { id: patient.pac_data.id },
      data: Object.fromEntries(
        Object.entries(pacData).filter(([_, v]) => v !== undefined)
      ),
      select: {
        id: true,
        Direction: true,
        bloodType: true,
        allergies: true,
        emergency_contact: true,
        eps_type: true,
        profession: true,
        ethnicgroup: true
      }
    });

    // Eliminar los IDs antes de enviar la respuesta
    const { id: _userId, ...sanitizedUser } = updatedUser;
    const { id: _pacDataId, ...sanitizedPacData } = updatedPacData;

    return res.status(200).json({
      message: "Perfil actualizado correctamente.",
      updatedFields: {
        user: sanitizedUser,
        pac_data: sanitizedPacData
      }
    });

  } catch (error: any) {
    console.error("Error al actualizar perfil:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(500).json({
        error: "Error de base de datos.",
        code: error.code,
        message: error.message
      });
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({
        error: "Error de validación de datos.",
        message: error.message
      });
    }

    return res.status(500).json({
      error: "Error al actualizar perfil.",
      details: error?.message || error
    });
  }
};
