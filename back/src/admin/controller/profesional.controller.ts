import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los profesionales
export const getAllProfessionals = async (_req: Request, res: Response) => {
	try {
		const professionals = await prisma.profesional.findMany({
			include: {
				prof_data: true,
				User: true,
				ProfesionalHasSpecialty: {
					include: {
						Specialty: true,
					},
				},
			},
		});
		res.json(professionals);
	} catch (error) {
		res.status(500).json({ error: "Error al obtener los profesionales", details: error });
	}
};

// Obtener un profesional por su ID
export const getProfessionalById = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	try {
		const professional = await prisma.profesional.findUnique({
			where: { id },
			include: {
				prof_data: true,
				User: true,
				ProfesionalHasSpecialty: {
					include: {
						Specialty: true,
					},
				},
			},
		});

		if (!professional) return res.status(404).json({ error: "Profesional no encontrado" });
		res.json(professional);
	} catch (error) {
		res.status(500).json({ error: "Error al buscar el profesional", details: error });
	}
};

// Crear un nuevo profesional (requiere IDs existentes de user y prof_data)
export const createProfessional = async (req: Request, res: Response) => {
	const {
		status,
		User_idUser,
		User_credential_users_idcredential_users,
		User_rol_idrol,
		prof_data_idprof_data,
		specialty_idspecialty,
	} = req.body;

	try {
		const profesional = await prisma.profesional.create({
			data: {
				status,
				User_idUser,
				User_credential_users_idcredential_users,
				User_rol_idrol,
				prof_data_idprof_data,
				ProfesionalHasSpecialty: {
					create: {
						specialty_idspecialty,
					},
				},
			},
		});
		res.status(201).json(profesional);
	} catch (error) {
		res.status(400).json({ error: "Error al crear el profesional", details: error });
	}
};

// Actualizar un profesional
export const updateProfessional = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const { status } = req.body;

	try {
		const updated = await prisma.profesional.update({
			where: { id },
			data: { status },
		});
		res.json(updated);
	} catch (error) {
		res.status(400).json({ error: "Error al actualizar el profesional", details: error });
	}
};

// Eliminar un profesional
export const deleteProfessional = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	try {
		await prisma.profesional.delete({ where: { id } });
		res.json({ message: "Profesional eliminado correctamente" });
	} catch (error) {
		res.status(400).json({ error: "Error al eliminar el profesional", details: error });
	}
};

// Obtener profesionales por ID de especialidad
export const getProfessionalsBySpecialty = async (req: Request, res: Response) => {
	const specialtyId = Number(req.params.specialtyId);

	try {
		const professionals = await prisma.profesional.findMany({
			where: {
				ProfesionalHasSpecialty: {
					some: {
						specialty_idspecialty: specialtyId,
					},
				},
			},
			include: {
				prof_data: true,
				User: true,
				ProfesionalHasSpecialty: {
					include: {
						Specialty: true,
					},
				},
			},
		});

		res.json(professionals);
	} catch (error) {
		res.status(500).json({
			error: "Error al obtener profesionales por especialidad",
			details: error,
		});
	}
};
