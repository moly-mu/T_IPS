import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const updateUserProfile = async (
  req: Request & { userId?: number },
  res: Response
) => {
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
  } = req.body;

  if (!req.userId) {
    return res.status(401).json({ error: "Token inválido o no proporcionado." });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: req.userId },
      include: {
        credential_users: true,
        rol: true,
        Paciente: {
          include: {
            pac_data: true,
          },
        },
      },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Actualizar datos personales del usuario
    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: {
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
      },
      include: {
        credential_users: true,
        rol: true,
        Paciente: {
          include: {
            pac_data: true,
          },
        },
      },
    });

    // Si el usuario tiene datos en Paciente -> pac_data, actualizamos
    if (updatedUser.Paciente.length > 0 && updatedUser.Paciente[0].pac_data) {
      await prisma.pacData.update({
        where: { idpac_data: updatedUser.Paciente[0].pac_data.idpac_data },
        data: {
          Direction: Direction ?? null,
          bloodType: bloodType ?? null,
          allergies: allergies ?? null,
          emergency_contact: emergency_contact ?? null,
        },
      });
    }

    // Obtener datos actualizados final para respuesta
    const finalUser = await prisma.user.findUnique({
      where: { id: req.userId },
      include: {
        credential_users: true,
        rol: true,
        Paciente: {
          include: {
            pac_data: true,
          },
        },
      },
    });

    if (!finalUser) {
      return res.status(500).json({ error: "No se pudo recuperar el usuario actualizado." });
    }

    // Sanitizar datos
    const sanitizedUser = {
      ...finalUser,
      credential_users: finalUser.credential_users
        ? {
            id: finalUser.credential_users.id,
            document: finalUser.credential_users.document,
            email: finalUser.credential_users.email,
          }
        : null,
    };

    // Si Paciente tiene múltiples entradas, estructuramos correctamente
    const pacienteData = finalUser.Paciente?.[0] || null;
    if (pacienteData) {
      sanitizedUser["Paciente"] = {
        id: pacienteData.id,
        pac_data_idpac_data: pacienteData.pac_data_idpac_data,
        User_idUser: pacienteData.User_idUser,
        User_credential_users_idcredential_users: pacienteData.User_credential_users_idcredential_users,
        User_rol_idrol: pacienteData.User_rol_idrol,
        pac_data: {
          Direction: pacienteData.pac_data?.Direction ?? null,
          bloodType: pacienteData.pac_data?.bloodType ?? null,
          allergies: pacienteData.pac_data?.allergies ?? null,
          emergency_contact: pacienteData.pac_data?.emergency_contact ?? null,
        },
      };
    }

    return res.status(200).json({ user: sanitizedUser });
  } catch (err: any) {
    console.error("ERROR AL ACTUALIZAR USUARIO:", err);
    return res.status(500).json({
      error: "Error al actualizar la información del usuario",
      details: err?.message || err,
    });
  }
};
