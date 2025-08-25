import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const VerificationSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Simular login con el token recibido
      try {
        // Decodificar el token para obtener información del usuario
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        // Crear objeto de usuario temporal
        const user = {
          id: payload.id,
          emailVerified: true
        };

        login(token, user);
        
        setTimeout(() => {
          setLoading(false);
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        }, 1000);
      } catch (err) {
        setError('Token inválido');
        setLoading(false);
      }
    } else {
      setError('Token no encontrado');
      setLoading(false);
    }
  }, [searchParams, login, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verificando tu cuenta...
            </h2>
            <p className="text-sm text-gray-600">
              Por favor espera mientras procesamos tu verificación.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-900 mb-2">
              Error de verificación
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              {error}
            </p>
            <button
              onClick={() => navigate('/register')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Volver al registro
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-900 mb-2">
            ¡Cuenta verificada exitosamente!
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Tu email ha sido verificado correctamente. Serás redirigido al panel de control en unos segundos.
          </p>
          <div className="text-xs text-gray-500">
            Redirigiendo automáticamente...
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationSuccess;
