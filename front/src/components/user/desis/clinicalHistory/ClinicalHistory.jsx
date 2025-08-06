import { useState } from 'react';
import { Save, Download, Send, Upload, UserCheck, User, Pill, ClipboardList } from 'lucide-react';
import TreatmentFollowUp from './followUp/TreatmentFollowUp';
import GeneralData from './general/GeneralData';
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
      <div id="historia-clinica" className="border border-black-200 mb-8 bg-white rounded-lg shadow-sm">
        <div className="border-b border-black p-8 bg-white rounded-t-lg">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-8">
              <div className="w-32 h-32 flex items-center justify-center overflow-hidden rounded">
                <a href="https://link-to-your-image.com" target="_blank" rel="noopener noreferrer">
                  <img 
                    src="/src/assets/ipsBlack.png" 
                    alt="Logo IPS" 
                    className="object-contain w-full h-full"
                  />
                </a>
              </div>
              
              <div className="text-center border-black px-8">
                <h1 className="text-xl font-medium text-[#00102D] mb-2">TELECONSULTAS IPS UNIVERSITARIA DE COLOMBIA</h1>
                <div className="space-y-1 text-sm text-[#00102D]">
                  <div className='font-semibold'>NIT. 00.00000</div>
                  <div>Teléfono: (+57) 310-8731876</div>
                  <div>Dirección: Calle 34 5 89, Bogotá</div>
                  <div>Email: ips@entidad.com</div>
                  <h2 className="text-2xl font-medium text-[#00102D] mb-2">HISTORIA CLÍNICA</h2>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-[#00102D] text-sm"></p>
                <div className="mt-2 text-[#00102D] px-3 py-1 rounded text-xs font-medium border">
                  10746583
                </div>
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
                  `}>
                  <div className="flex items-center justify-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span className="truncate">{tab.label}</span>
                  </div>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-1/4 w-1/8 h-0.5 bg-blue-500"></div>
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
    </div>
  );
};

export default ClinicalHistory;