import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Controlador para obtener especialistas disponibles según fecha
export const UserScheduleAppointment = async (req: Request, res: Response) => {
  const { date } = req.query; // formato esperado: YYYY-MM-DD

  if (!date) {
    return res.status(400).json({ error: "La fecha es requerida en formato YYYY-MM-DD" });
  }

  try {
    const specialists = await prisma.specialist.findMany({
      include: {
        User: true,
        SpecialistHasSpecialty: {
          include: {
            Specialty: true,
          },
        },
      },
    });

    const formattedSpecialists = await Promise.all(
      specialists.map(async (spec) => {
        const specialtyData = spec.SpecialistHasSpecialty[0]?.Specialty;
        const specialtyName = specialtyData?.name || "Sin especialidad";
        const price = specialtyData?.price || 0;

        // Traer reseñas relacionadas con la especialidad
        const reviews = await prisma.specialtyReview.findMany({
          where: {
            specialty_id: specialtyData?.id,
          },
        });

        const avgRating = reviews.length
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : null;

        // Obtener citas del especialista en la fecha
        const appointments = await prisma.appointment.findMany({
          where: {
            Specialist_idEspecialista: spec.id,
            Specialist_spec_data_idspec_data: spec.spec_data_idspec_data,
            Specialist_User_idUser: spec.User_idUser,
            Specialist_User_credential_users_idcredential_users: spec.User_credential_users_idcredential_users,
            Specialist_User_rol_idrol: spec.User_rol_idrol,
            appoint_init: {
              gte: new Date(`${date}T00:00:00`),
              lt: new Date(`${date}T23:59:59`),
            },
          },
        });

        // Generar horarios disponibles entre 8am y 6pm cada 30 minutos
        const availableHours: string[] = [];
        for (let hour = 8; hour < 18; hour++) {
          ["00", "30"].forEach((min) => {
            const time = `${hour.toString().padStart(2, "0")}:${min}`;
            const isTaken = appointments.some(app => {
              const appHour = new Date(app.appoint_init).toTimeString().slice(0, 5);
              return appHour === time;
            });
            if (!isTaken) availableHours.push(time);
          });
        }

        return {
          id: spec.id,
          name: `${spec.User.firstname} ${spec.User.lastname}`,
          specialty: specialtyName,
          price,
          averageRating: avgRating,
          availableHours,
        };
      })
    );

    return res.json({ specialists: formattedSpecialists });
  } catch (error) {
    console.error("Error al obtener especialistas:", error);
    return res.status(500).json({ error: "Error al obtener especialistas disponibles." });
  }
};
