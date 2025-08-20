import useAuthenticatedApi from "../hooks/useAuthenticatedApi";

const BASE_URL = 'http://localhost:3000/api';

export const useAppointmentService = () => {
  const { get, post, put } = useAuthenticatedApi();

  const createAppointment = async (appointmentData) => {
    try {
      const response = await post(`${BASE_URL}/User/scheduleAppointment`, appointmentData);
      return response;
    } catch (error) {
      console.error('Error en appointmentService.createAppointment:', error);
      throw error;
    }
  };

  const getAppointments = async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${BASE_URL}/User/appointments${queryString ? `?${queryString}` : ''}`;
      const response = await get(url);
      return response;
    } catch (error) {
      console.error('Error en appointmentService.getAppointments:', error);
      throw error;
    }
  };

  const updateAppointment = async (id, updates) => {
    try {
      const response = await put(`${BASE_URL}/User/appointments/${id}`, updates);
      return response;
    } catch (error) {
      console.error('Error en appointmentService.updateAppointment:', error);
      throw error;
    }
  };

  const cancelAppointment = async (id, reason) => {
    try {
      // Usando PUT ya que es una actualización del estado de la cita
      const response = await put(`${BASE_URL}/User/appointments/${id}/cancel`, { reason });
      return response;
    } catch (error) {
      console.error('Error en appointmentService.cancelAppointment:', error);
      throw error;
    }
  };

  return {
    createAppointment,
    getAppointments,
    updateAppointment,
    cancelAppointment,
  };
};

export default useAppointmentService;
