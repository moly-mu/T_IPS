import { useState, useEffect } from 'react';
import { useUserService } from '../../../services/userService';
import { useAuth } from '../../../context/AuthContext';

const UserAppointments = () => {
  const { token } = useAuth();
  const userService = useUserService();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelingId, setCancelingId] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("🔄 Cargando citas médicas...");
        
        const response = await userService.getUserAppointments();
        console.log("✅ Citas obtenidas:", response);
        
        setAppointments(response.appointments || []);
      } catch (error) {
        console.error("❌ Error al obtener citas:", error);
        setError(`Error al cargar las citas: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token, userService]);

  const handleCancelAppointment = async (appointmentId) => {
    if (!confirm('¿Estás seguro de que quieres cancelar esta cita?')) {
      return;
    }

    try {
      setCancelingId(appointmentId);
      console.log("🔄 Cancelando cita...", appointmentId);
      
      await userService.cancelAppointment({ appointmentId });
      console.log("✅ Cita cancelada exitosamente");
      
      // Actualizar la lista local
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, status: 'Cancelada' }
            : apt
        )
      );
      
      alert('Cita cancelada exitosamente');
    } catch (error) {
      console.error("❌ Error al cancelar cita:", error);
      alert(`Error al cancelar la cita: ${error.message}`);
    } finally {
      setCancelingId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmada':
        return 'bg-green-100 text-green-800';
      case 'completada':
        return 'bg-blue-100 text-blue-800';
      case 'cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!token) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Debes iniciar sesión para ver tus citas</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Cargando citas médicas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Mis Citas Médicas</h1>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => window.location.href = '/agendar-cita'}
        >
          Agendar Nueva Cita
        </button>
      </div>
      
      {appointments.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">No tienes citas médicas programadas.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="bg-white shadow-md rounded-lg p-6 border">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {appointment.specialty || 'Consulta Médica'}
                  </h3>
                  <p className="text-gray-600">
                    Dr(a). {appointment.specialist || 'Especialista no asignado'}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                  {appointment.status || 'Pendiente'}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Fecha</p>
                  <p className="font-medium">
                    {appointment.date ? new Date(appointment.date).toLocaleDateString('es-ES') : 'No especificada'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hora</p>
                  <p className="font-medium">
                    {appointment.time || 'No especificada'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Modalidad</p>
                  <p className="font-medium">
                    {appointment.modality || 'Presencial'}
                  </p>
                </div>
              </div>
              
              {appointment.notes && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Notas</p>
                  <p className="text-gray-700">{appointment.notes}</p>
                </div>
              )}
              
              <div className="flex justify-end space-x-2">
                {appointment.status?.toLowerCase() === 'pendiente' && (
                  <button 
                    onClick={() => handleCancelAppointment(appointment.id)}
                    disabled={cancelingId === appointment.id}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {cancelingId === appointment.id ? 'Cancelando...' : 'Cancelar Cita'}
                  </button>
                )}
                
                {appointment.status?.toLowerCase() === 'completada' && (
                  <button 
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    onClick={() => window.location.href = `/crear-resena/${appointment.id}`}
                  >
                    Escribir Reseña
                  </button>
                )}
                
                {appointment.meetingLink && appointment.status?.toLowerCase() === 'confirmada' && (
                  <a 
                    href={appointment.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Unirse a la Consulta
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAppointments;
