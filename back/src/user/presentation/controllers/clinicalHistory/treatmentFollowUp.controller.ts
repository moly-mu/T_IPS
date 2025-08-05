import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ==================== CONSULTAS MÉDICAS ====================

// Crear consulta médica
export const createMedicalConsultation = async (req: Request, res: Response) => {
  try {
    const {
      medicalHistoryId,
      startTime,
      endTime,
      reason,
      medicalNote,
      vitalSigns,
      consultationMode,
      location,
      summary
    } = req.body;

    const consultation = await prisma.medicalConsultation.create({
      data: {
        medicalHistoryId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        reason,
        medicalNote,
        vitalSigns,
        consultationMode,
        location,
        summary
      }
    });

    res.status(201).json({
      success: true,
      message: 'Consulta médica creada exitosamente',
      data: consultation
    });
  } catch (error) {
    console.error('Error creating medical consultation:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Obtener consultas médicas por historia clínica
export const getMedicalConsultationsByHistory = async (req: Request, res: Response) => {
  try {
    const { medicalHistoryId } = req.params;

    const consultations = await prisma.medicalConsultation.findMany({
      where: {
        medicalHistoryId: parseInt(medicalHistoryId)
      },
      orderBy: {
        startTime: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      data: consultations
    });
  } catch (error) {
    console.error('Error getting medical consultations:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Actualizar consulta médica
export const updateMedicalConsultation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      startTime,
      endTime,
      reason,
      medicalNote,
      vitalSigns,
      consultationMode,
      location,
      summary
    } = req.body;

    const updatedConsultation = await prisma.medicalConsultation.update({
      where: {
        id: parseInt(id)
      },
      data: {
        ...(startTime && { startTime: new Date(startTime) }),
        ...(endTime && { endTime: new Date(endTime) }),
        ...(reason && { reason }),
        ...(medicalNote && { medicalNote }),
        ...(vitalSigns && { vitalSigns }),
        ...(consultationMode && { consultationMode }),
        ...(location && { location }),
        ...(summary && { summary })
      }
    });

    res.status(200).json({
      success: true,
      message: 'Consulta médica actualizada exitosamente',
      data: updatedConsultation
    });
  } catch (error) {
    console.error('Error updating medical consultation:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Eliminar consulta médica
export const deleteMedicalConsultation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.medicalConsultation.delete({
      where: {
        id: parseInt(id)
      }
    });

    res.status(200).json({
      success: true,
      message: 'Consulta médica eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error deleting medical consultation:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// ==================== DIAGNÓSTICOS ====================

// Crear diagnóstico
export const createDiagnosis = async (req: Request, res: Response) => {
  try {
    const {
      medicalHistoryId,
      cie10Code,
      symptomDesc,
      duration,
      evolution,
      diagnosisType,
      isPrincipal,
      diagnosisDate
    } = req.body;

    const diagnosis = await prisma.diagnosis.create({
      data: {
        medicalHistoryId,
        cie10Code,
        symptomDesc,
        duration,
        evolution,
        diagnosisType,
        isPrincipal: isPrincipal || false,
        diagnosisDate: new Date(diagnosisDate)
      }
    });

    res.status(201).json({
      success: true,
      message: 'Diagnóstico creado exitosamente',
      data: diagnosis
    });
  } catch (error) {
    console.error('Error creating diagnosis:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Obtener diagnósticos por historia clínica
export const getDiagnosesByHistory = async (req: Request, res: Response) => {
  try {
    const { medicalHistoryId } = req.params;

    const diagnoses = await prisma.diagnosis.findMany({
      where: {
        medicalHistoryId: parseInt(medicalHistoryId)
      },
      orderBy: {
        diagnosisDate: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      data: diagnoses
    });
  } catch (error) {
    console.error('Error getting diagnoses:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Actualizar diagnóstico
export const updateDiagnosis = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      cie10Code,
      symptomDesc,
      duration,
      evolution,
      diagnosisType,
      isPrincipal,
      diagnosisDate
    } = req.body;

    const updatedDiagnosis = await prisma.diagnosis.update({
      where: {
        id: parseInt(id)
      },
      data: {
        ...(cie10Code && { cie10Code }),
        ...(symptomDesc && { symptomDesc }),
        ...(duration && { duration }),
        ...(evolution && { evolution }),
        ...(diagnosisType && { diagnosisType }),
        ...(isPrincipal !== undefined && { isPrincipal }),
        ...(diagnosisDate && { diagnosisDate: new Date(diagnosisDate) })
      }
    });

    res.status(200).json({
      success: true,
      message: 'Diagnóstico actualizado exitosamente',
      data: updatedDiagnosis
    });
  } catch (error) {
    console.error('Error updating diagnosis:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Eliminar diagnóstico
export const deleteDiagnosis = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.diagnosis.delete({
      where: {
        id: parseInt(id)
      }
    });

    res.status(200).json({
      success: true,
      message: 'Diagnóstico eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error deleting diagnosis:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// ==================== ARCHIVOS DIAGNÓSTICOS ====================

// Crear archivo diagnóstico
export const createDiagnosticFile = async (req: Request, res: Response) => {
  try {
    const {
      medicalHistoryId,
      fileName,
      fileType,
      file,
      studyDate,
      specialty,
      status
    } = req.body;

    const diagnosticFile = await prisma.diagnosticFile.create({
      data: {
        medicalHistoryId,
        fileName,
        fileType,
        file: Buffer.from(file, 'base64'),
        studyDate: new Date(studyDate),
        specialty,
        status
      }
    });

    res.status(201).json({
      success: true,
      message: 'Archivo diagnóstico creado exitosamente',
      data: {
        ...diagnosticFile,
        file: undefined // No retornar el archivo en la respuesta
      }
    });
  } catch (error) {
    console.error('Error creating diagnostic file:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Obtener archivos diagnósticos por historia clínica
export const getDiagnosticFilesByHistory = async (req: Request, res: Response) => {
  try {
    const { medicalHistoryId } = req.params;

    const diagnosticFiles = await prisma.diagnosticFile.findMany({
      where: {
        medicalHistoryId: parseInt(medicalHistoryId)
      },
      orderBy: {
        studyDate: 'desc'
      },
      select: {
        id: true,
        medicalHistoryId: true,
        fileName: true,
        fileType: true,
        studyDate: true,
        specialty: true,
        status: true
        // No incluir el campo 'file' para no enviar archivos grandes
      }
    });

    res.status(200).json({
      success: true,
      data: diagnosticFiles
    });
  } catch (error) {
    console.error('Error getting diagnostic files:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Descargar archivo diagnóstico
export const downloadDiagnosticFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const diagnosticFile = await prisma.diagnosticFile.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if (!diagnosticFile) {
      return res.status(404).json({
        success: false,
        message: 'Archivo no encontrado'
      });
    }

    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${diagnosticFile.fileName}"`
    });

    res.send(diagnosticFile.file);
  } catch (error) {
    console.error('Error downloading diagnostic file:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Eliminar archivo diagnóstico
export const deleteDiagnosticFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.diagnosticFile.delete({
      where: {
        id: parseInt(id)
      }
    });

    res.status(200).json({
      success: true,
      message: 'Archivo diagnóstico eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error deleting diagnostic file:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
