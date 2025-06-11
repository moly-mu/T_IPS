import { useState } from 'react';
import Barral from "./Barral";
import NavbarI from "./NavbarI";

const Ofertas = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada, ordenSeleccionado, setOrdenSeleccionado] = useState('');

  const categorias = [
    'Todos', 'Desarrollador', 'Diseñador', 'Product Manager', 'Ingeniero', 'Data Scientist'
  ];

  const ofertas = {
    'UDC TALENTO': [
      { titulo: 'Desarrollador Frontend', ubicacion: 'Madrid', descripcion: 'Buscamos un Desarrollador Frontend con experiencia en la industria para trabajo remoto.' },
      { titulo: 'Diseñador UX/UI', ubicacion: 'Madrid', descripcion: 'Buscamos un Diseñador UX/UI con experiencia en la industria para trabajo remoto.' },
      { titulo: 'Desarrollador Full Stack', ubicacion: 'Madrid', descripcion: 'Buscamos un Desarrollador Full Stack con experiencia en la industria para trabajo remoto.' },
    ],
    'EMPLEO.COM': [
      { titulo: 'Product Manager', ubicacion: 'Remoto', descripcion: 'Buscamos un Product Manager con experiencia para trabajo remoto.' },
      { titulo: 'Ingeniero Backend', ubicacion: 'Remoto', descripcion: 'Buscamos un Ingeniero Backend con experiencia para trabajo remoto.' },
      { titulo: 'Desarrollador Mobile', ubicacion: 'Remoto', descripcion: 'Buscamos un Desarrollador Mobile con experiencia para trabajo remoto.' },
    ],
    'INNOVATECH': [
      { titulo: 'Ingeniero DevOps', ubicacion: 'Madrid', descripcion: 'Buscamos un Ingeniero DevOps con experiencia para trabajo remoto.' },
      { titulo: 'Data Scientist', ubicacion: 'Madrid', descripcion: 'Buscamos un Data Scientist con experiencia para trabajo remoto.' },
      { titulo: 'Frontend Developer', ubicacion: 'Madrid', descripcion: 'Buscamos un Frontend Developer con experiencia para trabajo remoto.' },
    ],
    'JOBHUB': [
      { titulo: 'Backend Developer', ubicacion: 'Barcelona', descripcion: 'Buscamos un Backend Developer con experiencia para trabajo remoto.' },
      { titulo: 'Full Stack Developer', ubicacion: 'Barcelona', descripcion: 'Buscamos un Full Stack Developer con experiencia para trabajo remoto.' },
      { titulo: 'Mobile Developer', ubicacion: 'Barcelona', descripcion: 'Buscamos un Mobile Developer con experiencia para trabajo remoto.' },
    ],
    'CODELAB': [
      { titulo: 'Software Engineer', ubicacion: 'Remoto', descripcion: 'Buscamos un Software Engineer con experiencia para trabajo remoto.' },
      { titulo: 'Data Engineer', ubicacion: 'Remoto', descripcion: 'Buscamos un Data Engineer con experiencia para trabajo remoto.' },
      { titulo: 'Full Stack Developer', ubicacion: 'Remoto', descripcion: 'Buscamos un Full Stack Developer con experiencia para trabajo remoto.' },
    ]
  };

  // Filtrar ofertas por categoría
  const filtrarOfertas = (categoria) => {
    if (categoria === 'Todos' || categoria === '') {
      return ofertas;
    }
    const filteredOfertas = {};
    Object.keys(ofertas).forEach((empresa) => {
      filteredOfertas[empresa] = ofertas[empresa].filter((oferta) => oferta.titulo.toLowerCase().includes(categoria.toLowerCase()));
    });
    return filteredOfertas;
  };

  const ofertasFiltradas = filtrarOfertas(categoriaSeleccionada);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Barra Lateral */}
      <div className="w-64">
        <Barral />
      </div>

      {/* Ofertas de Trabajo */}
      <div className="flex-1 p-6 ml-32">
        <NavbarI />
        <h1 className="text-3xl font-bold mb-8">Trabajos Disponibles</h1>


        <div className="mb-6 flex space-x-2">
          <div className="flex-1">
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
              Filtrar por categoría
            </label>
            <select
              id="categoria"
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              className="w-72 p-2 border rounded-md">
              {categorias.map((categoria, index) => (
                <option key={index} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor="relevancia" className="block text-sm font-medium text-gray-700 mb-2">
              Ordenar por
            </label>
            <select
              id="relevancia"
              value={ordenSeleccionado}
              onChange={(e) => setOrdenSeleccionado(e.target.value)}
              className="w-72 p-2 border rounded-md">
              <option value="reciente">Recientes primero</option>
              <option value="antiguo">Antiguos primero</option>
            </select>
          </div>
        </div>

        {/* Carrusel de Ofertas */}
        <div className="space-y-6">
          {Object.keys(ofertasFiltradas).map((empresa) => (
            <div key={empresa}>
              <h2 className="text-2xl font-semibold mb-4">{empresa}</h2>
              <div className="flex overflow-x-auto space-x-6">
                {/* Ofertas de cada empresa */}
                {ofertasFiltradas[empresa].map((oferta, index) => (
                  <div key={index} className="w-[320px] bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">{oferta.titulo}</h3>
                    <p className="text-sm text-gray-600 mb-2">Ubicación: {oferta.ubicacion}</p>
                    <p className="text-sm text-gray-500 mb-2">Descripción: {oferta.descripcion}</p>
                    <p className="text-sm text-gray-500 mb-2">Fecha de creación: {new Date().toLocaleDateString()}</p>
                    <button className="w-full bg-[#00102D] text-white py-2 rounded-md mt-4 hover:bg-[#002459] transition-colors">
                      Aplicar
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button className="text-[#4689e0] hover:text-[#002459] transition-colors text-left w-full">
                  Ver más ofertas de {empresa}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ofertas;
