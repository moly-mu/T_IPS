// src/middleware/validateSpecialty.ts
import { Request, Response, NextFunction } from "express";
import { SpecialtyStatus } from "@prisma/client";

export const validateSpecialty = (req: Request, res: Response, next: NextFunction) => {
  const { name, status, price, service, duration } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "'name' es requerido y debe ser una cadena" });
  }

  if (status && !Object.values(SpecialtyStatus).includes(status)) {
    return res
      .status(400)
      .json({ error: `'status' debe ser uno de: ${Object.values(SpecialtyStatus).join(", ")}` });
  }

  if (price !== undefined && (typeof price !== "number" || price < 0)) {
    return res.status(400).json({ error: "'price' debe ser un número positivo" });
  }

  if (service && typeof service !== "string") {
    return res.status(400).json({ error: "'service' debe ser una cadena" });
  }

  if (duration !== undefined && (typeof duration !== "number" || duration <= 0)) {
    return res.status(400).json({ error: "'duration' debe ser un número mayor a 0" });
  }

  next(); // Si todo está bien, continúa al controlador
};
