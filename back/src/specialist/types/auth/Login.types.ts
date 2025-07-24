import {
  SpecialistLoginInputSchema,
  SpecialistLoginResultSchema,
} from "@specialistModels/";
import { z } from "zod";

export type SpecialistLoginInput = z.infer<typeof SpecialistLoginInputSchema>;

export type SpecialistLoginResult = z.infer<typeof SpecialistLoginResultSchema>;