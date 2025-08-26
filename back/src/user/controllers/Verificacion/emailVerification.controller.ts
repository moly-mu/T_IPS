import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { sendWelcomeEmail } from "../../../shared/services/emailService";

const prisma = new PrismaClient();

// Verificar código de 6 dígitos (Método 1)
export const verifyCode = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ 
      error: "Email y código son requeridos." 
    });
  }

  try {
    // Buscar el usuario por email
    const credentials = await prisma.credentialUser.findUnique({
      where: { email },
      include: { User: true }
    });

    if (!credentials) {
      return res.status(404).json({ 
        error: "Usuario no encontrado." 
      });
    }

    // Verificar si ya está verificado
    if (credentials.emailVerified) {
      return res.status(400).json({ 
        error: "La cuenta ya está verificada." 
      });
    }

    // Verificar el código
    if (credentials.verificationCode !== code) {
      return res.status(400).json({ 
        error: "Código de verificación incorrecto." 
      });
    }

    // Verificar si el código ha expirado
    if (!credentials.codeExpiresAt || new Date() > credentials.codeExpiresAt) {
      return res.status(400).json({ 
        error: "El código de verificación ha expirado. Solicita uno nuevo." 
      });
    }

    // Actualizar el estado de verificación
    await prisma.credentialUser.update({
      where: { id: credentials.id },
      data: {
        emailVerified: true,
        verificationCode: null,
        codeExpiresAt: null
      }
    });

    // Generar token JWT
    const token = jwt.sign(
      { id: credentials.User[0].id }, 
      process.env.JWT_SECRET || "secret", 
      { expiresIn: "1d" }
    );

    // Enviar email de bienvenida
    const user = credentials.User[0];
    const fullName = `${user.firstname} ${user.lastname}`;
    
    try {
      await sendWelcomeEmail(email, fullName);
    } catch (emailError) {
      console.error('Error al enviar email de bienvenida:', emailError);
    }

    console.log(`Cuenta verificada exitosamente: ${email}`);

    return res.status(200).json({
      message: "Cuenta verificada exitosamente.",
      token,
      user: {
        id: user.id,
        email: email,
        firstname: user.firstname,
        lastname: user.lastname,
        emailVerified: true
      }
    });

  } catch (error) {
    console.error("Error al verificar código:", error);
    return res.status(500).json({ 
      error: "Error interno del servidor." 
    });
  }
};

// Verificar token de enlace (Método 2)
export const verifyToken = async (req: Request, res: Response) => {
  const { token } = req.query;

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ 
      error: "Token de verificación requerido." 
    });
  }

  try {
    // Buscar el usuario por token
    const credentials = await prisma.credentialUser.findFirst({
      where: { verificationToken: token },
      include: { User: true }
    });

    if (!credentials) {
      return res.status(404).json({ 
        error: "Token de verificación inválido." 
      });
    }

    // Verificar si ya está verificado
    if (credentials.emailVerified) {
      return res.status(200).json({ 
        message: "La cuenta ya está verificada.",
        alreadyVerified: true
      });
    }

    // Verificar si el token ha expirado
    if (!credentials.tokenExpiresAt || new Date() > credentials.tokenExpiresAt) {
      return res.status(400).json({ 
        error: "El enlace de verificación ha expirado. Solicita uno nuevo." 
      });
    }

    // Actualizar el estado de verificación
    await prisma.credentialUser.update({
      where: { id: credentials.id },
      data: {
        emailVerified: true,
        verificationToken: null,
        tokenExpiresAt: null
      }
    });

    // Generar token JWT
    const user = credentials.User[0];
    const jwtToken = jwt.sign(
      { id: user.id }, 
      process.env.JWT_SECRET || "secret", 
      { expiresIn: "1d" }
    );

    // Enviar email de bienvenida
    const fullName = `${user.firstname} ${user.lastname}`;
    
    try {
      await sendWelcomeEmail(credentials.email, fullName);
    } catch (emailError) {
      console.error('Error al enviar email de bienvenida:', emailError);
    }

    console.log(`Cuenta verificada exitosamente: ${credentials.email}`);

    // Redirigir al frontend con el token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    return res.redirect(`${frontendUrl}/verification-success?token=${jwtToken}`);

  } catch (error) {
    console.error("Error al verificar token:", error);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    return res.redirect(`${frontendUrl}/verification-error`);
  }
};

// Reenviar código de verificación
export const resendCode = async (req: Request, res: Response) => {
  const { email, verificationType = 'code' } = req.body;

  if (!email) {
    return res.status(400).json({ 
      error: "Email es requerido." 
    });
  }

  try {
    const credentials = await prisma.credentialUser.findUnique({
      where: { email },
      include: { User: true }
    });

    if (!credentials) {
      return res.status(404).json({ 
        error: "Usuario no encontrado." 
      });
    }

    if (credentials.emailVerified) {
      return res.status(400).json({ 
        error: "La cuenta ya está verificada." 
      });
    }

    // Generar nuevos datos de verificación
    let updateData: any = {};
    
    if (verificationType === 'code') {
      const { generateVerificationCode } = await import("../../../shared/services/emailService");
      updateData.verificationCode = generateVerificationCode();
      updateData.codeExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos
      updateData.verificationToken = null;
      updateData.tokenExpiresAt = null;
    } else {
      const { generateVerificationToken } = await import("../../../shared/services/emailService");
      updateData.verificationToken = generateVerificationToken();
      updateData.tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas
      updateData.verificationCode = null;
      updateData.codeExpiresAt = null;
    }

    // Actualizar en la base de datos
    await prisma.credentialUser.update({
      where: { id: credentials.id },
      data: updateData
    });

    // Enviar nuevo email
    const user = credentials.User[0];
    const fullName = `${user.firstname} ${user.lastname}`;
    let emailSent = false;

    try {
      if (verificationType === 'code') {
        const { sendVerificationCode } = await import("../../../shared/services/emailService");
        emailSent = await sendVerificationCode(email, updateData.verificationCode, fullName);
      } else {
        const { sendVerificationToken } = await import("../../../shared/services/emailService");
        emailSent = await sendVerificationToken(email, updateData.verificationToken, fullName);
      }
    } catch (emailError) {
      console.error('Error al reenviar email:', emailError);
    }

    return res.status(200).json({
      message: verificationType === 'code' 
        ? "Nuevo código enviado a tu email." 
        : "Nuevo enlace de verificación enviado a tu email.",
      emailSent
    });

  } catch (error) {
    console.error("Error al reenviar verificación:", error);
    return res.status(500).json({ 
      error: "Error interno del servidor." 
    });
  }
};
