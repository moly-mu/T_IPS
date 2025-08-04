import { useState } from 'react';
import { Save, Download, Send, Upload, UserCheck, User, Pill, ClipboardList } from 'lucide-react';
import GeneralData from './GeneralData';
import TreatmentFollowUp from './TreatmentFollowUp';
import TreatmentMedications from './TreatmentMedications';
import { html2pdf } from 'html2pdf.js';

const today = new Date().toISOString().split('T')[0];

const ClinicalHistory = () => {
  const [formData, setFormData] = useState({
    ingreso: '12658456',
    fechaImpresion: today,
    identificacion: '1.098.765.432',
    nombre: 'Juan Manuel',
    apellidos: 'Pérez Rodríguez'
  });

  const [activeTab, setActiveTab] = useState('general');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Datos guardados:', formData);
    alert('Historia clínica guardada exitosamente');
  };

  const handleDownload = () => {
    const element = document.getElementById('historia-clinica');
    const opt = {
      margin: 0.5,
      filename: `historia_clinica_${formData.nombre}_${formData.apellido}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(element).save();
  };

  const handleSendToPatient = () => {
    alert('Enviando historia clínica al paciente...');
  };

  const handleEndConsultation = () => {
    alert('Finalizando consulta...');
  };

  const handleViewPatientData = () => {
    alert('Mostrando datos del paciente...');
  };

  const tabs = [
    {
      id: 'general',
      label: 'Datos Generales',
      icon: User,
      component: GeneralData
    },
    {
      id: 'followup',
      label: 'Seguimiento',
      icon: ClipboardList,
      component: TreatmentFollowUp
    },
    {
      id: 'medications',
      label: 'Medicamentos',
      icon: Pill,
      component: TreatmentMedications
    }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="border border-black-200 mb-8 bg-white rounded-lg shadow-sm">
        <div className="border-b border-teal-100 p-8 bg-[#00102D] rounded-t-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-12">
              <div className="w-20 h-20 flex items-center justify-center overflow-hidden rounded">
                <img 
                src="/src/assets/logoIPS.png" 
                alt="IPS" />
              </div>
              
              <div>
                <h1 className="text-xl font-medium text-white mb-4">TELECONSULTAS IPS UNIVERSITARIA DE COLOMBIA</h1>
                <div className="space-y-1 text-sm text-gray-300">
                  <div>NIT: 000.000.000-0</div>
                  <div>Teléfono: (+57) 310-8731876</div>
                  <div>Dirección: Calle 34 5 89, Bogotá</div>
                  <div>Email: ips@entidad.com</div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <h2 className="text-2xl font-light text-gray-300 mb-2">HISTORIA CLÍNICA</h2>
              <p className="text-white text-sm">Sistema Integrado de Salud</p>
              <div className="mt-2 text-white px-3 py-1 rounded text-xs font-medium">
                10746583
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-6 gap-6">
            <div>
              <label className="block text-xs font-medium text-[#00102D] mb-2 uppercase tracking-wider">Ingreso</label>
              <input
                type="text"
                value={formData.ingreso}
                onChange={(e) => handleInputChange('ingreso', e.target.value)}
                className="w-full border-b border-[#00102D] pb-2 text-sm focus:border-teal-500 focus:outline-none transition-colors"
                placeholder="N° Ingreso"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-[#00102D] mb-2 uppercase tracking-wider">Fecha de Impresión</label>
              <input
                type="date"
                value={formData.fechaImpresion}
                onChange={(e) => handleInputChange('fechaImpresion', e.target.value)}
                className="w-full border-b border-[#00102D] pb-2 text-sm focus:border-teal-500 focus:outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-[#00102D] mb-2 uppercase tracking-wider">Página</label>
              <div className="text-sm font-medium text-blue-800 pb-2 border-b border-[#00102D] bg-blue-50 px-2 py-1 rounded-t">
                1 / 3
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-[#00102D] mb-2 uppercase tracking-wider">Identificación</label>
              <input
                type="text"
                value={formData.identificacion}
                onChange={(e) => handleInputChange('identificacion', e.target.value)}
                className="w-full border-b border-[#00102D] pb-2 text-sm focus:border-teal-500 focus:outline-none transition-colors"
                placeholder="N° Documento"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-[#00102D] mb-2 uppercase tracking-wider">Nombres</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                className="w-full border-b border-[#00102D] pb-2 text-sm focus:border-teal-500 focus:outline-none transition-colors"
                placeholder="Nombres"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-[#00102D] mb-2 uppercase tracking-wider">Apellidos</label>
              <input
                type="text"
                value={formData.apellidos}
                onChange={(e) => handleInputChange('apellidos', e.target.value)}
                className="w-full border-b border-[#00102D] pb-2 text-sm focus:border-teal-500 focus:outline-none transition-colors"
                placeholder="Apellidos"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-0" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    group relative min-w-0 flex-1 overflow-hidden py-4 px-6 text-sm font-medium text-center
                    focus:z-10 focus:outline-none transition-colors duration-200
                    ${activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span className="truncate">{tab.label}</span>
                  </div>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>

      {/* Botones de acción */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="flex justify-center flex-wrap gap-4">
          <button
            onClick={handleSave}
            className="flex flex-col items-center space-y-2 px-4 py-3 text-sm font-medium text-teal-700 hover:text-teal-900 hover:bg-teal-50 transition-colors rounded-md">
            <Save className="h-6 w-6" />
            <span>Guardar</span>
          </button>
          
          <button
            onClick={handleDownload}
            className="flex flex-col items-center space-y-2 px-4 py-3 text-sm font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-50 transition-colors rounded-md">
            <Download className="h-6 w-6" />
            <span>Descargar</span>
          </button>
          
          <button
            onClick={handleSendToPatient}
            className="flex flex-col items-center space-y-2 px-4 py-3 text-sm font-medium text-cyan-700 hover:text-cyan-900 hover:bg-cyan-50 transition-colors rounded-md">
            <Send className="h-6 w-6" />
            <span>Enviar</span>
          </button>

          <button
            onClick={handleEndConsultation}
            className="flex flex-col items-center space-y-2 px-4 py-3 text-sm font-medium text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 transition-colors rounded-md">
            <UserCheck className="h-6 w-6" />
            <span>Terminar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClinicalHistory;