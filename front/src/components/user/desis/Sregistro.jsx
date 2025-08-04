import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sregistro = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({ //! Falta agregar campos del prisma
  primerNombre: "",
  segundoNombre: "",
  primerApellido: "",
  segundoApellido: "",
  tipoDocumento: "",
  numeroDocumento: "",
  correo: "",
  contraseña: ""
});

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:3000/api/register", formData);

    if (response.status === 200 || response.status === 201) {
      alert("Registro exitoso");
      navigate("/Sins");
    } else {
      alert("Error al registrar: " + response.data.mensaje);
    }
  } catch (error) {
    if (error.response) {
      alert("Error: " + error.response.data.mensaje);
    } else {
      alert("Error al conectar con el servidor");
    }
  }
};

  const [formData, setFormData] = useState({
    genero: "",
    genroOtro:"",
    idioma: "",
    idiomaOtro: "",
    fechaNacimiento: ""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
              <a href="/Sins" className="text-sm font-medium text-gray-900 border-b border-gray-900 pb-1 tracking-wide">
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
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
          <div className="w-full max-w-4xl shadow-lg rounded-md bg-[#00102D] p-8">
            {/* formulario registro */}
            <form onSubmit={handleSubmit}>
              <div className="mb-6 text-center">
                <h3 className="text-white text-3xl font-extrabold">Registrarse</h3>
                <p className="text-sm mt-4 text-gray-300">
                  ¿Ya tienes cuenta?{" "}
                  <Link
                    to="/Sins"
                    className="text-[#FFCB00] font-semibold hover:underline ml-1">
                    Iniciar sesión aquí
                  </Link>
                </p>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* primer nombre */}
                <div>
                  <label className="text-gray-300 text-sm block mb-2">
                    Primer Nombre
                  </label>
                  <input
                    name="primerNombre"
                    type="text"
                    required
                    value={formData.primerNombre}
                    onChange={handleChange}
                    className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#FFCB00] focus:bg-transparent px-6 py-3 outline-none rounded-md"
                    placeholder="Introduce tu primer nombre"
                  />
                </div>
  
                {/* segundo nombre */}
                <div>
                  <label className="text-gray-300 text-sm block mb-2">
                    Segundo Nombre (Opcional)
                  </label>
                  <input
                    name="segundoNombre"
                    type="text"
                    value={formData.segundoNombre}
                    onChange={handleChange}
                    className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#FFCB00] focus:bg-transparent px-6 py-3 outline-none rounded-md"
                    placeholder="Introduce tu segundo nombre"
                  />
                </div>
  
                {/* primer apellido */}
                <div>
                  <label className="text-gray-300 text-sm block mb-2">
                    Primer Apellido
                  </label>
                  <input
                    name="primerApellido"
                    type="text"
                    required
                    value={formData.primerApellido}
                    onChange={handleChange}
                    className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#FFCB00] focus:bg-transparent px-6 py-3 outline-none rounded-md"
                    placeholder="Introduce tu primer apellido"
                  />
                </div>
  
                {/* segundo apellido */}
                <div>
                  <label className="text-gray-300 text-sm block mb-2">
                    Segundo Apellido (Opcional)
                  </label>
                  <input
                    name="segundoApellido"
                    type="text"
                    value={formData.segundoApellido}
                    onChange={handleChange}
                    className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#FFCB00] focus:bg-transparent px-6 py-3 outline-none rounded-md"
                    placeholder="Introduce tu segundo apellido"
                  />
                </div>

                {/* genero */}
                <div>
                  <label className="text-gray-300 text-sm block mb-2">
                    Género
                  </label>
                  <select
                    name="genero"
                    value={formData.genero}
                    onChange={handleInputChange}
                    required
                    className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#FFCB00] focus:bg-transparent px-6 py-3 outline-none rounded-md">
                    <option value="" disabled>
                    Selecciona tu género
                    </option>
                    <option value="M" className="text-black bg-white">
                    Masculino
                    </option>
                    <option value="F" className="text-black bg-white">
                    Femenino
                    </option>
                    <option value="Otro" className="text-black bg-white">
                    Otro
                    </option>
                  </select>

                  {formData.genero === "Otro" && (
                    <div className="mt-4">
                      <label className="text-gray-300 text-sm block mb-2">Especifica tu género</label>
                      <input 
                      type="text"
                      name="generoOtro"
                      value={formData.generoOtro || ""}
                        onChange={handleInputChange}
                        placeholder="Escribe tu género"
                        className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#FFCB00] focus:ng-transparent px-6 py-3 outline-none rounded-md"
                      />
                    </div>
                  )}
                </div>
  
                {/* Sexo */}
                <div>
                  <label className="text-gray-300 text-sm block mb-2">
                    Sexo
                  </label>
                  <select
                    name="sexo"
                    required
                    className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#FFCB00] focus:bg-transparent px-6 py-3 outline-none rounded-md">
                    <option value="" disabled selected>
                    Selecciona tu sexo
                    </option>
                    <option value="M" className="text-black bg-white">
                    Masculino
                    </option>
                    <option value="F" className="text-black bg-white">
                    Femenino
                    </option>
                  </select>
                </div>

                {/* lenguaje */}
                <div>
                  <label className="text-gray-300 text-sm block mb-2">
                    Idioma
                  </label>
                  <select
                    name="idioma"
                    value={formData.idioma}
                    onChange={handleInputChange}
                    required
                    className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#FFCB00] focus:bg-transparent px-6 py-3 outline-none rounded-md">
                    <option value="" disabled>
                    Selecciona tu idioma
                    </option>
                    <option value="Español" className="text-black bg-white">Español</option>
                    <option value="Portugues" className="text-black bg-white">Portugués</option>
                    <option value="Frances" className="text-black bg-white">Francés</option>
                    <option value="Aleman" className="text-black bg-white">Alemén</option>
                    <option value="Ingles" className="text-black bg-white">Inglés</option>
                    <option value="Otro" className="text-black bg-white">
                    Otro
                    </option>
                  </select>

                  {formData.idioma === "Otro" && (
                    <div className="mt-4">
                      <label className="text-gray-300 text-sm block mb-2">Especifica tu idioma</label>
                      <input 
                      type="text"
                      name="idiomaOtro"
                      value={formData.idiomaOtro || ""}
                        onChange={handleInputChange}
                        placeholder="Escribe tu idioma"
                        className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#FFCB00] focus:ng-transparent px-6 py-3 outline-none rounded-md"
                      />
                    </div>
                  )}
                </div>
  
                {/* telefono */}
                <div>
                  <label className="text-gray-300 text-sm block mb-2">
                    Teléfono
                  </label>
                  <input
                    name="telefono"
                    type="tel"
                    className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#FFCB00] focus:bg-transparent px-6 py-3 outline-none rounded-md"
                    placeholder="Introduce tu teléfono (ej: +35 325 125 4587)"
                    onKeyDown={(e) => {
                      const allowedKeys = ['Backspace', 'Delte', 'ArrowLeft', 'ArrowRight', 'Tab', '+'];
                      const isNumber = /^[0-9]$/.test(e.key);
                      if (!isNumber && !allowedKeys.includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
  
                {/* tipo de documento */}
                <div>
                  <label className="text-gray-300 text-sm block mb-2">
                    Tipo de Documento
                  </label>
                  <select
                    name="tipoDocumento"
                    required
                    value={formData.tipoDocumento}
                    onChange={handleChange}
                    className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#FFCB00] focus:bg-transparent px-6 py-3 outline-none rounded-md">
                    <option value="" disabled selected>
                    Selecciona un tipo de documento
                    </option>
                    <option value="cc" className="text-black bg-white">
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
  
                {/* numero de documento */}
                <div>
                  <label className="text-gray-300 text-sm block mb-2">
                    Número de Documento
                  </label>
                  <input
                    name="numeroDocumento"
                    type="text"
                    required
                    value={formData.numeroDocumento}
                    onChange={handleChange}
                    className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#FFCB00] focus:bg-transparent px-6 py-3 outline-none rounded-md"
                    placeholder="Introduce tu número de documento"
                  />
                </div>
  
                {/* correo */}
                <div>
                  <label className="text-gray-300 text-sm block mb-2">
                    Correo electrónico
                  </label>
                  <input
                    name="correo"
                    type="email"
                    required
                    value={formData.correo}
                    onChange={handleChange}
                    className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#FFCB00] focus:bg-transparent px-6 py-3 outline-none rounded-md"
                    placeholder="Introduce tu correo electrónico"
                  />
                </div>

                {/* Fecha de Nacimiento */}
                <div className="text-gray-300 text-sm block mb-2">
                  <label className="font-medium mb-2">Fecha de Nacimiento</label>
                  <input
                    type="date"
                    name="fechaNacimiento"
                    className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#FFCB00] focus:bg-transparent px-6 py-3 outline-none rounded-md"
                    value={handleInputChange.fechaNacimiento}
                    onChange={handleInputChange}
                  />
                </div>
  
                {/* contraseña */}
                <div>
                  <label className="text-gray-300 text-sm block mb-2">
                    Contraseña
                  </label>
                  <input
                    name="contraseña"
                    type="password"
                    required
                    value={formData.contraseña}
                    onChange={handleChange}
                    className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#FFCB00] focus:bg-transparent px-6 py-3 outline-none rounded-md"
                    placeholder="Introduce tu contraseña"
                  />
                </div>
              </div>
  
              {/* botones de accion */}
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
                  className="flex-1 shadow-md py-3 px-5 text-base tracking-wide rounded-md text-[#00102D] bg-[#FFCB00] hover:bg-[#FFC107] focus:outline-none">
                  Registrarme
                </button>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default Sregistro;
  