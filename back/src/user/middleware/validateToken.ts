import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const validateToken = (
  req: Request & { userId?: number; email?: string; role?: string },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as DecodedToken;

    req.userId = decoded.id;
    req.email = decoded.email;
    req.role = decoded.role;

    next(); // Pasa al siguiente middleware o controlador
  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado." });
  }
};
