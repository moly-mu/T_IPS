// src/admin/specialties/domain/types/specialtyTypes.ts

export type SpecialtyStatus = "Activo" | "Inactivo";

export interface SpecialtyType {
  id: number,
  name: string,
  status: SpecialtyStatus,
  price: number,
  service: string,
  duration: number,
  joinDate: Date,
  _count: {
    Appointment: number,
  },
};
