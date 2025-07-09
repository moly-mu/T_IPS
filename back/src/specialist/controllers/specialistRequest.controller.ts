// src/specialist/controllers/specialistRequest.controller.ts
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

    if (existing) return res.status(400).json({ message: "Ya existe una solicitud pendiente" });

    const request = await prisma.specialistRequest.create({
      data: {
        userId,
        message,
      }
    });

    return res.status(201).json(request);
  } catch (err) {
    return res.status(500).json({ message: "Error creando solicitud", error: err });
  }
};

export const listSpecialistRequests = async (_req: Request, res: Response) => {
  try {
    const requests = await prisma.specialistRequest.findMany({
      where: { status: "pendiente" },
      include: { user: true },
    });
    return res.json(requests);
  } catch (err) {
    return res.status(500).json({ message: "Error listando solicitudes", error: err });
  }
};

export const approveSpecialistRequest = async (req: Request, res: Response) => {
  const requestId = parseInt(req.params.id);

  try {
    const request = await prisma.specialistRequest.findUnique({
      where: { id: requestId },
      include: { user: true }
    });

    if (!request) return res.status(404).json({ message: "Solicitud no encontrada" });

    if (request.status !== "pendiente") return res.status(400).json({ message: "Ya fue procesada" });

    const profData = await prisma.profData.create({
      data: {
        biography: "",
        picture: Buffer.from(""),
        cv: Buffer.from(""),
        mppc: 0,
        exp_lab: "",
        educational_certificates: Buffer.from(""),
        degrees: Buffer.from(""),
        working_experience: "",
      },
    });

    await prisma.profesional.create({
      data: {
        prof_data_idprof_data: profData.id,
        status: "activo",
        User_idUser: request.user.id,
        User_credential_users_idcredential_users: request.user.credential_users_idcredential_users,
        User_rol_idrol: request.user.rol_idrol,
      },
    });

    // Cambiar el rol del usuario
    const profesionalRol = await prisma.rol.findFirst({ where: { rol_name: "profesional" } });
    if (!profesionalRol) return res.status(500).json({ message: "Rol 'profesional' no encontrado" });

    await prisma.user.update({
      where: { id: request.user.id },
      data: { rol_idrol: profesionalRol.id },
    });

    await prisma.specialistRequest.update({
      where: { id: request.id },
      data: { status: "aprobado" },
    });

    return res.json({ message: "Solicitud aprobada y profesional creado" });
  } catch (err) {
    return res.status(500).json({ message: "Error al aprobar solicitud", error: err });
  }
};

export default app;