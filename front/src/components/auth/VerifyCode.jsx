import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const VerifyCode = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Obtener email del estado de navegación
  const email = location.state?.email || '';

  const handleCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus al siguiente input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    
    if (fullCode.length !== 6) {
      setError('Por favor ingresa el código completo de 6 dígitos.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/verify-code', {
        email,
        code: fullCode
      });

      // Login automático después de verificación exitosa
      login(response.data.token, response.data.user);
      navigate('/dashboard', { 
        state: { message: '¡Cuenta verificada exitosamente!' } 
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Error al verificar el código.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setError('Email no disponible para reenvío.');
      return;
    }

    setResending(true);
    setError('');

    try {
      await axios.post('http://localhost:3000/api/resend-verification', {
        email,
        verificationType: 'code'
      });
      
      setCode(['', '', '', '', '', '']);
      alert('Nuevo código enviado a tu email.');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al reenviar el código.');
    } finally {
      setResending(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Error de acceso
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            No se encontró información de email para verificación.
          </p>
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate('/register')}
              className="font-medium text-indigo-600 hover:text-indigo-500"
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
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Verifica tu cuenta
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Ingresa el código de 6 dígitos que enviamos a:
            </p>
            <p className="mt-1 text-sm font-medium text-indigo-600">
              {email}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código de verificación
              </label>
              <div className="flex space-x-2">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                ))}
              </div>
            </div>

            {error && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || code.join('').length !== 6}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Verificando...
                </div>
              ) : (
                'Verificar cuenta'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No recibiste el código?{' '}
              <button
                onClick={handleResendCode}
                disabled={resending}
                className="font-medium text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
              >
                {resending ? 'Reenviando...' : 'Reenviar código'}
              </button>
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              El código expira en 15 minutos por seguridad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
