//src/admin/specialties/repositories/specialty.repository.ts

import prisma from "@prisma";

export const getAllSpecialtiesRepository = async () => {
  return await prisma.specialty.findMany({
    orderBy:{
      id: 'asc',
    }
  });
};
