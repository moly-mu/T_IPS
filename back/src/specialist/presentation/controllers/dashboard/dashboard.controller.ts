import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardMetrics = async (req: Request, res: Response) => {
	try {
		const now = new Date();
		const today = new Date(now);
		today.setHours(0, 0, 0, 0);
		const endOfDay = new Date(now);
		endOfDay.setHours(23, 59, 59, 999);
		const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

		// Métricas principales
		const [usuariosActivos, especialistas, consultasHoy, totalIngresos, promedioRating] =
			await Promise.all([
				prisma.user.count({
					where: {
						status: "Activo",
					},
				}),
				prisma.specialist.count(),
				prisma.appointment.count({
					where: {
						appoint_init: {
							gte: today,
							lt: endOfDay,
						},
					},
				}),
				prisma.invoice.aggregate({
					_sum: {
						amount: true,
					},
				}),
				prisma.userReview.aggregate({
					_avg: {
						rating: true,
					},
				}),
			]);

		// Actividad reciente (últimas 5 actividades)
		const [recentAppointments, recentPayments, recentReviews] = await Promise.all([
			prisma.appointment.findMany({
				take: 3,
				orderBy: { appoint_init: "desc" },
				include: {
					Paciente: {
						include: {
							User: true,
						},
					},
					Specialist: {
						include: {
							User: true,
						},
					},
				},
			}),
			prisma.invoice.findMany({
				take: 2,
				orderBy: { issuedDate: "desc" },
				include: {
					Patient: {
						include: {
							User: true,
						},
					},
				},
			}),
			prisma.userReview.findMany({
				take: 1,
				orderBy: { createdAt: "desc" },
				include: {
					reviewer: true,
				},
			}),
		]);

		// Formatear actividad reciente
		const actividadReciente = [
			...recentAppointments.map((apt) => ({
				tipo: "cita",
				nombre: `${apt.Paciente.User.firstname} ${apt.Paciente.User.lastname}`,
				tiempo: getTimeAgo(apt.appoint_init),
				icono: "Calendar",
				fechaOriginal: apt.appoint_init, // Para ordenamiento
			})),
			...recentPayments.map((payment) => ({
				tipo: "pago",
				nombre: `${payment.Patient.User.firstname} ${payment.Patient.User.lastname}`,
				tiempo: getTimeAgo(payment.issuedDate),
				icono: "DollarSign",
				fechaOriginal: payment.issuedDate, // Para ordenamiento
			})),
			...recentReviews.map((review) => ({
				tipo: "comentario",
				nombre: `${review.reviewer.firstname} ${review.reviewer.lastname}`,
				tiempo: getTimeAgo(review.createdAt),
				icono: "MessageSquare",
				fechaOriginal: review.createdAt, // Para ordenamiento
			})),
		]
			.sort(
				(a, b) => new Date(b.fechaOriginal).getTime() - new Date(a.fechaOriginal).getTime()
			)
			.slice(0, 5)
			.map((item) => {
				// Remover fechaOriginal del resultado final
				const { fechaOriginal, ...rest } = item;
				return rest;
			});

		//Funcion para calcular edad 
		function calcularEdad(birthdate: Date): number {
  			const hoy = new Date();
			let edad = hoy.getFullYear() - birthdate.getFullYear();
			const m = hoy.getMonth() - birthdate.getMonth();
			if (m < 0 || (m === 0 && hoy.getDate() < birthdate.getDate())) {
				edad--;
			}
			return edad;
		}
		// Demografía por edad
		const users = await prisma.user.findMany({
		where: { status: "Activo" },
		select: { birthdate: true },
		});

		// Mapear edades a partir de birthdate
		const usersWithAge = users.map(user => ({
		age: calcularEdad(user.birthdate),
		}));

const demografiaEdad = calculateAgeGroups(usersWithAge);



		// Demografía por género
		const genderStats = await prisma.user.groupBy({
			by: ["gender"],
			where: { status: "Activo" },
			_count: {
				gender: true,
			},
		});

		const demografiaGenero = {
			mujeres:
				genderStats.find(
					(g) =>
						g.gender.toLowerCase().includes("mujer") ||
						g.gender.toLowerCase().includes("femenino")
				)?._count.gender || 0,
			hombres:
				genderStats.find(
					(g) =>
						g.gender.toLowerCase().includes("hombre") ||
						g.gender.toLowerCase().includes("masculino")
				)?._count.gender || 0,
		};

		// Visitas por día (últimos 30 días)
		const visitasPorDia = await generateVisitsPerDay(thirtyDaysAgo, today);

		// Próximas citas
		const proximasCitas = await prisma.appointment.findMany({
			where: {
				appoint_init: {
					gte: new Date(),
				},
				state: {
					not: "Cancelada",
				},
			},
			take: 5,
			orderBy: { appoint_init: "asc" },
			include: {
				Paciente: {
					include: {
						User: true,
					},
				},
				Specialty: true,
			},
		});

		const proximasCitasFormatted = proximasCitas.map((cita) => ({
			paciente: `${cita.Paciente.User.firstname} ${cita.Paciente.User.lastname}`,
			hora: formatTime(cita.appoint_init),
			tipo: cita.Specialty.name,
			fecha: formatDate(cita.appoint_init),
		}));

		// Comentarios recientes
		const comentariosRecientes = await prisma.userReview.findMany({
			take: 3,
			orderBy: { createdAt: "desc" },
			include: {
				reviewer: true,
			},
		});

		const comentariosFormatted = comentariosRecientes.map((comentario) => ({
			paciente: `${comentario.reviewer.firstname} ${comentario.reviewer.lastname.charAt(0)}.`,
			comentario: comentario.comment || "Sin comentario",
			rating: comentario.rating,
			tiempo: getTimeAgo(comentario.createdAt),
		}));

		return res.json({
			metricas: {
				usuariosActivos: {
					valor: usuariosActivos,
					cambio: 5,
					tipo: "positivo",
				},
				especialistas: {
					valor: especialistas,
					cambio: 3,
					tipo: "positivo",
				},
				consultasHoy: {
					valor: consultasHoy,
					cambio: 7,
					tipo: "positivo",
				},
				ingresos: {
					valor: totalIngresos._sum.amount || 0,
					cambio: 10,
					tipo: "positivo",
				},
				rating: {
					valor: parseFloat((promedioRating._avg.rating || 0).toFixed(1)),
					cambio: 0.2,
					tipo: "positivo",
				},
			},
			actividadReciente,
			demografiaEdad,
			demografiaGenero,
			visitasPorDia,
			proximasCitas: proximasCitasFormatted,
			comentariosRecientes: comentariosFormatted,
		});
	} catch (error) {
		console.error("Error en el dashboard:", error);
		return res.status(500).json({ error: "Error interno del servidor" });
	}
};

