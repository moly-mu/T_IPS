// src/admin/controller/profesional.controller.ts

import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los especialistas (opcionalmente útil para admin)
export const getAllProfessionals = async (_req: Request, res: Response) => {
	try {
		const professionals = await prisma.specialist.findMany({
			include: {
				spec_data: true,
				User: true,
				SpecialistHasSpecialty: {
					include: {
						Specialty: true,
					},
				},
			},
		});
		res.json(professionals);
	} catch (error) {
		res.status(500).json({ error: "Error al obtener los especialistas", details: error });
	}
};

// Obtener un especialista por ID (admin)
export const getProfessionalById = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	try {
		const professional = await prisma.specialist.findUnique({
			where: { id },
			include: {
				spec_data: true,
				User: true,
				SpecialistHasSpecialty: {
					include: {
						Specialty: true,
					},
				},
			},
		});

		if (!professional) {
			res.status(404).json({ error: "Especialista no encontrado" });
			return;
		}
		res.json(professional);
	} catch (error) {
		res.status(500).json({ error: "Error al buscar el especialista", details: error });
	}
};

// Crear nuevo especialista
export const createProfessional = async (req: Request, res: Response) => {
	const {
		User_idUser,
		User_credential_users_idcredential_users,
		User_rol_idrol,
		spec_data_idspec_data,
		specialty_idspecialty,
	} = req.body;

	try {
		const profesional = await prisma.specialist.create({
			data: {
				User_idUser,
				User_credential_users_idcredential_users,
				User_rol_idrol,
				spec_data_idspec_data,
				SpecialistHasSpecialty: {
					create: {
						specialty_idspecialty,
					},
				},
			},
		});
		res.status(201).json(profesional);
	} catch (error) {
		res.status(400).json({ error: "Error al crear el especialista", details: error });
	}
};

// Actualizar el estado del Especialista (en tabla USER)
export const updateProfessionalStatus = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const { status } = req.body;

	try {
		const professional = await prisma.specialist.findUnique({
			where: { id },
			include: {
				User: true,
			},
		});

		if (!professional) {
			res.status(404).json({ error: "Especialista no encontrado" });
			return;
		}

		const updatedUser = await prisma.user.update({
			where: {
				id: professional.User.id,
			},
			data: {
				status: status,
			},
		});

		res.json({ message: "Estado actualizado", user: updatedUser });
	} catch (error) {
		res.status(400).json({
			error: "Error al actualizar estado del especialista",
			details: error,
		});
	}
};

// Eliminar Especialista
export const deleteProfessional = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	try {
		await prisma.specialist.delete({ where: { id } });
		res.json({ message: "Especialista eliminado correctamente" });
	} catch (error) {
		res.status(400).json({ error: "Error al eliminar el especialista", details: error });
	}
};

// Obtener Especialistas por especialidad (con datos mapeados para el frontend)
export const getProfessionalsBySpecialty = async (req: Request, res: Response) => {
	const specialtyId = Number(req.params.specialtyId);

	try {
		const professionals = await prisma.specialist.findMany({
			where: {
				SpecialistHasSpecialty: {
					some: {
						specialty_idspecialty: specialtyId,
					},
				},
			},
			include: {
				spec_data: true,
				User: true,
				SpecialistHasSpecialty: {
					include: {
						Specialty: true,
					},
				},
			},
		});

		// Mapear datos para el frontend
		const mapped = await Promise.all(
			professionals.map(async (pro) => {
				const reviews = await prisma.specialtyReview.findMany({
					where: {
						specialty_id: specialtyId,
						user_id: pro.User.id,
						user_cred_id: pro.User.credential_users_idcredential_users,
						user_rol_id: pro.User.rol_idrol,
					},
				});

				const avgRating =
					reviews.length > 0
						? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(
								1
						  )
						: "0.0";

				return {
					id: pro.id,
					name: `${pro.User.firstname} ${pro.User.lastname}`,
					specialty: pro.SpecialistHasSpecialty[0]?.Specialty.name ?? "Sin especialidad",
					experience: pro.spec_data.working_experience,
					rating: avgRating,
					education: Buffer.from(pro.spec_data.educational_certificates).toString("utf8"),
					certifications: [Buffer.from(pro.spec_data.degrees).toString("utf8")],
					consultations: pro.spec_data.consultations,
					status: pro.User.status.toLowerCase(),
				};
			})
		);

		res.json(mapped);
	} catch (error) {
		res.status(500).json({
			error: "Error al obtener Especialistas por especialidad",
			details: error,
		});
	}
};

export const getProfessionalRating = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	try {
		const reviews = await prisma.specialtyReview.findMany({
			where: {
				user_id: id,
			},
		});

		const avg =
			reviews.length > 0
				? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
				: "0.0";

		res.json({ avg });
	} catch (err) {
		res.status(500).json({ error: "Error al obtener el rating" });
	}
};

