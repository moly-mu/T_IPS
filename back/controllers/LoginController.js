import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient()

export const requestUser = async (req, res) => {
    const{
        correo,
        contraseña,
    } =req.body

    try{
        const result = await prisma.user.findFirst({
            where: { correo }
        });

        if (!result) {
        return res.status(200).json({
            success: false,
            message: "La sesión no existe",
            color: "bg-red-500"
        });
        }

        console.log("Tipo de result.contraseña:", typeof result.contraseña);
            console.log("Valor de result.contraseña:", result.contraseña);

        const isPasswordValid = await bcrypt.compare(contraseña, result.contraseña)

        if (!isPasswordValid) {
            return res.status(200).json({
                success: false,
                message: "Contraseña incorrecta",
                color: "bg-red-500"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Inicio de sesión válido",
            color: "bg-green-500",
            user: {
                id: result.id,
                nombre: result.correo
            }
        });

    }catch(error){
        console.error("Error al guardar:", error);
        return res.status(500).json({
            success: false,
            error: "Algo salio mal al Iniciar sesion",
            message: "Algo fallo"
        })
    }
}