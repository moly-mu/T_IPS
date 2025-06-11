import { Link } from "react-router-dom";

const Stablas = () => {
  return (
    <section className="bg-white min-h-screen font-sans">
      <div className="navbar bg-white shadow-md p-6 flex items-center justify-center sticky top-0 z-50">
        <div className="flex items-center justify-between w-full max-w-screen-xl">

          
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            <span className="text-yellow-500">U</span>
            <span className="text-[#00102D]">D</span>
            <span className="text-red-500">C</span>
            <span className="text-[#00102D]">TALENTO</span>
          </h1>

          <Link to="/goft">
            <button className="text-sm font-medium text-gray-700 hover:text-blue-500 transition">
              Gestionar Ofertas
            </button>
            </Link>

          <Link to="/">
          <button className="px-4 py-2 bg-[#00102D] text-white rounded-lg hover:bg-[#003366]">
            Cerrar sesión
          </button>
          </Link>
        </div>
      </div>

      {/* contenido principal  */}
      <div className="py-12 bg-gradient-to-r from-[#221831] to-[#465779] text-white shadow-xl rounded-lg mb-12">
        {/* Título y contenido abajo */}
        <div className="text-center mt-16">
          <h1 className="text-5xl font-extrabold mb-4 text-shadow-lg">Panel de Administrador</h1>
          <h2 className="text-3xl font-semibold">Gestión de Usuarios</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Administre perfiles, revise publicaciones y garantice el cumplimiento de las políticas de la plataforma.
          </p>
        </div>
      </div>

      {/*barra de busqueda y ordenacion */}
      <div className="px-6 mx-auto max-w-screen-xl mt-8 flex justify-between items-center">
        <div className="flex space-x-6">
          <input
            type="text"
            className="px-4 py-2 rounded-lg shadow-md w-80 border border-[#465779] focus:outline-none focus:ring-2 focus:ring-[#221831] transition"
            placeholder="Buscar usuario..."
          />
          <select className="px-4 py-2 rounded-lg shadow-md border border-[#465779] focus:outline-none focus:ring-2 focus:ring-[#221831] transition">
            <option value="name">Ordenar por Nombre</option>
            <option value="date">Ordenar por Fecha</option>
            <option value="status">Ordenar por Estado</option>
          </select>
        </div>
      </div>

      {/* tabla  */}
      <div className="px-6 mx-auto max-w-screen-xl mt-12">
        <div className="relative overflow-x-auto shadow-xl rounded-lg">
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-[#465779] text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Correo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Fecha de Registro</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Eliminar Usuario</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-[#d3d7e7] transition duration-300">
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4 font-medium text-[#221831]">Juan Pérez</td>
                <td className="px-6 py-4 text-[#465779]">juan.perez@example.com</td>
                <td className="px-6 py-4 text-[#465779]">2023-01-15</td>
                <td className="px-6 py-4">
                  <button className="text-red-600 hover:text-red-800 font-semibold transition duration-200">
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* boton descarga */}
      <div className="px-6 mx-auto max-w-screen-xl mt-8 flex justify-end">
        <button className="px-6 py-3 bg-[#465779] text-white font-semibold rounded-lg shadow-md hover:bg-[#221831] focus:outline-none focus:ring-2 focus:ring-[#221831] transition">
          Descargar lista
        </button>
      </div>

      {/* actividad reciente */}
      <div className="px-6 mx-auto max-w-screen-xl mt-12">
        <h3 className="text-2xl font-bold text-[#221831] mb-6">Actividad reciente</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[#f5f7fa] shadow-xl rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[#e2e8f0]">
            <h4 className="font-semibold text-[#1a202c]">Juan Pérez</h4>
            <p className="text-[#2b6cb0]">Publicó un artículo</p>
            <span className="text-sm text-[#4a5568]">Hace 2 horas</span>
          </div>
          <div className="bg-[#f5f7fa] shadow-xl rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[#e2e8f0]">
            <h4 className="font-semibold text-[#1a202c]">Ana Gómez</h4>
            <p className="text-[#2b6cb0]">Comentó en un post</p>
            <span className="text-sm text-[#4a5568]">Hace 5 horas</span>
          </div>
          <div className="bg-[#f5f7fa] shadow-xl rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[#e2e8f0]">
            <h4 className="font-semibold text-[#1a202c]">Luis Martínez</h4>
            <p className="text-[#2b6cb0]">Se postuló a una oferta</p>
            <span className="text-sm text-[#4a5568]">Hace 8 horas</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6 mx-auto max-w-screen-xl mt-12">
        {/* tarjetas estadisticas */}
        <div className="bg-white shadow-xl rounded-lg p-6 text-center transform transition duration-300 hover:scale-105">
          <h3 className="text-xl font-bold text-[#221831]">Usuarios Totales</h3>
          <p className="text-3xl text-[#465779] font-extrabold mt-2">125</p>
        </div>
        <div className="bg-white shadow-xl rounded-lg p-6 text-center transform transition duration-300 hover:scale-105">
          <h3 className="text-xl font-bold text-[#221831]">Publicaciones Pendientes</h3>
          <p className="text-3xl text-[#465779] font-extrabold mt-2">50</p>
        </div>
        <div className="bg-white shadow-xl rounded-lg p-6 text-center transform transition duration-300 hover:scale-105">
          <h3 className="text-xl font-bold text-[#221831]">Comentarios Moderados</h3>
          <p className="text-3xl text-[#465779] font-extrabold mt-2">200</p>
        </div>
        <div className="bg-white shadow-xl rounded-lg p-6 text-center transform transition duration-300 hover:scale-105">
          <h3 className="text-xl font-bold text-[#221831]">Usuarios Bloqueados</h3>
          <p className="text-3xl text-[#465779] font-extrabold mt-2">10</p>
        </div>
      </div>

      {/* politicas y normas */}
      <div className="px-6 mx-auto max-w-screen-xl mt-12 mb-12">
        <div className="bg-[#d3d7e7] border-l-4 border-[#465779] p-6 rounded-lg shadow-xl">
          <h3 className="text-2xl font-bold text-[#221831] mb-4">Políticas y normas</h3>
          <p className="text-[#221831]">
            Garantice que todas las cuentas y publicaciones respeten las políticas del sitio. Consulte nuestras{" "}
            normas aquí.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stablas;
