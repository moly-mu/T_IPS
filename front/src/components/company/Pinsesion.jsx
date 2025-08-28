import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert, Snackbar, AlertTitle } from "@mui/material";

const PinSesion = () => {
  const [alert, setAlert] = useState({
    open: false,
    severity: 'info',
    message: '',
    title: ''
  });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const navigate = useNavigate();

  const showAlert = (severity, message, title = '') => {
    setAlert({
      open: true,
      severity,
      message,
      title
    });
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email) {
      showAlert('error', 'Por favor ingresa tu correo electrónico', 'Campo requerido');
      return;
    }

    if (!formData.password) {
      showAlert('error', 'Por favor ingresa tu contraseña', 'Campo requerido');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showAlert('error', 'Por favor ingresa un correo electrónico válido', 'Formato incorrecto');
      return;
    }

    if (formData.password.length < 6) {
      showAlert('warning', 'La contraseña debe tener al menos 6 caracteres', 'Contraseña débil');
      return;
    }

    showAlert('info', 'Verificando credenciales...', 'Iniciando sesión');

    setTimeout(() => {
      const loginSuccess = true;

      if (loginSuccess) {
        showAlert('success', 'Has iniciado sesión correctamente', '¡Bienvenido!');
        setTimeout(() => {
          navigate('/pagusuario'); 
        }, 1500);
      } else {
        showAlert('error', 'Credenciales incorrectas. Verifica tu email y contraseña', 'Error de autenticación');
      }
    }, 2000);
  };

  const handleForgotPassword = () => {
    if (!formData.email) {
      showAlert('warning', 'Por favor ingresa tu correo electrónico primero', 'Email requerido');
      return;
    }

    showAlert('info', 'Se ha enviado un enlace de recuperación a tu correo electrónico', 'Recuperación de contraseña');
  };

  const Navbar = () => (
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
            <a href="/Sins" className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors tracking-wide">
              PACIENTE
            </a>
            <a href="/Sreg" className="text-sm font-medium text-gray-900 border-b border-gray-900 pb-1 tracking-wide">
              REGISTRARME
            </a>
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <div>
      <Navbar />
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
          {alert.message}
        </Alert>
      </Snackbar>

      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          <div className="md:max-w-md w-full px-4 py-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-12">
                <h3 className="text-gray-800 text-3xl font-extrabold">Iniciar Sesión - Medico</h3>
                <p className="text-sm mt-4 text-gray-800">
                  ¿No tienes cuenta?{" "}
                  <Link
                    to="/Sreg"
                    className="text-[#003366] font-semibold hover:underline ml-1 whitespace-nowrap">
                    Registrarme aquí
                  </Link>
                </p>
              </div>

              <div>
                <label className="text-gray-800 text-xs block mb-2">Correo electrónico</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-[#003366] px-2 py-3 outline-none"
                  placeholder="Introduce tu correo"
                />
              </div>

              <div className="mt-8">
                <label className="text-gray-800 text-xs block mb-2">Contraseña</label>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-[#003366] px-2 py-3 outline-none"
                  placeholder="Introduce tu contraseña"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 shrink-0 text-[#003366] focus:ring-[#003366] border-gray-300 rounded" />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                    Recuérdame
                  </label>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[#003366] font-semibold text-sm hover:underline">
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              </div>

              <div className="mt-12">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-[#003366] hover:bg-[#00102D] focus:outline-none">
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>

          <div className="md:h-full rounded-xl lg:p-12 p-8">
            <img
              src="/src/assets/img_admin/vecteezy_magnificent-standout-a-stethoscope-classic-medical_60154891.png"
              className="w-full h-full object-contain"
              alt="login-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinSesion;
