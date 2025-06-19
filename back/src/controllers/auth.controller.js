import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';


export const register = async (req, res) => { /**
   * !Cambiarlo por los campos del Esquema de prisma */
  try {
    const {
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      tipoDocumento,
      numeroDocumento,
      correo,
      contraseña,
      rol = 'PACIENTE',
    } = req.body;

    const userExist = await prisma.user.findUnique({ where: { correo } });
    if (userExist) return res.status(400).json({ message: 'Correo ya registrado' });

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const user = await prisma.user.create({
      data: {
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        tipoDocumento,
        numeroDocumento,
        correo,
        contraseña: hashedPassword,
        rol,
      },
    });

    const token = jwt.sign({ id: user.id, rol: user.rol }, JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const user = await prisma.user.findUnique({ where: { correo } });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const isValid = await bcrypt.compare(contraseña, user.contraseña);
    if (!isValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, rol: user.rol }, JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

//Agendar citas, cambiar a partir del front
export const agendarCita = async (req, res) => {
  try {
    const { fecha, motivo, especialistaId, pacienteId } = req.body; //Cambiar campos a partir de el prisma

    const cita = await prisma.cita.create({ 
      data: {
        fecha,
        motivo,
        especialista: { connect: { id: especialistaId } },
        paciente: { connect: { id: pacienteId } },
      },
      include: {
        especialista: true,
        paciente: true,
      },
    });

    res.status(201).json({ message: 'Cita agendada con éxito', cita });
  } catch (error) {
    res.status(500).json({ message: 'Error al agendar cita', error: error.message });
  }
};

// Listar citas y cambiar a partir de la parselación de JSON del back 
export const listarCitas = async (req, res) => { 
  try {
    const citas = await prisma.cita.findMany({ 
      include: {
        especialista: true,
        paciente: true,
      },
    });

    res.status(200).json({ citas });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener citas', error: error.message });
  }
};
