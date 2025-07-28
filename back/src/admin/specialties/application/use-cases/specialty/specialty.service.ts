//src/admin/specialties/service/specialty.service.ts

import { getAllSpecialtiesRepository } from "../../../infrastructure/repositories/specialty.repository";

export const getAllSpecialtiesService = async () => {
    return await getAllSpecialtiesRepository();
}