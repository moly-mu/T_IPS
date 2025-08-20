import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import axios from '../../../api/axios';


  const Navbar = () => {
    return (
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-light tracking-wide text-gray-900">
              TELECONSULTAS<span className="font-medium">IPS</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-12">
              <a href="/Tins" className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors tracking-wide">
                ADMINISTRADOR
              </a>
              <a href="/Sins" className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors tracking-wide">
                PACIENTE
              </a>
              <a href="/Pins" className="text-sm font-medium text-gray-900 border-b border-gray-900 pb-1 tracking-wide">
                INICIAR SESIÓN
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  };


const TeleconsultaSurvey = () => {
  const location = useLocation();
  const appointmentId = location.state?.appointmentId || 1; // Usar el ID desde el state o valor por defecto
  
  const [currentSection, setCurrentSection] = useState(0);
  const [ratings, setRatings] = useState({});
  const [hoverRatings, setHoverRatings] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [comment, setComment] = useState('');


const sections = [
  {
    id: 'specialist',
    title: 'Atención del especialista',
    question: '¿El médico respondió adecuadamente a sus preguntas y preocupaciones?',
    subtitle: 'Califique su nivel de satisfacción de 1 a 5 estrellas',
  },
  {
    id: 'diagnosis',
    title: 'Claridad del diagnóstico',
    question: '¿La explicación del diagnóstico y tratamiento fue clara y comprensible?',
    subtitle: 'Califique la claridad médica de 1 a 5 estrellas',
  },
  {
    id: 'technical',
    title: 'Calidad técnica',
    question: '¿La calidad del audio y video fue adecuada durante la consulta?',
    subtitle: 'Evalúe la conexión técnica de 1 a 5 estrellas',
  },
  {
    id: 'overall',
    title: 'Satisfacción general',
    question: 'En general, ¿cómo evalúa su experiencia con esta consulta médica en línea?',
    subtitle: 'Califique su satisfacción global de 1 a 5 estrellas',
  },
];




  const handleStarClick = (sectionId, rating) => {
    setRatings(prev => ({
      ...prev,
      [sectionId]: rating,
    }));
  };


  const handleStarHover = (sectionId, rating) => {
    setHoverRatings(prev => ({
      ...prev,
      [sectionId]: rating,
    }));
  };


  const handleStarLeave = (sectionId) => {
    setHoverRatings(prev => ({
      ...prev,
      [sectionId]: null,
    }));
  };


  const renderStars = (sectionId) => {
    const currentRating = ratings[sectionId] || 0;
    const hoverRating = hoverRatings[sectionId];


    return (
      <div className="flex justify-center space-x-1 my-8">
        {[1, 2, 3, 4, 5].map((star) => {
          const isActive = hoverRating ? star <= hoverRating : star <= currentRating;
          return (
            <button
              key={star}
              onClick={() => handleStarClick(sectionId, star)}
              onMouseEnter={() => handleStarHover(sectionId, star)}
              onMouseLeave={() => handleStarLeave(sectionId)}
              className="transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded"
            >
              <Star
                size={40}
                className={`transition-colors duration-200 ${
                  isActive
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300 hover:text-yellow-300'
                }`}
              />
            </button>
          );
        })}
      </div>
    );
  };


  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };


  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };


  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setSubmitMessage('');

      // Preparar los datos según las 4 secciones
      const reviewData = {
        appointmentId,
        q1: ratings.specialist || 0,
        q2: ratings.diagnosis || 0,
        q3: ratings.technical || 0,
        q4: ratings.overall || 0,
        comment: comment || null
      };

      // Obtener token del localStorage (ajusta según tu implementación de auth)
      
      const response = await axios.post(
        'http:localhost:3000/api/User/Reviews/PostAppointment', // Usando la ruta relativa ya que axios está configurado con baseURL
        reviewData
      );

      if (response.status === 201) {
        setSubmitMessage('¡Reseña enviada exitosamente!');
        console.log('Respuesta del servidor:', response.data);
        
        // Opcional: redirigir o mostrar mensaje de éxito
        setTimeout(() => {
          // Aquí puedes agregar lógica para redirigir o cerrar el modal
          window.history.back(); // O usar navigate si tienes react-router
        }, 2000);
      }
    } catch (error) {
      console.error('Error al enviar la reseña:', error);
      if (error.response) {
        setSubmitMessage(`Error: ${error.response.data.error || 'No se pudo enviar la reseña'}`);
      } else {
        setSubmitMessage('Error de conexión. Inténtalo de nuevo.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  const isCurrentSectionRated = ratings[sections[currentSection].id];
  const allSectionsRated = sections.every(section => ratings[section.id]);


  return (
    <>
    <Navbar />
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 min-h-[500px] mt-56">
      {/* Encabezado */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {sections[currentSection].title}
        </h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
      </div>


      {/* indicador de progreso */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-2">
          {sections.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentSection
                  ? 'bg-[#4157b3]'
                  : index < currentSection
                  ? 'bg-[#021873]'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>


      {/* Pregunta */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {sections[currentSection].question}
        </h2>
        <p className="text-gray-600 text-sm">
          {sections[currentSection].subtitle}
        </p>
      </div>


      {/* Estrellas */}
      {renderStars(sections[currentSection].id)}


      {/* Etiquetas de puntuacion */}
      <div className="flex justify-between text-sm mb-8 px-4">
        <span className="text-[#931e1e]">Muy insatisfecho</span>
        <span className="text-[#00a512]">Muy satisfecho</span>
      </div>

      {/* Campo de comentario en la última sección */}
      {currentSection === sections.length - 1 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comentarios adicionales (opcional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={4}
            placeholder="Comparte tu experiencia y sugerencias..."
            maxLength={500}
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {comment.length}/500 caracteres
          </div>
        </div>
      )}

      {/* Mensaje de estado */}
      {submitMessage && (
        <div className={`mb-4 p-3 rounded-lg text-center ${
          submitMessage.includes('Error') 
            ? 'bg-red-100 text-red-700 border border-red-300' 
            : 'bg-green-100 text-green-700 border border-green-300'
        }`}>
          {submitMessage}
        </div>
      )}


      {/* Navegacion */}
      <div className="flex justify-between items-center">
        <button
          onClick={prevSection}
          disabled={currentSection === 0}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
            currentSection === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-blue-600 hover:bg-blue-50'
          }`}
        >
          <ChevronLeft size={20} className="mr-1" />
          Atrás
        </button>


        <span className="text-sm text-gray-500">
          Sección {currentSection + 1} de {sections.length}
        </span>


        {currentSection < sections.length - 1 ? (
          <button
            onClick={nextSection}
            disabled={!isCurrentSectionRated}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
              !isCurrentSectionRated
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-blue-50'
            }`}
          >
            Siguiente
            <ChevronRight size={20} className="ml-1" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!allSectionsRated || isSubmitting}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200 ${
              !allSectionsRated || isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-900 text-white hover:bg-gray-700'
            }`}
          >
            {isSubmitting ? 'Enviando...' : 'Finalizar'}
          </button>
        )}
      </div>


      {/* Visualizacion puntuacio actual */}
      {isCurrentSectionRated && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Su calificación: {ratings[sections[currentSection].id]} estrella{ratings[sections[currentSection].id] > 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
    </>
  );
};


export default TeleconsultaSurvey;


