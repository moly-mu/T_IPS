//src/admin/specialties/service/specialty.service.ts

import { SpecialtyRepository } from "../../../domain/repositories/";
import { SpecialtyEntity } from "../../../domain/entities/";

export class GetAllSpecialtiesService {
  constructor(private repository: SpecialtyRepository) {}

  async execute(): Promise<SpecialtyEntity[]> {
    return await this.repository.getAll();
  }
}
