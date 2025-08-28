import { useState } from 'react';
import { Save, X } from 'lucide-react';

// Componente 1: Anamnesis y Diagnóstico
const AnamnesisAndDiagnostic = () => {
    const [formData, setFormData] = useState({
        consultReason: '', 
        cie10Code: '',
        symptoms: '',
        duration: '',
        evolution: '',
        diagnosisDate: '',
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

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
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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

// Componente 2: Signos Vitales y Hallazgos
const VitalsAndFindings = () => {
    const [formData, setFormData] = useState({
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
        findings: '',
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const calculateBMI = () => {
        const weight = parseFloat(formData.weight);
        const height = parseFloat(formData.height) / 100;
        if (weight && height) {
            const bmi = (weight / (height * height)).toFixed(1);
            handleInputChange('bmi', bmi);
        }
    };

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
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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
                                className='w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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

// Componente 3: Análisis y Plan (Solo)
const AnalysisAndPlan = () => {
    const [formData, setFormData] = useState({
        analysisAndPlan: '',
        diagnosis: '',
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

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
                        className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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
                        className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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

// Componente 4: Procedimientos e Impresión Diagnóstica
const ProceduresAndImpression = () => {
    const [formData, setFormData] = useState({
        procedureCode: '',
        service: '',
        specialty: '',
        quantity: '',
        procedureObservations: '',
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
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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
                                    className='h-4 w-4 text-[#2F079D] focus:ring-[#2F079D] border-gray-300 rounded'
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
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D] transition-colors'
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

// Componente Principal que integra todos
const MedicalRecord = () => {
    return (
        <div className='max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen'>
            <div className='bg-white rounded-lg shadow-sm mb-6 p-6'>
                <div className='flex justify-between items-center mb-4'>
                    <h1 className='text-2xl font-bold text-gray-800'>Registro de Diagnósticos Médicos</h1>
                </div>
            </div>

            {/* Fila 1: Anamnesis - Diagnóstico */}
            <AnamnesisAndDiagnostic />
            
            {/* Fila 2: Signos Vitales - Hallazgos */}
            <VitalsAndFindings />
            
            {/* Fila 3: Análisis y Plan */}
            <AnalysisAndPlan />
            
            {/* Fila 4: Procedimientos - Impresión Diagnóstica */}
            <ProceduresAndImpression />

            {/* Botones de acción */}
            <div className='flex justify-end space-x-3 mt-6'>
                <button className='px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center space-x-2 transition-colors'>
                    <X size={16} />
                    <span>Cancelar</span>
                </button>
                <button className='px-6 py-3 bg-[#2F079D] text-white rounded-md hover:bg-[#2F079D]/90 flex items-center space-x-2 transition-colors'>
                    <Save size={16} />
                    <span>Guardar</span>
                </button>
            </div>
        </div>
    );
};

export default MedicalRecord;