import { z } from "zod";

// Schema de login del especialista
export const SpecialistLoginInputSchema = z.object({
  email: z.string("Correo electrónico inválido"),
  password: z.string().min(1, "Contraseña es requerida"),
});

// Schema del resultado del login
export const SpecialistLoginResultSchema = z.object({
  user: z.any().optional(),
  credential: z.any().optional(),
  error: z.string().optional(),
});

// Schema de creación o actualización del especialista
export const SpecialistRequestSchema = z.object({
  biography: z.string().optional(),
  picture: z.string().optional(),
  specialty: z.string(),
  price: z.number(),
  graduationYear: z.number(),
  workExperience: z.string(),
  languages: z.array(z.string()).optional(),
  education: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  references: z.array(z.string()).optional(),
  certificates: z.string().optional(),
  documentInfo: z.record(z.any()).optional(),
  personalInfo: z.record(z.any()).optional(),
  personalRefs: z.array(z.string()).optional(),
});
