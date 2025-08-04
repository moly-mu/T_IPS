import { useState } from 'react';
import { X, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import PropTypes from 'prop-types';

const CancelAppointmentM = ({ isOpen, onClose, appointment, onCancel }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !appointment) return null;

  const now = new Date();
  const appointmentDateTime = new Date(`${appointment.fecha} ${appointment.hora}`);
  const hoursUntilAppointment = Math.floor((appointmentDateTime - now) / (1000 * 60 * 60));
  const canGetRefund = hoursUntilAppointment >= 5;

  const handleCancel = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    onCancel(appointment.id, selectedOption, cancelReason);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Cancelar Cita</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-gray-400" size={16} />
            <span className="text-sm font-medium">{appointment.fecha} - {appointment.hora}</span>
          </div>
          <p className="text-sm text-gray-600">{appointment.doctor}</p>
          <p className="text-xs text-gray-500">{appointment.especialidad}</p>
        </div>

        <div className="mb-6">
          <div className={`flex items-start gap-3 p-3 rounded-lg mb-4 ${canGetRefund ? 'bg-green-50' : 'bg-yellow-50'}`}>
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
                  : `Solo quedan ${hoursUntilAppointment} horas. No aplica reembolso, pero puedes reprogramar.`}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {canGetRefund && (
            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="cancelOption"
                value="refund"
                checked={selectedOption === 'refund'}
                onChange={(e) => setSelectedOption(e.target.value)}
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
            />
            <div>
              <p className="text-sm font-medium text-gray-900">Reprogramar cita</p>
              <p className="text-xs text-gray-500">Sin costo adicional</p>
            </div>
          </label>
        </div>

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

CancelAppointmentM.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  appointment: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    fecha: PropTypes.string.isRequired,
    hora: PropTypes.string.isRequired,
    doctor: PropTypes.string.isRequired,
    especialidad: PropTypes.string.isRequired,
  }).isRequired,
};

export default CancelAppointmentM;
