import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Calendar, Clock } from 'lucide-react';
import { useAppointmentService } from '../../../services/appointmentService';
import { useAuth } from '../../../context/AuthContext';

const MyAppointments = () => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedCita, setSelectedCita] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [error, setError] = useState(null);
  const [citas, setCitas] = useState([]);

  const { token } = useAuth();
  const { getUserAppointments, cancelAppointment } = useAppointmentService();

  // Cargar citas del usuario al montar el componente
  useEffect(() => {
    const loadUserAppointments = async () => {
      if (!token) {
        setError('No hay sesión activa');
        return;
      }

      try {
        const response = await getUserAppointments();
        
        // Formatear las fechas para el frontend
        const formattedAppointments = response.appointments.map(appointment => ({
          ...appointment,
          fecha: new Date(appointment.fecha).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          }).toUpperCase(),
          fechaOriginal: appointment.fecha // Guardamos la fecha original para operaciones
        }));
        
        setCitas(formattedAppointments);
        setError(null);
      } catch (err) {
        console.error('Error al cargar las citas:', err);
        setError('Error al cargar las citas del usuario');
      }
    };

    loadUserAppointments();
  }, [token, getUserAppointments]);

  const openCancelModal = (cita) => {
    setSelectedCita(cita);
    setIsCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
    setSelectedCita(null);
    setCancelReason('');
  };

  const handleCancelAppointment = async () => {
    if (selectedCita) {
      try {
        await cancelAppointment(selectedCita.id, cancelReason);
        
        // Actualizar la lista local removiendo la cita cancelada
        const updatedCitas = citas.filter((cita) => cita.id !== selectedCita.id);
        setCitas(updatedCitas);
        
        console.log('Cita cancelada:', selectedCita, 'Motivo:', cancelReason);
        closeCancelModal();
      } catch (err) {
        console.error('Error al cancelar la cita:', err);
        setError('Error al cancelar la cita. Intenta nuevamente.');
      }
    }
  };


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
        <h2 className="text-2xl font-light text-gray-900">Mis Citas</h2>
        <Link to="/calendarQuotes">
          <button className="bg-gray-900 text-white px-6 py-2 text-sm hover:bg-gray-800 transition-colors">
            AGENDAR CITA
          </button>
        </Link>
      </div>

      <div className="space-y-4">
        {citas.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes citas programadas</h3>
            <p className="text-gray-500 mb-6">Agenda tu primera consulta médica</p>
            <Link to="/calendarQuotes">
              <button className="bg-gray-900 text-white px-6 py-2 text-sm hover:bg-gray-800 transition-colors">
                AGENDAR PRIMERA CITA
              </button>
            </Link>
          </div>
        ) : (
          citas.map((cita) => (
            <div key={cita.id} className="border-b border-gray-100 pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="text-gray-400" size={16} />
                      <span className="font-medium">{cita.fecha}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="text-gray-400" size={16} />
                      <span className="text-gray-600">{cita.hora}</span>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        cita.estado === 'confirmada'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {cita.estado === 'confirmada' ? 'CONFIRMADA' : 'PENDIENTE'}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{cita.doctor}</h3>
                  <p className="text-sm text-gray-500 mb-1">{cita.especialidad}</p>
                  {cita.price && (
                    <p className="text-sm font-medium text-gray-900">
                      ${cita.price.toLocaleString('es-CO')} COP
                    </p>
                  )}
                </div>
                <div className="text-right space-y-2">
                  <button className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Reagendar
                  </button>
                  <button
                    onClick={() => openCancelModal(cita)}
                    className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Cancelar
                  </button>
                  <Link to="/AsistirAConsulta">
                    <button className="block text-lg font-bold text-[#00102D] hover:text-[#003366] transition-colors">
                      Asistir a Consulta
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de cancelación */}
      {isCancelModalOpen && selectedCita && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            <div className="px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">¿Cancelar esta cita?</h2>
              <p className="text-gray-600 mt-2">
                ¿Estás seguro de que deseas cancelar esta teleconsulta? Esta acción no se puede deshacer.
              </p>
            </div>

            <div className="px-8 py-6">
              <p className="text-sm text-gray-600 mb-4">
                Para confirmar que se está cancelando la cita correcta:
              </p>
              
              {/* Card de información de la cita */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Doctor:</span>
                        <p className="text-gray-900 font-semibold">{selectedCita.doctor}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Especialidad:</span>
                        <p className="text-gray-900 font-semibold">{selectedCita.especialidad}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Fecha:</span>
                        <p className="text-gray-900 font-semibold">{selectedCita.fecha}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Hora:</span>
                        <p className="text-gray-900 font-semibold">{selectedCita.hora}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Motivo de cancelación */}
              <div className="mb-6">
                <label className="block mb-3 font-semibold text-gray-700">
                  Motivo de la cancelación (opcional)
                </label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  rows={4}
                  placeholder="Describe el motivo de la cancelación para ayudarnos a mejorar nuestro servicio"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <span className="font-semibold">Nota:</span> Recibirás un correo electrónico confirmando la cancelación de tu cita.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 bg-gray-50 rounded-b-xl border-t border-gray-200">
              <div className="flex justify-end gap-4">
                <button
                  onClick={closeCancelModal}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors duration-200"
                >
                  Volver
                </button>
                <button
                  onClick={handleCancelAppointment}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Cancelar cita
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;