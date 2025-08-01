import Barral from '../desis/Barral';
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock, Eye, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const appointments = [
  { 
    id: 1,
    patientName: 'María González', 
    date: '2025-06-13', 
    time: '09:00',
    confirmed: true,
    specialty: 'Ortopedia',
    patientDetails: {
      age: 45,
      phone: '+57 301 234 5678',
      email: 'maria.gonzalez@email.com',
      address: 'Calle 123 #45-67, Bogotá',
      identification: '52.123.456',
      medicalHistory: 'Hipertensión arterial, seguimiento rutinario'
    }
  },
  { 
    id: 2,
    patientName: 'Carlos Rodríguez', 
    date: '2025-06-13', 
    time: '10:30',
    confirmed: false,
    specialty: 'Ortopedia',
    patientDetails: {
      age: 38,
      phone: '+57 312 987 6543',
      email: 'carlos.rodriguez@email.com',
      address: 'Carrera 87 #12-34, Bogotá',
      identification: '80.987.654',
      medicalHistory: 'Migrañas recurrentes, evaluación neurológica'
    }
  },
  { 
    id: 3,
    patientName: 'Ana Martínez', 
    date: '2025-06-14', 
    time: '14:00',
    confirmed: true,
    specialty: 'Ortopedia',
    patientDetails: {
      age: 29,
      phone: '+57 320 555 7890',
      email: 'ana.martinez@email.com',
      address: 'Avenida 68 #89-12, Bogotá',
      identification: '1.098.765.432',
      medicalHistory: 'Dermatitis atópica, control periódico'
    }
  },
  { 
    id: 4,
    patientName: 'Luis Fernández', 
    date: '2025-06-15', 
    time: '11:15',
    confirmed: false,
    specialty: 'Ortopedia',
    patientDetails: {
      age: 62,
      phone: '+57 315 111 2233',
      email: 'luis.fernandez@email.com',
      address: 'Calle 50 #78-90, Bogotá',
      identification: '19.876.543',
      medicalHistory: 'Cataratas bilaterales, evaluación pre-quirúrgica'
    }
  },
];

function ScheduledDays() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handlePrevious = () => {
    // Lógica para navegación anterior
    console.log('Previous clicked');
  };

  const handleNext = () => {
    // Lógica para navegación siguiente
    console.log('Next clicked');
  };

  const handleAddEvent = () => {
    // Lógica para agregar cita
    console.log('Add appointment clicked');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleConfirmAppointment = (appointmentId) => {
    // Lógica para confirmar cita
    console.log('Confirming appointment:', appointmentId);
  };

  const handleReschedule = (appointmentId) => {
    // Lógica para reprogramar cita
    console.log('Rescheduling appointment:', appointmentId);
  };

  const handleViewDetails = (appointment) => {
    setSelectedPatient(appointment);
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
            </div>

            <div className="overflow-x-auto">
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
            </div>

            {/* Resumen de estadísticas */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-800">Total de Citas</h3>
                <p className="text-2xl font-bold text-blue-600">{appointments.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-800">Confirmadas</h3>
                <p className="text-2xl font-bold text-green-600">
                  {appointments.filter(apt => apt.confirmed).length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-800">Pendientes</h3>
                <p className="text-2xl font-bold text-yellow-600">
                  {appointments.filter(apt => !apt.confirmed).length}
                </p>
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
                    <p className="text-gray-800">{selectedPatient.patientDetails.age} años</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Identificación</label>
                    <p className="text-gray-800">{selectedPatient.patientDetails.identification}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Teléfono</label>
                    <p className="text-gray-800">{selectedPatient.patientDetails.phone}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-800">{selectedPatient.patientDetails.email}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600">Dirección</label>
                    <p className="text-gray-800">{selectedPatient.patientDetails.address}</p>
                  </div>
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
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Historial Médico</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{selectedPatient.patientDetails.medicalHistory}</p>
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