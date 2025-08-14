import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createAdminUser = async () => {
  try {
    // Verificar si ya existe un admin
    const existingAdmin = await prisma.admin.findUnique({
      where: { username: "admin@ips.com" }
    });

    if (existingAdmin) {
      console.log("❌ Admin ya existe!");
      return;
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Crear el admin
    const admin = await prisma.admin.create({
      data: {
        username: "admin@ips.com",
        password: hashedPassword
      }
    });

    console.log("✅ Admin creado exitosamente:");
    console.log("Email: admin@ips.com");
    console.log("Password: admin123");
    console.log("ID:", admin.id);

  } catch (error) {
    console.error("❌ Error al crear admin:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createAdminUser();
