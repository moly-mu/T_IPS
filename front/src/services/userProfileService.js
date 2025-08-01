import useAuthenticatedApi from '../hooks/useAuthenticatedApi';

const BASE_URL = 'http://localhost:3000/api';

export const useUserProfileService = () => {
  const api = useAuthenticatedApi();

  const getUserProfile = async () => {
    try {
      const response = await api.get(`${BASE_URL}/User/Profile`);
      return response;
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
      throw error;
    }
  };

  const updateUserProfile = async (profileData) => {
    try {
      const response = await api.put(`${BASE_URL}/User/Profile`, profileData);
      return response;
    } catch (error) {
      console.error('Error al actualizar el perfil del usuario:', error);
      throw error;
    }
  };

  return {
    getUserProfile,
    updateUserProfile,
  };
};

export default useUserProfileService;
