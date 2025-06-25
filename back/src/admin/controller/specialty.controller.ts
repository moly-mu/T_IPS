import type { Request, Response } from "express";
import {
  createSpecialtyService,
  changeUserStatusService,
} from "../services/specialty.service";

export async function createSpecialty(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const specialty = await createSpecialtyService(name);
    res.status(201).json(specialty);
  } catch (err) {
    res.status(500).json({ error: "Error creando especialidad", details: err });
  }
}

export async function changeUserStatus(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { newStatus } = req.body;
    const updated = await changeUserStatusService(Number(userId), newStatus);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error actualizando estado", details: err });
  }
}
