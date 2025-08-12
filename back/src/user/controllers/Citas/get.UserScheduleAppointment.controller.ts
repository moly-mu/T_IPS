import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

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
        spec_data: true,
      },
    });

    const formattedSpecialists = await Promise.all(
      specialists.map(async (spec) => {
        const specialtyData = spec.SpecialistHasSpecialty[0]?.Specialty;
        const specialtyName = specialtyData?.name || "Sin especialidad";
        const price = specialtyData?.price || 0;
        const duration = specialtyData?.duration || 30;

        const startDate = spec.spec_data?.workStartSchedule;
        const endDate = spec.spec_data?.workEndSchedule;

        if (!startDate || !endDate) return null;

        const startHour = startDate.getHours();
        const startMin = startDate.getMinutes();
        const endHour = endDate.getHours();
        const endMin = endDate.getMinutes();

        const totalStartMinutes = startHour * 60 + startMin;
        const totalEndMinutes = endHour * 60 + endMin;

        // Obtener citas ya agendadas en la fecha
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

        // Generar horarios disponibles
        const availableHours: string[] = [];
        for (let mins = totalStartMinutes; mins + duration <= totalEndMinutes; mins += duration) {
          const hour = Math.floor(mins / 60);
          const minute = mins % 60;
          const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

          const isTaken = appointments.some(app => {
            const appHour = new Date(app.appoint_init).toTimeString().slice(0, 5);
            return appHour === time;
          });

          if (!isTaken) availableHours.push(time);
        }

        // Obtener reseñas de la especialidad
        const reviews = await prisma.userReview.findMany({
          where: {
             reviewed_id: specialtyData?.id,
          },
        });

        const avgRating = reviews.length
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : null;

        return {
          name: `${spec.User.firstname} ${spec.User.lastname}`,
          specialty: specialtyName,
          price,
          averageRating: avgRating,
          availableHours,
        };
      })
    );

    return res.json({ specialists: formattedSpecialists.filter(Boolean) });
  } catch (error) {
    console.error("Error al obtener especialistas:", error);
    return res.status(500).json({ error: "Error al obtener especialistas disponibles." });
  }
};
