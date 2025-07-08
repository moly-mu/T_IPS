import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Clave en el .env
const SECRET_KEY = process.env.JWT_SECRET || "mi_secreto_super_seguro";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	console.log("Authorization header:", authHeader);

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		console.log("Token faltante o formato inválido");
		res.status(401).json({ error: "Token no proporcionado" });
		return
	}

	const token = authHeader.split(" ")[1];
	console.log("Token extraído:", token);

	try {
		const decoded = jwt.verify(token, SECRET_KEY);
		console.log("Token decodificado:", decoded);
		(req as any).user = decoded;
		next();
	} catch (err) {
		console.error("Error al verificar el token:", err);
		res.status(403).json({ error: "Token inválido o expirado" });
		return
	}
};
