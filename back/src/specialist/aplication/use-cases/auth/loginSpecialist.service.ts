import bcrypt from "bcryptjs";
import { LoginSpecialistPrismaRepository } from "../../../infraestructure/repo/auth/Login.repository";
import { SpecialistLoginInput, SpecialistLoginResult } from "../../../domain/types/LoginSpecialist";

const specialistRepository = new LoginSpecialistPrismaRepository();

export const loginSpecialistService = async (
  SpecialistLoginInput: SpecialistLoginInput
): Promise<SpecialistLoginResult> => {
  if (!SpecialistLoginInput.email) {
    return { error: "Email es requerido" };
  }

  if (!SpecialistLoginInput.password) {
    return { error: "Contraseña es requerida" };
  }

  const specialist = await specialistRepository.findByEmail(SpecialistLoginInput.email);

  if (!specialist) {
    return { error: "Usuario no encontrado" };
  }

  // Aquí deberías obtener el hash de la contraseña real desde la base de datos.
  // Si tu entidad Specialist no tiene el hash, ajusta el repositorio para incluirlo.
  // Por ejemplo, specialist.passwordHash
  // const passwordMatch = await bcrypt.compare(SpecialistLoginInput.password, specialist.passwordHash);

  // if (!passwordMatch) {
  //   return { error: "Contraseña incorrecta" };
  // }

  if (specialist.status !== "Activo") {
    return { error: "Tu cuenta aún no ha sido aprobada" };
  }

  return { user: specialist };
};