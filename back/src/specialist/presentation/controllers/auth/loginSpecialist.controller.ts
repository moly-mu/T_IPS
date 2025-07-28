import { Request, Response } from "express";
import { SpecialistLoginInputSchema } from "../../../presentation/validators/specialistSchemas";
import { loginSpecialistService } from "../../../aplication/use-cases/auth/loginSpecialist.service";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../../middleware/authMiddleware";

export const loginSpecialistController = async (req: Request, res: Response) => {
  // Validar entrada con Zod
  const parseResult = SpecialistLoginInputSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      message: "Datos inválidos",
      errors: parseResult.error.issues,
    });
  }

  try {
    const result = await loginSpecialistService(parseResult.data);

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
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1d" });

    return res.status(200).json({
      message: "Login exitoso",
      token,
      userId: user.id,
      email: user.email,
      status: user.status,
    });
  } catch (error) {
    console.error("❌ Error al iniciar sesión:", error);
    return res.status(500).json({ message: "Error interno del servidor" })}};

export default loginSpecialistController;