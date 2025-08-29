import { useState } from 'react';
import PropTypes from 'prop-types';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

// 1. Anamnesis y Diagnóstico
const AnamnesisAndDiagnostic = ({ formData, handleInputChange }) => {
    return(
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            {/* Anamnesis */}
            <div className='bg-white rounded-lg shadow-sm p-6'>
                <h2 className='text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200'>
                    Anamnesis
                </h2>
                <div className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Motivo de Consulta y Enfermedad Actual
                        </label>
                        <textarea 
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                            rows='8'
                            value={formData.consultReason}
                            onChange={(e) => handleInputChange('consultReason', e.target.value)}
                            placeholder='Describa a detalle el motivo de consulta y la enfermedad actual del paciente...'
                        />
                    </div>
                </div>
            </div>

            {/* Diagnóstico */}
            <div className='bg-white rounded-lg shadow-sm p-6'>
                <h2 className='text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200'>
                    Diagnóstico
                </h2>
                <div className='space-y-4'>
                    <div className='grid grid-cols-1 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Código CIE-10
                            </label>
                            <input 
                                type="text"
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                                value={formData.cie10Code}
                                onChange={(e) => handleInputChange('cie10Code', e.target.value)}
                                placeholder='Ej: K35.9'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Fecha de Diagnóstico
                            </label>
                            <input 
                                type="date"
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                                value={formData.diagnosisDate}
                                onChange={(e) => handleInputChange('diagnosisDate', e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Descripción de Síntomas
                        </label>
                        <textarea 
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                            rows='3'
                            value={formData.symptoms}
                            onChange={(e) => handleInputChange('symptoms', e.target.value)}
                            placeholder='Describa los síntomas presentados...'
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Duración
                            </label>
                            <input 
                                type="text"
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                                value={formData.duration}
                                onChange={(e) => handleInputChange('duration', e.target.value)}
                                placeholder='Ej: 3 días'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Evolución
                            </label>
                            <input 
                                type="text"
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                                value={formData.evolution}
                                onChange={(e) => handleInputChange('evolution', e.target.value)}
                                placeholder='Ej: Favorable'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

AnamnesisAndDiagnostic.propTypes = {
  formData: PropTypes.shape({
    consultReason: PropTypes.string,
    cie10Code: PropTypes.string,
    diagnosisDate: PropTypes.string,
    symptoms: PropTypes.string,
    duration: PropTypes.string,
    evolution: PropTypes.string
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired
};

// 2. Signos Vitales y Hallazgos
const VitalsAndFindings = ({ formData, handleInputChange, calculateBMI }) => {
    return(
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            {/* Signos Vitales */}
            <div className='bg-white rounded-lg shadow-sm p-6'>
                <h2 className='text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200'>
                    Signos Vitales
                </h2>
                <div className='space-y-4'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Frecuencia cardíaca (lpm)
                            </label>
                            <input
                                type="number"
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                                value={formData.heartRate}
                                onChange={(e) => handleInputChange('heartRate', e.target.value)}
                                placeholder='80'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Frecuencia respiratoria (rpm)
                            </label>
                            <input
                                type="number"
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                                value={formData.respiratoryRate}
                                onChange={(e) => handleInputChange('respiratoryRate', e.target.value)}
                                placeholder='20'
                            />
                        </div>
                    </div>
                    
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                TA Sistólica (mmHg)
                            </label>
                            <input
                                type="number"
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                                value={formData.systolicBP}
                                onChange={(e) => handleInputChange('systolicBP', e.target.value)}
                                placeholder='120'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                TA Diastólica (mmHg)
                            </label>
                            <input
                                type="number"
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                                value={formData.diastolicBP}
                                onChange={(e) => handleInputChange('diastolicBP', e.target.value)}
                                placeholder='80'
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                TA Media (mmHg)
                            </label>
                            <input
                                type="number"
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                                value={formData.meanBP}
                                onChange={(e) => handleInputChange('meanBP', e.target.value)}
                                placeholder='93'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Pulsioximetría SO2 (%)
                            </label>
                            <input
                                type="number"
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                                value={formData.oxygenSaturation}
                                onChange={(e) => handleInputChange('oxygenSaturation', e.target.value)}
                                placeholder='98'
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Temperatura (°C)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                                value={formData.temperature}
                                onChange={(e) => handleInputChange('temperature', e.target.value)}
                                placeholder='36.5'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Peso (kg)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                                value={formData.weight}
                                onChange={(e) => handleInputChange('weight', e.target.value)}
                                onBlur={calculateBMI}
                                placeholder='70'
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-3 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Talla (cm)
                            </label>
                            <input
                                type="number"
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                                value={formData.height}
                                onChange={(e) => handleInputChange('height', e.target.value)}
                                onBlur={calculateBMI}
                                placeholder='170'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                IMC (kg/m²)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                className='w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                                value={formData.bmi}
                                readOnly
                                placeholder='Auto'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Superficie corporal (m²)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                                value={formData.bodySurface}
                                onChange={(e) => handleInputChange('bodySurface', e.target.value)}
                                placeholder='1.8'
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Hallazgos */}
            <div className='bg-white rounded-lg shadow-sm p-6'>
                <h2 className='text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200'>
                    Hallazgos
                </h2>
                <div className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Hallazgos del examen físico
                        </label>
                        <textarea
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                            rows='20'
                            value={formData.findings}
                            onChange={(e) => handleInputChange('findings', e.target.value)}
                            placeholder='Describa los hallazgos relevantes del examen físico por sistemas:&#10;&#10;• Cabeza y cuello:&#10;• Cardiovascular:&#10;• Pulmonar:&#10;• Abdomen:&#10;• Neurológico:&#10;• Extremidades:&#10;• Otros hallazgos:'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

VitalsAndFindings.propTypes = {
  formData: PropTypes.shape({
    heartRate: PropTypes.string,
    respiratoryRate: PropTypes.string,
    systolicBP: PropTypes.string,
    diastolicBP: PropTypes.string,
    meanBP: PropTypes.string,
    oxygenSaturation: PropTypes.string,
    temperature: PropTypes.string,
    weight: PropTypes.string,
    height: PropTypes.string,
    bmi: PropTypes.string,
    bodySurface: PropTypes.string,
    findings: PropTypes.string
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  calculateBMI: PropTypes.func.isRequired
};

//3. Análisis y Plan (Solo)
const AnalysisAndPlan = ({ formData, handleInputChange }) => {
    return(
        <div className='bg-white rounded-lg shadow-sm p-6 mb-6'>
            <h2 className='text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200'>
                Análisis y Plan
            </h2>
            <div className='space-y-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Análisis y plan de atención
                    </label>
                    <textarea
                        className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                        rows='6'
                        value={formData.analysisAndPlan}
                        onChange={(e) => handleInputChange('analysisAndPlan', e.target.value)}
                        placeholder='Detalle el análisis clínico y plan de atención:&#10;&#10;• Diagnóstico diferencial:&#10;• Plan diagnóstico:&#10;• Plan terapéutico:&#10;• Plan educativo:&#10;• Seguimiento:'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Diagnóstico
                    </label>
                    <textarea
                        className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                        rows='4'
                        value={formData.diagnosis}
                        onChange={(e) => handleInputChange('diagnosis', e.target.value)}
                        placeholder='Diagnóstico definitivo o provisional...'
                    />
                </div>
            </div>
        </div>
    );
};

AnalysisAndPlan.propTypes = {
  formData: PropTypes.shape({
    analysisAndPlan: PropTypes.string,
    diagnosis: PropTypes.string
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired
};

// 4. Procedimientos e Impresión Diagnóstica
const ProceduresAndImpression = ({ formData, handleInputChange }) => {
    return(
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            {/* Procedimientos */}
            <div className='bg-white rounded-lg shadow-sm p-6'>
                <h2 className='text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200'>
                    Procedimientos
                </h2>
                <div className='space-y-4'>
                    <div className='grid grid-cols-1 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Código
                            </label>
                            <input
                                type="text"
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                                value={formData.procedureCode}
                                onChange={(e) => handleInputChange('procedureCode', e.target.value)}
                                placeholder='Código del procedimiento'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Servicio
                            </label>
                            <input
                                type="text"
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                                value={formData.service}
                                onChange={(e) => handleInputChange('service', e.target.value)}
                                placeholder='Servicio médico'
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Especialidad
                            </label>
                            <input
                                type="text"
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                                value={formData.specialty}
                                onChange={(e) => handleInputChange('specialty', e.target.value)}
                                placeholder='Especialidad médica'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Cantidad
                            </label>
                            <input
                                type="number"
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                                value={formData.quantity}
                                onChange={(e) => handleInputChange('quantity', e.target.value)}
                                placeholder='1'
                            />
                        </div>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Observaciones
                        </label>
                        <textarea
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                            rows='5'
                            value={formData.procedureObservations}
                            onChange={(e) => handleInputChange('procedureObservations', e.target.value)}
                            placeholder='Observaciones adicionales del procedimiento...'
                        />
                    </div>
                </div>
            </div>

            {/* Impresión Diagnóstica */}
            <div className='bg-white rounded-lg shadow-sm p-6'>
                <h2 className='text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200'>
                    Impresión Diagnóstica
                </h2>
                <div className='space-y-4'>
                    <div className='grid grid-cols-1 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                CIE-10
                            </label>
                            <input
                                type="text"
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                                value={formData.impressionCie10}
                                onChange={(e) => handleInputChange('impressionCie10', e.target.value)}
                                placeholder='Código CIE-10'
                            />
                        </div>
                        <div className='flex items-center space-x-3'>
                            <label className='flex items-center space-x-2 text-sm font-medium text-gray-700'>
                                <input
                                    type="checkbox"
                                    checked={formData.isPrincipal}
                                    onChange={(e) => handleInputChange('isPrincipal', e.target.checked)}
                                    className='h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded'
                                />
                                <span>Principal</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Diagnóstico
                        </label>
                        <textarea
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                            rows='4'
                            value={formData.impressionDiagnosis}
                            onChange={(e) => handleInputChange('impressionDiagnosis', e.target.value)}
                            placeholder='Impresión diagnóstica...'
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Observaciones
                        </label>
                        <textarea
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'
                            rows='4'
                            value={formData.impressionObservations}
                            onChange={(e) => handleInputChange('impressionObservations', e.target.value)}
                            placeholder='Observaciones adicionales...'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

ProceduresAndImpression.propTypes = {
  formData: PropTypes.shape({
    procedureCode: PropTypes.string,
    service: PropTypes.string,
    specialty: PropTypes.string,
    quantity: PropTypes.string,
    procedureObservations: PropTypes.string,
    impressionCie10: PropTypes.string,
    impressionDiagnosis: PropTypes.string,
    impressionObservations: PropTypes.string,
    isPrincipal: PropTypes.bool
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired
};

// Principal
const Diagnostics = () => {
  const [diagnoses, setDiagnoses] = useState([
    {
      id: 1,
      name: "Diagnóstico #1",
      type: "Hospitalario",
      date: "2019-03-15",
      description: "El paciente fue ingresado en el Hospital XYZ el 15 de marzo de 2019 debido a un cuadro de dolor abdominal intenso en el lado derecho. Tras realizar los exámenes pertinentes, se diagnosticó apendicitis aguda. Fue sometido a una apendicectomía laparoscópica, que fue exitosa. No se presentaron complicaciones postoperatorias y fue dado de alta al segundo día.",
      cie10: "K35.9",
      symptoms: "Dolor abdominal intenso en fosa ilíaca derecha",
      duration: "24 horas",
      evolution: "Favorable post-cirugía"
    }
  ]);

  const [formData, setFormData] = useState({
    // Anamnesis
    consultReason: '',
    
    // Diagnóstico
    cie10Code: '',
    symptoms: '',
    duration: '',
    evolution: '',
    diagnosisDate: '',
    
    // Signos vitales
    heartRate: '',
    respiratoryRate: '',
    systolicBP: '',
    diastolicBP: '',
    meanBP: '',
    oxygenSaturation: '',
    temperature: '',
    weight: '',
    height: '',
    bmi: '',
    bodySurface: '',
    
    // Hallazgos
    findings: '',
    
    // Análisis y plan
    analysisAndPlan: '',
    diagnosis: '',
    
    // Procedimiento
    procedureCode: '',
    service: '',
    specialty: '',
    quantity: '',
    procedureObservations: '',
    
    // Impresión diagnóstica
    impressionCie10: '',
    impressionDiagnosis: '',
    impressionObservations: '',
    isPrincipal: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateBMI = () => {
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height) / 100; // convert cm to m
    if (weight && height) {
      const bmi = (weight / (height * height)).toFixed(1);
      handleInputChange('bmi', bmi);
    }
  };

  const tabs = [
    { id: 'anamnesis', label: 'Anamnesis' },
    { id: 'diagnosis', label: 'Diagnóstico' },
    { id: 'vitals', label: 'Examen Físico' },
    { id: 'findings', label: 'Hallazgos' },
    { id: 'plan', label: 'Análisis y Plan' },
    { id: 'procedures', label: 'Procedimientos' },
    { id: 'impression', label: 'Impresión Diagnóstica' }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'anamnesis':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivo de consulta y enfermedad actual
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="4"
                value={formData.consultReason}
                onChange={(e) => handleInputChange('consultReason', e.target.value)}
                placeholder="Describa el motivo de consulta y la enfermedad actual del paciente..."
              />
            </div>
          </div>
        );

      case 'diagnosis':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código CIE-10
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.cie10Code}
                  onChange={(e) => handleInputChange('cie10Code', e.target.value)}
                  placeholder="Ej: K35.9"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de diagnóstico
                </label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.diagnosisDate}
                  onChange={(e) => handleInputChange('diagnosisDate', e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción de síntomas
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="3"
                value={formData.symptoms}
                onChange={(e) => handleInputChange('symptoms', e.target.value)}
                placeholder="Describa los síntomas presentados..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duración
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  placeholder="Ej: 3 días"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Evolución
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.evolution}
                  onChange={(e) => handleInputChange('evolution', e.target.value)}
                  placeholder="Ej: Favorable"
                />
              </div>
            </div>
          </div>
        );

      case 'vitals':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">Signos Vitales</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frecuencia cardíaca (lpm)
                </label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.heartRate}
                  onChange={(e) => handleInputChange('heartRate', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frecuencia respiratoria (rpm)
                </label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.respiratoryRate}
                  onChange={(e) => handleInputChange('respiratoryRate', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temperatura (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.temperature}
                  onChange={(e) => handleInputChange('temperature', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  TA Sistólica (mmHg)
                </label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.systolicBP}
                  onChange={(e) => handleInputChange('systolicBP', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  TA Diastólica (mmHg)
                </label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.diastolicBP}
                  onChange={(e) => handleInputChange('diastolicBP', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  TA Media (mmHg)
                </label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.meanBP}
                  onChange={(e) => handleInputChange('meanBP', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pulsioximetría SO2 (%)
                </label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.oxygenSaturation}
                  onChange={(e) => handleInputChange('oxygenSaturation', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peso (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  onBlur={calculateBMI}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Talla (cm)
                </label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  onBlur={calculateBMI}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IMC (kg/m²)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.bmi}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Superficie corporal (m²)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.bodySurface}
                  onChange={(e) => handleInputChange('bodySurface', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 'findings':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hallazgos del examen físico
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="6"
                value={formData.findings}
                onChange={(e) => handleInputChange('findings', e.target.value)}
                placeholder="Describa los hallazgos relevantes del examen físico..."
              />
            </div>
          </div>
        );

      case 'plan':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Análisis y plan de atención
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="4"
                value={formData.analysisAndPlan}
                onChange={(e) => handleInputChange('analysisAndPlan', e.target.value)}
                placeholder="Detalle el análisis clínico y plan de atención..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Diagnóstico
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="3"
                value={formData.diagnosis}
                onChange={(e) => handleInputChange('diagnosis', e.target.value)}
                placeholder="Diagnóstico definitivo o provisional..."
              />
            </div>
          </div>
        );

      case 'procedures':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">Plan de Manejo - Procedimientos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.procedureCode}
                  onChange={(e) => handleInputChange('procedureCode', e.target.value)}
                  placeholder="Código del procedimiento"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Servicio
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.service}
                  onChange={(e) => handleInputChange('service', e.target.value)}
                  placeholder="Servicio médico"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Especialidad
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.specialty}
                  onChange={(e) => handleInputChange('specialty', e.target.value)}
                  placeholder="Especialidad médica"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad
                </label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observaciones
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="3"
                value={formData.procedureObservations}
                onChange={(e) => handleInputChange('procedureObservations', e.target.value)}
                placeholder="Observaciones adicionales del procedimiento..."
              />
            </div>
          </div>
        );

      case 'impression':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Impresión Diagnóstica</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CIE-10
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.impressionCie10}
                  onChange={(e) => handleInputChange('impressionCie10', e.target.value)}
                  placeholder="Código CIE-10"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.isPrincipal}
                    onChange={(e) => handleInputChange('isPrincipal', e.target.checked)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <span>Principal</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Diagnóstico
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="3"
                value={formData.impressionDiagnosis}
                onChange={(e) => handleInputChange('impressionDiagnosis', e.target.value)}
                placeholder="Impresión diagnóstica..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observaciones
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="3"
                value={formData.impressionObservations}
                onChange={(e) => handleInputChange('impressionObservations', e.target.value)}
                placeholder="Observaciones adicionales..."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Registro de Diagnósticos Médicos</h1>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2">
            <Plus size={20} />
            <span>Agregar Diagnóstico</span>
          </button>
        </div>
      </div>

      {/* Fila 1: Anamnesis - Diagnóstico */}
      <AnamnesisAndDiagnostic formData={formData} handleInputChange={handleInputChange} />
      
      {/* Fila 2: Signos Vitales - Hallazgos */}
      <VitalsAndFindings formData={formData} handleInputChange={handleInputChange} calculateBMI={calculateBMI} />
      
      {/* Fila 3: Análisis y Plan */}
      <AnalysisAndPlan formData={formData} handleInputChange={handleInputChange} />
      
      {/* Fila 4: Procedimientos - Impresión Diagnóstica */}
      <ProceduresAndImpression formData={formData} handleInputChange={handleInputChange} />

      {/* Botones de acción */}
      <div className="flex justify-end space-x-3 mt-6 mb-6">
        <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
          <X size={16} />
          <span>Cancelar</span>
        </button>
        <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center space-x-2">
          <Save size={16} />
          <span>Guardar</span>
        </button>
      </div>

      {/* Sección de diagnósticos registrados */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <h3 className="text-lg font-semibold text-gray-800">Diagnósticos Registrados (1)</h3>
        </div>

        {diagnoses.map((diagnosis, index) => (
          <div key={diagnosis.id} className="border rounded-lg p-4 mb-4 bg-gray-50">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <h4 className="font-semibold text-gray-800">{diagnosis.name}</h4>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit size={16} />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Diagnóstico:</span>
                <p className="text-gray-800">{diagnosis.name}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Tipo:</span>
                <p className="text-gray-800">{diagnosis.type}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Fecha de Diagnóstico:</span>
                <p className="text-gray-800">{diagnosis.date}</p>
              </div>
            </div>

            <div className="mt-3">
              <span className="font-medium text-gray-600">Descripción:</span>
              <div className="bg-white border-l-4 border-green-500 p-3 mt-2 rounded">
                <p className="text-gray-700 text-sm leading-relaxed">{diagnosis.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Diagnostics;