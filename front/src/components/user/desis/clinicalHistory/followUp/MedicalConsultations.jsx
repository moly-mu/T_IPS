import { useState } from 'react';
import { Plus, Edit, Trash2, Clock, Stethoscope, FileDown, Calendar } from 'lucide-react';

const MedicalConsultations = () => {
  const [consultations, setConsultations] = useState([
    {
      id: '1',
      date: '2025-01-15',
      startTime: '09:00',
      endTime: '10:00',
      reason: 'Control rutinario',
      medicalNote: 'Paciente presenta mejoría notable en síntomas. Se observa evolución favorable del tratamiento.',
      vitalSigns: 'PA: 120/80, FC: 72, T: 36.5°C',
      consultationMode: 'Videollamada',
      location: 'Colombia',
      summary: 'Consulta de seguimiento satisfactoria',
      pdfGenerated: true,
      pdfUrl: '#'
    },
    {
      id: '2',
      date: '2024-12-20',
      startTime: '14:30',
      endTime: '15:30',
      reason: 'Consulta inicial',
      medicalNote: 'Primera consulta. Se establece diagnóstico inicial y plan de tratamiento.',
      vitalSigns: 'PA: 135/85, FC: 78, T: 36.8°C',
      consultationMode: 'Presencial',
      location: 'Clínica Central',
      summary: 'Evaluación inicial completa',
      pdfGenerated: true,
      pdfUrl: '#'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingConsultation, setEditingConsultation] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    reason: '',
    medicalNote: '',
    vitalSigns: '',
    consultationMode: 'Videollamada',
    location: '',
    summary: ''
  });

  const resetForm = () => {
    setFormData({
      date: '',
      startTime: '',
      endTime: '',
      reason: '',
      medicalNote: '',
      vitalSigns: '',
      consultationMode: 'Videollamada',
      location: '',
      summary: ''
    });
  };

  const handleAdd = () => {
    resetForm();
    setEditingConsultation(null);
    setShowAddForm(true);
  };

  const handleEdit = (consultation) => {
    setFormData({
      date: consultation.date,
      startTime: consultation.startTime,
      endTime: consultation.endTime,
      reason: consultation.reason,
      medicalNote: consultation.medicalNote,
      vitalSigns: consultation.vitalSigns,
      consultationMode: consultation.consultationMode,
      location: consultation.location,
      summary: consultation.summary
    });
    setEditingConsultation(consultation);
    setShowAddForm(true);
  };

  const handleSubmit = () => {
    if (!formData.date || !formData.startTime || !formData.endTime || !formData.reason) {
      alert('Por favor complete los campos requeridos');
      return;
    }
    
    if (editingConsultation) {
      setConsultations(prev => prev.map(consultation => 
        consultation.id === editingConsultation.id 
          ? { ...consultation, ...formData }
          : consultation
      ));
    } else {
      const newConsultation = {
        id: Date.now().toString(),
        ...formData,
        pdfGenerated: false,
        pdfUrl: ''
      };
      setConsultations(prev => [newConsultation, ...prev]);
    }
    
    setShowAddForm(false);
    resetForm();
    setEditingConsultation(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar esta consulta?')) {
      setConsultations(prev => prev.filter(consultation => consultation.id !== id));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generatePDF = (consultationId) => {
    // Simular generación de PDF
    setConsultations(prev => prev.map(consultation => 
      consultation.id === consultationId 
        ? { ...consultation, pdfGenerated: true, pdfUrl: `#pdf-${consultationId}` }
        : consultation
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Stethoscope className="h-5 w-5 mr-2 text-blue-600" />
          Consultas Médicas
        </h3>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Agregar Consulta</span>
        </button>
      </div>

      {/* Lista de consultas pasadas */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h4 className="text-sm font-medium text-gray-700">Historial de Consultas</h4>
        </div>
        
        <div className="divide-y divide-gray-200">
          {consultations.map((consultation) => (
            <div key={consultation.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span className="font-medium text-gray-900">{consultation.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {consultation.startTime} - {consultation.endTime}
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {consultation.consultationMode}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {consultation.pdfGenerated ? (
                    <a
                      href={consultation.pdfUrl}
                      className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-sm"
                    >
                      <FileDown className="h-4 w-4" />
                      <span>PDF</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => generatePDF(consultation.id)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      <FileDown className="h-4 w-4" />
                      <span>Generar PDF</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(consultation)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(consultation.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">Motivo de consulta:</p>
                  <p className="text-gray-900">{consultation.reason}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Ubicación:</p>
                  <p className="text-gray-900">{consultation.location}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Signos vitales:</p>
                  <p className="text-gray-900">{consultation.vitalSigns}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Resumen:</p>
                  <p className="text-gray-900">{consultation.summary}</p>
                </div>
              </div>

              {consultation.medicalNote && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-gray-600 mb-1">Nota médica:</p>
                  <p className="text-gray-900 text-sm">{consultation.medicalNote}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal/Form para agregar/editar */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingConsultation ? 'Editar Consulta' : 'Nueva Consulta'}
              </h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de consulta
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hora inicio
                    </label>
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hora fin
                    </label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Motivo de consulta
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="2"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Modalidad
                  </label>
                  <select
                    value={formData.consultationMode}
                    onChange={(e) => handleInputChange('consultationMode', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Videollamada">Videollamada</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Telefónica">Telefónica</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Colombia, Clínica, etc."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Signos vitales
                </label>
                <input
                  type="text"
                  value={formData.vitalSigns}
                  onChange={(e) => handleInputChange('vitalSigns', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="PA: 120/80, FC: 72, T: 36.5°C"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nota médica
                </label>
                <textarea
                  value={formData.medicalNote}
                  onChange={(e) => handleInputChange('medicalNote', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Observaciones médicas detalladas..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resumen
                </label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => handleInputChange('summary', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="2"
                  placeholder="Resumen breve de la consulta..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingConsultation ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalConsultations;