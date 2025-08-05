import axios from '../../api/axios';

// ==================== HISTORIA CLÍNICA GENERAL ====================

export const medicalHistoryService = {
  // Crear historia clínica
  create: async (data) => {
    try {
      const response = await axios.post('/api/clinical-history/medical-history', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtener historia clínica por paciente
  getByPatient: async (patientId) => {
    try {
      const response = await axios.get(`/api/clinical-history/medical-history/patient/${patientId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Actualizar historia clínica
  update: async (id, data) => {
    try {
      const response = await axios.put(`/api/clinical-history/medical-history/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Eliminar historia clínica
  delete: async (id) => {
    try {
      const response = await axios.delete(`/api/clinical-history/medical-history/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

// ==================== DATOS GENERALES ====================

export const generalDataService = {
  // Obtener datos generales del paciente
  getPatientData: async (patientId) => {
    try {
      const response = await axios.get(`/api/clinical-history/general-data/patient/${patientId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Actualizar datos generales del paciente
  updatePatientData: async (patientId, data) => {
    try {
      const response = await axios.put(`/api/clinical-history/general-data/patient/${patientId}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // ANTECEDENTES MÉDICOS
  createBackground: async (data) => {
    try {
      const response = await axios.post('/api/clinical-history/general-data/backgrounds', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getBackgroundsByHistory: async (medicalHistoryId) => {
    try {
      const response = await axios.get(`/api/clinical-history/general-data/backgrounds/history/${medicalHistoryId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateBackground: async (id, data) => {
    try {
      const response = await axios.put(`/api/clinical-history/general-data/backgrounds/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteBackground: async (id) => {
    try {
      const response = await axios.delete(`/api/clinical-history/general-data/backgrounds/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

// ==================== SEGUIMIENTO DE TRATAMIENTO ====================

export const treatmentFollowUpService = {
  // CONSULTAS MÉDICAS
  createConsultation: async (data) => {
    try {
      const response = await axios.post('/api/clinical-history/follow-up/consultations', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getConsultationsByHistory: async (medicalHistoryId) => {
    try {
      const response = await axios.get(`/api/clinical-history/follow-up/consultations/history/${medicalHistoryId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateConsultation: async (id, data) => {
    try {
      const response = await axios.put(`/api/clinical-history/follow-up/consultations/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteConsultation: async (id) => {
    try {
      const response = await axios.delete(`/api/clinical-history/follow-up/consultations/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // DIAGNÓSTICOS
  createDiagnosis: async (data) => {
    try {
      const response = await axios.post('/api/clinical-history/follow-up/diagnoses', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getDiagnosesByHistory: async (medicalHistoryId) => {
    try {
      const response = await axios.get(`/api/clinical-history/follow-up/diagnoses/history/${medicalHistoryId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateDiagnosis: async (id, data) => {
    try {
      const response = await axios.put(`/api/clinical-history/follow-up/diagnoses/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteDiagnosis: async (id) => {
    try {
      const response = await axios.delete(`/api/clinical-history/follow-up/diagnoses/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // ARCHIVOS DIAGNÓSTICOS
  createFile: async (data) => {
    try {
      const response = await axios.post('/api/clinical-history/follow-up/files', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getFilesByHistory: async (medicalHistoryId) => {
    try {
      const response = await axios.get(`/api/clinical-history/follow-up/files/history/${medicalHistoryId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  downloadFile: async (id) => {
    try {
      const response = await axios.get(`/api/clinical-history/follow-up/files/download/${id}`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteFile: async (id) => {
    try {
      const response = await axios.delete(`/api/clinical-history/follow-up/files/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

// ==================== RECETAS MÉDICAS ====================

export const prescriptionsService = {
  // Crear receta
  create: async (data) => {
    try {
      const response = await axios.post('/api/clinical-history/prescriptions', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtener recetas por historia clínica
  getByHistory: async (medicalHistoryId) => {
    try {
      const response = await axios.get(`/api/clinical-history/prescriptions/history/${medicalHistoryId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtener recetas por paciente
  getByPatient: async (patientId) => {
    try {
      const response = await axios.get(`/api/clinical-history/prescriptions/patient/${patientId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtener receta por ID
  getById: async (id) => {
    try {
      const response = await axios.get(`/api/clinical-history/prescriptions/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Actualizar receta
  update: async (id, data) => {
    try {
      const response = await axios.put(`/api/clinical-history/prescriptions/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Eliminar receta
  delete: async (id) => {
    try {
      const response = await axios.delete(`/api/clinical-history/prescriptions/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Buscar por medicamento
  searchByMedicine: async (medicine) => {
    try {
      const response = await axios.get(`/api/clinical-history/prescriptions/search?medicine=${medicine}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtener estadísticas
  getStats: async () => {
    try {
      const response = await axios.get('/api/clinical-history/prescriptions/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

// ==================== ÓRDENES MÉDICAS ====================

export const medicalOrdersService = {
  // Crear orden médica
  create: async (data) => {
    try {
      const response = await axios.post('/api/clinical-history/medical-orders', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtener órdenes por paciente
  getByPatient: async (patientId) => {
    try {
      const response = await axios.get(`/api/clinical-history/medical-orders/patient/${patientId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtener órdenes por especialista
  getBySpecialist: async (specialistId) => {
    try {
      const response = await axios.get(`/api/clinical-history/medical-orders/specialist/${specialistId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtener orden por ID
  getById: async (id) => {
    try {
      const response = await axios.get(`/api/clinical-history/medical-orders/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Actualizar orden médica
  update: async (id, data) => {
    try {
      const response = await axios.put(`/api/clinical-history/medical-orders/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Actualizar estado
  updateStatus: async (id, status) => {
    try {
      const response = await axios.patch(`/api/clinical-history/medical-orders/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Eliminar orden médica
  delete: async (id) => {
    try {
      const response = await axios.delete(`/api/clinical-history/medical-orders/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtener estadísticas
  getStats: async () => {
    try {
      const response = await axios.get('/api/clinical-history/medical-orders/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};
