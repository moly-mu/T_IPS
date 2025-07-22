import { PrismaClient, UserStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const loginSpecialistService = async (email: string, password: string) => {
  const credential = await prisma.credentialUser.findUnique({
    where: { email },
    include: {
      User: {
        include: {
          Especialista: true,
          rol: true,
        },
      },
    },
  });

  if (!credential || credential.User.length === 0) {
    return { error: "Usuario no encontrado" };
  }

  const user = credential.User[0];

  if (!user.Especialista || user.Especialista.length === 0) {
    return { error: "No estás registrado como especialista" };
  }

  if (user.status !== UserStatus.Activo) {
    return { error: "Tu cuenta aún no ha sido aprobada" };
  }

  const passwordMatch = await bcrypt.compare(password, credential.password);
  if (!passwordMatch) {
    return { error: "Contraseña incorrecta" };
  }

  // Si todo está bien, retorna el usuario y credential
  return { user, credential };
};