import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Sinsesion = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email: formData.email,
        password: formData.password,
      });
      console.log("Login exitoso", response.data);
      // Redirige al perfil si el login es exitoso
      navigate("/perfilPaciente");
    } catch (err) {
      console.error("Error en login:", err);
      setError("Correo o contraseña incorrectos");
    }
  };

  const Navbar = () => (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-light tracking-wide text-gray-900">
          TELECONSULTAS<span className="font-medium">IPS</span>
        </Link>
        <div className="hidden md:flex items-center space-x-12">
          <a href="/Tins" className="text-sm font-light text-gray-600 hover:text-gray-900">
            ADMINISTRADOR
          </a>
          <a href="/Pins" className="text-sm font-light text-gray-600 hover:text-gray-900">
            MÉDICO
          </a>
          <a href="/Sreg" className="text-sm font-medium text-gray-900 border-b border-gray-900 pb-1">
            REGISTRARME
          </a>
        </div>
      </div>
    </nav>
  );

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-lg rounded-md">
          <div className="md:h-full rounded-xl lg:p-0 p-8">
            <img
              src="/src/assets/img_user/Customer Persona 3D Animated Icon (1) 1 (1).png"
              className="w-full h-full object-contain"
              alt="login-image"
            />
          </div>

          <div className="md:max-w-md w-full px-4 py-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-12">
                <h3 className="text-gray-800 text-3xl font-extrabold">Iniciar Sesión - Paciente</h3>
                <p className="text-sm mt-4 text-gray-800">
                  ¿No tienes cuenta?{" "}
                  <Link to="/Sreg" className="text-[#003366] font-semibold hover:underline ml-1">
                    Registrarme aquí

                  </Link>
                </p>
              </div>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <div>
                <label className="text-gray-800 text-xs block mb-2">Correo electrónico</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
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
                  onChange={handleChange}
                  className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-[#003366] px-2 py-3 outline-none"
                  placeholder="Introduce tu contraseña"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember"
                    type="checkbox"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="h-4 w-4 shrink-0 text-[#003366] focus:ring-[#003366] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                    Recuérdame
                  </label>
                </div>
                <div>
                  <a href="#" className="text-[#003366] font-semibold text-sm hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>

              <div className="mt-12">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-[#003366] hover:bg-[#00102D] focus:outline-none"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sinsesion;
