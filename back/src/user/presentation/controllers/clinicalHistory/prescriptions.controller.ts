import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Crear receta médica
export const createPrescription = async (req: Request, res: Response) => {
  try {
    const {
      medicalHistoryId,
      medicine,
      dosage,
      frequency,
      duration,
      indications,
      issuedAt,
      sentBy
    } = req.body;

    const prescription = await prisma.prescription.create({
      data: {
        medicalHistoryId,
        medicine,
        dosage,
        frequency,
        duration,
        indications,
        issuedAt: issuedAt ? new Date(issuedAt) : new Date(),
        sentBy
      }
    });

    res.status(201).json({
      success: true,
      message: 'Receta médica creada exitosamente',
      data: prescription
    });
  } catch (error) {
    console.error('Error creating prescription:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Obtener recetas médicas por historia clínica
export const getPrescriptionsByHistory = async (req: Request, res: Response) => {
  try {
    const { medicalHistoryId } = req.params;

    const prescriptions = await prisma.prescription.findMany({
      where: {
        medicalHistoryId: parseInt(medicalHistoryId)
      },
      orderBy: {
        issuedAt: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      data: prescriptions
    });
  } catch (error) {
    console.error('Error getting prescriptions:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Obtener receta médica por ID
export const getPrescriptionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const prescription = await prisma.prescription.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: 'Receta médica no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: prescription
    });
  } catch (error) {
    console.error('Error getting prescription:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Actualizar receta médica
export const updatePrescription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      medicine,
      dosage,
      frequency,
      duration,
      indications,
      issuedAt,
      sentBy
    } = req.body;

    const updatedPrescription = await prisma.prescription.update({
      where: {
        id: parseInt(id)
      },
      data: {
        ...(medicine && { medicine }),
        ...(dosage && { dosage }),
        ...(frequency && { frequency }),
        ...(duration && { duration }),
        ...(indications && { indications }),
        ...(issuedAt && { issuedAt: new Date(issuedAt) }),
        ...(sentBy && { sentBy })
      }
    });

    res.status(200).json({
      success: true,
      message: 'Receta médica actualizada exitosamente',
      data: updatedPrescription
    });
  } catch (error) {
    console.error('Error updating prescription:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Eliminar receta médica
export const deletePrescription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.prescription.delete({
      where: {
        id: parseInt(id)
      }
    });

    res.status(200).json({
      success: true,
      message: 'Receta médica eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error deleting prescription:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Obtener todas las recetas de un paciente específico
export const getPrescriptionsByPatient = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;

    const prescriptions = await prisma.prescription.findMany({
      where: {
        medicalHistory: {
          patient_idPaciente: parseInt(patientId)
        }
      },
      include: {
        medicalHistory: {
          include: {
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
        }
      },
      orderBy: {
        issuedAt: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      data: prescriptions
    });
  } catch (error) {
    console.error('Error getting prescriptions by patient:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Buscar recetas por medicamento
export const searchPrescriptionsByMedicine = async (req: Request, res: Response) => {
  try {
    const { medicine } = req.query;

    if (!medicine) {
      return res.status(400).json({
        success: false,
        message: 'El parámetro medicine es requerido'
      });
    }

    const prescriptions = await prisma.prescription.findMany({
      where: {
        medicine: {
          contains: medicine as string,
          mode: 'insensitive'
        }
      },
      include: {
        medicalHistory: {
          include: {
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
        }
      },
      orderBy: {
        issuedAt: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      data: prescriptions
    });
  } catch (error) {
    console.error('Error searching prescriptions by medicine:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Obtener estadísticas de medicamentos más recetados
export const getMedicationStats = async (req: Request, res: Response) => {
  try {
    const stats = await prisma.prescription.groupBy({
      by: ['medicine'],
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      },
      take: 10
    });

    res.status(200).json({
      success: true,
      data: stats.map(stat => ({
        medicine: stat.medicine,
        count: stat._count.id
      }))
    });
  } catch (error) {
    console.error('Error getting medication stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
