import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Configuración del transportador de email
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true para puerto 465, false para otros puertos
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Generar código de verificación de 6 dígitos
export const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generar token de verificación único
export const generateVerificationToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Enviar email con código de verificación (Método 1)
export const sendVerificationCode = async (
  email: string, 
  code: string, 
  userName: string
): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"IPS Medical" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Verificación de cuenta - IPS Medical',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Verificación de cuenta</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2c3e50; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 30px; }
            .code { 
              font-size: 32px; 
              font-weight: bold; 
              color: #2c3e50; 
              text-align: center; 
              background-color: white; 
              padding: 20px; 
              border: 2px dashed #3498db; 
              margin: 20px 0; 
              letter-spacing: 3px;
            }
            .footer { background-color: #34495e; color: white; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>IPS Medical</h1>
              <h2>Verificación de cuenta</h2>
            </div>
            <div class="content">
              <h3>Hola ${userName},</h3>
              <p>¡Bienvenido a IPS Medical! Para completar tu registro, necesitamos verificar tu dirección de correo electrónico.</p>
              <p>Tu código de verificación es:</p>
              <div class="code">${code}</div>
              <p><strong>Instrucciones:</strong></p>
              <ol>
                <li>Copia el código de arriba</li>
                <li>Ve a la página de verificación</li>
                <li>Ingresa el código en el campo correspondiente</li>
                <li>Haz clic en "Verificar cuenta"</li>
              </ol>
              <p><strong>Importante:</strong> Este código expira en 15 minutos por seguridad.</p>
              <p>Si no solicitaste esta verificación, puedes ignorar este email.</p>
            </div>
            <div class="footer">
              <p>IPS Medical - Sistema de gestión médica</p>
              <p>Este es un email automático, por favor no respondas.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Código de verificación enviado a: ${email}`);
    return true;
  } catch (error) {
    console.error('Error al enviar código de verificación:', error);
    return false;
  }
};

// Enviar email con botón de verificación (Método 2)
export const sendVerificationToken = async (
  email: string, 
  token: string, 
  userName: string
): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email?token=${token}`;
    
    const mailOptions = {
      from: `"IPS Medical" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Verificación de cuenta - IPS Medical',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Verificación de cuenta</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2c3e50; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 30px; }
            .button { 
              display: inline-block; 
              background-color: #3498db; 
              color: white; 
              padding: 15px 30px; 
              text-decoration: none; 
              border-radius: 5px; 
              font-weight: bold; 
              text-align: center; 
              margin: 20px 0;
            }
            .button:hover { background-color: #2980b9; }
            .footer { background-color: #34495e; color: white; padding: 15px; text-align: center; font-size: 12px; }
            .link { word-break: break-all; color: #3498db; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>IPS Medical</h1>
              <h2>Verificación de cuenta</h2>
            </div>
            <div class="content">
              <h3>Hola ${userName},</h3>
              <p>¡Bienvenido a IPS Medical! Para completar tu registro, necesitamos verificar tu dirección de correo electrónico.</p>
              <p>Haz clic en el botón de abajo para verificar tu cuenta:</p>
              <div style="text-align: center;">
                <a href="${verificationUrl}" class="button">Verificar Cuenta</a>
              </div>
              <p><strong>Importante:</strong> Este enlace expira en 24 horas por seguridad.</p>
              <p>Si el botón no funciona, puedes copiar y pegar el siguiente enlace en tu navegador:</p>
              <p class="link">${verificationUrl}</p>
              <p>Si no solicitaste esta verificación, puedes ignorar este email.</p>
            </div>
            <div class="footer">
              <p>IPS Medical - Sistema de gestión médica</p>
              <p>Este es un email automático, por favor no respondas.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Token de verificación enviado a: ${email}`);
    return true;
  } catch (error) {
    console.error('Error al enviar token de verificación:', error);
    return false;
  }
};

// Enviar email de bienvenida después de verificación exitosa
export const sendWelcomeEmail = async (
  email: string, 
  userName: string
): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"IPS Medical" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '¡Cuenta verificada exitosamente! - IPS Medical',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Cuenta verificada</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #27ae60; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 30px; }
            .success { color: #27ae60; font-size: 18px; font-weight: bold; text-align: center; }
            .footer { background-color: #34495e; color: white; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>IPS Medical</h1>
              <h2>¡Cuenta Verificada!</h2>
            </div>
            <div class="content">
              <div class="success">✅ ¡Tu cuenta ha sido verificada exitosamente!</div>
              <h3>Hola ${userName},</h3>
              <p>¡Felicitaciones! Tu cuenta en IPS Medical ha sido verificada correctamente y ya puedes acceder a todos nuestros servicios.</p>
              <p><strong>Lo que puedes hacer ahora:</strong></p>
              <ul>
                <li>Agendar citas médicas</li>
                <li>Consultar tu historial médico</li>
                <li>Realizar teleconsultas</li>
                <li>Gestionar tu perfil</li>
              </ul>
              <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
              <p>¡Bienvenido a la familia IPS Medical!</p>
            </div>
            <div class="footer">
              <p>IPS Medical - Sistema de gestión médica</p>
              <p>Este es un email automático, por favor no respondas.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email de bienvenida enviado a: ${email}`);
    return true;
  } catch (error) {
    console.error('Error al enviar email de bienvenida:', error);
    return false;
  }
};
