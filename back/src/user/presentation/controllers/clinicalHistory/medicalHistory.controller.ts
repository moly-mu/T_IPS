import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Crear Historia Clínica
export const createMedicalHistory = async (req: Request, res: Response) => {
  try {
    const {
      patient_idPaciente,
      patient_pac_data_idpac_data,
      patient_User_idUser,
      patient_User_credential_users_idcred,
      patient_User_rol_idrol,
      email,
      emergency_contact,
      contact_phone
    } = req.body;

    const medicalHistory = await prisma.medicalHistory.create({
      data: {
        patient_idPaciente,
        patient_pac_data_idpac_data,
        patient_User_idUser,
        patient_User_credential_users_idcred,
        patient_User_rol_idrol,
        email,
        emergency_contact,
        contact_phone
      }
    });

    res.status(201).json({
      success: true,
      message: 'Historia clínica creada exitosamente',
      data: medicalHistory
    });
  } catch (error) {
    console.error('Error creating medical history:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Obtener Historia Clínica por ID de Paciente
export const getMedicalHistoryByPatient = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;

    const medicalHistory = await prisma.medicalHistory.findFirst({
      where: {
        patient_idPaciente: parseInt(patientId)
      },
      include: {
        consultations: true,
        diagnoses: true,
        antecedents: true,
        prescriptions: true,
        diagnosticFiles: true,
        Patient: {
          include: {
            pac_data: true,
            User: {
              include: {
                credential_users: true
              }
            }
          }
        }
      }
    });

    if (!medicalHistory) {
      return res.status(404).json({
        success: false,
        message: 'Historia clínica no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: medicalHistory
    });
  } catch (error) {
    console.error('Error getting medical history:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Actualizar Historia Clínica
export const updateMedicalHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      email,
      emergency_contact,
      contact_phone
    } = req.body;

    const updatedMedicalHistory = await prisma.medicalHistory.update({
      where: {
        id: parseInt(id)
      },
      data: {
        email,
        emergency_contact,
        contact_phone
      }
    });

    res.status(200).json({
      success: true,
      message: 'Historia clínica actualizada exitosamente',
      data: updatedMedicalHistory
    });
  } catch (error) {
    console.error('Error updating medical history:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Eliminar Historia Clínica
export const deleteMedicalHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.$transaction(async (tx) => {
      // Eliminar relacionados primero
      await tx.medicalConsultation.deleteMany({
        where: { medicalHistoryId: parseInt(id) }
      });

      await tx.diagnosis.deleteMany({
        where: { medicalHistoryId: parseInt(id) }
      });

      await tx.medicalBackground.deleteMany({
        where: { medicalHistoryId: parseInt(id) }
      });

      await tx.prescription.deleteMany({
        where: { medicalHistoryId: parseInt(id) }
      });

      await tx.diagnosticFile.deleteMany({
        where: { medicalHistoryId: parseInt(id) }
      });

      // Eliminar historia clínica
      await tx.medicalHistory.delete({
        where: { id: parseInt(id) }
      });
    });

    res.status(200).json({
      success: true,
      message: 'Historia clínica eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error deleting medical history:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
