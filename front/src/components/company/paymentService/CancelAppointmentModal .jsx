import{ useState } from 'react';
import { X, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import PropTypes from 'prop-types';

const CancelAppointmentModal = ({ isOpen, onClose, appointment, onCancel }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  // Calcular horas hasta la cita
  const now = new Date();
  const appointmentDateTime = new Date(`${appointment.fecha} ${appointment.hora}`);
  const hoursUntilAppointment = Math.floor((appointmentDateTime - now) / (1000 * 60 * 60));
  
  const canGetRefund = hoursUntilAppointment >= 5;

  const handleCancel = async () => {
    setIsProcessing(true);
    
    // Simular proceso de cancelación
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onCancel(appointment.id, selectedOption, cancelReason);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Cancelar Cita</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Información de la cita */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-gray-400" size={16} />
            <span className="text-sm font-medium">{appointment.fecha} - {appointment.hora}</span>
          </div>
          <p className="text-sm text-gray-600">{appointment.doctor}</p>
          <p className="text-xs text-gray-500">{appointment.especialidad}</p>
        </div>

        {/* Política de cancelación */}
        <div className="mb-6">
          <div className={`flex items-start gap-3 p-3 rounded-lg mb-4 ${
            canGetRefund ? 'bg-green-50' : 'bg-yellow-50'
          }`}>
            {canGetRefund ? (
              <CheckCircle className="text-green-600 mt-0.5" size={16} />
            ) : (
              <AlertCircle className="text-yellow-600 mt-0.5" size={16} />
            )}
            <div>
              <p className="text-sm font-medium text-gray-900">
                {canGetRefund ? 'Política de reembolso aplicable' : 'Tiempo límite excedido'}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {canGetRefund 
                  ? `Quedan ${hoursUntilAppointment} horas. Puedes cancelar con reembolso parcial o reprogramar.`
                  : `Solo quedan ${hoursUntilAppointment} horas. No aplica reembolso, pero puedes reprogramar.`
                }
              </p>
            </div>
          </div>
        </div>

        {/* Opciones */}
        <div className="space-y-3 mb-6">
          {canGetRefund && (
            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="cancelOption"
                value="refund"
                checked={selectedOption === 'refund'}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="text-gray-900"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">Cancelar con reembolso</p>
                <p className="text-xs text-gray-500">Reembolso del 70% del costo</p>
              </div>
            </label>
          )}
          
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="cancelOption"
              value="reschedule"
              checked={selectedOption === 'reschedule'}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="text-gray-900"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">Reprogramar cita</p>
              <p className="text-xs text-gray-500">Sin costo adicional</p>
            </div>
          </label>
        </div>

        {/* Motivo de cancelación */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Motivo de cancelación
          </label>
          <textarea
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="Describe brevemente el motivo de la cancelación..."
            className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            rows="3"
          />
          <p className="text-xs text-gray-500 mt-1">
            Este campo es opcional pero nos ayuda a mejorar nuestro servicio
          </p>
        </div>

        {/* Acciones */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            disabled={isProcessing}
          >
            Mantener cita
          </button>
          <button
            onClick={handleCancel}
            disabled={!selectedOption || isProcessing}
            className="flex-1 px-4 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Procesando...' : 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  );
};

CancelAppointmentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Asegura que 'isOpen' es un booleano
  onCancel: PropTypes.func.isRequired, // Asegura que 'onCancel' es una función
  appointment: PropTypes.shape({
    id: PropTypes.string.isRequired, // 'id' debe ser una cadena
    fecha: PropTypes.string.isRequired, // 'fecha' debe ser una cadena
    hora: PropTypes.string.isRequired, // 'hora' debe ser una cadena
    doctor: PropTypes.string.isRequired, // 'doctor' debe ser una cadena
    especialidad: PropTypes.string.isRequired, // 'especialidad' debe ser una cadena
  }).isRequired, // 'appointment' debe ser un objeto con esas propiedades
  onClose: PropTypes.func.isRequired, // Asegura que 'onClose' es una función
};

// Componente principal con integración
const MisCitas = () => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [citas, setCitas] = useState([
    {
      id: 1,
      fecha: '2025-07-15',
      hora: '10:30',
      doctor: 'Dr. María González',
      especialidad: 'Cardiología',
      estado: 'confirmada'
    },
    {
      id: 2,
      fecha: '2025-07-20',
      hora: '14:00',
      doctor: 'Dr. Carlos Ruiz',
      especialidad: 'Dermatología',
      estado: 'pendiente'
    }
  ]);

  const handleCancelClick = (cita) => {
    setSelectedAppointment(cita);
    setShowCancelModal(true);
  };

  const handleCancelConfirm = (citaId, option, reason) => {
    setCitas(citas.filter(cita => cita.id !== citaId));
    
    // Aquí puedes agregar lógica adicional según la opción seleccionada
    if (option === 'refund') {
      console.log('Procesando reembolso...');
      console.log('Motivo:', reason);
    } else if (option === 'reschedule') {
      console.log('Redirigiendo a reprogramar...');
      console.log('Motivo:', reason);
    }
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-light text-gray-900">Mis Citas</h2>
          <button className="bg-gray-900 text-white px-6 py-2 text-sm hover:bg-gray-800 transition-colors">
            AGENDAR CITA
          </button>
        </div>

        <div className="space-y-4">
          {citas.map((cita) => (
            <div key={cita.id} className="border-b border-gray-100 pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="text-gray-400" size={16} />
                      <span className="font-medium">{cita.fecha}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="text-gray-400" size={16} />
                      <span className="text-gray-600">{cita.hora}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      cita.estado === 'confirmada'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {cita.estado === 'confirmada' ? 'CONFIRMADA' : 'PENDIENTE'}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{cita.doctor}</h3>
                  <p className="text-sm text-gray-500">{cita.especialidad}</p>
                </div>
                <div className="text-right space-y-2">
                  <button className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    Reagendar
                  </button>
                  <button 
                    onClick={() => handleCancelClick(cita)}
                    className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <CancelAppointmentModal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          appointment={selectedAppointment}
          onCancel={handleCancelConfirm}
        />
      </div>
    </div>
  );
};

export default MisCitas;