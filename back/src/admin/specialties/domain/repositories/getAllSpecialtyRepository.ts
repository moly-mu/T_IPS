// src/admin/specialties/domain/repositories/getAllSpecialtyRepository.ts

import { SpecialtyEntity } from "../entities"

export interface SpecialtyRepository {
    getAll(): Promise<SpecialtyEntity[]>
}