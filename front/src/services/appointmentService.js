import useAuthenticatedApi from '../hooks/useAuthenticatedApi';

const BASE_URL = 'http://localhost:3000/api';

export const useAppointmentService = () => {
  const api = useAuthenticatedApi();

  /**
   * Obtiene los especialistas disponibles para una fecha específica
   * @param {string} date - Fecha en formato YYYY-MM-DD
   * @returns {Promise} Respuesta con especialistas disponibles y sus horarios
   */
  const getAvailableSpecialists = async (date) => {
    try {
      const response = await api.get(`${BASE_URL}/User/scheduleAppointment?date=${date}`);
      return response;
    } catch (error) {
      console.error('Error al obtener especialistas disponibles:', error);
      throw error;
    }
  };

  /**
   * Crea una nueva cita médica
   * @param {Object} appointmentData - Datos de la cita
   * @param {number} appointmentData.specialistId - ID del especialista
   * @param {string} appointmentData.fecha - Fecha en formato YYYY-MM-DD
   * @param {string} appointmentData.hora - Hora en formato HH:MM
   * @param {number} appointmentData.specialtyId - ID de la especialidad (opcional)
   * @param {number} appointmentData.duration - Duración en minutos (opcional, por defecto 30)
   * @returns {Promise} Respuesta con los datos de la cita creada
   */
  const createAppointment = async (appointmentData) => {
    try {
      const response = await api.post(`${BASE_URL}/User/scheduleAppointment`, appointmentData);
      return response;
    } catch (error) {
      console.error('Error al crear la cita:', error);
      throw error;
    }
  };

  /**
   * Obtiene todas las citas del usuario autenticado
   * @returns {Promise} Respuesta con el listado de citas del usuario
   */
  const getUserAppointments = async () => {
    try {
      const response = await api.get(`${BASE_URL}/User/appointments`);
      return response;
    } catch (error) {
      console.error('Error al obtener las citas del usuario:', error);
      throw error;
    }
  };

  /**
   * Cancela una cita específica
   * @param {number} appointmentId - ID de la cita a cancelar
   * @returns {Promise} Respuesta de la cancelación
   */
  const cancelAppointment = async (appointmentId) => {
    try {
      const response = await api.delete(`${BASE_URL}/User/appointments/${appointmentId}`);
      return response;
    } catch (error) {
      console.error('Error al cancelar la cita:', error);
      throw error;
    }
  };

  /**
   * Actualiza el estado de una cita
   * @param {number} appointmentId - ID de la cita
   * @param {string} newState - Nuevo estado de la cita
   * @returns {Promise} Respuesta de la actualización
   */
  const updateAppointmentState = async (appointmentId, newState) => {
    try {
      const response = await api.put(`${BASE_URL}/User/appointments/${appointmentId}`, {
        state: newState
      });
      return response;
    } catch (error) {
      console.error('Error al actualizar el estado de la cita:', error);
      throw error;
    }
  };

  /**
   * Filtra las citas por estado
   * @param {Array} appointments - Array de citas
   * @param {string} state - Estado a filtrar ('pendiente', 'confirmada', 'cancelada', etc.)
   * @returns {Array} Citas filtradas por estado
   */
  const filterAppointmentsByState = (appointments, state) => {
    if (!appointments || !Array.isArray(appointments)) {
      return [];
    }
    return appointments.filter(appointment => 
      appointment.estado && appointment.estado.toLowerCase() === state.toLowerCase()
    );
  };

  /**
   * Filtra las citas por fecha
   * @param {Array} appointments - Array de citas
   * @param {string} date - Fecha en formato YYYY-MM-DD
   * @returns {Array} Citas filtradas por fecha
   */
  const filterAppointmentsByDate = (appointments, date) => {
    if (!appointments || !Array.isArray(appointments)) {
      return [];
    }
    return appointments.filter(appointment => appointment.fecha === date);
  };

  /**
   * Obtiene las próximas citas (futuras)
   * @param {Array} appointments - Array de citas
   * @returns {Array} Citas futuras ordenadas por fecha
   */
  const getUpcomingAppointments = (appointments) => {
    if (!appointments || !Array.isArray(appointments)) {
      return [];
    }
    
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    
    return appointments
      .filter(appointment => appointment.fecha >= todayString)
      .sort((a, b) => {
        const dateA = new Date(`${a.fecha}T${a.hora}`);
        const dateB = new Date(`${b.fecha}T${b.hora}`);
        return dateA - dateB;
      });
  };

  /**
   * Obtiene el historial de citas (pasadas)
   * @param {Array} appointments - Array de citas
   * @returns {Array} Citas pasadas ordenadas por fecha descendente
   */
  const getAppointmentHistory = (appointments) => {
    if (!appointments || !Array.isArray(appointments)) {
      return [];
    }
    
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    
    return appointments
      .filter(appointment => appointment.fecha < todayString)
      .sort((a, b) => {
        const dateA = new Date(`${a.fecha}T${a.hora}`);
        const dateB = new Date(`${b.fecha}T${b.hora}`);
        return dateB - dateA;
      });
  };

  /**
   * Formatea una fecha para mostrar en la interfaz
   * @param {string} dateString - Fecha en formato YYYY-MM-DD
   * @returns {string} Fecha formateada
   */
  const formatAppointmentDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return dateString;
    }
  };

  /**
   * Formatea una hora para mostrar en la interfaz
   * @param {string} timeString - Hora en formato HH:MM
   * @returns {string} Hora formateada
   */
  const formatAppointmentTime = (timeString) => {
    try {
      const [hours, minutes] = timeString.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    } catch (error) {
      console.error('Error al formatear hora:', error);
      return timeString;
    }
  };

  /**
   * Valida los datos de una cita antes de crearla
   * @param {Object} appointmentData - Datos de la cita a validar
   * @returns {Object} Objeto con isValid (boolean) y errors (array)
   */
  const validateAppointmentData = (appointmentData) => {
    const errors = [];
    
    if (!appointmentData.specialistId) {
      errors.push('Debe seleccionar un especialista');
    }
    
    if (!appointmentData.fecha) {
      errors.push('Debe seleccionar una fecha');
    } else {
      const selectedDate = new Date(appointmentData.fecha);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        errors.push('No se pueden agendar citas en fechas pasadas');
      }
    }
    
    if (!appointmentData.hora) {
      errors.push('Debe seleccionar una hora');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };

  return {
    // Operaciones principales
    getAvailableSpecialists,
    createAppointment,
    getUserAppointments,
    cancelAppointment,
    updateAppointmentState,
    
    // Utilidades de filtrado
    filterAppointmentsByState,
    filterAppointmentsByDate,
    getUpcomingAppointments,
    getAppointmentHistory,
    
    // Utilidades de formato
    formatAppointmentDate,
    formatAppointmentTime,
    
    // Validación
    validateAppointmentData
  };
};

export default useAppointmentService;
