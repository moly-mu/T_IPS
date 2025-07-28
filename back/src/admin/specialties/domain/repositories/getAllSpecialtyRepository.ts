import { Specialty } from "../entities"

export interface SpecialtyRespositori {
    findMany(): Promise <Specialty[]>
    save(specialty: Specialty): Promise <void>
}