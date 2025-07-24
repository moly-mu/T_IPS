import { z } from "zod";


export const SpecialistLoginInputSchema = z.object({
  email: z.email("Correo electrónico inválido"),
  password: z.string().min(1, "Contraseña es requerida"),
});


export const SpecialistLoginResultSchema = z.object({
  user: z.any().optional(),
  credential: z.any().optional(),
  error: z.string().optional(),
});