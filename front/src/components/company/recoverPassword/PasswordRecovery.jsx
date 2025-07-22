import { useState, useRef, useEffect } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [error, setError] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef([]);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const navigate = useNavigate();
  const [setAlertState] = useState(null);

  // Función para mostrar alertas
  const setAlert = (alert) => {
    setAlertState(alert);
    setTimeout(() => setAlertState(null), 5000);
  };

  // Inicializar refs para los inputs del código
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validación básica
    if (!email || !email.includes('@')) {
      setAlert({ type: 'error', message: 'Por favor ingresa un email válido' });
      setError('Por favor ingresa un email válido');
      setIsLoading(false);
      return;
    }

    // Simular llamada a API
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simular éxito o error aleatoriamente para testing
          if (Math.random() > 0.1) {
            resolve();
          } else {
            reject(new Error('Error de red'));
          }
        }, 1500);
      });
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Error al enviar el email. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (index, value) => {
    // Solo permitir números y un solo carácter
    if (value.length > 1 || (value && !/^\d$/.test(value))) {
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Mover al siguiente input si se ingresó un número
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (index, e) => {
    // Manejar backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Manejar Enter para verificar
    if (e.key === 'Enter') {
      handleVerifyCode();
    }
  };

  const handleCodePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    const digits = pasteData.replace(/\D/g, '').slice(0, 6);
    
    if (digits.length > 0) {
      const newCode = [...code];
      for (let i = 0; i < digits.length && i < 6; i++) {
        newCode[i] = digits[i];
      }
      setCode(newCode);
      
      // Enfocar el siguiente input vacío o el último si todos están llenos
      const nextEmptyIndex = newCode.findIndex(c => c === '');
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else if (digits.length === 6) {
        inputRefs.current[5]?.focus();
      }
    }
  };

  const handleVerifyCode = async () => {
    const codeString = code.join('');

    if (codeString.length !== 6) {
      setError('Por favor ingresa el código completo de 6 dígitos');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setShowPasswordReset(true);
    } catch (err) {
      console.error(err);
      setError('Código inválido. Intenta de nuevo.');
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleGmailRedirect = () => {
    // Detectar el dominio del email para abrir el cliente correcto
    const domain = email.split('@')[1]?.toLowerCase();
    
    let mailUrl;
    
    switch (domain) {
      case 'gmail.com':
        mailUrl = 'https://mail.google.com';
        break;
      case 'outlook.com':
      case 'hotmail.com':
      case 'live.com':
        mailUrl = 'https://outlook.live.com';
        break;
      case 'yahoo.com':
        mailUrl = 'https://mail.yahoo.com';
        break;
      default:
        mailUrl = 'https://mail.google.com';
    }
    
    window.open(mailUrl, '_blank');
  };

  const handleBackToLogin = () => {
    navigate('/Sins');
    console.log('Volver al inicio de sesión');
  };

  const handleGoToLogin = () => {
    navigate('/Sins');
    console.log('Ir al inicio de sesión');
  };

  const handleShowCodeInput = () => {
    setShowCodeInput(true);
    // Enfocar el primer input del código
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError('');

    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      setAlertState('Código reenviado exitosamente');
    } catch (err) {
      console.error(err);
      setError('Error al reenviar el código. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const Navbar = () => {
    return (
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-light tracking-wide text-gray-900">
              TELECONSULTAS<span className="font-medium">IPS</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-12">
              <a href="/Tins" className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors tracking-wide">
                ADMINISTRADOR
              </a>
              <a href="/Pins" className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors tracking-wide">
                MÉDICO
              </a>
              <a href="/Sreg" className="text-sm font-medium text-gray-900 border-b border-gray-900 pb-1 tracking-wide">
                REGISTRARME
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  };

  // Vista del código de verificación
  if (showPasswordReset) {
    const passwordValid = /^(?=.*[A-Z])(?=.*\d)(?=.{8,})/.test(newPassword);
    const passwordsMatch = newPassword === confirmPassword;

    const handlePasswordReset = async () => {
      if (!passwordValid) {
        setPasswordError('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.');
        return;
      }

      if (!passwordsMatch) {
        setPasswordError('Las contraseñas no coinciden.');
        return;
      }

      setIsResettingPassword(true);
      setPasswordError('');

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        alert('Contraseña restablecida con éxito. Ahora puedes iniciar sesión.');
        navigate('/Sins'); 
      } catch (err) {
        console.error(err);
        setPasswordError('Hubo un error al restablecer la contraseña. Intenta de nuevo.');
      } finally {
        setIsResettingPassword(false);
      }
    };

    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="mb-6">
              <button 
                onClick={() => setShowPasswordReset(false)}
                className="flex items-center text-gray-500 hover:text-gray-800 transition-colors duration-200 mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </button>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Restablecer contraseña
              </h2>
              <p className="text-base text-gray-600">
                Ingresa tu nueva contraseña para acceder a tu cuenta.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors"
                  placeholder="••••••••"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Debe tener al menos 8 caracteres, una letra mayúscula y un número.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors"
                  placeholder="••••••••"
                />
              </div>

              {passwordError && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                  {passwordError}
                </div>
              )}

              <button
                onClick={handlePasswordReset}
                disabled={isResettingPassword}
                className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium disabled:opacity-50"
              >
                {isResettingPassword ? 'Guardando...' : 'Guardar nueva contraseña'}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (showCodeInput) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="mb-6">
              <button 
                onClick={() => setShowCodeInput(false)}
                className="flex items-center text-gray-500 hover:text-gray-800 transition-colors duration-200 mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </button>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Ingresa el código de verificación
              </h2>
              <p className="text-base text-gray-600">
                Hemos enviado un código de 6 dígitos a{' '}
                <span className="font-bold text-gray-900">{email}</span>
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Código de verificación
                </label>
                <div className="flex justify-center space-x-2">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleCodeKeyDown(index, e)}
                      onPaste={index === 0 ? handleCodePaste : undefined}
                      className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors duration-200"
                      maxLength={1}
                      disabled={isVerifying}
                    />
                  ))}
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}

              <button
                onClick={handleVerifyCode}
                disabled={isVerifying || code.some(c => c === '')}
                className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
              >
                {isVerifying ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verificando...
                  </div>
                ) : (
                  'Verificar código'
                )}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  ¿No recibiste el código?{' '}
                  <button 
                    onClick={handleResendCode}
                    disabled={isLoading}
                    className="text-gray-900 hover:underline font-medium disabled:opacity-50"
                  >
                    Reenviar código
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Vista de éxito (email enviado)
  if (isSuccess) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <button 
                onClick={() => {
                  setIsSuccess(false);
                  setEmail('');
                  setError('');
                }}
                className="flex items-center text-gray-500 hover:text-gray-800 transition-colors duration-200 mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver 
              </button>
              <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
              <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                Email enviado
              </h2>
              <p className="text-base text-gray-600 mb-6">
                Te hemos enviado un código de verificación para restablecer tu contraseña a{' '}
                <span className="font-bold text-gray-900">{email}</span>
              </p>
              <button
                onClick={handleGmailRedirect}
                className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium flex items-center justify-center mb-4"
              >
                <svg 
                  className="h-5 w-5 mr-3" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.910 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
                Abrir {email.split('@')[1]?.toLowerCase() === 'gmail.com' ? 'Gmail' : 
                       email.split('@')[1]?.toLowerCase() === 'outlook.com' || 
                       email.split('@')[1]?.toLowerCase() === 'hotmail.com' || 
                       email.split('@')[1]?.toLowerCase() === 'live.com' ? 'Outlook' :
                       email.split('@')[1]?.toLowerCase() === 'yahoo.com' ? 'Yahoo Mail' : 'Email'}
              </button>
              <button
                onClick={handleShowCodeInput}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors duration-200 font-medium"
              >
                Ingresar código de verificación
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Vista inicial (solicitar email)
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="mb-6">
            <button 
              onClick={handleBackToLogin}
              className="flex items-center text-gray-500 hover:text-gray-800 transition-colors duration-200 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio de sesión
            </button>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Recuperar contraseña
            </h2>
            <p className="text-base text-gray-600">
              Ingresa tu email y te enviaremos un código para restablecer tu contraseña.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors duration-200"
                  placeholder="tu@email.com"
                  disabled={isLoading}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enviando...
                </div>
              ) : (
                'Enviar código'
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Recordaste tu contraseña?{' '}
              <Link to="/Sins">
                <button 
                  onClick={handleGoToLogin}
                  className="text-gray-900 hover:underline font-medium"
                >
                  Iniciar sesión
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordRecovery;