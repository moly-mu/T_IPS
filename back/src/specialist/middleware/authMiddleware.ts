import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const SECRET_KEY = process.env.JWT_SECRET || "mi_clave_secreta";

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  
  const authHeader = req.headers.authorization;
  
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
     res.status(401).json({ message: 'Token no proporcionado o malformado' });
    return;
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: number };
    // Puedes guardar el payload en req.user para usarlo luego
    req.user = decoded;
    req.userId = decoded.id; // Asumiendo que el ID del usuario está en el payload
    
    next();
  } catch (err) {
    console.error("❌ Token inválido o expirado:", err);
    res.status(403).json({ message: 'Token inválido o expirado' });
    return;
  }
};
