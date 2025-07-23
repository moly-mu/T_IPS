//src/admin/specialties/repositories/specialty.repository.ts

import prisma from "@prisma";

export const getAllSpecialties = async () => {
  return await prisma.specialty.findMany();
};
