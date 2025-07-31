//src/admin/specialties/repositories/specialty.repository.ts

import { PrismaClient } from "@prisma/client";
import { SpecialtyEntity } from "../../domain/entities/";
import { SpecialtyRepository } from "../../domain/repositories/";

const prisma = new PrismaClient();
export class GetAllSpecialtyPrismaRepository implements SpecialtyRepository {
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
