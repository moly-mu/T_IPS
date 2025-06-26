import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const saveUser = async (req, res) => {
  const {
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    tipoDocumento,
    numeroDocumento,
    correo,
    contraseña,
  } = req.body;

  try {
    const ExistingUser = await prisma.user.findFirst({
      where: { correo: correo },
    });

    if (ExistingUser) {
      return res
        .status(200)
        .json({ message: "El usuario ya existe", color: "bg-red-500" });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10); 

    const resultUser = await prisma.user.create({
      data: {
        correo,
        contraseña: hashedPassword, 
      },
    });

    const resultPaciente = await prisma.paciente.create({
      data: {
        userId: resultUser.id,
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        tipoDocumento,
        numeroDocumento,
      },
    });

    res.status(200).json({
      message: "Usuario creado correctamente",
      color: "bg-green-500",
      resultUser,
      resultPaciente,
    });
  } catch (error) {
    console.error("Error al guardar:", error);
    res.status(500).json({
      error: "Error al guardar",
    });
  }
};
