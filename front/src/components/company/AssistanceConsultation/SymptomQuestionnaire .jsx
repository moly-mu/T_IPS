import { useState } from 'react';
import { AlertCircle, Heart, Thermometer, Activity, User, CheckCircle, XCircle, Info } from 'lucide-react';
import PropTypes from 'prop-types';

const SymptomQuestionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    personalInfo: {
      age: '',
      gender: '',
      weight: '',
      height: ''
    },
    symptoms: {
      mainSymptom: '',
      duration: '',
      intensity: '',
      additionalSymptoms: []
    },
    medicalHistory: {
      chronicConditions: [],
      medications: '',
      allergies: '',
      recentSurgery: false
    },
    vitals: {
      temperature: '',
      bloodPressure: '',
      heartRate: ''
    }
  });
  
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const AlertComponent = ({ type, title, children, icon: Icon }) => {
    const alertStyles = {
      emergency: 'bg-red-50 border-red-200 text-red-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      success: 'bg-green-50 border-green-200 text-green-800'
    };

    const iconStyles = {
      emergency: 'text-red-500',
      warning: 'text-yellow-500',
      info: 'text-blue-500',
      success: 'text-green-500'
    };

    return (
      <div className={`p-4 rounded-lg border-2 ${alertStyles[type]} backdrop-blur-sm`}>
        <div className="flex items-start space-x-3">
          <Icon className={`w-5 h-5 mt-0.5 ${iconStyles[type]}`} />
          <div>
            <div className="font-semibold text-sm mb-1">{title}</div>
            <div className="text-sm">{children}</div>
          </div>
        </div>
      </div>
    );
  };

    AlertComponent.propTypes = {
    type: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    icon: PropTypes.elementType
    };

  const symptoms = [
    'Dolor de cabeza', 'Fiebre', 'Dolor de garganta', 'Tos', 'Dolor abdominal',
    'Náuseas', 'Mareos', 'Dolor en el pecho', 'Dificultad respiratoria',
    'Dolor muscular', 'Fatiga', 'Dolor articular'
  ];

  const chronicConditions = [
    'Diabetes', 'Hipertensión', 'Asma', 'Enfermedad cardíaca',
    'Artritis', 'Depresión', 'Ansiedad', 'Ninguna'
  ];

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].includes(value)
          ? prev[section][field].filter(item => item !== value)
          : [...prev[section][field], value]
      }
    }));
  };

  const calculateUrgency = () => {
    const { symptoms, vitals, medicalHistory } = formData;
    let urgencyScore = 0;
    let urgencyLevel = 'BAJA';
    let color = 'success';
    let recommendations = [];

    // Síntomas de alta urgencia
    if (symptoms.additionalSymptoms.includes('Dolor en el pecho') || 
        symptoms.additionalSymptoms.includes('Dificultad respiratoria')) {
      urgencyScore += 30;
      recommendations.push('Buscar atención médica inmediata');
    }

    // Intensidad del síntoma
    if (symptoms.intensity === 'Severo') urgencyScore += 20;
    else if (symptoms.intensity === 'Moderado') urgencyScore += 10;

    // Temperatura
    if (parseFloat(vitals.temperature) > 38.5) urgencyScore += 15;

    // Condiciones crónicas
    if (medicalHistory.chronicConditions.includes('Diabetes') || 
        medicalHistory.chronicConditions.includes('Enfermedad cardíaca')) {
      urgencyScore += 10;
    }

    // Determinar nivel de urgencia
    if (urgencyScore >= 30) {
      urgencyLevel = 'ALTA';
      color = 'emergency';
      recommendations.unshift('🚨 Acudir inmediatamente a emergencias');
      recommendations.push('No conducir, llamar ambulancia si es necesario');
    } else if (urgencyScore >= 15) {
      urgencyLevel = 'MEDIA';
      color = 'warning';
      recommendations.unshift('⚠️ Consultar con médico dentro de 24 horas');
      recommendations.push('Monitorear síntomas de cerca');
    } else {
      recommendations.unshift('✅ Cuidados en casa y seguimiento');
      recommendations.push('Contactar médico si los síntomas empeoran');
    }

    // Recomendaciones generales
    recommendations.push('Mantener hidratación adecuada');
    recommendations.push('Descansar y evitar actividad física intensa');
    
    if (symptoms.additionalSymptoms.includes('Fiebre')) {
      recommendations.push('Tomar paracetamol según indicaciones');
    }

    return { urgencyLevel, color, recommendations, score: urgencyScore };
  };

  const handleSubmit = () => {
    const evaluation = calculateUrgency();
    setResult(evaluation);
    setShowResult(true);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const steps = [
    { title: 'Información Personal', icon: User },
    { title: 'Síntomas', icon: AlertCircle },
    { title: 'Historial Médico', icon: Heart },
    { title: 'Signos Vitales', icon: Activity }
  ];

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Evaluación Completada</h1>
              <p className="text-gray-600">Resultados de tu cuestionario de síntomas</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Nivel de Urgencia</h3>
                <div className={`inline-flex items-center px-4 py-2 rounded-full font-bold text-sm ${
                  result.color === 'emergency' ? 'bg-red-100 text-red-800' :
                  result.color === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {result.urgencyLevel}
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Puntuación: {result.score}/50
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Síntoma Principal</h3>
                <p className="text-gray-700">{formData.symptoms.mainSymptom}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Duración: {formData.symptoms.duration} | Intensidad: {formData.symptoms.intensity}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <AlertComponent 
                type={result.color} 
                title="Recomendaciones Médicas"
                icon={result.color === 'emergency' ? XCircle : result.color === 'warning' ? AlertCircle : Info}
              >
                <ul className="space-y-2 mt-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-xs mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </AlertComponent>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">⚠️ Disclaimer Médico</h3>
              <p className="text-sm text-blue-700 leading-relaxed">
                Esta evaluación es solo orientativa y no reemplaza la consulta médica profesional. 
                Siempre consulte con un profesional de la salud para un diagnóstico preciso y tratamiento adecuado.
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setShowResult(false);
                  setCurrentStep(0);
                  setFormData({
                    personalInfo: { age: '', gender: '', weight: '', height: '' },
                    symptoms: { mainSymptom: '', duration: '', intensity: '', additionalSymptoms: [] },
                    medicalHistory: { chronicConditions: [], medications: '', allergies: '', recentSurgery: false },
                    vitals: { temperature: '', bloodPressure: '', heartRate: '' }
                  });
                }}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium">
                Realizar Nueva Evaluación
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Thermometer className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Cuestionario de Síntomas</h1>
            <p className="text-gray-600">Evaluación médica preliminar personalizada</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                        index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Paso {currentStep + 1} de {steps.length}: {steps[currentStep].title}
              </span>
            </div>
          </div>

          {/* Form Content */}
          <div className="mb-8">
            {currentStep === 0 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Información Personal</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Edad</label>
                    <input
                      type="number"
                      value={formData.personalInfo.age}
                      onChange={(e) => handleInputChange('personalInfo', 'age', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Ej: 25"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Género</label>
                    <select
                      value={formData.personalInfo.gender}
                      onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    >
                      <option value="">Seleccionar</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Peso (kg)</label>
                    <input
                      type="number"
                      value={formData.personalInfo.weight}
                      onChange={(e) => handleInputChange('personalInfo', 'weight', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Ej: 70"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Altura (cm)</label>
                    <input
                      type="number"
                      value={formData.personalInfo.height}
                      onChange={(e) => handleInputChange('personalInfo', 'height', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Ej: 170"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Síntomas Actuales</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Síntoma Principal</label>
                  <input
                    type="text"
                    value={formData.symptoms.mainSymptom}
                    onChange={(e) => handleInputChange('symptoms', 'mainSymptom', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Describe tu síntoma principal"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duración</label>
                    <select
                      value={formData.symptoms.duration}
                      onChange={(e) => handleInputChange('symptoms', 'duration', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    >
                      <option value="">Seleccionar</option>
                      <option value="Menos de 1 día">Menos de 1 día</option>
                      <option value="1-3 días">1-3 días</option>
                      <option value="4-7 días">4-7 días</option>
                      <option value="Más de 1 semana">Más de 1 semana</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Intensidad</label>
                    <select
                      value={formData.symptoms.intensity}
                      onChange={(e) => handleInputChange('symptoms', 'intensity', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    >
                      <option value="">Seleccionar</option>
                      <option value="Leve">Leve</option>
                      <option value="Moderado">Moderado</option>
                      <option value="Severo">Severo</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Síntomas Adicionales</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {symptoms.map((symptom) => (
                      <label key={symptom} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.symptoms.additionalSymptoms.includes(symptom)}
                          onChange={() => handleArrayChange('symptoms', 'additionalSymptoms', symptom)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{symptom}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Historial Médico</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Condiciones Crónicas</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {chronicConditions.map((condition) => (
                      <label key={condition} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.medicalHistory.chronicConditions.includes(condition)}
                          onChange={() => handleArrayChange('medicalHistory', 'chronicConditions', condition)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{condition}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Medicamentos Actuales</label>
                  <textarea
                    value={formData.medicalHistory.medications}
                    onChange={(e) => handleInputChange('medicalHistory', 'medications', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all h-24"
                    placeholder="Lista tus medicamentos actuales"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alergias</label>
                  <input
                    type="text"
                    value={formData.medicalHistory.allergies}
                    onChange={(e) => handleInputChange('medicalHistory', 'allergies', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Menciona alergias conocidas"
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Signos Vitales</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Temperatura (°C)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.vitals.temperature}
                      onChange={(e) => handleInputChange('vitals', 'temperature', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Ej: 36.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Presión Arterial</label>
                    <input
                      type="text"
                      value={formData.vitals.bloodPressure}
                      onChange={(e) => handleInputChange('vitals', 'bloodPressure', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Ej: 120/80"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Frecuencia Cardíaca</label>
                    <input
                      type="number"
                      value={formData.vitals.heartRate}
                      onChange={(e) => handleInputChange('vitals', 'heartRate', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Ej: 72"
                    />
                  </div>
                </div>
                
                <AlertComponent type="info" title="Información Importante" icon={Info}>
                  Si no tienes acceso a un termómetro o tensiómetro, puedes dejar estos campos vacíos. 
                  La evaluación se basará en la información de síntomas disponible.
                </AlertComponent>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                currentStep === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Anterior
            </button>
            
            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium"
              >
                Siguiente
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-medium flex items-center space-x-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Obtener Evaluación</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomQuestionnaire;

