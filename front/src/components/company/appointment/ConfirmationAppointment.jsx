import { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { CheckCircle, Download } from 'lucide-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

export default function ConfirmationAppointment({ onClose = () => {}, selectedTime = "14:30", selectedDoctor = null }) {
  const [hasTechnicalMeans, setHasTechnicalMeans] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptData, setAcceptData] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);

  const { token, user } = useAuth();
  const pdfRef = useRef();

  const api = axios.create({
    baseURL: 'http://tu-api.com/api', // Reemplaza con tu URL base
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  const handleSubmit = async () => {
    if (!hasTechnicalMeans || !acceptTerms || !acceptData) {
      alert('Debes aceptar todos los requisitos antes de confirmar.');
      return;
    }

    if (!selectedDoctor) {
      alert('No se ha seleccionado un doctor.');
      return;
    }

    if (!token || !user) {
      alert('Debes iniciar sesión para agendar una cita.');
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      // Crear la fecha de la cita (mañana por defecto)
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const fecha = tomorrow.toISOString().split('T')[0]; // YYYY-MM-DD

      // Convertir la hora del formato "2:30 PM" a "14:30"
      const hora = convertTimeFormat(selectedTime);

      const appointmentData = {
        specialistId: selectedDoctor.id,
        fecha: fecha,
        hora: hora,
        specialtyId: null, // El backend usará la especialidad del doctor
        duration: 30,
        patientId: user.id // Asumiendo que el usuario tiene un id
      };

      const response = await api.post('/appointments', appointmentData);
      
      if (response.data.appointment) {
        const { appointment } = response.data;
        alert(`¡Teleconsulta confirmada exitosamente! 
        
Detalles de tu cita:
• Doctor: ${appointment.especialista}
• Especialidad: ${appointment.especialidad}
• Fecha: ${new Date(appointment.fecha).toLocaleDateString('es-ES')}
• Hora: ${appointment.hora}
• Estado: ${appointment.estado}

Tu cita aparecerá en "Mis Citas".`);
        onClose();
      }
    } catch (error) {
      console.error('Error al crear la cita:', error);
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Error al confirmar la teleconsulta. Por favor, intenta nuevamente.';
      setError(errorMessage);
    } finally {
      setIsCreating(false);
    }
  };

  // Función para convertir formato de hora de "2:30 PM" a "14:30"
  const convertTimeFormat = (timeString) => {
    if (!timeString) return "14:30";
    
    try {
      const [time, period] = timeString.split(' ');
      let [hours, minutes] = time.split(':');
      hours = parseInt(hours);
      
      if (period === 'PM' && hours !== 12) {
        hours += 12;
      } else if (period === 'AM' && hours === 12) {
        hours = 0;
      }
      
      return `${hours.toString().padStart(2, '0')}:${minutes || '00'}`;
    } catch (error) {
      console.error('Error convirtiendo la hora:', error);
      return "14:30";
    }
  };

  const handleDownload = () => {
    const element = pdfRef.current;

    html2pdf()
      .set({
        margin: 0.5,
        filename: 'Confirmacion_Teleconsulta.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      })
      .from(element)
      .save();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="relative bg-white rounded-md max-w-xl w-full max-h-[90vh] overflow-y-auto shadow p-8 border border-gray-300">
        {/* Contenido que se imprimira */}
        <div ref={pdfRef} className="p-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Confirmación de Teleconsulta</h1>
          <p className="text-gray-500 text-sm mb-4">Revisa y guarda los detalles de tu cita médica.</p>

          {/* Informacion y datos del paciente  */}
          <div className="flex flex-col gap-6 text-sm text-gray-700 mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Información de la consulta</h2>
              <p><strong>Especialidad:</strong> {selectedDoctor?.specialty || 'Consulta de Dermatología'}</p>
              <p><strong>Profesional:</strong> {selectedDoctor?.name || 'Dra. María González'} - {selectedDoctor?.specialty || 'Dermatóloga'}</p>
              <p><strong>Fecha y hora:</strong> {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}, {selectedTime}</p>
              <p><strong>Duración estimada:</strong> 30 minutos</p>
              <p><strong>Modalidad:</strong> Videollamada</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Datos del paciente</h2>
              <p><strong>Nombre completo:</strong> {user?.name || 'Juan Pérez'}</p>
              <p><strong>Correo electrónico:</strong> {user?.email || 'juan.perez@example.com'}</p>
              <p><strong>Teléfono de contacto:</strong> {user?.phone || '+57 300 123 4567'}</p>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-800 mb-2">Pago</h2>
          <div className="text-sm text-gray-700 space-y-1">
            <a href="/pago" className="text-sm text-bold text-blue-700 hover:text-blue-500 transition-colors tracking-wide">
              Realizar pago de la consulta
            </a>
          </div>
        </div>

        {/* boton cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        {/* Checkboxes */}
        <div className="mt-2 space-y-4 text-sm text-gray-700 ml-4">
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={hasTechnicalMeans}
              onChange={(e) => setHasTechnicalMeans(e.target.checked)}
              className="mt-1 w-4 h-4 border-gray-300 rounded"
            />
            Confirmo que tengo acceso a internet estable y un dispositivo con cámara y micrófono.
          </label>
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-1 w-4 h-4 border-gray-300 rounded"
            />
            Acepto los <a href="#" className="text-blue-600 underline">términos de uso</a> y <a href="#" className="text-blue-600 underline">política de privacidad</a>.
          </label>
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={acceptData}
              onChange={(e) => setAcceptData(e.target.checked)}
              className="mt-1 w-4 h-4 border-gray-300 rounded"
            />
            Autorizo el tratamiento de mis datos personales y clínicos para esta consulta.
          </label>
        </div>

        {/* Mostrar error si existe */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={handleSubmit}
            disabled={isCreating}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-gray-900 text-white hover:bg-gray-800 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creando cita...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" /> Confirmar teleconsulta
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            disabled={isCreating}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5" /> Descargar PDF
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmationAppointment.propTypes = {
  onClose: PropTypes.func,
  selectedTime: PropTypes.string,
  selectedDoctor: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    specialty: PropTypes.string,
  }),
};