import { Link } from "react-router-dom";


const Tofertas = () => {
  return (
    <section className="bg-white min-h-screen font-sans">
      {/* navbar */}
      <div className="navbar bg-white shadow-md p-6 flex items-center justify-center sticky top-0 z-50">
        <div className="flex items-center justify-between w-full max-w-screen-xl">
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            <span className="text-yellow-500">U</span>
            <span className="text-[#3a4f72]">D</span>
            <span className="text-red-500">C</span>
            <span className="text-[#3a4f72]">TALENTO</span>
          </h1>

          <Link to="/gusu">
            <button className="text-sm font-medium text-gray-700 hover:text-blue-500 transition">
              Gestionar Usuarios
            </button>
            </Link> 

          <Link to="/">
          <button className="px-4 py-2 bg-[#00102D] text-white rounded-lg hover:bg-[#003366]">
            Cerrar sesión
          </button>
          </Link>
        </div>
      </div>

      {/* contenido principal */}
      <div className="py-12 bg-gradient-to-r from-[#4d6c91] to-[#3a4f72] text-white shadow-xl rounded-lg mb-12">
        <div className="text-center mt-16">
          <h1 className="text-5xl font-extrabold mb-4 text-shadow-lg">Panel de Administrador</h1>
          <h2 className="text-3xl font-semibold">Gestión de Ofertas</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Administre las ofertas laborales, revise, apruebe o rechace publicaciones y mantenga un control sobre las oportunidades laborales.
          </p>
        </div>
      </div>

      {/* barra de busqueda y orden */}
      <div className="px-6 mx-auto max-w-screen-xl mt-8 flex justify-between items-center">
        <div className="flex space-x-6">
          <input
            type="text"
            className="px-4 py-2 rounded-lg shadow-md w-80 border border-[#4d6c91] focus:outline-none focus:ring-2 focus:ring-[#3a4f72] transition"
            placeholder="Buscar oferta..."
          />
          <select className="px-4 py-2 rounded-lg shadow-md border border-[#4d6c91] focus:outline-none focus:ring-2 focus:ring-[#3a4f72] transition">
            <option value="name">Ordenar por Título</option>
            <option value="date">Ordenar por Fecha</option>
            <option value="status">Ordenar por Estado</option>
          </select>
        </div>
      </div>

      {/* Tabla estilizada */}
      <div className="px-6 mx-auto max-w-screen-xl mt-12">
        <div className="relative overflow-x-auto shadow-xl rounded-lg">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-[#3a4f72] text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Título</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Descripción</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Fecha de Publicación</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Fecha de Vencimiento</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Ubicación</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Candidatos</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* ejemplo  fila de oferta */}
              <tr className="hover:bg-[#e6f0f6] transition duration-300">
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4 font-medium text-[#202f49]">Desarrollador Frontend</td>
                <td className="px-6 py-4 text-[#556675]">Desarrollar interfaces de usuario para aplicaciones web.</td>
                <td className="px-6 py-4 text-[#556675]">2023-12-15</td>
                <td className="px-6 py-4 text-[#556675]">2024-01-15</td>
                <td className="px-6 py-4 text-[#556675]">Madrid</td>
                <td className="px-6 py-4 text-[#556675]">50</td>
                <td className="px-6 py-4">
                  <a href="#" className="text-green-500 hover:text-green-700 font-semibold transition duration-200">Aprobar</a>
                  <a href="#" className="ml-4 text-red-500 hover:text-red-700 font-semibold transition duration-200">Rechazar</a>
                </td>
              </tr>

              {/*  fila de oferta */}
              <tr className="hover:bg-[#e6f0f6] transition duration-300">
                <td className="px-6 py-4">2</td>
                <td className="px-6 py-4 font-medium text-[#3a4f72]">Backend Developer</td>
                <td className="px-6 py-4 text-[#556675]">Desarrollar y mantener la parte del servidor de las aplicaciones.</td>
                <td className="px-6 py-4 text-[#556675]">2023-11-30</td>
                <td className="px-6 py-4 text-[#556675]">2024-01-01</td>
                <td className="px-6 py-4 text-[#556675]">Barcelona</td>
                <td className="px-6 py-4 text-[#556675]">30</td>
                <td className="px-6 py-4">
                  <a href="#" className="text-green-500 hover:text-green-700 font-semibold transition duration-200">Aprobar</a>
                  <a href="#" className="ml-4 text-red-500 hover:text-red-700 font-semibold transition duration-200">Rechazar</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/*  agregar nueva oferta */}
      <div className="px-6 mx-auto max-w-screen-xl mt-8 flex justify-end">
        <button className="px-6 py-3 bg-[#4e7ca1] text-white font-semibold rounded-lg shadow-md hover:bg-[#3a4f72] focus:outline-none focus:ring-2 focus:ring-[#3a4f72] transition">
          Agregar Nueva Oferta
        </button>
      </div>

      {/* actividad reciente */}
      <div className="px-6 mx-auto max-w-screen-xl mt-12">
        <h3 className="text-2xl font-bold text-[#3a4f72] mb-6">Actividad Reciente</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[#f3f8fc] shadow-xl rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[#e6f0f6]">
            <h4 className="font-semibold text-[#2C3E50]">Oferta Aprobada</h4>
            <p className="text-[#4e7ca1]">Desarrollador Frontend - Aprobada</p>
            <span className="text-sm text-[#7a8a9b]">Hace 2 horas</span>
          </div>

          <div className="bg-[#f3f8fc] shadow-xl rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[#e6f0f6]">
            <h4 className="font-semibold text-[#2C3E50]">Oferta Rechazada</h4>
            <p className="text-[#4e7ca1]">Desarrollador Backend - Rechazada</p>
            <span className="text-sm text-[#7a8a9b]">Hace 5 horas</span>
          </div>

          <div className="bg-[#f3f8fc] shadow-xl rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[#e6f0f6]">
            <h4 className="font-semibold text-[#2C3E50]">Nueva Oferta</h4>
            <p className="text-[#4e7ca1]">Desarrollador Backend - Nueva</p>
            <span className="text-sm text-[#7a8a9b]">Hace 8 horas</span>
          </div>
        </div>
      </div>

      {/* tarjetas de estadisticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6 mx-auto max-w-screen-xl mt-12">
        <div className="bg-white shadow-xl rounded-lg p-6 text-center transform transition duration-300 hover:scale-105">
          <h3 className="text-xl font-bold text-[#3a4f72]">Ofertas Totales</h3>
          <p className="text-3xl text-[#4e7ca1] font-extrabold mt-2">125</p>
        </div>
        <div className="bg-white shadow-xl rounded-lg p-6 text-center transform transition duration-300 hover:scale-105">
          <h3 className="text-xl font-bold text-[#3a4f72]">Ofertas Pendientes</h3>
          <p className="text-3xl text-[#4e7ca1] font-extrabold mt-2">50</p>
        </div>
        <div className="bg-white shadow-xl rounded-lg p-6 text-center transform transition duration-300 hover:scale-105">
          <h3 className="text-xl font-bold text-[#3a4f72]">Ofertas Aprobadas</h3>
          <p className="text-3xl text-[#4e7ca1] font-extrabold mt-2">200</p>
        </div>
        <div className="bg-white shadow-xl rounded-lg p-6 text-center transform transition duration-300 hover:scale-105">
          <h3 className="text-xl font-bold text-[#3a4f72]">Ofertas Rechazadas</h3>
          <p className="text-3xl text-[#4e7ca1] font-extrabold mt-2">10</p>
        </div>
      </div>

      {/* politicas y normas */}
      <div className="px-6 mx-auto max-w-screen-xl mt-12 mb-12">
        <div className="bg-[#e6f0f6] border-l-4 border-[#4e7ca1] p-6 rounded-lg shadow-xl">
          <h3 className="text-2xl font-bold text-[#3a4f72] mb-4">Políticas y Normas</h3>
          <p className="text-[#3a4f72]">
            Asegúrese de que todas las ofertas cumplan con las políticas de la plataforma. Consulte nuestras normas aquí.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Tofertas;
