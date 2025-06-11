import { useState } from "react";
import { Link } from "react-router-dom";


const Pin = () => {
  // estado para el modo oscuro
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <section className={`${darkMode ? "bg-gray-900" : "bg-white"} transition-colors duration-300`}>
      {/* navbar */}
      <nav className={`p-4 shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
      <div className="text-xl font-semibold">
            UDC TALENTO
          </div>
          <Link to="/">
          <button
            onClick={() => console.log("Cerrar sesión")}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-300 ${
              darkMode ? "bg-red-500 text-white hover:bg-red-400" : "bg-red-600 text-white hover:bg-red-500"
            }`}>
            Cerrar Sesión
          </button>
          </Link>
        </div>
      </nav>

      {/* encabezado */}
      <div className="py-24 px-8 mx-auto max-w-screen-xl text-center lg:px-12">
        <div className={`text-center p-10 rounded-lg shadow-xl ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
            Panel de Administrador
          </h1>
          <p className="mb-12 text-lg lg:text-xl sm:px-16 xl:px-48 font-semibold">
            Administra el contenido, los usuarios y las ofertas de manera eficiente.
          </p>
          <button
            onClick={toggleDarkMode}
            className={`px-6 py-3 rounded-full font-semibold transition-colors duration-300 ${
              darkMode ? "bg-gray-200 text-black" : "bg-red-400 text-white"
            }`}
          >
            {darkMode ? "Modo Claro" : "Modo Oscuro"}
          </button>
        </div>
      </div>

      {/* gestion de ofertas */}
      <div className={`py-20 px-8 mx-auto max-w-screen-xl mb-24 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <img
            src="/src/assets/img_admin/admin 1.png"
            alt="Ofertas"
            className="w-full md:w-1/3 rounded-lg shadow-lg mb-8 md:mb-0 md:mr-12 transition duration-500 transform hover:scale-105"
          />
          <div className={`w-full md:w-2/3 max-w-md ${darkMode ? "text-white" : "text-gray-900"}`}>
            <h3 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-4xl">
              Gestionar Ofertas
            </h3>
            <p className="text-lg leading-relaxed text-justify mb-6">
              Administra las ofertas de empleo de forma eficiente, aprueba o rechaza ofertas según los criterios establecidos.
            </p>
            <Link to="/goft">
            <div
              className={`inline-flex justify-center md:justify-start items-center py-4 px-8 text-base font-medium text-center rounded-lg transition duration-300 ${
                darkMode
                  ? "bg-red-500 hover:bg-red-400 text-white"
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}>
              Gestionar Ofertas
            </div>
            </Link>
          </div>
        </div>
      </div>

      {/* gestion de usuarios */}
      <div className="py-20 px-8 mx-auto max-w-screen-xl bg-gray-200 rounded-lg shadow-lg mb-24">
        <div className="flex flex-col md:flex-row-reverse justify-between items-center mb-16">
          <img
            src="/src/assets/img_admin/Operational Technology 3D Model 1.png"
            alt="Usuarios"
            className="w-full md:w-1/3 rounded-lg shadow-lg mb-8 md:mb-0 md:ml-12 transition duration-500 transform hover:scale-105"
          />
          <div className="w-full md:w-2/3 max-w-md">
            <h3 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-4xl">
              Gestionar Usuarios
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed text-justify mb-6">
              Accede a los perfiles de los usuarios, realiza auditorías de actividad y aplica restricciones cuando sea necesario.
            </p>
            <Link to="/gusu">
            <div className="inline-flex justify-center md:justify-start items-center py-4 px-8 text-base font-medium text-center text-white rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300">
              Gestionar Usuarios
            </div>
            </Link>
          </div>
        </div>
      </div>

      {/* ofertas disponibles */}
      <div className="py-20 px-8 mx-auto max-w-screen-xl">
        <h3 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 text-center">
          Implementación
        </h3>

        {/* caracteristicas */}
        <section className={`${darkMode ? "bg-gray-800" : "bg-white"} py-16`}>
          <div className="px-4 mx-auto max-w-screen-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className={`p-8 border rounded-lg shadow-md ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
                <h3 className="text-lg font-semibold">Análisis y Estadísticas</h3>
                <p className="text-sm mt-4 mb-6">
                  Tablas de almacenamiento de estadísticas e informes dinámicos. Métrica, uso y efectividad del sitio a partir de tablas de usuarios, ofertas y postulantes.
                </p>
                <button className={`inline-flex justify-center items-center py-3 px-5 text-base font-medium text-[#FF0000] ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-primary-700 hover:bg-primary-800"} rounded-lg`}>
                  Ver más
                </button>
              </div>
              <div className={`p-8 border rounded-lg shadow-md ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
                <h3 className="text-lg font-semibold">Control de Contenido</h3>
                <p className="text-sm mt-4 mb-6">
                  Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500.
                </p>
                <button className={`inline-flex justify-center items-center py-3 px-5 text-base font-medium text-[#FF0000] ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-primary-700 hover:bg-primary-800"} rounded-lg`}>
                  Ver más
                </button>
              </div>
              <div className={`p-8 border rounded-lg shadow-md ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
                <h3 className="text-lg font-semibold">Calidad y Soporte</h3>
                <p className="text-sm mt-4 mb-6">
                  Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500.
                </p>
                <button className={`inline-flex justify-center items-center py-3 px-5 text-base font-medium text-[#FF0000] ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-primary-700 hover:bg-primary-800"} rounded-lg`}>
                  Ver más
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Pin;
