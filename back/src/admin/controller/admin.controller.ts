import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSpecialty = async (req: Request, res: Response) => {
	try {
		const { name } = req.body;
		const specialty = await prisma.specialty.create({ data: { name } });
		res.status(201).json(specialty);
	} catch (error) {
		res.status(400).json({ error: "Error al crear la especialidad", details: error });
	}
};

export const getSpecialties = async (_req: Request, res: Response) => {
	const specialties = await prisma.specialty.findMany();
	res.json(specialties);
};

export const getSpecialtyById = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const specialty = await prisma.specialty.findUnique({ where: { id } });
	if (!specialty) return res.status(404).json({ error: "Especialidad no encontrada" });
	res.json(specialty);
};

export const updateSpecialty = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const { name } = req.body;
	try {
		const updated = await prisma.specialty.update({
			where: { id },
			data: { name },
		});
		res.json(updated);
	} catch (error) {
		res.status(400).json({ error: "Error al actualizar la especialidad", details: error });
	}
};

export const deleteSpecialty = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	try {
		await prisma.specialty.delete({ where: { id } });
		res.json({ message: "Especialidad eliminada correctamente" });
	} catch (error) {
		res.status(400).json({ error: "Error al eliminar la especialidad", details: error });
	}
};

export const checkSpecialtyByName = async (req: Request, res: Response) => {
	const { name } = req.query;

	if (!name || typeof name !== "string") {
		return res.status(400).json({ error: "El parámetro 'name' es requerido como string." });
	}

	try {
		const specialty = await prisma.specialty.findUnique({
			where: { name },
		});

		if (specialty) {
			return res.json({ exists: true, id: specialty.id });
		} else {
			return res.json({ exists: false });
		}
	} catch (error) {
		res.status(500).json({ error: "Error al verificar la especialidad", details: error });
	}
};
