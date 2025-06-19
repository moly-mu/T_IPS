import { Link } from "react-router-dom";


const Pregistro = () => {

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

      {/* Pantalla de Registro */}
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
        <div className="w-full max-w-4xl shadow-lg rounded-md bg-[#00102D] p-8">
          {/* Formulario de Registro */}
          <form>
            <div className="mb-6 text-center">
              <h3 className="text-white text-3xl font-extrabold">Registrarse</h3>
              <p className="text-sm mt-4 text-gray-300">
                ¿Ya tienes cuenta?{" "}
                <a
                  href="javascript:void(0);"
                  className="text-[#99B3C6] font-semibold hover:underline ml-1">
                  Iniciar sesión aquí
                </a>
              </p>
            </div>

            {/* Grid de todos los campos del formulario */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primer Nombre */}
              <div>
                <label className="text-gray-300 text-sm block mb-2">
                  Primer Nombre
                </label>
                <input
                  name="primerNombre"
                  type="text"
                  required
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
                  className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#99B3C6] focus:bg-transparent px-6 py-3 outline-none rounded-md"
                  placeholder="Introduce tu segundo nombre"
                />
              </div>

              {/* Primer Apellido */}
              <div>
                <label className="text-gray-300 text-sm block mb-2">
                  Primer Apellido
                </label>
                <input
                  name="primerApellido"
                  type="text"
                  required
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
                  className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#99B3C6] focus:bg-transparent px-6 py-3 outline-none rounded-md"
                  placeholder="Introduce tu segundo apellido"
                />
              </div>

              {/* Tipo de Documento */}
              <div>
                <label className="text-gray-300 text-sm block mb-2">
                    Tipo de Documento
                </label>
                <select
                    name="tipoDocumento"
                    required
                    className="w-full text-white text-sm bg-[#1E293B] border-b border-gray-400 focus:border-[#6393B6] focus:bg-[#27364D] px-6 py-3 outline-none rounded-md">
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

              {/* Número de Documento */}
              <div>
                <label className="text-gray-300 text-sm block mb-2">
                  Número de Documento
                </label>
                <input
                  name="numeroDocumento"
                  type="text"
                  required
                  className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#99B3C6] focus:bg-transparent px-6 py-3 outline-none rounded-md"
                  placeholder="Introduce tu número de documento"
                />
              </div>

              {/* Correo */}
              <div>
                <label className="text-gray-300 text-sm block mb-2">
                  Correo electrónico
                </label>
                <input
                  name="correo"
                  type="email"
                  required
                  className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#99B3C6] focus:bg-transparent px-6 py-3 outline-none rounded-md"
                  placeholder="Introduce tu correo electrónico"
                />
              </div>

              {/* Contraseña */}
              <div>
                <label className="text-gray-300 text-sm block mb-2">
                  Contraseña
                </label>
                <input
                  name="contraseña"
                  type="password"
                  required
                  className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#99B3C6] focus:bg-transparent px-6 py-3 outline-none rounded-md"
                  placeholder="Introduce tu contraseña"
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

              <Link to="/pagusuario">
              <button
                type="submit"
                className="flex-1 shadow-md py-3 px-5 text-base tracking-wide rounded-md text-[#00102D] bg-[#99B3C6] hover:bg-[#99B3C6] focus:outline-none">
                Registrarme
              </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Pregistro;