// Funciones auxiliares
function calculateAge(birthdate: Date): number {
	const today = new Date();
	const birthDate = new Date(birthdate);
	let age = today.getFullYear() - birthDate.getFullYear();
	const m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}

function getTimeAgo(date: Date): string {
	const now = new Date();
	const diffInMs = now.getTime() - date.getTime();
	const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
	const diffInHours = Math.floor(diffInMinutes / 60);
	const diffInDays = Math.floor(diffInHours / 24);
	const diffInWeeks = Math.floor(diffInDays / 7);
	const diffInMonths = Math.floor(diffInDays / 30);
	const diffInYears = Math.floor(diffInMonths / 12);

	if (diffInMinutes < 60) {
		return `${diffInMinutes} min`;
	} else if (diffInHours < 24) {
		return `${diffInHours} hora${diffInHours > 1 ? "s" : ""}`;
	} else if (diffInDays < 7) {
		return `${diffInDays} día${diffInDays > 1 ? "s" : ""}`;
	} else if (diffInWeeks < 4) {
		return `${diffInWeeks} semana${diffInWeeks > 1 ? "s" : ""}`;
	} else if (diffInMonths < 12) {
    return `${diffInMonths} mes${diffInMonths > 1 ? "s" : ""}`;
  } else {
    return `${diffInYears} año${diffInYears > 1 ? "s" : ""}`
  }
}

function calculateAgeGroups(users: { age: number }[]) {
	const groups = {
		"18-30": 0,
		"31-45": 0,
		"46-60": 0,
		"60+": 0,
	};

	users.forEach((user) => {
		if (user.age >= 18 && user.age <= 30) groups["18-30"]++;
		else if (user.age >= 31 && user.age <= 45) groups["31-45"]++;
		else if (user.age >= 46 && user.age <= 60) groups["46-60"]++;
		else if (user.age > 60) groups["60+"]++;
	});

	const total = users.length;
	const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500"];

	return Object.entries(groups).map(([rango, count], index) => ({
		rango,
		count,
		porcentaje: total > 0 ? Math.round((count / total) * 100) : 0,
		color: colors[index],
	}));
}

// Función para generar visitas por día
async function generateVisitsPerDay(startDate: Date, endDate: Date) {
	const visits = [];
	const currentDate = new Date(startDate);

	while (currentDate <= endDate) {
		const nextDate = new Date(currentDate);
		nextDate.setDate(nextDate.getDate() + 1);

		const count = await prisma.appointment.count({
			where: {
				appoint_init: {
					gte: currentDate,
					lt: nextDate,
				},
			},
		});

		visits.push({
			fecha: formatDate(currentDate),
			visitas: count,
		});

		currentDate.setDate(currentDate.getDate() + 1);
	}

	return visits;
}

// Función para formatear tiempo
function formatTime(date: Date): string {
	return date.toLocaleTimeString("es-ES", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});
}

// Función para formatear fecha
function formatDate(date: Date): string {
	return date.toLocaleDateString("es-ES", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
}
