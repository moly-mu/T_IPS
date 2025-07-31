import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const UserProfile = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: {
        credential_users: true,
        rol: true,
        Paciente: {
          take: 1,
          include: {
            pac_data: {
              select: {
                Direction: true,
                bloodType: true,
                allergies: true,
                emergency_contact: true,
                eps_type: true,
                profession: true,
                ethnicgroup: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const paciente = user.Paciente?.[0];

    const sanitizedUser = {
      firstname: user.firstname,
      second_firstname: user.second_firstname,
      lastname: user.lastname,
      second_lastname: user.second_lastname,
      birthdate: user.birthdate,
      gender: user.gender,
      sex: user.sex,
      language: user.language,
      document_type: user.document_type,
      phone: user.phone,
      status: user.status,
      joinDate: user.joinDate,

      credential_users: user.credential_users
        ? {
            document: user.credential_users.document,
            email: user.credential_users.email
          }
        : null,

      rol: user.rol
        ? {
            rol_name: user.rol.rol_name
          }
        : null,

      Paciente: paciente
        ? {
            pac_data: {
              Direction: paciente.pac_data?.Direction ?? null,
              bloodType: paciente.pac_data?.bloodType ?? null,
              allergies: paciente.pac_data?.allergies ?? null,
              emergency_contact: paciente.pac_data?.emergency_contact ?? null,
              eps_type: paciente.pac_data?.eps_type ?? null,
              profession: paciente.pac_data?.profession ?? null,
              ethnicgroup: paciente.pac_data?.ethnicgroup ?? null
            }
          }
        : {
            pac_data: {
              Direction: null,
              bloodType: null,
              allergies: null,
              emergency_contact: null,
              eps_type: null,
              profession: null,
              ethnicgroup: null
            }
          }
    };

    return res.status(200).json({ user: sanitizedUser });
  } catch (err: any) {
    console.error("ERROR AL OBTENER USUARIO:", err);
    return res.status(500).json({
      error: "Error al obtener la información del usuario",
      details: err?.message || err
    });
  }
};
