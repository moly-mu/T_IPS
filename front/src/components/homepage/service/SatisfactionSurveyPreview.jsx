import { 
  Star, MessageSquare, Clock, Heart, ThumbsUp, ArrowRight, Shield, Mail, Bell, CheckCircle, AlertCircle, Award, Target, Zap } from 'lucide-react';

export default function SatisfactionSurveyPreview() {
  const handleStartSurvey = () => {
    console.log('Iniciando encuesta de satisfacción...');
  };

  const Navbar = () => {
    return (
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-lg z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-gray-800">
              TELECONSULTAS<span className="text-blue-600">IPS</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="/Tins" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                ADMINISTRADOR
              </a>
              <a href="/Pins" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                MÉDICO
              </a>
              <a href="/Sins" className="text-sm font-semibold text-blue-600 border-b-2 border-blue-600 pb-1">
                PACIENTE
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  };

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-white relative overflow-hidden pt-20">
        
        {/* Hero Section con diseño moderno */}
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-800 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-6xl mx-auto px-6 py-24">
            <div className="text-center space-y-8">
              <div className="inline-flex items-center bg-white/20 rounded-full px-6 py-3 text-sm font-medium">
                <Star className="w-5 h-5 mr-2 text-yellow-300" />
                Encuesta de Satisfacción Post-Consulta
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold">
                Tu Experiencia
                <br />
                <span className="text-blue-200">Construye Mejores</span>
                <br />
                Servicios Médicos
              </h1>
              
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Cada opinión que compartes nos ayuda a perfeccionar la atención médica virtual 
                y garantizar la mejor experiencia para todos nuestros pacientes.
              </p>
              
              <button
                onClick={handleStartSurvey}
                className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg text-lg"
              >
                Evaluar Mi Consulta
                <ArrowRight className="w-5 h-5 inline-block ml-2" />
              </button>
            </div>
          </div>
          
          {/* Elementos decorativos */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400/20 rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-indigo-300/30 rounded-full"></div>
        </div>

        {/* Sección de Proceso */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                ¿Cómo Funciona la <span className="text-blue-600">Evaluación</span>?
              </h2>
              <p className="text-xl text-gray-600">Un proceso simple y rápido para capturar tu experiencia</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Consulta Finalizada</h3>
                <p className="text-gray-600 text-sm">Al terminar tu sesión médica, se activa automáticamente el proceso</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Notificación Inmediata</h3>
                <p className="text-gray-600 text-sm">Recibes un email con enlace seguro para acceder a la encuesta</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Evaluación Rápida</h3>
                <p className="text-gray-600 text-sm">Completas una evaluación estructurada de 5 minutos</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Mejora Continua</h3>
                <p className="text-gray-600 text-sm">Tu feedback se convierte en mejoras reales del servicio</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Contenido de la Encuesta */}
        <div className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl font-bold text-gray-900">
                  ¿Qué Evaluamos <span className="text-blue-600">Juntos</span>?
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-6 bg-blue-50 rounded-2xl">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <ThumbsUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Satisfacción General</h3>
                      <p className="text-gray-600">Evalúa tu nivel de satisfacción con la consulta médica recibida y si cumplió tus expectativas.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-6 bg-indigo-50 rounded-2xl">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Calidad del Médico</h3>
                      <p className="text-gray-600">Califica el profesionalismo, claridad en explicaciones, empatía y resolución de dudas del especialista.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-6 bg-blue-50 rounded-2xl">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Experiencia Técnica</h3>
                      <p className="text-gray-600">Valora la calidad de video/audio, facilidad de uso de la plataforma y estabilidad de conexión.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <Star className="w-8 h-8 text-yellow-300" />
                      <h3 className="text-2xl font-bold">Evaluación Activa</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-white/20 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Dr(a). María González</span>
                          <div className="flex space-x-1">
                            {[1,2,3,4,5].map(i => (
                              <Star key={i} className="w-4 h-4 text-yellow-300 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-blue-100 text-sm">Consulta de Cardiología • 25 min</p>
                      </div>
                      
                      <div className="bg-white/10 rounded-xl p-4">
                        <h4 className="font-medium mb-2">Tu opinión sobre:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                            <span>Claridad del diagnóstico</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                            <span>Tiempo dedicado a consulta</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                            <span>Calidad técnica de videollamada</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-300 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-300 rounded-full opacity-30"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Motivación para Participar */}
        <div className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Tu <span className="text-blue-600">Participación</span> Transforma Vidas
              </h2>
              <p className="text-xl text-gray-600">Descubre cómo tu opinión genera cambios reales en la atención médica</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-green-500 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Ayudas a Otros Pacientes</h3>
                </div>
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <div className="text-2xl font-bold text-green-600 mb-1">95%</div>
                  <p className="text-sm text-green-700">de las mejoras implementadas provienen de feedback de pacientes</p>
                </div>
                <p className="text-gray-600">Tu experiencia se convierte en mejores consultas para futuros pacientes como tú.</p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-500 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Solo 5 Minutos</h3>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="text-2xl font-bold text-blue-600 mb-1">⚡</div>
                  <p className="text-sm text-blue-700">Proceso rápido y sencillo desde cualquier dispositivo</p>
                </div>
                <p className="text-gray-600">Una inversión mínima de tiempo que genera un impacto máximo en la calidad del servicio.</p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-purple-500 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Cambios Reales</h3>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 mb-4">
                  <div className="text-2xl font-bold text-purple-600 mb-1">✨</div>
                  <p className="text-sm text-purple-700">Vemos resultados implementados en promedio cada 30 días</p>
                </div>
                <p className="text-gray-600">Cada sugerencia es revisada y las más impactantes se implementan rápidamente.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Impacto Real */}
        <div className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                <span className="text-blue-600">Logros</span> de Nuestros Pacientes
              </h3>
              <p className="text-lg text-gray-600">Cambios reales basados en tu feedback</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">4.8/5</div>
                <p className="text-sm text-gray-600">Satisfacción promedio actual</p>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
                <p className="text-sm text-gray-600">Pacientes recomiendan el servicio</p>
              </div>
              
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="text-3xl font-bold text-purple-600 mb-2">142</div>
                <p className="text-sm text-gray-600">Mejoras implementadas este año</p>
              </div>
              
              <div className="text-center p-6 bg-indigo-50 rounded-xl">
                <div className="text-3xl font-bold text-indigo-600 mb-2">-40%</div>
                <p className="text-sm text-gray-600">Reducción en tiempo de espera</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section con diseño minimalista */}
        <div className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/30 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative">
                <h2 className="text-4xl font-bold mb-6">¿Tu Consulta Terminó?</h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Tu evaluación nos ayuda a seguir mejorando la calidad de atención médica para todos.
                </p>
                
                <button
                  onClick={handleStartSurvey}
                  className="bg-white text-blue-700 px-10 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl text-lg"
                >
                  Completar Encuesta Ahora
                </button>
                
                <div className="flex items-center justify-center space-x-4 text-blue-200 text-sm mt-6">
                  <Shield className="w-4 h-4" />
                  <span>5 minutos</span>
                  <span>•</span>
                  <span>100% Confidencial</span>
                  <span>•</span>
                  <span>Mejora Real</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer informativo */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-blue-800">
                  <h4 className="font-semibold mb-2">Información sobre tu Privacidad</h4>
                  <p className="text-sm leading-relaxed">
                    La encuesta se envía automáticamente tras cada consulta finalizada. Tu participación es voluntaria 
                    y toda la información es tratada confidencialmente. Los datos se utilizan exclusivamente para 
                    mejorar la calidad de nuestros servicios médicos y experiencia de usuario.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}