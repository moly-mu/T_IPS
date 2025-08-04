import { PrismaClient } from "@prisma/client";
import {Request,Response} from "express";

const prisma = new PrismaClient();

export const deleteAccount = async (req: Request, res: Response) => {
  const userId = req.userId;
  
  try {
    // Obtener el usuario con todas sus relaciones
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        credential_users: true,
        Especialista: {
          include: {
            spec_data: true,
            SpecialistHasSpecialty: true,
            Appointments: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Usar transacción para eliminar todo relacionado de forma segura
    await prisma.$transaction(async (tx) => {
      // Si es especialista, eliminar todas las relaciones
      if (user.Especialista && user.Especialista.length > 0) {
        const specialist = user.Especialista[0];
        
        // Eliminar relaciones de especialidades
        await tx.specialistHasSpecialty.deleteMany({
          where: {
            Specialist_idEspecialista: specialist.id,
          },
        });

        // Actualizar citas para no dejar referencias rotas
        await tx.appointment.updateMany({
          where: {
            Specialist_idEspecialista: specialist.id,
          },
          data: {
            state: "Cancelada"
          }
        });

        // Eliminar especialista
        await tx.specialist.delete({
          where: { id: specialist.id },
        });

        // Eliminar datos del especialista
        if (specialist.spec_data) {
          await tx.specData.delete({
            where: { id: specialist.spec_data.id },
          });
        }
      }

      // Eliminar usuario
      await tx.user.delete({
        where: { id: userId },
      });

      // Eliminar credenciales
      await tx.credentialUser.delete({
        where: { id: user.credential_users_idcredential_users },
      });
    });

    res.json({ message: "Cuenta eliminada exitosamente" });
  } catch (err) {
    console.error("Error al eliminar cuenta:", err);
    res.status(500).json({ error: "Error al eliminar cuenta", details: err });
  }
};