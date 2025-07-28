import { Specialist } from "../entities/EntityLogin";

export interface SpecialistRepository {
  findByEmail(email: string): Promise<Specialist | null>;
}