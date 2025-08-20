import useAuthenticatedApi from "../hooks/useAuthenticatedApi";

const BASE_URL = 'http://localhost:3000/api';

export const useMedicalHistoryService = () => {
  const { get } = useAuthenticatedApi();

  const getMedicalConsultations = async () => {
    try {
      // Configuración con timeout más largo
      const config = {
        timeout: 10000, // 10 segundos
      };
      
      const response = await get(`${BASE_URL}/User/Medicalhistory`, config);
      return response;
    } catch (error) {
      console.error('Error en medicalHistoryService.getMedicalConsultations:', error);
      
      // Mejor manejo de errores específicos
      if (error.code === 'ECONNABORTED') {
        throw new Error('La conexión al servidor se ha perdido. Verifica que el backend esté corriendo.');
      } else if (error.response?.status === 401) {
        throw new Error('No tienes autorización para acceder a esta información. Inicia sesión nuevamente.');
      } else if (error.response?.status === 404) {
        throw new Error('No se encontró historial médico para este usuario.');
      } else if (error.response?.status >= 500) {
        throw new Error('Error del servidor. Intenta nuevamente más tarde.');
      } else {
        throw new Error(error.response?.data?.error || error.message || 'Error al cargar el historial médico');
      }
    }
  };

  return {
    getMedicalConsultations,
  };
};

export default useMedicalHistoryService;
