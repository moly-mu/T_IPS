import { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { CheckCircle, Download } from 'lucide-react';
import PropTypes from 'prop-types';

export default function ConfirmationAppointment({ onClose = () => {}, selectedTime = "14:30" }) {
  const [hasTechnicalMeans, setHasTechnicalMeans] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptData, setAcceptData] = useState(false);

  const pdfRef = useRef();

  const handleSubmit = () => {
    if (!hasTechnicalMeans || !acceptTerms || !acceptData) {
      alert('Debes aceptar todos los requisitos antes de confirmar.');
      return;
    }
    alert('Teleconsulta confirmada exitosamente');
    onClose();
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
              <p><strong>Especialidad:</strong> Consulta de Dermatología</p>
              <p><strong>Profesional:</strong> Dra. María González - Dermatóloga</p>
              <p><strong>Fecha y hora:</strong> Martes 16 de julio, {selectedTime}</p>
              <p><strong>Duración estimada:</strong> 30 minutos</p>
              <p><strong>Modalidad:</strong> Videollamada</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Datos del paciente</h2>
              <p><strong>Nombre completo:</strong> Juan Pérez</p>
              <p><strong>Correo electrónico:</strong> juan.perez@example.com</p>
              <p><strong>Teléfono de contacto:</strong> +57 300 123 4567</p>
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
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl">
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

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={handleSubmit}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-gray-900 text-white hover:bg-gray-800 font-medium text-sm"
          >
            <CheckCircle className="w-5 h-5" /> Confirmar teleconsulta
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium text-sm"
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
};
