import { useNavigate } from 'react-router-dom';

const VerificationError = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-900 mb-2">
            Error de verificación
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            El enlace de verificación ha expirado o es inválido. 
            Por favor registra tu cuenta nuevamente o solicita un nuevo enlace de verificación.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => navigate('/register')}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Registrarse nuevamente
            </button>
            
            <button
              onClick={() => navigate('/login')}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Ir al inicio de sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationError;
