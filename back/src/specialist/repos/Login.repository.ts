import prisma from "@prisma";
import {SpecialistLoginInput} from "../models/interfaces/auth/specialist.interface";

export const findCredentialByEmail = async (email: SpecialistLoginInput) => {
  return prisma.credentialUser.findUnique({
    where: { email: email.email },
    include: {
      User: {
        include: {
          Especialista: true,
          rol: true,
        },
      },
    },
  });
};