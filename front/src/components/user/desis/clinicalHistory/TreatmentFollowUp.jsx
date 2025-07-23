import { useState } from 'react';
import { Plus, Edit, Trash2, FileText, Calendar, Clock, Stethoscope, Activity, Folder, Upload } from 'lucide-react';

const TreatmentFollowUp = () => {
  const [consultations, setConsultations] = useState([
    {
      idconsulta_medica: '1',
      medicalHistoryId: 'HM001',
      startTime: '09:00',
      endTime: '10:00',
      reason: 'Control rutinario',
      medicalNote: 'Paciente presenta mejoría notable en síntomas',
      vitalSigns: 'PA: 120/80, FC: 72, T: 36.5°C',
      consultationMode: 'Videollamada',
      location: 'Colombia',
      summary: 'Consulta de seguimiento satisfactoria'
    }
  ]);

  const [diagnoses, setDiagnoses] = useState([
    {
      iddiagnostico: '1',
      medicalHistoryId: 'HM001',
      cie10Code: 'Z00.0',
      symptomDesc: 'Dolor abdominal leve',
      duration: '2 semanas',
      evolution: 'Estable',
      diagnosisType: 'Principal',
      isPrincipal: true,
      diagnosisDate: '2025-01-15'
    }
  ]);

  const [diagnosticFiles, setDiagnosticFiles] = useState([
    {
      idarchivo_diagnostico: '1',
      medicalHistoryId: 'HM001',
      fileName: 'radiografia_torax.jpg',
      fileType: 'Imagen',
      studyDate: '2025-01-20',
      specialty: 'Radiología',
      status: 'Completado'
    }
  ]);

  const [medicalOrders, setMedicalOrders] = useState([
    {
      idorden_medica: '1',
      appointmentId: 'CITA001',
      description: 'Exámenes de laboratorio completos',
      instructions: 'Realizar en ayunas de 12 horas',
      status: 'Pendiente',
      issuedAt: '2025-01-22'
    }
  ]);

  const [activeSection, setActiveSection] = useState('consultations');
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const sections = [
    { id: 'consultations', label: 'Consultas Médicas', icon: Stethoscope },
    { id: 'diagnoses', label: 'Diagnósticos', icon: Activity },
    { id: 'files', label: 'Archivos Diagnósticos', icon: Folder },
    { id: 'orders', label: 'Órdenes Médicas', icon: FileText },
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = (id, section) => {
    if (window.confirm('¿Está seguro de eliminar este elemento?')) {
      switch(section) {
        case 'consultations':
          setConsultations(prev => prev.filter(item => item.idconsulta_medica !== id));
          break;
        case 'diagnoses':
          setDiagnoses(prev => prev.filter(item => item.iddiagnostico !== id));
          break;
        case 'files':
          setDiagnosticFiles(prev => prev.filter(item => item.idarchivo_diagnostico !== id));
          break;
        case 'orders':
          setMedicalOrders(prev => prev.filter(item => item.idorden_medica !== id));
          break;
      }
    }
  };

  const renderConsultations = () => (
    <div className="space-y-4">
      {consultations.map((consultation) => (
        <div key={consultation.idconsulta_medica} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-gray-900">
                {consultation.startTime} - {consultation.endTime}
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                {consultation.consultationMode}
              </span>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleEdit(consultation)} className="text-blue-600 hover:text-blue-800">
                <Edit className="h-4 w-4" />
              </button>
              <button onClick={() => handleDelete(consultation.idconsulta_medica, 'consultations')} className="text-red-600 hover:text-red-800">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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
  );

  const renderDiagnoses = () => (
    <div className="space-y-4">
      {diagnoses.map((diagnosis) => (
        <div key={diagnosis.iddiagnostico} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="font-medium text-gray-900">{diagnosis.cie10Code}</span>
              {diagnosis.isPrincipal && (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Principal</span>
              )}
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleEdit(diagnosis)} className="text-blue-600 hover:text-blue-800">
                <Edit className="h-4 w-4" />
              </button>
              <button onClick={() => handleDelete(diagnosis.iddiagnostico, 'diagnoses')} className="text-red-600 hover:text-red-800">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 mb-1">Descripción de síntomas:</p>
              <p className="text-gray-900">{diagnosis.symptomDesc}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Duración:</p>
              <p className="text-gray-900">{diagnosis.duration}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Evolución:</p>
              <p className="text-gray-900">{diagnosis.evolution}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Fecha de diagnóstico:</p>
              <p className="text-gray-900">{diagnosis.diagnosisDate}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderFiles = () => (
    <div className="space-y-4">
      {diagnosticFiles.map((file) => (
        <div key={file.idarchivo_diagnostico} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center space-x-2">
              <Folder className="h-4 w-4 text-purple-500" />
              <span className="font-medium text-gray-900">{file.fileName}</span>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                {file.fileType}
              </span>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleEdit(file)} className="text-blue-600 hover:text-blue-800">
                <Edit className="h-4 w-4" />
              </button>
              <button onClick={() => handleDelete(file.idarchivo_diagnostico, 'files')} className="text-red-600 hover:text-red-800">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-600 mb-1">Fecha de estudio:</p>
              <p className="text-gray-900">{file.studyDate}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Especialidad:</p>
              <p className="text-gray-900">{file.specialty}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Estado:</p>
              <span className={`px-2 py-1 rounded text-xs ${
                file.status === 'Completado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {file.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-4">
      {medicalOrders.map((order) => (
        <div key={order.idorden_medica} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-orange-500" />
              <span className="font-medium text-gray-900">Orden #{order.idorden_medica}</span>
              <span className={`px-2 py-1 rounded text-xs ${
                order.status === 'Completado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {order.status}
              </span>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleEdit(order)} className="text-blue-600 hover:text-blue-800">
                <Edit className="h-4 w-4" />
              </button>
              <button onClick={() => handleDelete(order.idorden_medica, 'orders')} className="text-red-600 hover:text-red-800">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-600 mb-1">Descripción:</p>
              <p className="text-gray-900">{order.description}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Instrucciones:</p>
              <p className="text-gray-900">{order.instructions}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Fecha de emisión:</p>
              <p className="text-gray-900">{order.issuedAt}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );


  const renderContent = () => {
    switch(activeSection) {
      case 'consultations':
        return renderConsultations();
      case 'diagnoses':
        return renderDiagnoses();
      case 'files':
        return renderFiles();
      case 'orders':
        return renderOrders();
      default:
        return renderConsultations();
    }
  };

  return (
    <div className="space-y-6">
      {/* Navegación de secciones */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-0" aria-label="Sections">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`
                  group relative min-w-0 flex-1 overflow-hidden py-3 px-4 text-xs font-medium text-center
                  focus:z-10 focus:outline-none transition-colors duration-200
                  ${activeSection === section.id
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center justify-center space-x-1">
                  <Icon className="h-3 w-3" />
                  <span className="truncate">{section.label}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Botón agregar */}
      <div className="flex justify-end">
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Agregar nuevo</span>
        </button>
      </div>

      {/* Contenido */}
      <div className="min-h-[400px]">
        {renderContent()}
      </div>
    </div>
  );
};

export default TreatmentFollowUp;