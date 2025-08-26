import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";// asegúrate que exportes prisma en ese archivo
import app from "./app";

dotenv.config();
const prisma = new PrismaClient();
// Endpoint de prueba para la DB
app.get("/ping", async (_req, res) => {
  try {
    const specialties = await prisma.specialty.findMany();
    res.json({ status: "ok", specialties });
  } catch (err) {
    console.error("❌ Error en /ping:", err);
    res.status(500).json({ error: "No se pudo conectar a la DB", details: err });
  }
});

// Endpoint raíz
app.get("/", (_req, res) => {
  res.send("Backend funcionando ✅");
});

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    // 🔌 Conectar Prisma antes de levantar el servidor
    await prisma.$connect();
    console.log("✅ Prisma conectado a la base de datos");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });

    // 🛑 Manejar cierre de la app limpiamente
    process.on("SIGINT", async () => {
      console.log("\n🛑 Cerrando servidor...");
      await prisma.$disconnect();
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      console.log("\n🛑 Cerrando servidor...");
      await prisma.$disconnect();
      process.exit(0);
    });

    // Prisma también emite beforeExit
    process.on("beforeExit", async () => {
      console.log("⚠️ beforeExit: desconectando Prisma");
      await prisma.$disconnect();
    });

  } catch (err) {
    console.error("❌ Error al iniciar el servidor:", err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
