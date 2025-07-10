import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'mi_clave_secreta';

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log("🔐 Encabezado Authorization recibido:", authHeader); //! Eliminar log

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
     res.status(401).json({ message: 'Token no proporcionado o malformado' });
    return;
  }

  const token = authHeader.split(' ')[1];
  console.log("🧾 Token extraído:", token); //! Eliminar log

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("✅ Token válido. Payload decodificado:", decoded); //! Eliminar log
    // Puedes guardar el payload en req.user para usarlo luego
    req.user = decoded;

    // *Si el token contiene un campo `id`, lo pasamos como `userId`
    // *(esto depende de cómo se generó el token)
    if (typeof decoded === 'object' && 'id' in decoded) {
      req.userId = decoded.id;
      console.log("🧑‍💻 userId asignado a req.userId:", req.userId);
    } else {
      console.warn("⚠️ El token no contiene un campo `id`");
    }

    next();
  } catch (err) {
    console.error("❌ Token inválido o expirado:", err);
    res.status(403).json({ message: 'Token inválido o expirado' });
    return;
  }
};
