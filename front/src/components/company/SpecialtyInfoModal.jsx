
import PropTypes from 'prop-types';

const SpecialtyInfoModal = ({ specialty, onClose }) => {
  const getSpecialtyInfo = () => {
    switch (specialty) {
      case 'Medicina General':
        return {
          description: 'La medicina general es la primera línea de atención médica que se centra en el cuidado integral del paciente. Los médicos generales están capacitados para diagnosticar y tratar una amplia variedad de condiciones médicas, así como para coordinar la atención con especialistas cuando sea necesario.',
          commonConditions: [
            'Resfriados y gripes',
            'Infecciones menores',
            'Control de presión arterial',
            'Chequeos generales',
            'Vacunación'
          ]
        };
      case 'Ortopedia':
        return {
          description: 'La ortopedia es la especialidad médica que se dedica al diagnóstico, tratamiento, rehabilitación y prevención de lesiones y enfermedades del sistema musculoesquelético, que incluye huesos, articulaciones, ligamentos, tendones, músculos y nervios.',
          commonConditions: [
            'Fracturas óseas',
            'Artritis',
            'Lesiones deportivas',
            'Dolor de espalda',
            'Problemas de postura'
          ]
        };
      case 'Psicología':
        return {
          description: 'La psicología es la ciencia que estudia los procesos mentales, las sensaciones, las percepciones y el comportamiento del ser humano, en relación con el medio ambiente físico y social que lo rodea. Los psicólogos ayudan a las personas a manejar problemas de salud mental, estrés, ansiedad y otros desafíos emocionales.',
          commonConditions: [
            'Ansiedad y depresión',
            'Estrés',
            'Problemas de relación',
            'Trastornos del estado de ánimo',
            'Problemas de adaptación'
          ]
        };
      case 'Nutrición':
        return {
          description: 'La nutrición es la ciencia que estudia los procesos fisiológicos y metabólicos que ocurren en el organismo con la ingesta de alimentos. Los nutricionistas ayudan a las personas a mejorar sus hábitos alimenticios para alcanzar objetivos específicos de salud, pérdida de peso o manejo de condiciones médicas.',
          commonConditions: [
            'Obesidad y sobrepeso',
            'Diabetes',
            'Enfermedades cardiovasculares',
            'Trastornos alimenticios',
            'Intolerancias alimentarias'
          ]
        };
      case 'Medicina Alternativa':
        return {
          description: 'La medicina alternativa incluye diversas prácticas terapéuticas que no forman parte de los métodos convencionales de la medicina occidental. Estas pueden incluir acupuntura, homeopatía, medicina herbal, quiropráctica y otras terapias complementarias.',
          commonConditions: [
            'Dolor crónico',
            'Estrés y ansiedad',
            'Problemas digestivos',
            'Alergias',
            'Problemas de sueño'
          ]
        };
      default:
        return {
          description: 'Información no disponible para esta especialidad.',
          commonConditions: []
        };
    }
  };

  const info = getSpecialtyInfo();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{specialty}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h3>
            <p className="text-gray-600">{info.description}</p>
          </div>
          
          {info.commonConditions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Condiciones comunes</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {info.commonConditions.map((condition, index) => (
                  <li key={index}>{condition}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-6">
            <button
              onClick={onClose}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

SpecialtyInfoModal.propTypes = {
  specialty: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default SpecialtyInfoModal;