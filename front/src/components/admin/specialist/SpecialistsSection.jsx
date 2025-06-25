import  { useState, useEffect,} from 'react';
import { Star, User, Calendar, Award, CheckCircle, XCircle, Eye, Filter } from 'lucide-react';
import axios from "axios";

const SpecialistsSection = () => {
const [specialists, setSpecialists] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
    axios
      .get("http://localhost:3000/admin/specialty/2/") 
      .then((res) => {
        setSpecialists(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error al obtener especialistas");
        setLoading(false);
      });
  }, []);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const handleApprove = (id) => {
    setSpecialists(prev => 
      prev.map(spec => 
        spec.id === id ? { ...spec, status: 'approved' } : spec
      )
    );
  };

  const handleReject = (id) => {
    setSpecialists(prev => 
      prev.map(spec => 
        spec.id === id ? { ...spec, status: 'rejected' } : spec
      )
    );
  };

  const filteredSpecialists = specialists.filter(spec => {
    if (filterStatus === 'all') return true;
    return spec.status === filterStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Aprobado';
      case 'rejected': return 'Rechazado';
      case 'pending': return 'Pendiente';
      default: return 'Sin estado';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Solicitudes de Especialistas</h1>
        <p className="text-gray-600">Revisa y gestiona las solicitudes de registro de especialistas</p>
      </div>

      {/* filtros */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filtrar por estado:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                filterStatus === 'all' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              Todos
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                filterStatus === 'pending' 
                  ? 'bg-yellow-100 text-yellow-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              Pendientes
            </button>
            <button
              onClick={() => setFilterStatus('approved')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                filterStatus === 'approved' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              Aprobados
            </button>
            <button
              onClick={() => setFilterStatus('rejected')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                filterStatus === 'rejected' 
                  ? 'bg-red-100 text-red-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              Rechazados
            </button>
          </div>
        </div>
      </div>


      <div className="grid gap-6">
        {filteredSpecialists.map((specialist) => (
          <div key={specialist.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                  

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{specialist.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(specialist.status)}`}>
                        {getStatusText(specialist.status)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="font-medium text-green-600">{specialist.specialty}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {specialist.experience}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {specialist.rating}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Educación:</span>
                        <p className="text-gray-900 font-medium">{specialist.education}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Consultas realizadas:</span>
                        <p className="text-gray-900 font-medium">{specialist.consultations}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-500">Certificaciones:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {specialist.certifications.map((cert, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs">
                              <Award className="w-3 h-3 inline mr-1" />
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedSpecialist(specialist)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Ver perfil completo">
                    <Eye className="w-5 h-5" />
                  </button>
                  
                      <button
                        onClick={() => handleApprove(specialist.id)}
                        className="flex items-center px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                        <CheckCircle className="w-4 h-4" />
                        Aprobar
                      </button>
                      <button
                        onClick={() => handleReject(specialist.id)}
                        className="flex items-center px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                        <XCircle className="w-4 h-4" />
                        Rechazar
                      </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedSpecialist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Perfil Completo</h2>
                <button
                  onClick={() => setSelectedSpecialist(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedSpecialist.name}</h3>
                    <p className="text-green-600 font-medium">{selectedSpecialist.specialty}</p>
                    <p className="text-gray-500">{selectedSpecialist.experience}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Información Académica</h4>
                    <p className="text-gray-700">Universidad: {selectedSpecialist.education}</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Calificación</h4>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-2xl font-bold text-gray-900">{selectedSpecialist.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Consultas</h4>
                    <p className="text-2xl font-bold text-green-600">{selectedSpecialist.consultations}</p>
                  </div>
                  
                  <div className="col-span-2 p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Certificaciones</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSpecialist.certifications.map((cert, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md text-sm">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedSpecialist.status === 'pending' && (
                  <div className="flex gap-4 pt-4 border-t">
                    <button
                      onClick={() => {
                        handleApprove(selectedSpecialist.id);
                        setSelectedSpecialist(null);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Aprobar Especialista
                    </button>
                    <button
                      onClick={() => {
                        handleReject(selectedSpecialist.id);
                        setSelectedSpecialist(null);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <XCircle className="w-5 h-5" />
                      Rechazar Solicitud
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Solicitudes Pendientes</p>
              <p className="text-2xl font-bold text-yellow-600">
                {specialists.filter(s => s.status === 'pending').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Especialistas Aprobados</p>
              <p className="text-2xl font-bold text-green-600">
                {specialists.filter(s => s.status === 'approved').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Especialistas</p>
              <p className="text-2xl font-bold text-blue-600">{specialists.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialistsSection;