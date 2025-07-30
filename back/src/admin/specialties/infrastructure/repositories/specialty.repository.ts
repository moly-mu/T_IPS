//src/admin/specialties/repositories/specialty.repository.ts

import prisma from "@prisma";
import { SpecialtyStatus } from "../../domain/types";
import { SpecialtyEntity} from "../../domain/entities/";
import { SpecialtyRepository } from "../../domain/repositories/";

export class GetAllSpecialtyPrismaRepository implements SpecialtyRepository {
  async getAll(): Promise<SpecialtyEntity[]> {
    return (await prisma.specialty.findMany({
      orderBy: {
        id: "asc",  
      },
      include: {
        _count: {
          select: { Appointment: true },
        },
      },
    })).map(
      (s) => 
        new SpecialtyEntity(
          s.id,
          s.name,
          s.status as SpecialtyStatus,
          s.price,
          s.service,
          s.duration,
          new Date(s.joinDate),
          { Appointment: s._count.Appointment}
        )
    );
  }
}
