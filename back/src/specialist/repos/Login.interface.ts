import prisma from "../controllers/prisma/client";

export const findCredentialByEmail = async (email: string) => {
  return prisma.credentialUser.findUnique({
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
};