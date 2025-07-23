//src/admin/specialties/service/specialty.service.ts

import * as specialtyRepository from "../repositories/specialty.repository";

export const getAllSpecialties = async () => {
    const specialties = await specialtyRepository.getAllSpecialties();
    return specialties;
}