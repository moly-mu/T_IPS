// src/index.ts
import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import adminRoutes from "./admin/routes/admin.routes";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json()); // Necesario para leer JSON en req.body
app.use("/admin", adminRoutes); // ✅ Esta línea conecta tus rutas de admin

app.get("/ping", async (req, res) => {
  try {
    const specialties = await prisma.specialty.findMany();
    res.json({ status: "ok", specialties });
  } catch (err) {
    res.status(500).json({ error: "No se pudo conectar a la DB", details: err });
  }
});

app.get("/", (req, res) => {
  res.send("Backend funcionando ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
