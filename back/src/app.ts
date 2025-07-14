import express from "express";
import cors from "cors";
import userRoutes from "./user/routes/user.routes";
import adminProfRoutes from "./admin/routes/profesional.routes";
import adminSpecialRoutes from "./admin/routes/specialty.routes";
import adminPatientRoutes from "./admin/routes/patient.routes";
import specialistRequest from "./specialist/routes/specialistRequest.routes";
import specialistSettings from "./specialist/routes/specialistSettings.routes";
import specialistAppointments from './specialist/routes/specialistAppointments.routes'
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));
dotenv.config();

// *Rutas de usuario
app.use("/api", userRoutes); // /api/register, /api/login, /api/request-specialist


// *Rutas de administración
app.use("/admin/profesional", adminProfRoutes);
app.use("/admin/specialty", adminSpecialRoutes);
app.use("/admin/patient", adminPatientRoutes);

//*Rutas de especialista
app.use("/specialist", specialistRequest);
app.use("/specialist/settings", specialistSettings);
app.use("/specialist/appointments",specialistAppointments);

app.use((req, res, next) => {
  console.log("🌍 Solicitud recibida en:", req.method, req.url);
  next();
});
//* Manejo de errores global
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("💥 Error no capturado:", err);

  res.status(err.status || 500).json({
    message: err.message || 'Error inesperado',
    error: process.env.NODE_ENV === 'development' ? err : undefined,
  });
});
export default app;
