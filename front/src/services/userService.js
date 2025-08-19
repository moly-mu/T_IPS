import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';

// Configuración base de la API
const API_BASE = '/api';

// Servicio para el usuario
export const userService = {
  
  // **AUTENTICACIÓN**
  
  // Registrar usuario
  register: async (userData) => {
    const response = await axios.post(`${API_BASE}/register`, userData);
    return response.data;
  },

  // Iniciar sesión
  login: async (credentials) => {
    const response = await axios.post(`${API_BASE}/login`, credentials);
    return response.data;
  },

  // **PERFIL DEL USUARIO**
  
  // Obtener perfil del usuario (requiere token)
  getProfile: async (token) => {
    const response = await axios.get(`${API_BASE}/User/Profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  // Actualizar perfil del usuario (requiere token)
  updateProfile: async (profileData, token) => {
    const response = await axios.put(`${API_BASE}/User/Profile`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  // **HISTORIAL MÉDICO**
  
  // Obtener historial médico del paciente (requiere token)
  getMedicalHistory: async (token) => {
    const response = await axios.get(`${API_BASE}/User/Medicalhistory`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  // **CITAS MÉDICAS**
  
  // Obtener datos para agendar una cita (especialistas disponibles, etc.)
  getScheduleAppointmentData: async (token) => {
    const response = await axios.get(`${API_BASE}/User/scheduleAppointment`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  // Crear/Agendar una nueva cita
  createAppointment: async (appointmentData, token) => {
    const response = await axios.post(`${API_BASE}/User/scheduleAppointment`, appointmentData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  // Obtener todas las citas del usuario
  getUserAppointments: async (token) => {
    const response = await axios.get(`${API_BASE}/User/appointments`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  // Cancelar una cita
  cancelAppointment: async (appointmentData, token) => {
    const response = await axios.put(`${API_BASE}/User/cancel/Appointment`, appointmentData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  // **RESEÑAS Y EVALUACIONES**
  
  // Obtener reseñas del usuario
  getUserReviews: async (token) => {
    const response = await axios.get(`${API_BASE}/User/Reviews`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  // Crear una reseña
  createReview: async (reviewData, token) => {
    const response = await axios.post(`${API_BASE}/User/Reviews`, reviewData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  // Crear reseña después de una cita médica
  createPostAppointmentReview: async (reviewData, token) => {
    const response = await axios.post(`${API_BASE}/User/reviews/postPointment`, reviewData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
};

// Hook personalizado para usar el servicio con el token del context
export const useUserService = () => {
  const { token } = useAuth();
  
  return {
    // Métodos que no requieren token
    register: userService.register,
    login: userService.login,
    
    // Métodos que requieren token (auto-inyectado)
    getProfile: () => userService.getProfile(token),
    updateProfile: (profileData) => userService.updateProfile(profileData, token),
    getMedicalHistory: () => userService.getMedicalHistory(token),
    getScheduleAppointmentData: () => userService.getScheduleAppointmentData(token),
    createAppointment: (appointmentData) => userService.createAppointment(appointmentData, token),
    getUserAppointments: () => userService.getUserAppointments(token),
    cancelAppointment: (appointmentData) => userService.cancelAppointment(appointmentData, token),
    getUserReviews: () => userService.getUserReviews(token),
    createReview: (reviewData) => userService.createReview(reviewData, token),
    createPostAppointmentReview: (reviewData) => userService.createPostAppointmentReview(reviewData, token)
  };
};
