// src/admin/specialties/domain/entities/specialtyEntities.ts

export type SpecialtyStatus = "Activo" | "Inactivo";

export class Specialty {
    constructor(
        public readonly id: number,
        public name: string,
        public status: SpecialtyStatus,
        public price: number,
        public service: string,
        public duration: number,
        public joinDate: string,
        public _count: number
    ) {}
} 