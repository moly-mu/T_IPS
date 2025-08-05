import { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Eye, Video, CheckCircle, RefreshCw } from 'lucide-react';
import { AuthContext } from '../../../context/AuthContext';
import { doctorAppointmentService } from '../../../services/doctorAppointmentService';

const SpecialistSchedule = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  
  const [appointments, setAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [stats, setStats] = useState({ total: 0, confirmed: 0, inProgress: 0, completed: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Función para mostrar mensaje de éxito temporalmente
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  // Cargar citas programadas desde el backend
  const fetchAppointments = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const response = await doctorAppointmentService.getUpcomingAppointments();
      
      if (response.success) {
        setAppointments(response.data);
        
        // Filtrar citas de hoy
        const today = new Date().toDateString();
        const todayOnly = response.data.filter(apt => {
          const aptDate = new Date(apt.fecha).toDateString();
          return aptDate === today;
        });
        setTodayAppointments(todayOnly);
        
        // Calcular estadísticas
        const total = response.data.length;
        const confirmed = response.data.filter(apt => apt.estado === 'Confirmada').length;
        const inProgress = response.data.filter(apt => apt.estado === 'En curso').length;
        const completed = response.data.filter(apt => apt.estado === 'Completada').length;
        
        setStats({ total, confirmed, inProgress, completed });
      } else {
        throw new Error(response.error || 'Error al cargar las citas');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError(error.error || error.message || 'Error al cargar las citas');
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Cargar datos al montar el componente
  useEffect(() => {
    if (token) {
      fetchAppointments();
    }
  }, [token, fetchAppointments]);

  const handleViewAppointment = (appointmentId) => {
    navigate(`/especialista/cita/${appointmentId}`);
  };

  const handleStartConsultation = async (appointmentId) => {
    try {
      const response = await doctorAppointmentService.startConsultation(appointmentId);
      
      if (response.success) {
        showSuccessMessage('Consulta iniciada exitosamente');
        fetchAppointments(); // Recargar la lista
      } else {
        throw new Error(response.error || 'Error al iniciar la consulta');
      }
    } catch (error) {
      console.error('Error starting consultation:', error);
      setError(error.error || error.message || 'Error al iniciar la consulta');
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-600">
                TELECONSULTAS<span className="font-normal text-gray-700">IPS</span>
              </h1>
              <span className="text-sm text-gray-500">Panel del Especialista</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchAppointments}
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 px-4 py-2 rounded-lg transition-colors text-white"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Actualizar</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-8">
        
        {/* Título y descripción */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Consultas</h2>
          <p className="text-gray-600">Administra tus citas médicas y consultas virtuales programadas.</p>
        </div>

        {/* Mensajes */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Cargando citas...</span>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Total de Citas</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Confirmadas</h3>
            <p className="text-3xl font-bold text-green-600">{stats.confirmed}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">En Curso</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Completadas</h3>
            <p className="text-3xl font-bold text-gray-600">{stats.completed}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Lista principal de citas */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="border-b border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-900">Todas las Citas Programadas</h3>
              </div>
              
              <div className="overflow-x-auto">
                {!loading && appointments.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No hay citas programadas</h3>
                    <p className="text-gray-500">Aún no tienes citas agendadas para mostrar.</p>
                  </div>
                ) : (
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Paciente</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Fecha</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Hora</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Especialidad</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Estado</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {appointments.map((appointment) => (
                        <tr key={appointment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <User className="w-4 h-4 text-gray-400 mr-2" />
                              <p className="text-gray-900 font-medium">{appointment.persona}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <p className="text-gray-700">{formatDate(appointment.fecha)}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <p className="text-gray-700">{formatTime(appointment.hora)}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-gray-700">{appointment.especialidad}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              appointment.estado === 'Confirmada' ? 'bg-green-100 text-green-800' :
                              appointment.estado === 'En curso' ? 'bg-blue-100 text-blue-800' :
                              appointment.estado === 'Completada' ? 'bg-gray-100 text-gray-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {appointment.estado === 'Confirmada' && <CheckCircle className="w-3 h-3 mr-1" />}
                              {appointment.estado === 'En curso' && '● '}
                              {appointment.estado === 'Completada' && '✓ '}
                              {appointment.estado}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleViewAppointment(appointment.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors flex items-center gap-1"
                              >
                                <Eye className="w-3 h-3" />
                                Ver
                              </button>
                              {appointment.estado === 'Confirmada' && (
                                <button
                                  onClick={() => handleStartConsultation(appointment.id)}
                                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors flex items-center gap-1"
                                >
                                  <Video className="w-3 h-3" />
                                  Iniciar
                                </button>
                              )}
                              {appointment.linkZoom && (
                                <a
                                  href={appointment.linkZoom}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors flex items-center gap-1"
                                >
                                  <Video className="w-3 h-3" />
                                  Zoom
                                </a>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          {/* Panel lateral - Citas de hoy */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="border-b border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Citas de Hoy
                </h3>
              </div>
              
              <div className="p-6">
                {todayAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No hay citas para hoy</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {todayAppointments.map((apt) => (
                      <div 
                        key={apt.id} 
                        className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors"
                        onClick={() => handleViewAppointment(apt.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-gray-900">{apt.persona}</p>
                            <p className="text-sm text-gray-500">{apt.especialidad}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            apt.estado === 'Confirmada' ? 'bg-green-100 text-green-800' :
                            apt.estado === 'En curso' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {apt.estado}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-blue-600">
                          <Clock className="w-4 h-4 mr-1" />
                          {apt.hora}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialistSchedule;
