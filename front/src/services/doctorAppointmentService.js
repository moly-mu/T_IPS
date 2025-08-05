import axios from '../api/axios';

// Servicio para manejar las citas médicas del doctor
export const doctorAppointmentService = {
  
  // Obtener detalles de una cita específica
  getAppointmentDetails: async (appointmentId) => {
    try {
      const response = await axios.get(`/api/doctor-appointment/${appointmentId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting appointment details:', error);
      throw error.response?.data || error.message;
    }
  },

  // Iniciar consulta
  startConsultation: async (appointmentId) => {
    try {
      const response = await axios.patch(`/api/doctor-appointment/${appointmentId}/start`);
      return response.data;
    } catch (error) {
      console.error('Error starting consultation:', error);
      throw error.response?.data || error.message;
    }
  },

  // Finalizar consulta
  endConsultation: async (appointmentId) => {
    try {
      const response = await axios.patch(`/api/doctor-appointment/${appointmentId}/end`);
      return response.data;
    } catch (error) {
      console.error('Error ending consultation:', error);
      throw error.response?.data || error.message;
    }
  },

  // Obtener próximas citas
  getUpcomingAppointments: async () => {
    try {
      const response = await axios.get('/api/doctor-appointment/upcoming/list');
      return response.data;
    } catch (error) {
      console.error('Error getting upcoming appointments:', error);
      throw error.response?.data || error.message;
    }
  },

  // Obtener todas las citas (para debugging)
  getAllAppointments: async () => {
    try {
      const response = await axios.get('/api/doctor-appointment/debug/all');
      return response.data;
    } catch (error) {
      console.error('Error getting all appointments:', error);
      throw error.response?.data || error.message;
    }
  }
};

export default doctorAppointmentService;
