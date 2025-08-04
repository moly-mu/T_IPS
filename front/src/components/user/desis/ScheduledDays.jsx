import Barral from '../desis/Barral';
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock, Eye, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext, useCallback } from 'react';
import axios from '../../../api/axios';
import { AuthContext } from '../../../context/AuthContext';

function ScheduledDays() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({ total: 0, confirmed: 0, pending: 0, cancelled: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Función para mostrar mensaje de éxito temporalmente
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Cargar citas programadas desde el backend
  const fetchAppointments = useCallback(async () => {
    if (!token) {
      console.log('No hay token disponible');
      return;
    }
    
    console.log('Token disponible:', token ? 'Sí' : 'No');
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('http://localhost:3000/specialist/appointments/scheduled', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log('Respuesta del servidor:', response.data);
      setAppointments(response.data.appointments || []);
      setStats(response.data.stats || { total: 0, confirmed: 0, pending: 0, cancelled: 0 });
    } catch (err) {
      console.error('Error completo:', err);
      console.error('Respuesta del error:', err.response?.data);
      console.error('Status del error:', err.response?.status);
      setError(`Error al cargar las citas programadas: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Confirmar una cita
  const confirmAppointment = async (appointmentId) => {
    if (!token) return;
    
    try {
      await axios.put(`/specialist/appointments/confirm/${appointmentId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Recargar las citas después de confirmar
      fetchAppointments();
      showSuccessMessage('Cita confirmada exitosamente');
      console.log('Cita confirmada exitosamente');
    } catch (err) {
      console.error('Error al confirmar la cita:', err);
      setError('Error al confirmar la cita');
    }
  };

  // Obtener detalles de una cita específica
  const getAppointmentDetails = async (appointmentId) => {
    if (!token) return null;
    
    try {
      const response = await axios.get(`http://localhost:3000/specialist/appointments/details/${appointmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data;
    } catch (err) {
      console.error('Error al obtener detalles de la cita:', err);
      setError('Error al obtener detalles de la cita');
      return null;
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    if (token) {
      fetchAppointments();
    }
  }, [token, fetchAppointments]);

  const handlePrevious = () => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() - 7);
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  };

  const handleNext = () => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + 7);
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  };

  const handleAddEvent = () => {
    // Redirigir a la página de creación de citas
    navigate('/IrCita');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleConfirmAppointment = async (appointmentId) => {
    await confirmAppointment(appointmentId);
  };

  const handleReschedule = async (appointmentId) => {
    // Por ahora redirigir a la página de reprogramación
    // En el futuro se puede implementar un modal para seleccionar nueva fecha/hora
    navigate('/IrCita', { state: { rescheduleId: appointmentId } });
  };

  const handleViewDetails = async (appointment) => {
    // Obtener detalles completos de la cita
    const detailedAppointment = await getAppointmentDetails(appointment.id);
    setSelectedPatient(detailedAppointment || appointment);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
  };

  const getTitle = () => {
    return 'Citas Programadas';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Barral/>
      <div className="ml-64 min-h-screen bg-gray-100">
        <div className="-mt-244 px-6 pt-6">
          <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={handlePrevious}
                  className="p-2 rounded-lg hover:bg-gray-100 border border-gray-200 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-lg hover:bg-gray-100 border border-gray-200 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={handleAddEvent}
                className="flex items-center gap-2 bg-[#00102D] hover:bg-[#003366] px-4 py-2 rounded-lg transition-colors text-white"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Cita</span>
              </button>
              
              <button
                onClick={fetchAppointments}
                disabled={loading}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 px-4 py-2 rounded-lg transition-colors text-white"
              >
                <span>Actualizar</span>
              </button>
              
              {/* Botones de navegación al lado de Add Event */}
              <div className="flex gap-2 ml-2">
                <button
                  onClick={() => handleNavigation('/calendar')}
                  className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                    location.pathname === '/'
                      ? 'bg-[#00102D] text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                        Calendar
                </button>
                <button
                  onClick={() => handleNavigation('/listopc')}
                  className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                    location.pathname === '/listopc'
                      ? 'bg-[#00102D] text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                        List
                </button>
              </div>
            </div>
            
            <h1 className="text-2xl font-semibold text-gray-900">
              {getTitle()}
            </h1>
          </div>

          <div className="pl-45 pr-0">
            <div className="pt-16 p-6 bg-gray-0 ">
              <h1 className="text-3xl font-bold">Citas Programadas</h1>
              <p className="text-gray-600">Gestiona y revisa todas las citas médicas agendadas.</p>
              
              {/* Loading state */}
              {loading && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00102D]"></div>
                  <span className="ml-2">Cargando citas...</span>
                </div>
              )}
              
              {/* Success message */}
              {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  {successMessage}
                </div>
              )}
              
              {/* Error state */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}
            </div>

            <div className="overflow-x-auto">
              {!loading && appointments.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No hay citas programadas</h3>
                  <p className="text-gray-500">Aún no tienes citas agendadas para mostrar.</p>
                </div>
              ) : (
                <table className="min-w-full max-w-6xl bg-white shadow-md rounded-lg border">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Paciente</th>
                      <th className="px-6 py-3 text-left">Fecha</th>
                      <th className="px-6 py-3 text-left">Hora</th>
                      <th className="px-6 py-3 text-left">Especialidad</th>
                      <th className="px-6 py-3 text-left">Estado</th>
                      <th className="px-6 py-3 text-left">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr key={appointment.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="text-gray-800 font-medium">{appointment.patientName}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <p className="text-gray-700">{formatDate(appointment.date)}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <p className="text-gray-700">{appointment.time}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-700">{appointment.specialty}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            appointment.confirmed 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {appointment.confirmed ? '✓ Confirmada' : '⏳ Pendiente'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleViewDetails(appointment)}
                              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors flex items-center gap-1"
                            >
                              <Eye className="w-3 h-3" />
                              Ver
                            </button>
                            {!appointment.confirmed && (
                              <button
                                onClick={() => handleConfirmAppointment(appointment.id)}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                              >
                                Confirmar
                              </button>
                            )}
                            <Link to="/HistoriaClinicaEditable">
                            <button
                              onClick={() => handleReschedule(appointment.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                              Reprogramar
                            </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Resumen de estadísticas */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-800">Total de Citas</h3>
                <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-800">Confirmadas</h3>
                <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-800">Pendientes</h3>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para detalles del paciente */}
      {showModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <User className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Detalles del Paciente</h2>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Información básica */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Información Personal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Nombre Completo</label>
                    <p className="text-gray-800 font-medium">{selectedPatient.patientName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Edad</label>
                    <p className="text-gray-800">{selectedPatient.patientDetails?.age || 'No especificada'} años</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Identificación</label>
                    <p className="text-gray-800">{selectedPatient.patientDetails?.identification || 'No especificada'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Teléfono</label>
                    <p className="text-gray-800">{selectedPatient.patientDetails?.phone || 'No especificado'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-800">{selectedPatient.patientDetails?.email || 'No especificado'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600">Dirección</label>
                    <p className="text-gray-800">{selectedPatient.patientDetails?.address || 'No especificada'}</p>
                  </div>
                  {selectedPatient.patientDetails?.bloodType && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Tipo de Sangre</label>
                      <p className="text-gray-800">{selectedPatient.patientDetails.bloodType}</p>
                    </div>
                  )}
                  {selectedPatient.patientDetails?.allergies && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Alergias</label>
                      <p className="text-gray-800">{selectedPatient.patientDetails.allergies}</p>
                    </div>
                  )}
                  {selectedPatient.patientDetails?.eps && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">EPS</label>
                      <p className="text-gray-800">{selectedPatient.patientDetails.eps}</p>
                    </div>
                  )}
                  {selectedPatient.patientDetails?.emergencyContact && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Contacto de Emergencia</label>
                      <p className="text-gray-800">{selectedPatient.patientDetails.emergencyContact}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Información de la cita */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Información de la Cita</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Especialidad</label>
                    <p className="text-gray-800">{selectedPatient.specialty}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Estado</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedPatient.confirmed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedPatient.confirmed ? '✓ Confirmada' : '⏳ Pendiente'}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Fecha</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <p className="text-gray-800">{formatDate(selectedPatient.date)}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Hora</label>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <p className="text-gray-800">{selectedPatient.time}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Historial médico */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Información Médica</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {selectedPatient.patientDetails?.medicalHistory ? (
                    <div className="space-y-2">
                      {selectedPatient.patientDetails.medicalHistory.map((history, index) => (
                        <div key={index} className="text-gray-700">
                          <p><strong>Consultas:</strong> {history.consultations}</p>
                          <p><strong>Diagnósticos:</strong> {history.diagnoses}</p>
                          <p><strong>Prescripciones:</strong> {history.prescriptions}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-700">No hay historial médico disponible</p>
                  )}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Cerrar
                </button>
                {!selectedPatient.confirmed && (
                  <button
                    onClick={() => {
                      handleConfirmAppointment(selectedPatient.id);
                      closeModal();
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Confirmar Cita
                  </button>
                )}
                <button
                  onClick={() => {
                    handleReschedule(selectedPatient.id);
                    closeModal();
                    navigate('/IrCita');
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Ir a Consulta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScheduledDays;