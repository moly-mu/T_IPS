import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

// Importaciondes rutas de User
import userRoutes from "./user/routes/user.routes";

// Importaciones de rutas de administrador
import adminProfRoutes from "./admin/routes/profesional.routes";
import adminSpecialRoutes from "./admin/routes/specialty.routes";
import adminPatientRoutes from "./admin/routes/patient.routes";
import adminStatsRoutes from "./admin/routes/stats.routes";
import getAllSpecialties from "./admin/specialties/presentation/routes/specialties.routes";
import specialistRequestRoutes from "./admin/routes/specialistRequest.routes";

// Importaciones de rutas de especialista
import specialistRequest from "./specialist/routes/specialistRequest.routes";
import specialistSettings from "./specialist/routes/specialistSettings.routes";
import specialistAppointments from './specialist/routes/specialistAppointments.routes'
import specialistDashboard from './specialist/routes/specialisttDashboard.routes';
import specialistAuthRoutes from "./specialist/routes/specialistAuth.routes";

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
app.use("/admin/specialist-requests", specialistRequestRoutes);

//*Rutas de especialista
app.use("/specialist", specialistRequest);
app.use("/specialist/settings", specialistSettings);
app.use("/specialist/appointments",specialistAppointments);
app.use("/specialist/dashboard", specialistDashboard);
app.use("/specialist/auth", specialistAuthRoutes);

export default app;
