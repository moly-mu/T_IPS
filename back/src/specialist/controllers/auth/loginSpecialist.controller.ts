import { Request, Response } from "express";
import { PrismaClient,UserStatus } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { SECRET_KEY } from "../../middleware/authMiddleware"; // O donde tengas la clave

const prisma = new PrismaClient();

export const loginSpecialist = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // 1. Buscar credencial por email
    const credential = await prisma.credentialUser.findUnique({
      where: { email },
      include: {
        User: {
          include: {
            Especialista: true, // Relación con especialista
            rol: true           // Relación con rol
          }
        }
      }
    });

    if (!credential || credential.User.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    // Suponemos un usuario por credencial
    const user = credential.User[0];

    // 2. Verificar si es especialista
    if (!user.Especialista || user.Especialista.length === 0) {
      return res.status(403).json({ message: "No estás registrado como especialista" });
    }

    // 3. Verificar estado del usuario
    if (user.status !== UserStatus.Activo) {
      return res.status(403).json({ message: "Tu cuenta aún no ha sido aprobada" });
    }

    // 4. Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, credential.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // 5. Generar token
    const token = jwt.sign({ id: user.id }, SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login exitoso",
      token,
      userId: user.id,
    });
  } catch (error) {
    console.error("❌ Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
