import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Tinsesion = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/admin/auth/login', {
        email: formData.email,
        password: formData.password
      });

      // Guardar token en localStorage
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminUser', JSON.stringify(response.data.user));

      // Redirigir al dashboard
      navigate('/pagadmin');
    } catch (error) {
      console.error('Error de login:', error);
      setError(
        error.response?.data?.error || 
        'Error al iniciar sesión. Verifique sus credenciales.'
      );
    } finally {
      setLoading(false);
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
              <a href="/Pins" className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors tracking-wide">
                MEDICO
              </a>
              <a href="/Sins" className="text-sm font-medium text-gray-900 border-b border-gray-900 pb-1 tracking-wide">
                PACIENTE
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
  
        {/* inicio de sesion */}
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
            
            {/* imagen */}
            <div className="md:h-full rounded-xl lg:p-0 p-8">
              <img
                src="/src/assets/img_admin/Pitch Deck 3D Animated Icon.png"
                className="w-full h-full object-contain"
                alt="login-image"
              />
            </div>
  
            {/* formulario*/}
            <div className="md:max-w-md w-full px-4 py-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-12">
                  <h3 className="text-gray-800 text-3xl font-extrabold">Iniciar Sesión Administrador</h3>
                </div>

                {/* Mostrar error si existe */}
                {error && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                  </div>
                )}
  
                {/* correo */}
                <div>
                  <label className="text-gray-800 text-xs block mb-2">Correo electrónico</label>
                  <div className="relative flex items-center">
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-[#003366] px-2 py-3 outline-none disabled:opacity-50"
                      placeholder="Introduce tu correo"/>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] absolute right-2"
                      viewBox="0 0 682.667 682.667">
                      <defs>
                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                          <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                        </clipPath>
                      </defs>

                      <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                        <path
                          fill="none"
                          strokeMiterlimit="10"
                          strokeWidth="40"
                          d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                          data-original="#000000"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </div>
  
                {/* contraseña */}
                <div className="mt-8">
                  <label className="text-gray-800 text-xs block mb-2">Contraseña</label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-[#003366] px-2 py-3 outline-none disabled:opacity-50"
                      placeholder="Introduce tu contraseña"/>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                      viewBox="0 0 128 128">
                      <path
                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                </div>
  
                {/* recuerda el usuario y olvido contraseña */}
                <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 shrink-0 text-[#003366] focus:ring-[#003366] border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                      Recuérdame
                    </label>
                  </div>
                  <div>
                    <a href="javascript:void(0);" className="text-[#003366] font-semibold text-sm hover:underline">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>
  
                {/* boton de inicio de sesion */}
                <div className="mt-12">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-[#003366] hover:bg-[#00102D] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                  </button>
                </div>
  
                {/* redes sociales */}
                <div className="space-x-6 flex justify-center mt-6">
                  <button type="button" className="border-none outline-none">
                  </button>
                  <button type="button" className="border-none outline-none">
                  </button>
                  <button type="button" className="border-none outline-none">
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Tinsesion;
  