import { Request, Response } from 'express';
import { PrismaClient, BloodType, Gender, Language, DocumentType, Eps } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener datos generales del paciente
export const getPatientGeneralData = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;

    const patient = await prisma.patient.findUnique({
      where: {
        id: parseInt(patientId)
      },
      include: {
        pac_data: true,
        User: {
          include: {
            credential_users: true
          }
        }
      }
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Paciente no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: patient
    });
  } catch (error) {
    console.error('Error getting patient general data:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Actualizar datos generales del paciente
export const updatePatientGeneralData = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;
    const {
      // Datos del usuario
      firstname,
      second_firstname,
      lastname,
      second_lastname,
      birthdate,
      gender,
      language,
      document_type,
      phone,
      // Datos del paciente
      Direction,
      bloodType,
      allergies,
      emergency_contact,
      eps_type,
      profession,
      ethnicgroup,
      // Datos de credenciales
      email
    } = req.body;

    const result = await prisma.$transaction(async (tx) => {
      // Obtener el paciente actual
      const currentPatient = await tx.patient.findUnique({
        where: { id: parseInt(patientId) },
        include: {
          pac_data: true,
          User: {
            include: {
              credential_users: true
            }
          }
        }
      });

      if (!currentPatient) {
        throw new Error('Paciente no encontrado');
      }

      // Actualizar credenciales si el email cambió
      if (email && email !== currentPatient.User.credential_users.email) {
        await tx.credentialUser.update({
          where: {
            id: currentPatient.User.credential_users_idcredential_users
          },
          data: {
            email
          }
        });
      }

      // Actualizar datos del usuario
      const updatedUser = await tx.user.update({
        where: {
          id: currentPatient.User_idUser
        },
        data: {
          ...(firstname && { firstname }),
          ...(second_firstname && { second_firstname }),
          ...(lastname && { lastname }),
          ...(second_lastname && { second_lastname }),
          ...(birthdate && { birthdate: new Date(birthdate) }),
          ...(gender && { gender: gender as Gender }),
          ...(language && { language: language as Language }),
          ...(document_type && { document_type: document_type as DocumentType }),
          ...(phone && { phone })
        }
      });

      // Actualizar datos específicos del paciente
      const updatedPacData = await tx.pacData.update({
        where: {
          id: currentPatient.pac_data_idpac_data
        },
        data: {
          ...(Direction && { Direction }),
          ...(bloodType && { bloodType: bloodType as BloodType }),
          ...(allergies && { allergies }),
          ...(emergency_contact && { emergency_contact }),
          ...(eps_type && { eps_type: eps_type as Eps }),
          ...(profession && { profession }),
          ...(ethnicgroup && { ethnicgroup })
        }
      });

      return { updatedUser, updatedPacData };
    });

    res.status(200).json({
      success: true,
      message: 'Datos del paciente actualizados exitosamente',
      data: result
    });
  } catch (error) {
    console.error('Error updating patient general data:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Crear antecedente médico
export const createMedicalBackground = async (req: Request, res: Response) => {
  try {
    const {
      medicalHistoryId,
      type,
      description
    } = req.body;

    const medicalBackground = await prisma.medicalBackground.create({
      data: {
        medicalHistoryId,
        type,
        description
      }
    });

    res.status(201).json({
      success: true,
      message: 'Antecedente médico creado exitosamente',
      data: medicalBackground
    });
  } catch (error) {
    console.error('Error creating medical background:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Obtener antecedentes médicos por historia clínica
export const getMedicalBackgroundsByHistory = async (req: Request, res: Response) => {
  try {
    const { medicalHistoryId } = req.params;

    const medicalBackgrounds = await prisma.medicalBackground.findMany({
      where: {
        medicalHistoryId: parseInt(medicalHistoryId)
      },
      orderBy: {
        id: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      data: medicalBackgrounds
    });
  } catch (error) {
    console.error('Error getting medical backgrounds:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Actualizar antecedente médico
export const updateMedicalBackground = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type, description } = req.body;

    const updatedBackground = await prisma.medicalBackground.update({
      where: {
        id: parseInt(id)
      },
      data: {
        type,
        description
      }
    });

    res.status(200).json({
      success: true,
      message: 'Antecedente médico actualizado exitosamente',
      data: updatedBackground
    });
  } catch (error) {
    console.error('Error updating medical background:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Eliminar antecedente médico
export const deleteMedicalBackground = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.medicalBackground.delete({
      where: {
        id: parseInt(id)
      }
    });

    res.status(200).json({
      success: true,
      message: 'Antecedente médico eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error deleting medical background:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
