import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const approveSpecialistRequest = async (req: Request, res: Response) => {
  const requestId = parseInt(req.params.id);

  try {
    const request = await prisma.specialistRequest.findUnique({
      where: { id: requestId },
      include: { user: true }
    });

    if (!request){
        res.status(404).json({ message: "Solicitud no encontrada" });
        return;
    }  

    if (request.status !== "pendiente"){
        res.status(400).json({ message: "Ya fue procesada" });
        return;
    }

    const profData = await prisma.specData.create({
      data: {
        biography: "",
        picture: Buffer.from(""),
        cv: Buffer.from(""),
        exp_lab: "",
        educational_certificates: Buffer.from(""),
        degrees: Buffer.from(""),
        working_experience: "",
      },
    });

    await prisma.specialist.create({
      data: {
        spec_data_idspec_data: profData.id,
        User_idUser: request.user.id,
        User_credential_users_idcredential_users: request.user.credential_users_idcredential_users,
        User_rol_idrol: request.user.rol_idrol,
      },
    });

    // Cambiar el rol del usuario
    const profesionalRol = await prisma.rol.findFirst({ where: { rol_name: "profesional" } });
    if (!profesionalRol){
        res.status(500).json({ message: "Rol 'profesional' no encontrado" });
        return;
    }

    await prisma.user.update({
      where: { id: request.user.id },
      data: { rol_idrol: profesionalRol.id },
    });

    await prisma.specialistRequest.update({
      where: { id: request.id },
      data: { status: "aprobado" },
    });

    res.json({ message: "Solicitud aprobada y profesional creado" });
    return;
    } catch (err) {
    res.status(500).json({ message: "Error al aprobar solicitud", error: err });
    return;
    }
};
