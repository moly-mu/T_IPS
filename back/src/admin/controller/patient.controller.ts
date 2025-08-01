import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ------------------ GET TODOS ------------------
export const getAllPacientes = async (req: Request, res: Response) => {
  try {
    const { status, gender, search } = req.query;

    const pacientes = await prisma.patient.findMany({
      include: {
        User: {
          include: {
            credential_users: true,
            userReviewsReceived: true,
          },
        },
        Appointments: {
          orderBy: {
            appoint_finish: "desc",
          },
        },
        pac_data: true,
      },
    });

    const response = pacientes
      .map((p) => {
        const reviews = p.User.userReviewsReceived || [];

        // Calcular promedio rating
        const rating =
          reviews.length > 0
            ? parseFloat(
                (
                  reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                ).toFixed(2)
              )
            : 0;

        return {
          id: p.User.id,
          name: `${p.User.firstname} ${p.User.lastname}`,
          secondName: p.User.second_firstname
            ? `${p.User.second_firstname} ${p.User.second_lastname || ""}`
            : undefined,
          email: p.User.credential_users.email,
          document: p.User.credential_users.document,
          documentType: p.User.document_type,
          phone: p.User.phone,
          age: calculateAge(p.User.birthdate),
          birthdate: p.User.birthdate.toISOString().split("T")[0],
          gender: p.User.gender,
          sex: p.User.sex,
          language: p.User.language,
          consultations: p.Appointments.length,
          lastConsultation:
            p.Appointments[0]?.appoint_finish?.toISOString().split("T")[0] ||
            null,
          status: p.User.status,
          rating,
          joinDate: p.User.joinDate.toISOString().split("T")[0],
          bloodType: p.pac_data.bloodType,
          allergies: p.pac_data.allergies,
          emergencyContact: p.pac_data.emergency_contact,
          epsType: p.pac_data.eps_type,
          profession: p.pac_data.profession,
          ethnicGroup: p.pac_data.ethnicgroup,
        };
      })
      .filter((u) => {
        const matchesStatus = !status || u.status === status;
        const matchesGender = !gender || u.gender === gender;
        const matchesSearch =
          !search ||
          u.name.toLowerCase().includes(String(search).toLowerCase()) ||
          u.email.toLowerCase().includes(String(search).toLowerCase()) ||
          u.document.toString().includes(String(search));
        return matchesStatus && matchesGender && matchesSearch;
      });

    res.json(response);
  } catch (error) {
    console.error("Error al obtener pacientes:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ------------------ GET POR ID ------------------
export const getPacienteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const paciente = await prisma.patient.findFirst({
      where: {
        User_idUser: Number(id),
      },
      include: {
        User: {
          include: {
            credential_users: true,
            userReviewsReceived: true,
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
        pac_data: true,
        MedicalHistories: {
          include: {
            consultations: true,
            diagnoses: true,
            antecedents: true,
            prescriptions: true,
          },
        },
        Consents: true,
        Invoices: true,
        MedicalOrders: true,
      },
    });

    if (!paciente) {
      res.status(404).json({ error: "Paciente no encontrado" });
      return;
    }

    const reviews = paciente.User.userReviewsReceived || [];
    const average =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;
    const rating = parseFloat(average.toFixed(2));

    const response = {
      id: paciente.User.id,
      name: `${paciente.User.firstname} ${paciente.User.lastname}`,
      secondName: paciente.User.second_firstname
        ? `${paciente.User.second_firstname} ${
            paciente.User.second_lastname || ""
          }`
        : undefined,
      email: paciente.User.credential_users.email,
      document: paciente.User.credential_users.document,
      documentType: paciente.User.document_type,
      phone: paciente.User.phone,
      age: calculateAge(paciente.User.birthdate),
      birthdate: paciente.User.birthdate.toISOString().split("T")[0],
      gender: paciente.User.gender,
      sex: paciente.User.sex,
      language: paciente.User.language,
      consultations: paciente.Appointments.length,
      lastConsultation:
        paciente.Appointments[0]?.appoint_finish?.toISOString().split("T")[0] ||
        null,
      status: paciente.User.status,
      rating: Number(rating),
      joinDate: paciente.User.joinDate.toISOString().split("T")[0],
      // Datos médicos
      medicalData: {
        bloodType: paciente.pac_data.bloodType,
        allergies: paciente.pac_data.allergies,
        emergencyContact: paciente.pac_data.emergency_contact,
        epsType: paciente.pac_data.eps_type,
        profession: paciente.pac_data.profession,
        ethnicGroup: paciente.pac_data.ethnicgroup,
      },
      // Historial médico
      medicalHistory: paciente.MedicalHistories.map((mh) => ({
        consultations: mh.consultations,
        diagnoses: mh.diagnoses,
        antecedents: mh.antecedents,
        prescriptions: mh.prescriptions,
      })),
      // Consents
      consents: paciente.Consents,
      // Facturas
      invoices: paciente.Invoices,
      // Órdenes médicas
      medicalOrders: paciente.MedicalOrders,
    };

    res.json(response);
  } catch (error) {
    console.error("Error al obtener paciente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ------------------ GET RATING ------------------
export const getPacienteRating = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const reviews = await prisma.userReview.findMany({
      where: {
        reviewed_id: Number(id),
      },
    });

    const avgRating =
      reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);

    res.json({
      averageRating: avgRating.toFixed(1),
      total: reviews.length,
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

// ------------------ UPDATE ------------------
export const updatePaciente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      firstname,
      second_firstname,
      lastname,
      second_lastname,
      birthdate,
      gender,
      sex,
      document_type,
      language,
      phone,
      status,
      // Datos médicos
      bloodType,
      allergies,
      emergency_contact,
      eps_type,
      profession,
      ethnicgroup,
    } = req.body;

    // Actualizar datos de usuario
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        firstname,
        second_firstname,
        lastname,
        second_lastname,
        birthdate: birthdate ? new Date(birthdate) : undefined,
        gender,
        sex,
        document_type,
        language,
        phone,
        status,
      },
    });

    // Obtener el paciente para actualizar sus datos médicos
    const paciente = await prisma.patient.findFirst({
      where: { User_idUser: Number(id) },
    });

    if (!paciente) {
      res.status(404).json({ error: "Paciente no encontrado" });
      return;
    }

    // Actualizar datos médicos
    const updatedPacData = await prisma.pacData.update({
      where: { id: paciente.pac_data_idpac_data },
      data: {
        bloodType,
        allergies,
        emergency_contact,
        eps_type,
        profession,
        ethnicgroup,
      },
    });

    res.json({
      message: "Paciente actualizado",
      user: updatedUser,
      medicalData: updatedPacData,
    });
  } catch (error) {
    console.error("Error al actualizar paciente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ------------------ DELETE ------------------
export const deletePaciente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Primero obtener el paciente para eliminar datos relacionados
    const paciente = await prisma.patient.findFirst({
      where: { User_idUser: Number(id) },
      include: {
        User: {
          include: {
            credential_users: true,
          },
        },
      },
    });

    if (!paciente) {
      res.status(404).json({ error: "Paciente no encontrado" });
      return;
    }

    await prisma.$transaction(async (tx) => {
      // Eliminar paciente
      await tx.patient.deleteMany({
        where: { User_idUser: Number(id) },
      });

      // Eliminar datos médicos
      await tx.pacData.delete({
        where: { id: paciente.pac_data_idpac_data },
      });

      // Eliminar usuario
      await tx.user.delete({
        where: { id: Number(id) },
      });

      // Eliminar credenciales
      await tx.credentialUser.delete({
        where: { id: paciente.User.credential_users.id },
      });
    });

    res.json({ message: "Paciente eliminado completamente" });
  } catch (error) {
    console.error("Error al eliminar paciente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Función auxiliar para calcular edad
function calculateAge(birthdate: Date): number {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
