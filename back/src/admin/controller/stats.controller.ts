import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardStats = async (_req: Request, res: Response) => {
  try {
    // Usuarios activos (Pacientes)
    const totalUsuariosActivos = await prisma.user.count({
      where: {
        status: "Activo",
        rol_idrol: 1, // Paciente
      },
    });

    // Especialistas activos
    const totalEspecialistas = await prisma.user.count({
      where: {
        status: "Activo",
        rol_idrol: 2, // Especialista
      },
    });

    // Consultas completadas
    const totalConsultas = await prisma.appointment.count({
      where: {
        state: "Completada",
      },
    });

    // Ingresos totales
    const totalIngresos = await prisma.invoice.aggregate({
      _sum: {
        amount: true,
      },
    });

    // Obtener pacientes desde tabla user
    const allPatients = await prisma.user.findMany({
      where: {
        rol_idrol: 1, // Pacientes
      },
      select: {
        gender: true,
        birthdate: true,
      },
    });

    const ageGroups = {
      "18-30": 0,
      "31-45": 0,
      "46-60": 0,
      "60+": 0,
    };

    type Gender = "Masculino" | "Femenino" | "Otro";

    const genderCounts = {
      Masculino: 0,
      Femenino: 0,
      Otro: 0,
    };

    
      // Conteo por géner(o
      
    allPatients.forEach((patient) => {
      const gender = patient.gender;
      const normalized = (gender ?? "Otro") as Gender;
      if (genderCounts[normalized] !== undefined) {
        genderCounts[normalized]++;
      }

      const age = new Date().getFullYear() - new Date(patient.birthdate).getFullYear();
      if (age >= 18 && age <= 30) {
        ageGroups["18-30"]++;
      } else if (age >= 31 && age <= 45) {
        ageGroups["31-45"]++;
      } else if (age >= 46 && age <= 60) {
        ageGroups["46-60"]++;
      } else if (age > 60) {
        ageGroups["60+"]++;
      }

      // Conteo por
    });

    const totalPacientes = allPatients.length;

    const edades = Object.entries(ageGroups).map(([range, count]) => ({
      range,
      count,
      percentage:
        totalPacientes > 0
          ? ((count / totalPacientes) * 100).toFixed(1)
          : "0.0",
    }));

    const generos = Object.entries(genderCounts).map(([gender, count]) => ({
      gender,
      count,
      percentage:
        totalPacientes > 0
          ? ((count / totalPacientes) * 100).toFixed(1)
          : "0.0",
    }));

    res.json({
      usuariosActivos: totalUsuariosActivos,
      especialistas: totalEspecialistas,
      consultas: totalConsultas,
      ingresos: totalIngresos._sum.amount || 0,
      totalPacientes,
      edades,
      generos,
    });
  } catch (error) {
    console.error("Error al obtener estadísticas del dashboard:", error);
    res.status(500).json({ error: "Error al obtener estadísticas" });
  }
};
