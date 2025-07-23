// src/middleware/validateSpecialty.ts
import { Request, Response, NextFunction } from "express";
import { SpecialtyStatus } from "@prisma/client";



export const validateSpecialty = (req: Request, res: Response, next: NextFunction) => {
	const { name, status, price, service, duration } = req.body;

	if (!name || typeof name !== "string") {
		res.status(400).json({ error: "'name' es requerido y debe ser una cadena" });
		return;
	}

	if (status && !Object.values(SpecialtyStatus).includes(status)) {
		res.status(400).json({
			error: `'status' debe ser uno de: ${Object.values(SpecialtyStatus).join(", ")}`,
		});
		return;
	}

	if (price !== undefined && (typeof price !== "number" || price < 0)) {
		res.status(400).json({ error: "'price' debe ser un número positivo" });
		return;
	}

	if (service && typeof service !== "string") {
		res.status(400).json({ error: "'service' debe ser una cadena" });
		return;
	}

	if (duration !== undefined && (typeof duration !== "number" || duration <= 0)) {
		res.status(400).json({ error: "'duration' debe ser un número mayor a 0" });
		return;
	}

	next(); // Si todo está bien, continúa al controlador
};
