import { UserStatus } from "@prisma/client";

export const validateRequestStatus = (status: any): string | null => {
  if (!status) return "Estado es requerido";
  if (!Object.values(UserStatus).includes(status)) {
    return `Estado inválido. Valores permitidos: ${Object.values(UserStatus).join(", ")}`;
  }
  return null;
};