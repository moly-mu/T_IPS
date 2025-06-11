import { Link } from "react-router-dom"; 
import { useState } from "react";

const Pins = () => {
  const [ofertas, setOfertas] = useState([
    {
      id: 1,
      titulo: "Desarrollador Frontend",
      empresa: "Tech Corp",
      descripcion: "Desarrollo de interfaces de usuario",
      ubicacion: "Madrid, España",
      fechaCreacion: "2024-05-10",
      postulaciones: [
        { usuario: "Juan Pérez", fecha: "2024-05-12" },
        { usuario: "Laura Gómez", fecha: "2024-05-13" },
      ],
    },
    {
      id: 2,
      titulo: "Diseñador UX/UI",
      empresa: "Design Studio",
      descripcion: "Diseño de interfaces y experiencia de usuario",
      ubicacion: "Barcelona, España",
      fechaCreacion: "2024-06-01",
      postulaciones: [
        { usuario: "Carlos López", fecha: "2024-06-02" },
      ],
    },
  ]);

  const [nuevaOferta, setNuevaOferta] = useState({
    titulo: "",
    descripcion: "",
    empresa: "",
    ubicacion: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaOferta({
      ...nuevaOferta,
      [name]: value,
    });
  };

  const handleCrearOferta = () => {
    const nuevaOfertaConFecha = {
      ...nuevaOferta,
      fechaCreacion: new Date().toISOString().split("T")[0],
      postulaciones: [],
    };
    setOfertas([...ofertas, nuevaOfertaConFecha]);
    setNuevaOferta({ titulo: "", descripcion: "", empresa: "", ubicacion: "" });
  };

  const handleRechazarPostulante = (ofertaId, postulanteIndex) => {
    const updatedOfertas = ofertas.map((oferta) => {
      if (oferta.id === ofertaId) {
        const updatedPostulaciones = oferta.postulaciones.filter((_, index) => index !== postulanteIndex);
        return { ...oferta, postulaciones: updatedPostulaciones };
      }
      return oferta;
    });
    setOfertas(updatedOfertas);
  };

  const handleRevisarPostulante = (postulante) => {
    alert(`Revisando al postulante: ${postulante.usuario}`);
  };

  return (
    <section className="bg-white min-h-screen font-sans">
      {/* Navbar */}
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

      {/* Panel de Administración */}
      <div className="py-12 bg-gradient-to-r from-[#221831] to-[#465779] text-white shadow-xl rounded-lg mb-12">
        <div className="text-center mt-16">
          <h1 className="text-5xl font-extrabold mb-4 text-shadow-lg">Panel de Empresa</h1>
          <h2 className="text-3xl font-semibold">Gestiona tus ofertas de empleo</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Administra tus ofertas, ve las postulaciones y lleva el proceso de contratación.
          </p>
        </div>
        
        {/* Botón de Perfil de Empresa debajo del Panel */}
        <div className="mt-8 text-center">
          <Link to="/perfilempresa">
            <button className="px-6 py-3 bg-[#465779] text-white rounded-lg font-semibold hover:bg-[#221831] transition">
              Perfil de la Empresa
            </button>
          </Link>
        </div>
      </div>

      {/* Contenedor principal dividido en dos secciones */}
      <div className="flex justify-between mx-auto max-w-screen-xl">
        {/* Crear Oferta */}
        <div className="w-full sm:w-1/3 bg-white p-6 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Crear Nueva Oferta</h2>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Título de la Oferta</label>
            <input
              type="text"
              name="titulo"
              value={nuevaOferta.titulo}
              onChange={handleInputChange}
              className="w-full p-4 border border-[#465779] rounded-lg"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Descripción</label>
            <textarea
              name="descripcion"
              value={nuevaOferta.descripcion}
              onChange={handleInputChange}
              rows="4"
              className="w-full p-4 border border-[#465779] rounded-lg"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Nombre de la Empresa</label>
            <input
              type="text"
              name="empresa"
              value={nuevaOferta.empresa}
              onChange={handleInputChange}
              className="w-full p-4 border border-[#465779] rounded-lg"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Ubicación</label>
            <input
              type="text"
              name="ubicacion"
              value={nuevaOferta.ubicacion}
              onChange={handleInputChange}
              className="w-full p-4 border border-[#465779] rounded-lg"
            />
          </div>
          <button
            onClick={handleCrearOferta}
            className="w-full py-3 bg-[#465779] text-white font-semibold rounded-lg shadow-md hover:bg-[#221831] focus:outline-none focus:ring-2 focus:ring-[#221831] transition"
          >
            Crear Oferta
          </button>
        </div>

        {/* Mis Ofertas */}
        <div className="w-full sm:w-2/3 pl-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Mis Ofertas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ofertas.map((oferta) => (
              <div key={oferta.id} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-[#221831]">{oferta.titulo}</h3>
                <p className="text-[#465779] mt-2">{oferta.descripcion}</p>
                <p className="text-[#465779] mt-4">{oferta.ubicacion}</p>
                <p className="text-[#465779] mt-2">{oferta.fechaCreacion}</p>
                <div className="mt-4 text-sm text-[#465779]">
                  <span className="cursor-pointer hover:text-blue-500">Editar</span> | 
                  <span className="cursor-pointer hover:text-red-500"> Eliminar</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Solicitudes Recibidas */}
      <div className="px-6 mx-auto max-w-screen-xl mt-32 mb-32">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Solicitudes Recibidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ofertas.map((oferta) =>
            oferta.postulaciones.map((postulacion, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold">{postulacion.usuario}</h3>
                <p className="text-sm text-[#465779]">{postulacion.fecha}</p>
                <p className="text-sm mt-4 text-[#465779]">{oferta.titulo}</p>
                <div className="mt-4 text-lg text-[#465779]">
                  <span
                    onClick={() => handleRechazarPostulante(oferta.id, index)}
                    className="cursor-pointer hover:text-red-500"
                  >
                    Rechazar
                  </span> | 
                  <span
                    onClick={() => handleRevisarPostulante(postulacion)}
                    className="cursor-pointer hover:text-yellow-500">
                    Revisar
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Pins;
