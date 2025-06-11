import { useState } from "react";
import { Link } from "react-router-dom"; // Importa el Link de React Router

const PerfilEmpresa = () => {
  // Estado con la información de la empresa
  const [empresa, setEmpresa] = useState({
    nombre: "Tech Corp",
    descripcion: "Somos una empresa líder en desarrollo de software, creando soluciones tecnológicas innovadoras para el futuro.",
    empleados: 120,
    logo: "https://via.placeholder.com/150",
  });

  //  editar los datos
  const [editar, setEditar] = useState(false);
  const [datosEditados, setDatosEditados] = useState({ ...empresa });

  // manejar los cambios en los campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosEditados((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //guardar los cambios
  const handleGuardar = () => {
    setEmpresa({ ...datosEditados });
    setEditar(false);  // desactiva el modo de edicion
  };

  return (
    <section className="bg-white py-12">
      <div className="navbar bg-white shadow-md p-6 flex items-center justify-center sticky top-0 z-50">
        <div className="flex items-center justify-between w-full max-w-screen-xl">
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            <span className="text-yellow-500">U</span>
            <span className="text-[#00102D]">D</span>
            <span className="text-red-500">C</span>
            <span className="text-[#00102D]">TALENTO</span>
          </h1>
          <Link to="/">
          <button className="px-4 py-2 bg-[#00102D] text-white rounded-lg hover:bg-[#003366]">
            Cerrar sesión
          </button>
          </Link>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-[#221831] mb-6">Perfil de la Empresa</h2>

        {/* logo de la empresa */}
        <div className="flex justify-center mb-6">
          <img
            src={empresa.logo}
            alt="Logo de la Empresa"
            className="w-32 h-32 object-cover rounded-full"
          />
        </div>

        {/* informacion de la empresa */}
        <div className="space-y-6 text-center">
          <div className="text-xl font-semibold text-[#221831]">
            {editar ? (
              <input
                type="text"
                name="nombre"
                value={datosEditados.nombre}
                onChange={handleChange}
                className="p-2 border border-[#465779] rounded-lg w-full text-center"
              />
            ) : (
              <h3>{empresa.nombre}</h3>
            )}
          </div>

          <div className="text-sm text-[#465779]">
            {editar ? (
              <textarea
                name="descripcion"
                value={datosEditados.descripcion}
                onChange={handleChange}
                rows="4"
                className="p-2 border border-[#465779] rounded-lg w-full"
              />
            ) : (
              <p>{empresa.descripcion}</p>
            )}
          </div>

          <div className="text-sm text-[#465779]">
            <strong>Número de Empleados:</strong> {editar ? (
              <input
                type="number"
                name="empleados"
                value={datosEditados.empleados}
                onChange={handleChange}
                className="p-2 border border-[#465779] rounded-lg"
              />
            ) : (
              empresa.empleados
            )}
          </div>

          <div className="text-sm text-[#465779]">
            <strong>Sitio Web:</strong> {editar ? (
              <input
                type="text"
                name="sitioWeb"
                value={datosEditados.sitioWeb}
                onChange={handleChange}
                className="p-2 border border-[#465779] rounded-lg"
              />
            ) : (
              <a href={empresa.sitioWeb} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">{empresa.sitioWeb}</a>
            )}
          </div>
        </div>

        {/* botones para editar, guardar y volver */}
        <div className="flex justify-center mt-6 space-x-4">
          {editar ? (
            <>
              <button
                onClick={handleGuardar}
                className="px-6 py-3 bg-[#465779] text-white rounded-lg font-semibold hover:bg-[#221831] transition">
                Guardar Cambios
              </button>
              <button
                onClick={() => setEditar(false)}
                className="px-6 py-3 bg-gray-300 text-black rounded-lg font-semibold hover:bg-gray-400 transition">
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditar(true)}
                className="px-6 py-3 bg-[#465779] text-white rounded-lg font-semibold hover:bg-[#221831] transition">
                Editar Perfil
              </button>
              {/* lver usando iink */}
              <Link to="/pagempresa">
                <button
                  className="px-6 py-3 bg-gray-300 text-black rounded-lg font-semibold hover:bg-gray-400 transition">
                  Volver
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PerfilEmpresa;
