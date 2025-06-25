import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

import adminRoutes from "./admin/routes/admin.routes";
import adminProfRoutes from "./admin/routes/profesional.routes"; // rutas de profesionales

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Rutas principales
app.use("/admin", adminRoutes);
app.use("/admin/profesionales", adminProfRoutes); // Ejemplo: /admin/profesionales/all

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
