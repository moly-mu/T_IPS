
import { z } from "zod";

export const SpecialtySchema = z.object({
    id: z.number().int(),
    name: z.string().min(1, "El nombre de la especialidad es requerido"),
    status: z.enum(['Activo', 'Inactivo']),
    price: z.number().min(0,"El precio debe ser un número positivo"),
})