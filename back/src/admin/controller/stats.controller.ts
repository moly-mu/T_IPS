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

      const age =
        new Date().getFullYear() - new Date(patient.birthdate).getFullYear();
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

export const getIncomeBySpecialty = async (_req: Request, res: Response) => {
  try {
    // Obtener todas las especialidades
    const specialties = await prisma.specialty.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    // Fechas para filtrar
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    // Obtener todas las facturas con su cita asociada
    const invoices = await prisma.invoice.findMany({
      where: {
        created_at: {
          gte: lastMonthStart,
          lt: now,
        },
      },
      include: {
        Appointment: true,
      },
    });

    // Calcular ingresos por especialidad
    const specialtyData = specialties.map((specialty) => {
      // Filtrar facturas por especialidad
      const currentInvoices = invoices.filter(
        (inv) =>
          inv.Appointment?.appoint_specialtyId === specialty.id &&
          inv.created_at >= currentMonthStart
      );

      const lastInvoices = invoices.filter(
        (inv) =>
          inv.Appointment?.appoint_specialtyId === specialty.id &&
          inv.created_at >= lastMonthStart &&
          inv.created_at < currentMonthStart
      );

      const current = currentInvoices.reduce((sum, inv) => sum + inv.amount, 0);
      const last = lastInvoices.reduce((sum, inv) => sum + inv.amount, 0);

      const trend =
        last > 0 ? (((current - last) / last) * 100).toFixed(1) : "0.0";

      return {
        id: specialty.id,
        name: specialty.name,
        income: `$${current.toLocaleString("es-ES")}`,
        trend: `${trend}% este mes`,
      };
    });

    // Total general
    const totalIncome = specialtyData.reduce((sum, s) => {
      const amount = Number(s.income.replace(/[^0-9.-]+/g, ""));
      return sum + amount;
    }, 0);

    const allSpecialty = {
      id: "todas",
      name: "Todas las especialidades",
      income: `$${totalIncome.toLocaleString("es-ES")}`,
      trend: "+15% este mes", // opcional: podrías calcularlo igual que los demás
    };

    const result = [allSpecialty, ...specialtyData];

    res.json(result);
  } catch (error) {
    console.error("Error al obtener ingresos por especialidad:", error);
    res.status(500).json({ error: "Error al obtener ingresos" });
  }
};
