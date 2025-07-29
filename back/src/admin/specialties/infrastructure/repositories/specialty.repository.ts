//src/admin/specialties/repositories/specialty.repository.ts

import prisma from "@prisma";
import { SpecialtyEntity } from "../../domain/entities/";
import { SpecialtyRepository } from "../../domain/repositories/";

export class etAllSpecialtyPrismaRepository implements SpecialtyRepository {
  async getAll(): Promise<SpecialtyEntity[]> {
    return await prisma.specialty.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        _count: {
          select: { Appointment: true },
        },
      },
    });
  }
}
