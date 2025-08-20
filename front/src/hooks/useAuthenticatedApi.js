import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const useAuthenticatedApi = () => {
  const { token } = useAuth();

  const apiCall = async (method, url, data = null, config = {}) => {
    if (!token) {
      throw new Error('No hay token de autenticación disponible');
    }

    const defaultConfig = {
      timeout: 10000, // 10 segundos por defecto
      ...config,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...config.headers,
      },
    };

    try {
      let response;
      switch (method.toLowerCase()) {
        case 'get':
          response = await axios.get(url, defaultConfig);
          break;
        case 'post':
          response = await axios.post(url, data, defaultConfig);
          break;
        case 'put':
          response = await axios.put(url, data, defaultConfig);
          break;
        case 'delete':
          response = await axios.delete(url, { ...defaultConfig, data });
          break;
        default:
          throw new Error(`Método HTTP no soportado: ${method}`);
      }
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        // Token expirado o inválido
        throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
      }
      throw error;
    }
  };

  return {
    get: (url, config) => apiCall('get', url, null, config),
    post: (url, data, config) => apiCall('post', url, data, config),
    put: (url, data, config) => apiCall('put', url, data, config),
    delete: (url, data, config) => apiCall('delete', url, data, config),
  };
};

export default useAuthenticatedApi;
