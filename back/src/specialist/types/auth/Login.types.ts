import {
  SpecialistLoginInputSchema,
  SpecialistLoginResultSchema,
} from "../../presentation/validators/specialistSchemas";
import { z } from "zod";

export type SpecialistLoginInput = z.infer<typeof SpecialistLoginInputSchema>;

export type SpecialistLoginResult = z.infer<typeof SpecialistLoginResultSchema>;