import { useState } from 'react';
import { Stethoscope, Activity, Folder, FileText } from 'lucide-react';
import MedicalConsultations from './MedicalConsultations';
import Diagnostics from './Diagnostics';
import DiagnosticFiles from './DiagnosticFiles';
import AnamnesisAndDiagnostic from './diagnosticComp/AnamnesisAndDiagnostic';


const TreatmentFollowUp = () => {
  const [activeSection, setActiveSection] = useState('consultations');

  const sections = [
    { id: 'consultations', label: 'Consultas Médicas', icon: Stethoscope },
    { id: 'diagnoses', label: 'Diagnósticos', icon: Activity },
    { id: 'files', label: 'Archivos Diagnósticos', icon: Folder },
    { id: 'orders', label: 'Órdenes Médicas', icon: FileText },
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'consultations':
        return <MedicalConsultations/>;
      case 'diagnoses':
        return <Diagnostics />;
      case 'files':
        return <DiagnosticFiles />;
      case 'orders':
        return <AnamnesisAndDiagnostic />;
      default:
        return (
          <div className="p-8 text-center text-gray-500">
            <p>Selecciona una sección</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
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
                `}>
                <div className="flex items-center justify-center space-x-1">
                  <Icon className="h-3 w-3" />
                  <span className="truncate">{section.label}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Contenido */}
      <div className="min-h-[400px]">
        {renderContent()}
      </div>
    </div>
  );
};

export default TreatmentFollowUp;