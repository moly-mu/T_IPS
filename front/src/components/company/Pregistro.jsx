import { Link } from "react-router-dom";
import { useState } from "react";
import { Alert, Snackbar, AlertTitle } from "@mui/material";
import axios from '../../api/axios';

const Pregistro = () => {
  // Estados para manejar las alertas
  const [alert, setAlert] = useState({
    open: false,
    severity: 'info',
    message: '',
    title: ''
  });

  // Estados para el formulario
  const [formData, setFormData] = useState({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    tipoDocumento: '',
    numeroDocumento: '',
    correo: '',
    contraseña: ''
  });

  // Función para mostrar alertas
  const showAlert = (severity, message, title = '') => {
    setAlert({
      open: true,
      severity,
      message,
      title
    });
  };

  // Función para cerrar alertas
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  // Función para manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para validar el formulario
  const validateForm = () => {
    const requiredFields = [
      { field: 'primerNombre', label: 'Primer Nombre' },
      { field: 'primerApellido', label: 'Primer Apellido' },
      { field: 'tipoDocumento', label: 'Tipo de Documento' },
      { field: 'numeroDocumento', label: 'Número de Documento' },
      { field: 'correo', label: 'Correo electrónico' },
      { field: 'contraseña', label: 'Contraseña' }
    ];

    // Verificar campos requeridos
    for (const { field, label } of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        showAlert('error', `El campo ${label} es obligatorio`, 'Campo requerido');
        return false;
      }
    }

    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) {
      showAlert('error', 'Por favor ingresa un correo electrónico válido', 'Formato incorrecto');
      return false;
    }

    // Validar contraseña
    if (formData.contraseña.length < 8) {
      showAlert('warning', 'La contraseña debe tener al menos 8 caracteres', 'Contraseña débil');
      return false;
    }

    // Validar número de documento
    if (formData.numeroDocumento.length < 6) {
      showAlert('warning', 'El número de documento debe tener al menos 6 dígitos', 'Documento inválido');
      return false;
    }

    return true;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  showAlert('info', 'Procesando tu registro, por favor espera...', 'Creando cuenta');

  try {
    const response = await axios.post('specialist/auth/register', {
      email: formData.correo,
      document: formData.numeroDocumento,
      firstname: formData.primerNombre,
      second_firstname: formData.segundoNombre,
      lastname: formData.primerApellido,
      second_lastname: formData.segundoApellido,
      age: 25, // asigna la edad real que necesites
      gender: 'masculino', // o 'femenino'
      password: formData.contraseña,
      sex: 'masculino', // o 'femenino'
      languaje: 'español',
      document_type: formData.tipoDocumento,
      phone: '1234567890' // aquí también el valor real o agrégalo al formulario
    });

    showAlert('success', `¡Bienvenido ${formData.primerNombre}! Registro exitoso.`, 'Registro Exitoso');

    setTimeout(() => {
      window.location.href = '/pagusuario';
    }, 2000);

  } catch (error) {
    console.error(error);
    showAlert('error', error.response?.data?.error || 'Error al registrar.', 'Registro Fallido');
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
              <a href="/Sins" className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors tracking-wide">
                PACIENTE
              </a>
              <a href="/Pins" className="text-sm font-medium text-gray-900 border-b border-gray-900 pb-1 tracking-wide">
                INICIAR SESIÓN
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  };

  return (
    <div>
      <Navbar/>

      {/* Snackbar para mostrar alertas */}
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

      {/* Pantalla de Registro */}
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
        <div className="w-full max-w-4xl shadow-lg rounded-md bg-[#00102D] p-8">
          {/* Formulario de Registro */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6 text-center">
              <h3 className="text-white text-3xl font-extrabold">Registrarse</h3>
              <p className="text-sm mt-4 text-gray-300">
                ¿Ya tienes cuenta?{" "}
                <Link
                  to="/Pins"
                  className="text-[#99B3C6] font-semibold hover:underline ml-1">
                  Iniciar sesión aquí
                </Link>
              </p>
            </div>

            {/* Grid de todos los campos del formulario */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primer Nombre */}
              <div>
                <label className="text-gray-300 text-sm block mb-2">
                  Primer Nombre *
                </label>
                <input
                  name="primerNombre"
                  type="text"
                  required
                  value={formData.primerNombre}
                  onChange={handleInputChange}
                  className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#99B3C6] focus:bg-transparent px-6 py-3 outline-none rounded-md"
                  placeholder="Introduce tu primer nombre"
                />
              </div>

              {/* Segundo Nombre */}
              <div>
                <label className="text-gray-300 text-sm block mb-2">
                  Segundo Nombre (Opcional)
                </label>
                <input
                  name="segundoNombre"
                  type="text"
                  value={formData.segundoNombre}
                  onChange={handleInputChange}
                  className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#99B3C6] focus:bg-transparent px-6 py-3 outline-none rounded-md"
                  placeholder="Introduce tu segundo nombre"
                />
              </div>

              {/* Primer Apellido */}
              <div>
                <label className="text-gray-300 text-sm block mb-2">
                  Primer Apellido *
                </label>
                <input
                  name="primerApellido"
                  type="text"
                  required
                  value={formData.primerApellido}
                  onChange={handleInputChange}
                  className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#99B3C6] focus:bg-transparent px-6 py-3 outline-none rounded-md"
                  placeholder="Introduce tu primer apellido"
                />
              </div>

              {/* Segundo Apellido */}
              <div>
                <label className="text-gray-300 text-sm block mb-2">
                  Segundo Apellido (Opcional)
                </label>
                <input
                  name="segundoApellido"
                  type="text"
                  value={formData.segundoApellido}
                  onChange={handleInputChange}
                  className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#99B3C6] focus:bg-transparent px-6 py-3 outline-none rounded-md"
                  placeholder="Introduce tu segundo apellido"
                />
              </div>

              {/* Tipo de Documento */}
              <div>
                <label className="text-gray-300 text-sm block mb-2">
                    Tipo de Documento *
                </label>
                <select
                    name="tipoDocumento"
                    required
                    value={formData.tipoDocumento}
                    onChange={handleInputChange}
                    className="w-full text-white text-sm bg-[#1E293B] border-b border-gray-400 focus:border-[#6393B6] focus:bg-[#27364D] px-6 py-3 outline-none rounded-md">
                    <option value="">
                    Selecciona un tipo de documento
                    </option>
                    <option value="CC" className="text-black bg-white">
                    Cédula de Ciudadanía
                    </option>
                    <option value="ti" className="text-black bg-white">
                    Tarjeta de Identidad
                    </option>
                    <option value="ce" className="text-black bg-white">
                    Cédula de Extranjería
                    </option>
                    <option value="pasaporte" className="text-black bg-white">
                    Pasaporte
                    </option>
                </select>
              </div>

              {/* Número de Documento */}
              <div>
                <label className="text-gray-300 text-sm block mb-2">
                  Número de Documento *
                </label>
                <input
                  name="numeroDocumento"
                  type="text"
                  required
                  value={formData.numeroDocumento}
                  onChange={handleInputChange}
                  className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#99B3C6] focus:bg-transparent px-6 py-3 outline-none rounded-md"
                  placeholder="Introduce tu número de documento"
                />
              </div>

              {/* Correo */}
              <div>
                <label className="text-gray-300 text-sm block mb-2">
                  Correo electrónico *
                </label>
                <input
                  name="correo"
                  type="email"
                  required
                  value={formData.correo}
                  onChange={handleInputChange}
                  className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#99B3C6] focus:bg-transparent px-6 py-3 outline-none rounded-md"
                  placeholder="Introduce tu correo electrónico"
                />
              </div>

              {/* Contraseña */}
              <div>
                <label className="text-gray-300 text-sm block mb-2">
                  Contraseña *
                </label>
                <input
                  name="contraseña"
                  type="password"
                  required
                  value={formData.contraseña}
                  onChange={handleInputChange}
                  className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#99B3C6] focus:bg-transparent px-6 py-3 outline-none rounded-md"
                  placeholder="Introduce tu contraseña (mínimo 8 caracteres)"
                />
              </div>
            </div>

            {/* Botones de acción */}
            <div className="mt-8 flex gap-4">
              <Link to="/">
                <button
                  type="button"
                  className="flex-1 shadow-md py-3 px-5 text-base tracking-wide rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none">
                  Cancelar
                </button>
              </Link>

              <button
                type="submit"
                className="flex-1 shadow-md py-3 px-5 text-base tracking-wide rounded-md text-[#00102D] bg-[#99B3C6] hover:bg-[#7A9BB8] focus:outline-none">
                Registrarme
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Pregistro;