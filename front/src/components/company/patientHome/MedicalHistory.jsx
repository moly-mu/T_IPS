import { useState } from 'react';
import { Search, Download } from 'lucide-react';

const MedicalHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const [historiaClinica] = useState([
    {
      id: 1,
      fecha: '15 DIC 2024',
      doctor: 'Dr. Carlos Rodríguez',
      especialidad: 'Cardiología',
      diagnostico: 'Control rutinario - Presión arterial normal',
      tratamiento: 'Continuar con ejercicio regular y dieta balanceada'
    },
    {
      id: 2,
      fecha: '20 NOV 2024',
      doctor: 'Dra. Ana Martínez',
      especialidad: 'Medicina General',
      diagnostico: 'Gripe común',
      tratamiento: 'Acetaminofén cada 8 horas por 5 días'
    }
  ]);

  // Filtrar la lista
  const filteredConsultas = historiaClinica.filter((consulta) => {
    const query = searchQuery.toLowerCase();
    return (
      consulta.fecha.toLowerCase().includes(query) ||
      consulta.doctor.toLowerCase().includes(query) ||
      consulta.especialidad.toLowerCase().includes(query) ||
      consulta.diagnostico.toLowerCase().includes(query) ||
      consulta.tratamiento.toLowerCase().includes(query)
    );
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-light text-gray-900">Historial de consultas</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
          />
        </div>
      </div>

      {filteredConsultas.length === 0 ? (
        <p className="text-gray-500">No se encontraron resultados.</p>
      ) : (
        <div className="space-y-6">
          {filteredConsultas.map((consulta) => (
            <div key={consulta.id} className="border-b border-gray-100 pb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {consulta.fecha}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{consulta.doctor}</h3>
                  <p className="text-sm text-gray-500">{consulta.especialidad}</p>
                </div>
                <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors">
                  <Download size={16} />
                  <span className="text-sm">Descargar</span>
                </button>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-600 mb-1">Diagnóstico</p>
                  <p className="text-gray-900">{consulta.diagnostico}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-600 mb-1">Tratamiento</p>
                  <p className="text-gray-900">{consulta.tratamiento}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalHistory;