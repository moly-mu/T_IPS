import { Request, Response } from 'express';
import { PrismaClient, UserStatus } from '@prisma/client';

const prisma = new PrismaClient();

// Crear orden médica
export const createMedicalOrder = async (req: Request, res: Response) => {
  try {
    const {
      appointmentId,
      specialist_idEspecialista,
      specialist_spec_data_idspec_data,
      specialist_User_idUser,
      specialist_User_credential_users_idcred,
      specialist_User_rol_idrol,
      patient_idPaciente,
      patient_pac_data_idpac_data,
      patient_User_idUser,
      patient_User_credential_users_idcred,
      patient_User_rol_idrol,
      description,
      instructions,
      status
    } = req.body;

    const medicalOrder = await prisma.medicalOrder.create({
      data: {
        appointmentId,
        specialist_idEspecialista,
        specialist_spec_data_idspec_data,
        specialist_User_idUser,
        specialist_User_credential_users_idcred,
        specialist_User_rol_idrol,
        patient_idPaciente,
        patient_pac_data_idpac_data,
        patient_User_idUser,
        patient_User_credential_users_idcred,
        patient_User_rol_idrol,
        description,
        instructions,
        status: (status as UserStatus) || 'Pendiente'
      }
    });

    res.status(201).json({
      success: true,
      message: 'Orden médica creada exitosamente',
      data: medicalOrder
    });
  } catch (error) {
    console.error('Error creating medical order:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Obtener órdenes médicas por paciente
export const getMedicalOrdersByPatient = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;

    const medicalOrders = await prisma.medicalOrder.findMany({
      where: {
        patient_idPaciente: parseInt(patientId)
      },
      include: {
        Appointment: {
          include: {
            Specialty: true
          }
        },
        Specialist: {
          include: {
            User: {
              select: {
                firstname: true,
                lastname: true
              }
            }
          }
        }
      },
      orderBy: {
        issuedAt: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      data: medicalOrders
    });
  } catch (error) {
    console.error('Error getting medical orders by patient:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Obtener órdenes médicas por especialista
export const getMedicalOrdersBySpecialist = async (req: Request, res: Response) => {
  try {
    const { specialistId } = req.params;

    const medicalOrders = await prisma.medicalOrder.findMany({
      where: {
        specialist_idEspecialista: parseInt(specialistId)
      },
      include: {
        Appointment: {
          include: {
            Specialty: true
          }
        },
        Patient: {
          include: {
            User: {
              select: {
                firstname: true,
                lastname: true
              }
            }
          }
        }
      },
      orderBy: {
        issuedAt: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      data: medicalOrders
    });
  } catch (error) {
    console.error('Error getting medical orders by specialist:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Obtener orden médica por ID
export const getMedicalOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const medicalOrder = await prisma.medicalOrder.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        Appointment: {
          include: {
            Specialty: true
          }
        },
        Specialist: {
          include: {
            User: {
              select: {
                firstname: true,
                lastname: true
              }
            }
          }
        },
        Patient: {
          include: {
            User: {
              select: {
                firstname: true,
                lastname: true
              }
            }
          }
        }
      }
    });

    if (!medicalOrder) {
      return res.status(404).json({
        success: false,
        message: 'Orden médica no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: medicalOrder
    });
  } catch (error) {
    console.error('Error getting medical order:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Actualizar orden médica
export const updateMedicalOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { description, instructions, status } = req.body;

    const updatedMedicalOrder = await prisma.medicalOrder.update({
      where: {
        id: parseInt(id)
      },
      data: {
        ...(description && { description }),
        ...(instructions && { instructions }),
        ...(status && { status: status as UserStatus })
      }
    });

    res.status(200).json({
      success: true,
      message: 'Orden médica actualizada exitosamente',
      data: updatedMedicalOrder
    });
  } catch (error) {
    console.error('Error updating medical order:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Cambiar estado de orden médica
export const updateMedicalOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['Activo', 'Inactivo', 'Pendiente'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Estado inválido. Debe ser: Activo, Inactivo o Pendiente'
      });
    }

    const updatedMedicalOrder = await prisma.medicalOrder.update({
      where: {
        id: parseInt(id)
      },
      data: {
        status: status as UserStatus
      }
    });

    res.status(200).json({
      success: true,
      message: 'Estado de orden médica actualizado exitosamente',
      data: updatedMedicalOrder
    });
  } catch (error) {
    console.error('Error updating medical order status:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Eliminar orden médica
export const deleteMedicalOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.medicalOrder.delete({
      where: {
        id: parseInt(id)
      }
    });

    res.status(200).json({
      success: true,
      message: 'Orden médica eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error deleting medical order:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Obtener estadísticas de órdenes médicas
export const getMedicalOrderStats = async (req: Request, res: Response) => {
  try {
    const stats = await prisma.medicalOrder.groupBy({
      by: ['status'],
      _count: {
        id: true
      }
    });

    const totalOrders = await prisma.medicalOrder.count();

    res.status(200).json({
      success: true,
      data: {
        total: totalOrders,
        byStatus: stats.map(stat => ({
          status: stat.status,
          count: stat._count.id
        }))
      }
    });
  } catch (error) {
    console.error('Error getting medical order stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
