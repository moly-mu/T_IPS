import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Obtener configuración completa de la cuenta
export const getAccountSettings = async (req: Request, res: Response) => {
  const userId = req.userId;
  
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        credential_users: {
          select: { 
            email: true,
            document: true
          }
        },
        rol: {
          select: {
            rol_name: true
          }
        },
        Especialista: {
          include: {
            spec_data: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const accountSettings = {
      personalInfo: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.credential_users.email,
        phone: user.phone,
        document: user.credential_users.document,
        birthdate: user.birthdate,
        gender: user.gender,
        language: user.language
      },
      accountStatus: {
        status: user.status,
        joinDate: user.joinDate,
        role: user.rol.rol_name
      },
      preferences: {
        language: user.language
      },
      securityInfo: {
        lastPasswordChange: new Date(), // Esto se podría agregar a la base de datos
        twoFactorEnabled: false // Funcionalidad futura
      }
    };

    res.json(accountSettings);
  } catch (error) {
    console.error("Error al obtener configuración de cuenta:", error);
    res.status(500).json({ 
      error: "Error al obtener configuración de cuenta", 
      details: error 
    });
  }
};

// Actualizar preferencias de cuenta
export const updateAccountPreferences = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { language, phone, notifications } = req.body;

  try {
    const updateData: any = {};
    
    if (language) updateData.language = language;
    if (phone) updateData.phone = phone;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData
    });

    res.json({
      message: "Preferencias actualizadas exitosamente",
      updatedFields: updateData
    });
  } catch (error) {
    console.error("Error al actualizar preferencias:", error);
    res.status(500).json({ 
      error: "Error al actualizar preferencias", 
      details: error 
    });
  }
};

// Verificar contraseña actual antes de cambios importantes
export const verifyCurrentPassword = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { currentPassword } = req.body;

  if (!currentPassword) {
    return res.status(400).json({ error: "Contraseña actual requerida" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        credential_users: {
          select: {
            password: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const isValidPassword = await bcrypt.compare(currentPassword, user.credential_users.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Contraseña actual incorrecta" });
    }

    res.json({ message: "Contraseña verificada correctamente" });
  } catch (error) {
    console.error("Error al verificar contraseña:", error);
    res.status(500).json({ 
      error: "Error al verificar contraseña", 
      details: error 
    });
  }
};

// Obtener actividad reciente de la cuenta
export const getAccountActivity = async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    // Obtener citas recientes
    const recentAppointments = await prisma.appointment.findMany({
      where: {
        Specialist: {
          User_idUser: userId
        }
      },
      include: {
        Paciente: {
          include: {
            User: true
          }
        },
        Specialty: true
      },
      orderBy: {
        appoint_init: 'desc'
      },
      take: 5
    });

    const activityLog = recentAppointments.map(appointment => ({
      id: appointment.id,
      type: 'appointment',
      description: `Cita con ${appointment.Paciente.User.firstname} ${appointment.Paciente.User.lastname}`,
      specialty: appointment.Specialty.name,
      date: appointment.appoint_init,
      status: appointment.state
    }));

    res.json({
      recentActivity: activityLog,
      totalAppointments: recentAppointments.length
    });
  } catch (error) {
    console.error("Error al obtener actividad de cuenta:", error);
    res.status(500).json({ 
      error: "Error al obtener actividad de cuenta", 
      details: error 
    });
  }
};

// Exportar datos de la cuenta (para GDPR/privacidad)
export const exportAccountData = async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        credential_users: {
          select: {
            email: true,
            document: true
          }
        },
        rol: true,
        Especialista: {
          include: {
            spec_data: true,
            SpecialistHasSpecialty: {
              include: {
                Specialty: true
              }
            },
            Appointments: {
              include: {
                Paciente: {
                  include: {
                    User: {
                      select: {
                        firstname: true,
                        lastname: true
                      }
                    }
                  }
                },
                Specialty: true
              }
            }
          }
        }
      }
    });

    if (!userData) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Filtrar datos sensibles antes del export
    const exportData = {
      personalInfo: {
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.credential_users.email,
        phone: userData.phone,
        birthdate: userData.birthdate,
        gender: userData.gender,
        language: userData.language,
        joinDate: userData.joinDate
      },
      accountInfo: {
        status: userData.status,
        role: userData.rol.rol_name
      },
      professionalInfo: userData.Especialista?.[0] ? {
        specialties: userData.Especialista[0].SpecialistHasSpecialty.map(s => s.Specialty.name),
        totalAppointments: userData.Especialista[0].Appointments.length
      } : null,
      exportDate: new Date().toISOString()
    };

    res.json({
      message: "Datos exportados exitosamente",
      data: exportData
    });
  } catch (error) {
    console.error("Error al exportar datos de cuenta:", error);
    res.status(500).json({ 
      error: "Error al exportar datos de cuenta", 
      details: error 
    });
  }
};
