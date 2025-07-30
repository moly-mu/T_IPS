// src/admin/specialties/domain/entities/specialtyEntities.ts

export type SpecialtyStatus = "Activo" | "Inactivo";

export class SpecialtyEntity {
  constructor(
    public readonly id: number,
    public name: string,
    public status: SpecialtyStatus,
    public price: number,
    public service: string,
    public duration: number,
    public joinDate: Date,
    public _count: {
      Appointment :number;
    }
  ) {}
}
