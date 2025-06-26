import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Token no encontrado' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.usuario.findFirst({
            where: { idUsuario: decoded.idUsuario },
        });

        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        if (user.permisos !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado: no eres admin' });
        }

        req.user = user; 
        next();
    } catch (err) {
        console.error(err);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token inválido' });
        }
        res.status(500).json({ message: 'Error en autorización' });
    }
}