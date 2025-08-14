import { FileText, User, Stethoscope, Shield,Database, Activity, FileCheck, UserCheck,Clock, BookOpen, Hospital, Phone} from 'lucide-react';
import { Link } from "react-router-dom";

export default function HistoriaClinicaInfo() {
  const handleViewExample = () => {
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
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="relative bg-white">
          <div className="relative max-w-7xl mx-auto px-6 py-20">
              <div className="text-center space-y-8">
                <div className="inline-flex items-center bg-violet-50 rounded-full px-4 py-2 text-sm font-medium text-violet-700 border border-violet-200">
                  <FileText className="w-4 h-4 mr-2" />
                  Documentación Médica Digital
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Historia
                  <br />
                  <span className="text-violet-600">Clínica</span>
                  <br />
                  Digital
                </h1>
                
                <p className="text-xl text-gray-600 max-w-3xl leading-relaxed mx-auto">
                  El registro médico completo y centralizado que documenta toda la información 
                  de salud del paciente, desde datos personales hasta diagnósticos y tratamientos.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleViewExample}
                    className="bg-violet-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-violet-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center">
                    <FileCheck className="w-5 h-5 mr-2" />
                    Ver mi historia clínica
                  </button>
                </div>
              </div>
          </div>
        </div>

        <div className="py-16 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
                <div className="text-gray-600">Historias Clínicas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
                <div className="text-gray-600">Médicos Activos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
                <div className="text-gray-600">Tiempo Activo</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
                <div className="text-gray-600">Soporte</div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Componentes de la <span className="text-violet-600">Historia Clínica</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Estructura completa del expediente médico digital con información organizada y accesible
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Datos Generales</h3>
                <div className="space-y-3 text-sm text-gray-600 mb-6">
                  <div className="flex items-center space-x-3">
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-xs text-blue-700 font-medium">Información personal completa</p>
                </div>
              </div>

              <div className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Antecedentes</h3>
                <div className="space-y-3 text-sm text-gray-600 mb-6">
                </div>
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <p className="text-xs text-purple-700 font-medium">Registro cronológico con fechas (DD/MM/AAAA) de todos los antecedentes médicos</p>
                </div>
              </div>

              <div className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Seguimiento</h3>
                <div className="space-y-3 text-sm text-gray-600 mb-6">
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <p className="text-xs text-emerald-700 font-medium">Documentación completa de cada consulta con evolución del paciente</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Ventajas de la Historia Clínica <span className="text-violet-600">Digital</span>
              </h2>
              <p className="text-xl text-gray-600">Modernizando la documentación médica</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group bg-white rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-violet-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-violet-100 transition-colors">
                  <Shield className="w-8 h-8 text-violet-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Seguridad Total</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Información protegida con estándares internacionales de seguridad</p>
              </div>

              <div className="group bg-white rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-100 transition-colors">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Acceso Inmediato</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Disponible 24/7 desde cualquier dispositivo autorizado</p>
              </div>

              <div className="group bg-white rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-100 transition-colors">
                  <Hospital className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Interoperabilidad</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Compatible con diferentes sistemas de salud</p>
              </div>

              <div className="group bg-white rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-100 transition-colors">
                  <UserCheck className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Continuidad</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Seguimiento completo de la evolución del paciente</p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-gradient-to-br from-violet-600 via-violet-700 to-purple-700 rounded-3xl p-12 text-white text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-violet-400/30 rounded-full translate-x-16 translate-y-16"></div>
              <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400/20 rounded-full"></div>
              
              <div className="relative">
                <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <Stethoscope className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-4xl font-bold mb-6">¿Tienes Preguntas?</h2>
                <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Nuestro equipo está disponible para aclarar cualquier duda sobre tu historia clínica digital
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={handleViewExample}
                    className="bg-violet-500 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-violet-400 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center border-2 border-white/20">
                    <Phone className="w-5 h-5 mr-2" />
                    Contactar
                  </button>
                </div>
                
                <div className="flex items-center justify-center space-x-6 text-violet-200 text-sm mt-8">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Confidencial</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4" />
                    <span>Respaldo Automático</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-2">
                    <UserCheck className="w-4 h-4" />
                    <span>Acceso Controlado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}