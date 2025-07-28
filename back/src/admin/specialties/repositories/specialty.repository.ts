//src/admin/specialties/repositories/specialty.repository.ts

import prisma from "specialist/infraestructure/prisma/client";

export const getAllSpecialties = async () => {
  return await prisma.specialty.findMany();
};
