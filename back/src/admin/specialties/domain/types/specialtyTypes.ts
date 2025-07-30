import { z } from "zod";

export const SpecialtySchema = z.object({
  id: z.number,
  name: z.string,
  status: z.enum(["Activo", "Inactivo"]),
  price: z.number,
  service: z.string,
  duration: z.number,
  joinDate: z.coerce.date(),
  _count: z.object({
    Appointment: z.number(),
  }),
});

export type SpecialtyType = z.infer<typeof SpecialtySchema>