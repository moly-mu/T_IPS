import bcrypt from "bcryptjs";
import { findCredentialByEmail } from "@specialistRepos/";
import { SpecialistLoginInput, SpecialistLoginResult } from "@specialistTypes/";

export const loginSpecialistService = async (
  SpecialistLoginInput: SpecialistLoginInput
): Promise<SpecialistLoginResult> => {
  const credential = await findCredentialByEmail(SpecialistLoginInput);
  if (!SpecialistLoginInput.email) {
  return { error: "Email es requerido" };
}

  if (!SpecialistLoginInput.password) {
    return { error: "Contraseña es requerida" };
  }


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

  const passwordMatch = await bcrypt.compare(SpecialistLoginInput.password, credential.password);
  if (!passwordMatch) {
    return { error: "Contraseña incorrecta" };
  }

  return { user, credential };
};