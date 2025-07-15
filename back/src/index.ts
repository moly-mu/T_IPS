import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import app from "./app";

dotenv.config();

const prisma = new PrismaClient();

// Endpoint de prueba para la DB
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
