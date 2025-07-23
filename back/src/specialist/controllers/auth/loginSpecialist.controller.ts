import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../middleware/authMiddleware";
import { loginSpecialistService } from "../../services/auth/loginSpecialist.service";

export const loginSpecialist = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await loginSpecialistService({email, password});

    if (result.error) {
      if (
        result.error === "No estás registrado como especialista" ||
        result.error === "Tu cuenta aún no ha sido aprobada"
      ) {
        return res.status(403).json({ message: result.error });
      }
      return res.status(401).json({ message: result.error });
    }

    const { user } = result;

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