// src/admin/specialties/domain/entities/specialtyEntities.ts

import { SpecialtyStatus } from "../types/";

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
  
  isActive(): boolean{
    return this.status === "Activo";
  }
}
