import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import cors from "cors";

// import adminRoutes from "./admin/routes/admin.routes"; // rutas de admin (dashboard)
import adminProfRoutes from "./admin/routes/profesional.routes"; // rutas de profesionales
import adminSpecialRoutes from "./admin/routes/specialty.routes"; // rutas de especialidades
import adminPatientRoutes from "./admin/routes/patient.routes" // rutas de pacientes / usuarios

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rutas principales
// app.use("/admin", adminRoutes);
app.use("/admin/profesional", adminProfRoutes); // Ejemplo: /admin/profesionales/all
app.use("/admin/specialty", adminSpecialRoutes) // Ejemplo: /admin/specialty/
app.use("/admin/patient", adminPatientRoutes) // Ejemplo: /admin/patient

// Endpoint de prueba de conexión a la DB
app.get("/ping", async (_req, res) => {
  try {
    const specialties = await prisma.specialty.findMany();
    res.json({ status: "ok", specialties });
  } catch (err) {
    res.status(500).json({ error: "No se pudo conectar a la DB", details: err });
  }
});

// Endpoint raíz
app.get("/", (_req, res) => {
  res.send("Backend funcionando ✅");
});

// Arrancar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
