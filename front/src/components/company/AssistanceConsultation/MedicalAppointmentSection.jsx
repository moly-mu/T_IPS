import { useState, useEffect, useContext } from 'react';
import { Clock, CheckCircle, Calendar, MapPin, User, FileText, AlertCircle, ArrowRight, Lock } from 'lucide-react';
import { Link, useNavigate  } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext';
import axios from '../../../api/axios';

const BASE_URL = 'http://localhost:3000';

const MedicalAppointmentSection = () => {
  const [isReady, setIsReady] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);
  
  // Datos por defecto para cuando no hay citas o hay error
  const defaultAppointment = {
    id: null,
    fecha: "2025-07-15",
    hora: "10:00",
    doctor: "Dr. María González",
    especialidad: "Medicina General",
    linkZoom: null,
    estado: "programada"
  };

  // Función para obtener las citas del usuario
  const fetchUserAppointments = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${BASE_URL}/api/User/appointments`);

      if (response.data && response.data.appointments && response.data.appointments.length > 0) {
        // Obtener la próxima cita (la primera en la lista ordenada)
        const nextAppointment = response.data.appointments[0];
        setAppointmentData(nextAppointment);
      } else {
        // Si no hay citas, usar datos por defecto
        setAppointmentData(defaultAppointment);
      }
    } catch (error) {
      console.error('Error al obtener las citas:', error);
      setError('No se pudieron cargar las citas');
      setAppointmentData(defaultAppointment);
    } finally {
      setLoading(false);
    }
  };

  // Cargar las citas cuando el componente se monta
  useEffect(() => {
    if (token) {
      fetchUserAppointments();
    } else {
      setAppointmentData(defaultAppointment);
      setLoading(false);
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps


  // Calcular tiempo restante basado en los datos reales de la cita
  useEffect(() => {
    if (!appointmentData) return;

    const appointmentDateTime = new Date(`${appointmentData.fecha} ${appointmentData.hora}`);
    const now = new Date();
    const timeDiff = appointmentDateTime - now;

    if (timeDiff > 0) {
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeRemaining(`${hours}h ${minutes}m`);
    } else {
      setTimeRemaining("Hora de la cita");
    }
  }, [appointmentData]);


  const handleReadyCheck = () => {
    setIsReady(!isReady);
  };


  const handleDiagnosticRedirect = () => {
    window.location.href = '/DiagnosticoPrevio';
  };


  const navigate = useNavigate();


  const handleViewLocation = () => {
    if (appointmentData && appointmentData.linkZoom) {
      // Abrir el link de Zoom en una nueva ventana
      window.open(appointmentData.linkZoom, '_blank');
      
      // Después de un tiempo, redirigir a la encuesta de satisfacción con el ID de la cita
      setTimeout(() => {
        navigate('/EncuestaSatisfaccion', { 
          state: { appointmentId: appointmentData.id } 
        });
      }, 3000); // 3 segundos para que el usuario pueda unirse al Zoom
    } else {
      alert('No hay link de Zoom disponible para esta cita.');
    }
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
                <a href="/" className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors tracking-wide">
                  CERRAR SESIÓN
                </a>
                <a href="/perfilPaciente" className="text-sm font-medium text-gray-900 border-b border-gray-900 pb-1 tracking-wide">
                  MI PERFIL
                </a>
              </div>
            </div>
          </div>
        </nav>
      );
    };


  return (
    <>
      <Navbar />
    <div className="w-3/4 mx-auto p-6 bg-white pt-28">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
       
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Asistir a mi cita médica</h1>
            <p className="text-gray-600">Prepárate para tu próxima cita médica</p>
          </div>


          {/* info de la cita */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-10">
            <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
              Próxima cita médica
              {loading && <span className="ml-2 text-sm text-gray-500">(Cargando...)</span>}
              {error && <span className="ml-2 text-sm text-red-500">({error})</span>}
            </h2>
            
            {appointmentData ? (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="font-medium">Fecha:</span>
                    <span className="ml-2">
                      {new Date(appointmentData.fecha).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="font-medium">Hora:</span>
                    <span className="ml-2">{appointmentData.hora}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <User className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="font-medium">Doctor:</span>
                    <span className="ml-2">{appointmentData.doctor}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FileText className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="font-medium">Especialidad:</span>
                    <span className="ml-2">{appointmentData.especialidad}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="font-medium">Modalidad:</span>
                    <span className="ml-2">Teleconsulta</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="font-medium">Estado:</span>
                    <span className={`ml-2 px-2 py-1 rounded text-xs uppercase ${
                      appointmentData.estado === 'programada' 
                        ? 'bg-green-100 text-green-800' 
                        : appointmentData.estado === 'completada'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {appointmentData.estado}
                    </span>
                  </div>
                  {timeRemaining && (
                    <div className="flex items-center text-orange-600 font-medium">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      <span>Tiempo restante: {timeRemaining}</span>
                    </div>
                  )}
                  {appointmentData.linkZoom && (
                    <div className="flex items-center text-blue-600 font-medium">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>Link de Zoom disponible</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No hay información de cita disponible
              </div>
            )}
          </div>


          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-9">
            <h2 className="text- xl font-semibold text-green-900 mb-4">Lista de verificación</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <button
                  onClick={handleReadyCheck}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all duration-200 w-full ${
                    isReady
                      ? 'bg-green-100 border-green-300 text-green-800'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-green-300'
                  }`}
                >
                  {isReady ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-400 rounded-full"></div>
                  )}
                  <div className="text-left">
                    <div className="font-medium">Estoy listo para mi cita (30 minutos antes)</div>
                    <div className="text-sm text-gray-600">
                      Confirma que tienes todo preparado para tu cita médica
                    </div>
                  </div>
                </button>
              </div>


              {isReady && (
                <div className="ml-9 space-y-2 text-sm text-green-700">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Documentos de identidad y seguro médico</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Lista de medicamentos actuales</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Historial médico relevante</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Preguntas preparadas para el doctor</span>
                  </div>
                </div>
              )}
            </div>
          </div>


          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={handleDiagnosticRedirect}
              disabled={loading}
              className="bg-[#00102D] text-white px-6 py-4 rounded-lg hover:bg-[#003366] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2 font-medium"
            >
              <FileText className="w-5 h-5" />
              <span>Realizar diagnóstico previo</span>
            </button>

            <button
              onClick={handleViewLocation}
              disabled={loading || !appointmentData?.linkZoom}
              className={`px-6 py-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 font-medium ${
                appointmentData?.linkZoom && !loading
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`}
              title={!appointmentData?.linkZoom ? 'Link de Zoom no disponible' : 'Unirse a la consulta'}
            >
              <ArrowRight className="w-5 h-5" />
              <span>
                {loading ? 'Cargando...' : appointmentData?.linkZoom ? 'Ir a la cita' : 'Link no disponible'}
              </span>
            </button>
          </div>
        </div>


        <div className="w-full md:w-1/3 bg-gray-50 border border-gray-200 rounded-lg p-6 mt-24">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Información importante</h3>
          <div className="space-y-4 text-1.5xl text-gray-700">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 mr-2 text-yellow-600 mt-0.5" />
              <div>
                <span className="font-bold">Conexión a internet :</span> Asegúrese de tener una conexión estable para la consulta virtual
              </div>
            </div>
            <div className="flex items-start">
              <AlertCircle className="w-8 h-8 mr-2 text-yellow-600 mt-0.5" />
              <div>
                <span className="font-bold">Dispositivo adecuado:</span> Utilice un dispositivo con cámara y micrófono funcionales (computadora, tablet o smartphone)
              </div>
            </div>
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 mr-2 text-yellow-600 mt-0.5" />
              <div>
                <span className="font-bold">Ambiente tranquilo:</span> Elige un lugar silencioso y sin distracciones para la consulta
              </div>
            </div>
            <div className="flex items-start">
              <AlertCircle className="w-8 h-8 mr-2 text-yellow-600 mt-0.5" />
              <div>
                <span className="font-bold">Documentación medica:</span> Si cuentas con documentos médicos relevantes, tenlos a mano para compartirlos con el doctor
              </div>
            </div>
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 mr-2 text-yellow-600 mt-0.5" />
              <div>
                <span className="font-bold">Lista de síntomas y preguntas:</span> Anota tus síntomas y cualquier pregunta que quieras hacerle al doctor para aprovechar al máximo la consulta
              </div>
            </div>
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 mr-2 text-yellow-600 mt-0.5" />
              <div>
                <span className="font-bold">Puntualidad:</span> Conectate a la consulta 5 minutos antes de la hora programada para evitar retrasos
              </div>
            </div>
          </div>


          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
              <Lock className="w-4 h-4 mr-2" />
              Políticas de privacidad
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};


export default MedicalAppointmentSection;
