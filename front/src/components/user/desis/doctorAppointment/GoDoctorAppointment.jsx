import { Calendar, Clock, User, Phone, Mail, MapPin, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gray-50 border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-8 py-8">
      <div className="text-center text-sm text-gray-600">
        © 2025 TeleconsultasIPS. Todos los derechos reservados.
      </div>
    </div>
  </footer>
);

const GoDoctorAppointment = () => {
  const navigate = useNavigate();
  const patientData = {
    nombre: "Ana Martínez",
    edad: "29 años",
    identificacion: "1.098.765.432",
    telefono: "+57 320 555 7890",
    email: "ana.martinez@email.com",
    direccion: "Avenida 68 #89-12, Bogotá",
    especialidad: "Ortopedia",
    fecha: "viernes, 13 de junio de 2025",
    hora: "14:00",
    historialMedico: "Dermatitis atópica, control periódico"
  };

  const handleIniciarConsulta = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-light tracking-wide text-gray-900">
              TELECONSULTAS<span className="font-medium">IPS</span>
            </a>
            
            <div className="hidden md:flex items-center space-x-12">
              <a href="/" className="text-sm font-medium text-gray-900 border-b border-gray-900 pb-1 tracking-wide">
                CERRAR SESIÓN
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* datos del Paciente */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="border-b border-gray-100 p-6">
                  <h2 className="text-xl font-light text-gray-900 tracking-wide flex items-center">
                    <User className="w-5 h-5 mr-3" />
                    DETALLES DEL PACIENTE
                  </h2>
                </div>
                
                <div className="p-6">
                  {/* información personal */}
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-900 mb-4 tracking-wide">
                      INFORMACIÓN PERSONAL
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs text-gray-500 tracking-wide">NOMBRE COMPLETO</label>
                        <p className="text-sm text-gray-900 mt-1">{patientData.nombre}</p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 tracking-wide">EDAD</label>
                        <p className="text-sm text-gray-900 mt-1">{patientData.edad}</p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 tracking-wide">IDENTIFICACIÓN</label>
                        <p className="text-sm text-gray-900 mt-1">{patientData.identificacion}</p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 tracking-wide">TELÉFONO</label>
                        <p className="text-sm text-gray-900 mt-1 flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          {patientData.telefono}
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs text-gray-500 tracking-wide">EMAIL</label>
                        <p className="text-sm text-gray-900 mt-1 flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          {patientData.email}
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs text-gray-500 tracking-wide">DIRECCIÓN</label>
                        <p className="text-sm text-gray-900 mt-1 flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          {patientData.direccion}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* información de la cita */}
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-900 mb-4 tracking-wide">
                      INFORMACIÓN DE LA CITA
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs text-gray-500 tracking-wide">ESPECIALIDAD</label>
                        <p className="text-sm text-gray-900 mt-1">{patientData.especialidad}</p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 tracking-wide">ESTADO</label>
                        <div className="mt-1">
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                            ✓ Confirmada
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 tracking-wide">FECHA</label>
                        <p className="text-sm text-gray-900 mt-1 flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {patientData.fecha}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 tracking-wide">HORA</label>
                        <p className="text-sm text-gray-900 mt-1 flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-gray-400" />
                          {patientData.hora}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* historial médico */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-4 tracking-wide flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      HISTORIAL MÉDICO
                    </h3>
                    <div className="bg-gray-50 rounded p-4">
                      <p className="text-sm text-gray-700">{patientData.historialMedico}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*Zoom*/}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg border border-gray-100 p-8">
                <h2 className="text-xl font-light text-gray-900 mb-6 tracking-wide">
                  PLATAFORMA DE CONSULTA
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Zoom Meeting Activo</span>
                  </div>
                  
                  <div className="bg-white rounded border border-gray-200 p-4">
                    <p className="text-sm text-gray-600 mb-2">Link de la consulta:</p>
                    <a 
                      href="https://zoom.us/j/1234567890" 
                      className="text-blue-600 text-sm underline break-all"
                      target="_blank"
                      rel="noopener noreferrer">
                      https://zoom.us/j/1234567890
                    </a>
                  </div>
                  
                  <button 
                    onClick={handleIniciarConsulta}
                    className="w-full bg-gray-900 text-white py-3 px-6 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors">
                    INICIAR CONSULTA
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GoDoctorAppointment;