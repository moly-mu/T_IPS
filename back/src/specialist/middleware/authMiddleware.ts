import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET!;

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  console.log("🛡️ Middleware validateToken ejecutado");//!Eliminar
  const authHeader = req.headers.authorization;
  console.log("📋 Header Authorization:", authHeader);
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
     res.status(401).json({ message: 'Token no proporcionado o malformado' });
    return;
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: number };
    // Puedes guardar el payload en req.user para usarlo luego
    req.user = decoded;
    req.userId = decoded.userId;
    console.log("✅ Token verificado. userId extraído:", req.userId);
    next();
  } catch (err) {
    console.error("❌ Token inválido o expirado:", err);
    res.status(403).json({ message: 'Token inválido o expirado' });
    return;
  }
};
