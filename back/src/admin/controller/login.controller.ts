import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Clave secreta para JWT
const SECRET_KEY = process.env.JWT_SECRET || "mi_secreto_super_seguro";

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validar que se proporcionen email y password
    if (!email || !password) {
      return res.status(400).json({ 
        error: "Email y contraseña son requeridos" 
      });
    }

    // Buscar el admin en la base de datos por username (asumiendo que se usa email como username)
    const admin = await prisma.admin.findUnique({
      where: { username: email },
    });

    if (!admin) {
      return res.status(401).json({ 
        error: "Credenciales inválidas" 
      });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: "Credenciales inválidas" 
      });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { 
        id: admin.id, 
        username: admin.username,
        role: "admin" 
      },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    // Respuesta exitosa
    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: admin.id,
        username: admin.username,
        role: "admin"
      }
    });

  } catch (error) {
    console.error("Error en login de admin:", error);
    res.status(500).json({ 
      error: "Error interno del servidor" 
    });
  }
};

export const verifyToken = async (req: Request, res: Response) => {
  try {
    // El middleware ya verificó el token, solo devolvemos los datos del usuario
    const user = (req as any).user;
    
    res.json({
      valid: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Error al verificar token:", error);
    res.status(500).json({ 
      error: "Error interno del servidor" 
    });
  }
};
