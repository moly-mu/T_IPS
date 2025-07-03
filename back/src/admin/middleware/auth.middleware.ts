import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Deberías tener esta clave en un .env
const SECRET_KEY = process.env.JWT_SECRET || "mi_secreto_super_seguro";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		res.status(401).json({ error: "Token no proporcionado" });
        return;
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, SECRET_KEY);
		// puedes guardar los datos del usuario en req.user si lo necesitas luego
		(req as any).user = decoded;
		next();
	} catch (err) {
		res.status(403).json({ error: "Token inválido o expirado" });
        return;
	}
};
