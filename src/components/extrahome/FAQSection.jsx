import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Mail, MessageCircle } from 'lucide-react';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: ''
  });

  const faqs = [
    {
      id: 1,
      question: "¿Cómo puedo agendar una consulta médica virtual?",
      answer: "Para agendar una consulta, haz clic en 'AGENDAR CONSULTA' en la página principal. Selecciona tu especialidad médica preferida, elige fecha y hora disponible, y completa tus datos personales. Recibirás una confirmación por email con el enlace de la videoconsulta."
    },
    {
      id: 2,
      question: "¿Qué métodos de pago aceptan?",
      answer: "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencias bancarias nacionales, PSE y pagos digitales como Nequi y Daviplata. Todas las transacciones están protegidas con encriptación SSL."
    },
    {
      id: 3,
      question: "¿Los médicos están certificados?",
      answer: "Sí, todos nuestros médicos cuentan con certificación del Ministerio de Salud y tienen amplia experiencia en sus especialidades. Puedes ver los perfiles y certificaciones de cada especialista en la sección 'Ver Perfiles'."
    },
    {
      id: 4,
      question: "¿Puedo cancelar o reprogramar mi cita?",
      answer: "Sí, puedes cancelar o reprogramar tu cita hasta 2 horas antes del horario programado sin costo adicional. Para cambios con menos tiempo, se aplicará una tarifa de reprogramación del 20% del valor de la consulta."
    },
    {
      id: 5,
      question: "¿Qué necesito para la consulta virtual?",
      answer: "Necesitas una conexión estable a internet, dispositivo con cámara y micrófono (computador, tablet o celular), y tener instalada la aplicación recomendada o acceso a navegador web actualizado."
    },
    {
      id: 6,
      question: "¿Entregan certificados médicos?",
      answer: "Sí, después de la consulta recibirás todos los documentos médicos necesarios: historia clínica digital, recetas médicas con firma electrónica, certificados de incapacidad si aplica, y recomendaciones de tratamiento."
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar la pregunta
    alert('¡Gracias por tu pregunta! Te responderemos pronto por email.');
    setFormData({ name: '', email: '', question: '' });
    setShowQuestionForm(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-light text-gray-800">TELECONSULTAS<span className="font-semibold">IPS</span></h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-500 hover:text-gray-700 font-light">ADMINISTRADOR</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 font-light">MÉDICO</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 font-light">PACIENTE</a>
              <a href="#" className="text-gray-800 font-medium border-b-2 border-gray-800 pb-4">SERVICIOS</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">SOPORTE Y AYUDA</p>
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            PREGUNTAS
            <br />
            <span className="font-semibold">FRECUENTES</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Encuentra respuestas rápidas a las consultas más comunes sobre nuestros servicios de telemedicina
          </p>
        </div>

        {/* Search Bar with Question Button */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar preguntas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowQuestionForm(true)}
              className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <MessageCircle className="w-5 h-5" />
              Hacer Pregunta
            </button>
          </div>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-medium text-gray-900 pr-4">{faq.question}</h3>
                {openFAQ === faq.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openFAQ === faq.id && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron preguntas que coincidan con tu búsqueda.</p>
          </div>
        )}

        {/* Question Form Modal */}
        {showQuestionForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Hacer una Pregunta</h3>
                  <button
                    onClick={() => setShowQuestionForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tu pregunta
                    </label>
                    <textarea
                      name="question"
                      value={formData.question}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Escribe tu pregunta aquí..."
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowQuestionForm(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      onClick={handleFormSubmit}
                      className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQSection;