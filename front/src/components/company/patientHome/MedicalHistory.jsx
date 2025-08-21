import { useState, useEffect, memo } from 'react';
import { Search, Download } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const MedicalHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [historiaClinica, setHistoriaClinica] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useAuth();

  // Cargar historial médico al montar el componente
  useEffect(() => {
    // Función que se ejecuta solo dentro del useEffect
    const loadMedicalHistory = async () => {
      if (!token) {
        setError('No hay sesión activa');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        const response = await fetch('http://localhost:3000/api/User/Medicalhistory', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(10000) // Timeout de 10 segundos
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('🔍 FRONTEND - Datos recibidos del backend:', JSON.stringify(data, null, 2));
        
        // Formatear los datos para el frontend
        const formattedConsultations = data.consultations.map(consultation => ({
          id: consultation.id,
          fecha: new Date(consultation.startTime).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          }).toUpperCase(),
          doctor: consultation.doctorName || 'Dr. Sin asignar',
          especialidad: consultation.specialtyName || consultation.consultationMode || 'Consulta General',
          diagnostico: consultation.reason || 'Sin diagnóstico registrado',
          tratamiento: consultation.medicalNote || 'Sin tratamiento registrado',
          summary: consultation.summary,
          vitalSigns: consultation.vitalSigns,
          location: consultation.location,
          endTime: consultation.endTime,
          hasSpecialist: consultation.doctorName && consultation.doctorName !== 'Dr. Sin asignar'
        }));
        
        console.log('🎨 FRONTEND - Datos formateados:', JSON.stringify(formattedConsultations, null, 2));
        
        setHistoriaClinica(formattedConsultations);
        setError(null);
      } catch (err) {
        console.error('❌ Error al cargar el historial médico:', err);
        setError('Error al cargar el historial médico: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    // Ejecutar la función solo si hay token
    if (token) {
      loadMedicalHistory();
    }
  }, [token]); // Solo token como dependencia

  const [historiaClinicaStatic] = useState([
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

  // Usar datos del backend si están disponibles, sino usar datos estáticos como fallback
  const dataToUse = historiaClinica.length > 0 ? historiaClinica : historiaClinicaStatic;

  // Filtrar la lista
  const filteredConsultas = dataToUse.filter((consulta) => {
    const query = searchQuery.toLowerCase();
    return (
      consulta.fecha.toLowerCase().includes(query) ||
      consulta.doctor.toLowerCase().includes(query) ||
      consulta.especialidad.toLowerCase().includes(query) ||
      consulta.diagnostico.toLowerCase().includes(query) ||
      consulta.tratamiento.toLowerCase().includes(query)
    );
  });

  // Mostrar loading
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando historial médico...</p>
        </div>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Intentar nuevamente
          </button>
        </div>
      </div>
    );
  }

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
                    {!consulta.hasSpecialist && (
                      <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                        Sin especialista asignado
                      </span>
                    )}
                  </div>
                  <h3 className={`font-medium mb-1 ${consulta.hasSpecialist ? 'text-gray-900' : 'text-gray-500'}`}>
                    {consulta.doctor}
                  </h3>
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
                {consulta.summary && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-600 mb-1">Resumen</p>
                    <p className="text-gray-900">{consulta.summary}</p>
                  </div>
                )}
                {consulta.vitalSigns && (
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-600 mb-1">Signos Vitales</p>
                    <p className="text-gray-900">{consulta.vitalSigns}</p>
                  </div>
                )}
                {consulta.location && (
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-600 mb-1">Ubicación</p>
                    <p className="text-gray-900">{consulta.location}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(MedicalHistory);