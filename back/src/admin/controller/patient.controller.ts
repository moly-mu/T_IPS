import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ------------------ GET TODOS ------------------
export const getAllPacientes = async (req: Request, res: Response) => {
  try {
    const { status, gender, search } = req.query;

    const pacientes = await prisma.paciente.findMany({
      include: {
        User: {
          include: {
            credential_users: true,
          },
        },
        Appointments: {
          orderBy: {
            appoint_finish: "desc",
          },
        },
      },
    });

    const response = pacientes
      .map((p) => ({
        id: p.User.id,
        name: `${p.User.firstname} ${p.User.lastname}`,
        email: p.User.credential_users.email,
        document: p.User.credential_users.document,
        phone: p.User.phone,
        age: p.User.age,
        gender: p.User.gender,
        consultations: p.Appointments.length,
        lastConsultation:
          p.Appointments[0]?.appoint_finish?.toISOString().split("T")[0] || null,
        status: p.User.status,
        rating: 4.5,
        joinDate: p.joinDate.toISOString().split("T")[0],
      }))
      .filter((u) => {
        const matchesStatus = !status || u.status === status;
        const matchesGender = !gender || u.gender === gender;
        const matchesSearch =
          !search ||
          u.name.toLowerCase().includes(String(search).toLowerCase()) ||
          u.email.toLowerCase().includes(String(search).toLowerCase());
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

    const paciente = await prisma.paciente.findFirst({
      where: {
        User_idUser: Number(id),
      },
      include: {
        User: {
          include: {
            credential_users: true,
          },
        },
        Appointments: {
          orderBy: {
            appoint_finish: "desc",
          },
        },
      },
    });

    if (!paciente) {
      return ;
    }

    const response = {
      id: paciente.User.id,
      name: `${paciente.User.firstname} ${paciente.User.lastname}`,
      email: paciente.User.credential_users.email,
      document: paciente.User.credential_users.document,
      phone: paciente.User.phone,
      age: paciente.User.age,
      gender: paciente.User.gender,
      consultations: paciente.Appointments.length,
      lastConsultation:
        paciente.Appointments[0]?.appoint_finish?.toISOString().split("T")[0] || null,
      status: paciente.User.status,
      rating: 4.5,
      joinDate: paciente.joinDate.toISOString().split("T")[0],
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
        reviewer_id: Number(id),
      },
    });

    const avgRating =
      reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);

    res.json({ averageRating: avgRating.toFixed(1), total: reviews.length });
  } catch (error) {
    console.error("Error al obtener calificación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ------------------ CREATE PACIENTE ------------------
export const createPaciente = async (req: Request, res: Response) => {
  try {
    const {
      firstname,
      lastname,
      age,
      gender,
      sex,
      document,
      document_type,
      languaje,
      phone,
      email,
      password,
      rol_idrol,
    } = req.body;

    if (!rol_idrol || isNaN(Number(rol_idrol))) {
      return ;
    }

    const result = await prisma.$transaction(async (tx) => {
      const credential = await tx.credentialUser.create({
        data: { document, email, password },
      });

      const user = await tx.user.create({
        data: {
          firstname,
          lastname,
          age,
          gender,
          sex,
          document_type,
          languaje,
          phone,
          credential_users_idcredential_users: credential.id,
          rol_idrol: Number(rol_idrol),
          status: "Pendiente",
        },
      });

      const pacData = await tx.pacData.create({
        data: {
          medical_history: Buffer.from(""),
        },
      });

      const paciente = await tx.paciente.create({
        data: {
          User_idUser: user.id,
          User_credential_users_idcredential_users: credential.id,
          User_rol_idrol: user.rol_idrol,
          pac_data_idpac_data: pacData.id,
        },
      });

      return { paciente };
    });

    res.status(201).json({
      message: "Paciente creado correctamente",
      paciente: result.paciente,
    });
  } catch (error: any) {
    console.error("Error al crear paciente:", error);
    if (error.code === "P2002") {
      res.status(400).json({ error: "El correo o documento ya existe" });
    } else if (error.code === "P2003") {
      res
        .status(400)
        .json({ error: "Clave foránea inválida (revisa rol_idrol o credential_id)" });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

// ------------------ UPDATE ------------------
export const updatePaciente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, age, gender, status, phone } = req.body;

    const updated = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        firstname,
        lastname,
        age,
        gender,
        status,
        ...(phone && { phone }),
      },
    });

    res.json({ message: "Paciente actualizado", updated });
  } catch (error) {
    console.error("Error al actualizar paciente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ------------------ DELETE ------------------
export const deletePaciente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.paciente.deleteMany({
      where: { User_idUser: Number(id) },
    });

    await prisma.user.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Paciente eliminado" });
  } catch (error) {
    console.error("Error al eliminar paciente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
