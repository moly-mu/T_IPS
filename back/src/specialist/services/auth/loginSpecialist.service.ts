import bcrypt from "bcryptjs";
import { findCredentialByEmail } from "../../repos/Login.repository";
import { SpecialistLoginInput, SpecialistLoginResult } from "../../models/interfaces/auth/specialist.interface";

export const loginSpecialistService = async (
  SpecialistLoginInput: SpecialistLoginInput,
  password: string
): Promise<SpecialistLoginResult> => {
  const credential = await findCredentialByEmail(SpecialistLoginInput);

  if (!credential || credential.User.length === 0) {
    return { error: "Usuario no encontrado" };
  }

  const user = credential.User[0];

  if (!user.Especialista || user.Especialista.length === 0) {
    return { error: "No estás registrado como especialista" };
  }

  if (user.status !== "Activo") {
    return { error: "Tu cuenta aún no ha sido aprobada" };
  }

  const passwordMatch = await bcrypt.compare(password, credential.password);
  if (!passwordMatch) {
    return { error: "Contraseña incorrecta" };
  }

  return { user, credential };
};