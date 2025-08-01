import { Thermometer, User, Clock, Heart, Activity, CheckCircle, ArrowRight, Shield, Brain, Sparkles, AlertTriangle } from 'lucide-react';
import { Link } from "react-router-dom";

export default function DiagnosticPreview() {
  const handleStartDiagnostic = () => {
    window.location.href = '/Sins';
  };

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
              <a href="/Pins" className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors tracking-wide">
                MÉDICO
              </a>
              <a href="/Sreg" className="text-sm font-medium text-gray-900 border-b border-gray-900 pb-1 tracking-wide">
                REGISTRARME
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 relative overflow-hidden mt-8">
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-orange-200/60 via-amber-200/40 to-yellow-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 left-10 w-32 h-32 bg-gradient-to-br from-purple-200/50 to-pink-200/30 rounded-full blur-2xl"></div>
      <div className="absolute bottom-40 right-40 w-48 h-48 bg-gradient-to-br from-blue-200/40 to-cyan-200/30 rounded-full blur-3xl"></div>
      

      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="relative bg-white">
          <div className="relative max-w-6xl mx-auto px-6 py-24">
            <div className="text-center space-y-8">
              <div className="inline-flex items-center space-x-3 backdrop-blur-md bg-white/20 border border-white/30 px-6 py-3 rounded-full shadow-lg">
                <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Evaluación Médica Previa</span>
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              </div>
              
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-gray-900">Evaluación</span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500 bg-clip-text text-transparent">Médica</span>
                  <br />
                  <span className="text-gray-900">Previa</span>
                  <br />
                </h1>
              </div>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto lfont-light leading-relaxed">
                Cuestionario médico opcional antes de cada consulta. Basado en protocolos médicos establecidos para determinar la especialidad adecuada y nivel de urgencia.
              </p>

            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-center space-x-12">
          <button className="text-gray-400 hover:text-gray-600 font-medium transition-colors">Cuestionario</button>
          <button className="text-gray-900 font-semibold border-b-2 border-orange-400 pb-2">Evaluación</button>
          <button className="text-gray-400 hover:text-gray-600 font-medium transition-colors">Derivación</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Tu <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Información</span> Define Tu Atención.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cada respuesta en nuestro cuestionario médico nos ayuda a informale a tu especialista antes de la consulta tus sintomas y el nivel de urgencia apropiado.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="group cursor-pointer">
            <div className="backdrop-blur-xl bg-gradient-to-br from-[#FFC5B8] via-cyan-[#FFC5B8] to-[#FFC5B8] border border-white/20 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D12600] to-[#D12600] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Thermometer className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Registro de Síntomas</h3>
              <p className="text-gray-600 mb-6">Describe tu motivo de consulta, síntomas específicos, intensidad del dolor, duración y frecuencia para una evaluación precisa.</p>
              
              <ArrowRight className="w-6 h-6 text-[#D12600] group-hover:translate-x-2 transition-transform" />
            </div>
          </div>

          <div className="group cursor-pointer">
            <div className="backdrop-blur-xl bg-[#FFE3D1] border border-white/20 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#F55E00] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Clasificación Médica</h3>
              <p className="text-gray-600 mb-6">Sistema basado en protocolos médicos que determina la especialidad más adecuada según tus síntomas.</p>
              
              <ArrowRight className="w-6 h-6 text-[#F55E00] group-hover:translate-x-2 transition-transform" />
            </div>
          </div>

          <div className="group cursor-pointer">
            <div className="backdrop-blur-xl bg-[#FFF4DB] border border-white/20 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#FAAF00] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Activity className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Derivación Inteligente</h3>
              <p className="text-gray-600 mb-6">Te conectamos automáticamente con el especialista correcto y establecemos el nivel de urgencia apropiado.</p>
              
              <ArrowRight className="w-6 h-6 text-[#FAAF00] group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="group cursor-pointer">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Cuestionario Opcional: Rápido y Preciso.
                  <ArrowRight className="w-6 h-6 inline-block ml-2 group-hover:translate-x-2 transition-transform" />
                </h3>
                <p className="text-gray-600">Completar este formulario es opcional antes de agendar cualquier consulta. Nos ayuda a garantizar que recibas la atención médica adecuada.</p>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Protocolos Médicos Certificados.
                  <ArrowRight className="w-6 h-6 inline-block ml-2 group-hover:translate-x-2 transition-transform" />
                </h3>
                <p className="text-gray-600">Nuestro sistema utiliza reglas médicas establecidas y validadas por profesionales para clasificar síntomas y determinar prioridades.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="backdrop-blur-xl bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-purple-500/20 border border-white/30 rounded-3xl p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-300/30 via-pink-300/30 to-purple-400/30 rounded-3xl blur-2xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Triage Médico Profesional.</h3>
                <p className="text-gray-600 mb-8">Nuestro sistema de clasificación médica te conecta con el especialista correcto desde el primer momento.</p>

                <div className="space-y-4 text-left">
                  <div className="flex items-center space-x-3">
                    <ArrowRight className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-700">Sistema Basado en Reglas</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">Utiliza algoritmos médicos establecidos para clasificar síntomas, determinar especialidades y establecer niveles de urgencia sin depender de inteligencia artificial.</p>
                  
                  <div className="flex items-center space-x-3 pt-4">
                    <ArrowRight className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-700">Evaluación opcional Pre-Consulta.</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">Todos los pacientes deben completar este cuestionario antes de poder agendar cualquier cita médica, garantizando una atención apropiada y eficiente.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="backdrop-blur-xl bg-gradient-to-br from-orange-400/10 via-amber-400/10 to-yellow-500/10 border border-white/30 rounded-3xl p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-40 h-40 bg-gradient-to-br from-orange-300/30 to-amber-400/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-gradient-to-br from-yellow-300/30 to-orange-400/30 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">¿Listo Para Comenzar Tu Evaluación?</h3>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Completa nuestro cuestionario médico opcional puede ayudarte a saber que tipo de meédico requieres y recibir la atención especializada que necesitas.
            </p>
            
            <button
              onClick={handleStartDiagnostic}
              className="bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500 text-white px-12 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 transform text-lg">
              Completar Cuestionario Médico
            </button>
            
            <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm mt-6">
              <AlertTriangle className="w-4 h-4" />
              <span>Opcional • Seguro • Clasificación Inmediata</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="backdrop-blur-md bg-amber-50/80 border border-amber-200/50 rounded-2xl p-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Información Importante</p>
              <p>Este cuestionario médico es opcionals para todos los pacientes antes de agendar consultas. La información proporcionada se utiliza únicamente para fines de triage médico y derivación apropiada. Para emergencias médicas, dirígete inmediatamente al servicio de urgencias más cercano.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}