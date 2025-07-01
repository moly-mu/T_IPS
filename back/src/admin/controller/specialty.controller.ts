// src/admin/controller/specialty.controller.ts

import type { Request, Response } from "express";
import { PrismaClient, SpecialtyStatus } from "@prisma/client";

const prisma = new PrismaClient();

// Crear una especialidad
export const createSpecialty = async (req: Request, res: Response) => {
  try {
    const { name, status, price, service, duration } = req.body;

    const existing = await prisma.specialty.findUnique({
      where: { name },
    });

    if (existing) {
      return res.status(409).json({ error: `La especialidad "${name}" ya existe.` });
    }

    const specialty = await prisma.specialty.create({
      data: {
        name,
        status: status ?? SpecialtyStatus.Inactivo,
        price: price ?? 0,
        service: service ?? "",
        duration: duration ?? 30,
      },
    });

    res.status(201).json(specialty);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la especialidad", details: error });
  }
};

// Obtener todas las especialidades
export const getSpecialties = async (_req: Request, res: Response) => {
  try {
    const specialties = await prisma.specialty.findMany();
    res.json(specialties);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener especialidades", details: error });
  }
};

// Obtener una especialidad por ID
export const getSpecialtyById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  try {
    const specialty = await prisma.specialty.findUnique({ where: { id } });
    if (!specialty) return res.status(404).json({ error: "Especialidad no encontrada" });
    res.json(specialty);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar la especialidad", details: error });
  }
};

// Actualizar una especialidad
export const updateSpecialty = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  const { name, status, price, service, duration } = req.body;

  try {
    const updated = await prisma.specialty.update({
      where: { id },
      data: { name, status, price, service, duration },
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar la especialidad", details: error });
  }
};

// Eliminar una especialidad
export const deleteSpecialty = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  try {
    await prisma.specialty.delete({ where: { id } });
    res.json({ message: "Especialidad eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar la especialidad", details: error });
  }
};

// Verificar si existe una especialidad por nombre
export const checkSpecialtyByName = async (req: Request, res: Response) => {
  const { name } = req.query;
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "El parámetro 'name' es requerido como string." });
  }

  try {
    const specialty = await prisma.specialty.findFirst({
      where: { name },
      select: {
        id: true,
        name: true,
        status: true,
        service: true,
        duration: true,
        price: true
      }
    });

    if (specialty) {
      return res.json({ exists: true, ...specialty });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al verificar la especialidad", details: error });
  }
};
