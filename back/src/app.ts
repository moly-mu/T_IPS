import express from "express";
import cors from "cors";
import userRoutes from "./user/routes/user.routes";
import adminProfRoutes from "./admin/routes/profesional.routes";
import adminSpecialRoutes from "./admin/routes/specialty.routes";
import adminPatientRoutes from "./admin/routes/patient.routes";
import adminStatsRoutes from "./admin/routes/stats.routes";
import specialistRequest from "./specialist/routes/specialistRequest.routes";
import specialistSettings from "./specialist/routes/specialistSettings.routes";
import specialistAppointments from './specialist/routes/specialistAppointments.routes'
import specialistDashboard from './specialist/routes/specialisttDashboard.routes';
import dotenv from 'dotenv';
import specialistAuthRoutes from "./specialist/routes/specialistAuth.routes";
import getAllSpecialties from "./admin/specialties/routes/specialties.routes";

const app = express();

app.use(cors());
app.use(express.json({limit:'10mb'}));
dotenv.config();

// *Rutas de usuario
app.use("/api", userRoutes); // /api/register, /api/login, /api/request-specialist


// *Rutas de administración
app.use("/admin/profesional", adminProfRoutes);
app.use("/admin/specialty", adminSpecialRoutes);
app.use("/admin/patient", adminPatientRoutes);
app.use("/admin/stats", adminStatsRoutes);
app.use("/admin/test", getAllSpecialties);

//*Rutas de especialista
app.use("/specialist", specialistRequest);
app.use("/specialist/settings", specialistSettings);
app.use("/specialist/appointments",specialistAppointments);
app.use("/specialist/dashboard", specialistDashboard);
app.use("/specialist/auth", specialistAuthRoutes);

export default app;
