import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

// Importaciondes rutas de User
import userRoutes from "./user/routes/user.routes";
import clinicalHistoryRoutes from "./user/presentation/routes/clinicalHistory";
import doctorAppointmentRoutes from "./user/routes/doctorAppointment.routes";

// Importaciones de rutas de administrador
import adminProfRoutes from "./admin/routes/profesional.routes";
import adminSpecialRoutes from "./admin/routes/specialty.routes";
import adminPatientRoutes from "./admin/routes/patient.routes";
import adminStatsRoutes from "./admin/routes/stats.routes";
import specialistRequest from "./specialist/presentation/routes/specialistRequest.routes";
import specialistSettings from "./specialist/presentation/routes/specialistSettings.routes";
import specialistAppointments from './specialist/presentation/routes/specialistAppointments.routes';
import specialistDashboard from './specialist/presentation/routes/specialisttDashboard.routes';
import specialistCalendar from './specialist/presentation/routes/specialistCalendar.routes';
import specialistAuthRoutes from "./specialist/presentation/routes/specialistAuth.routes";
import getAllSpecialties from "./admin/specialties/presentation/routes/specialties.routes";
import specialistRequestRoutes from "./admin/routes/specialistRequest.routes";

const app = express();

app.use(cors());
app.use(express.json({limit:'10mb'}));
dotenv.config();

// *Rutas de usuario
app.use("/api", userRoutes); // /api/register, /api/login, /api/request-specialist
app.use("/api/clinical-history", clinicalHistoryRoutes); // Rutas de Historia Clínica
app.use("/api/doctor-appointment", doctorAppointmentRoutes); // Rutas de Citas Médicas


// *Rutas de administración
app.use("/admin/profesional", adminProfRoutes);
app.use("/admin/specialty", adminSpecialRoutes);
app.use("/admin/patient", adminPatientRoutes);
app.use("/admin/stats", adminStatsRoutes);
app.use("/admin/test", getAllSpecialties);
app.use("/admin/specialist-requests", specialistRequestRoutes);

//*Rutas de especialista
app.use("/specialist", specialistRequest);
app.use("/specialist/settings", specialistSettings);
app.use("/specialist/appointments",specialistAppointments);
app.use("/specialist/dashboard", specialistDashboard);
app.use("/specialist/calendar", specialistCalendar);
app.use("/specialist/auth", specialistAuthRoutes);

export default app;
