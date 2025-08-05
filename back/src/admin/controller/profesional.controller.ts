import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ------------------ GET TODOS LOS ESPECIALISTAS ------------------
export const getAllProfessionals = async (_req: Request, res: Response) => {
  try {
    const professionals = await prisma.specialist.findMany({
      include: {
        spec_data: true,
        User: {
          include: {
            credential_users: true,
            userReviewsReceived: true,
          },
        },
        SpecialistHasSpecialty: {
          include: {
            Specialty: true,
          },
        },
        Appointments: {
          orderBy: {
            appoint_finish: "desc",
          },
        },
      },
    });

    const response = await Promise.all(
      professionals.map(async (pro) => {
        const reviews = pro.User.userReviewsReceived || [];
        const avgRating =
          reviews.length > 0
            ? parseFloat(
                (
                  reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                ).toFixed(2)
              )
            : 0;

        return {
          id: pro.id,
          userId: pro.User.id,
          name: `${pro.User.firstname} ${pro.User.lastname}`,
          email: pro.User.credential_users.email,
          specialties: pro.SpecialistHasSpecialty.map((shs) => ({
            id: shs.Specialty.id,
            name: shs.Specialty.name,
            price: shs.Specialty.price,
            duration: shs.Specialty.duration,
          })),
          biography: pro.spec_data.biography,
          experience: pro.spec_data.working_experience,
          consultations: pro.spec_data.consultations,
          rating: Number(avgRating),
          status: pro.User.status,
          schedule: {
            start: pro.spec_data.workStartSchedule,
            end: pro.spec_data.workEndSchedule,
          },
          lastAppointment:
            pro.Appointments[0]?.appoint_finish?.toISOString().split("T")[0] ||
            null,
          joinDate: pro.spec_data.joinDate.toISOString().split("T")[0],
        };
      })
    );

    res.json(response);
  } catch (error) {
    console.error("Error al obtener especialistas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ------------------ GET ESPECIALISTA POR ID ------------------
export const getProfessionalById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const professional = await prisma.specialist.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        spec_data: true,
        User: {
          include: {
            credential_users: true,
            userReviewsReceived: true,
          },
        },
        SpecialistHasSpecialty: {
          include: {
            Specialty: true,
          },
        },
        Appointments: {
          orderBy: {
            appoint_finish: "desc",
          },
          include: {
            Specialty: true,
          },
        },
        MedicalOrders: true,
      },
    });

    if (!professional) {
      res.status(404).json({ error: "Especialista no encontrado" });
      return;
    }

    const reviews = professional.User.userReviewsReceived || [];
    const avgRating =
      reviews.length > 0
        ? parseFloat(
            (
              reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            ).toFixed(2)
          )
        : 0;

    const response = {
      id: professional.id,
      userId: professional.User.id,
      name: `${professional.User.firstname} ${professional.User.lastname}`,
      email: professional.User.credential_users.email,
      document: professional.User.credential_users.document,
      phone: professional.User.phone,
      status: professional.User.status,
      rating: avgRating,
      // Datos profesionales
      professionalData: {
        biography: professional.spec_data.biography,
        experience: professional.spec_data.working_experience,
        consultations: professional.spec_data.consultations,
        schedule: {
          start: professional.spec_data.workStartSchedule,
          end: professional.spec_data.workEndSchedule,
        },
        certificates: {
          cv: professional.spec_data.cv
            ? Buffer.from(professional.spec_data.cv).toString("base64")
            : null,
          degrees: professional.spec_data.degrees
            ? Buffer.from(professional.spec_data.degrees).toString("base64")
            : null,
          educationalCertificates: professional.spec_data
            .educational_certificates
            ? Buffer.from(
                professional.spec_data.educational_certificates
              ).toString("base64")
            : null,
        },
      },
      // Especialidades
      specialties: professional.SpecialistHasSpecialty.map((shs) => ({
        id: shs.Specialty.id,
        name: shs.Specialty.name,
        price: shs.Specialty.price,
        duration: shs.Specialty.duration,
        status: shs.Specialty.status,
      })),
      // Últimas citas
      lastAppointments: professional.Appointments.map((app) => ({
        id: app.id,
        date: app.appoint_finish.toISOString().split("T")[0],
        specialty: app.Specialty.name,
        status: app.state,
      })),
      // Órdenes médicas recientes
      recentMedicalOrders: professional.MedicalOrders.slice(0, 5).map((mo) => ({
        id: mo.id,
        date: mo.issuedAt.toISOString().split("T")[0],
        description: mo.description,
        status: mo.status,
      })),
    };

    res.json(response);
  } catch (error) {
    console.error("Error al obtener especialista:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ------------------ UPDATE ESTADO ------------------
export const updateProfessionalStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Verificar que el especialista existe
    const professional = await prisma.specialist.findUnique({
      where: { id: Number(id) },
      include: { User: true },
    });

    if (!professional) {
      res.status(404).json({ error: "Especialista no encontrado" });
      return;
    }

    // Actualizar estado en la tabla User
    const updatedUser = await prisma.user.update({
      where: { id: professional.User.id },
      data: { status },
    });

    res.json({
      message: "Estado actualizado correctamente",
      professionalId: professional.id,
      userId: updatedUser.id,
      newStatus: updatedUser.status,
    });
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ------------------ DELETE ESPECIALISTA ------------------
export const deleteProfessional = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Obtener el especialista primero para eliminar relaciones
    const professional = await prisma.specialist.findUnique({
      where: { id: Number(id) },
      include: {
        User: {
          include: {
            credential_users: true,
          },
        },
        spec_data: true,
      },
    });

    if (!professional) {
      res.status(404).json({ error: "Especialista no encontrado" });
      return;
    }

    // Usar transacción para eliminar todo relacionado
    await prisma.$transaction([
      // Eliminar relaciones de especialidades
      prisma.specialistHasSpecialty.deleteMany({
        where: {
          Specialist_idEspecialista: professional.id,
        },
      }),
      // Eliminar especialista
      prisma.specialist.delete({
        where: { id: professional.id },
      }),
      // Eliminar datos profesionales
      prisma.specData.delete({
        where: { id: professional.spec_data.id },
      }),
      // Eliminar usuario
      prisma.user.delete({
        where: { id: professional.User.id },
      }),
      // Eliminar credenciales
      prisma.credentialUser.delete({
        where: { id: professional.User.credential_users.id },
      }),
    ]);

    res.json({ message: "Especialista eliminado completamente" });
  } catch (error) {
    console.error("Error al eliminar especialista:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ------------------ GET POR ESPECIALIDAD ------------------
export const getProfessionalsBySpecialty = async (
  req: Request,
  res: Response
) => {
  try {
    const { specialtyId } = req.params;

    const professionals = await prisma.specialist.findMany({
      where: {
        SpecialistHasSpecialty: {
          some: {
            specialty_idspecialty: Number(specialtyId),
          },
        },
        User: {
          status: "Activo", // Solo especialistas activos
        },
      },
      include: {
        spec_data: true,
        User: {
          include: {
            userReviewsReceived: true,
          },
        },
        SpecialistHasSpecialty: {
          where: {
            specialty_idspecialty: Number(specialtyId),
          },
          include: {
            Specialty: true,
          },
        },
      },
    });

    const response = professionals.map((pro) => {
      const reviews = pro.User.userReviewsReceived || [];
      const avgRating =
        reviews.length > 0
          ? parseFloat(
              (
                reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
              ).toFixed(2)
            )
          : 0;

      const specialty = pro.SpecialistHasSpecialty[0]?.Specialty;

      return {
        id: pro.id,
        name: `${pro.User.firstname} ${pro.User.lastname}`,
        specialty: {
          id: specialty?.id,
          name: specialty?.name,
          price: specialty?.price,
          duration: specialty?.duration,
        },
        rating: avgRating,
        experience: pro.spec_data.working_experience,
        biography: pro.spec_data.biography,
        consultations: pro.spec_data.consultations,
        picture: pro.spec_data.picture
          ? Buffer.from(pro.spec_data.picture).toString("base64")
          : null,
        schedule: {
          start: pro.spec_data.workStartSchedule,
          end: pro.spec_data.workEndSchedule,
        },
      };
    });

    res.json(response);
  } catch (error) {
    console.error("Error al obtener especialistas por especialidad:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getProfessionalRating = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const reviews = await prisma.userReview.findMany({
      where: {
        reviewed_id: Number(id),
      },
    });

    const avgRating =
      reviews.length > 0
        ? parseFloat(
            (
              reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            ).toFixed(2)
          )
        : 0;

    res.json({
      averageRating: avgRating,
      totalReviews: reviews.length,
      reviews: reviews.map((r) => ({
        rating: r.rating,
        comment: r.comment,
        createdAt: r.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error al obtener calificación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

