import useAuthenticatedApi from "../hooks/useAuthenticatedApi"; // Suponiendo que tienes un hook personalizado para fetch
//! Texto para hacer commit

export const useAppointmentService = () => {
  const { fetchWithToken } = useAuthenticatedApi(); // Asume autenticación con token

  const createAppointment = async (appointmentData) => {
    try {
      const response = await fetchWithToken('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear la cita');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en appointmentService.createAppointment:', error);
      throw error;
    }
  };

  const getAppointments = async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetchWithToken(`/api/appointments?${queryString}`);

      if (!response.ok) {
        throw new Error('Error al obtener las citas');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en appointmentService.getAppointments:', error);
      throw error;
    }
  };

  const updateAppointment = async (id, updates) => {
    try {
      const response = await fetchWithToken(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la cita');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en appointmentService.updateAppointment:', error);
      throw error;
    }
  };

  const cancelAppointment = async (id) => {
    try {
      const response = await fetchWithToken(`/api/appointments/${id}/cancel`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('Error al cancelar la cita');
      }

      return await response.json();
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
