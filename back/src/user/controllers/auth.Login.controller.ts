import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";


const prisma = new PrismaClient();

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const cred = await prisma.credentialUser.findUnique({ where: { email } });
    if (!cred){
      res.status(404).json({ message: "Credenciales no encontradas" });
      return;
    }  

    const isMatch = await bcrypt.compare(password, cred.password);
    if (!isMatch){
      res.status(401).json({ message: "Contraseña incorrecta" });
      return; 
    } 

    const user = await prisma.user.findFirst({
      where: { credential_users_idcredential_users: cred.id },
      include: { rol: true }
    });

    const token = jwt.sign({ id: user?.id }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: "Error al iniciar sesión", details: err });
  }
};
