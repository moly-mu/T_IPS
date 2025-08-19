import { Calendar, Clock, User, Phone, Mail, MapPin, FileText } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { doctorAppointmentService } from '../../../../services/doctorAppointmentService.ts';

  
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
  const { appointmentId } = useParams();
  const { token } = useContext(AuthContext);
  
  const [patientData, setPatientData] = useState({
    nombre: "Cargando...",
    edad: "Cargando...",
    identificacion: "Cargando...",
    telefono: "Cargando...",
    email: "Cargando...",
    direccion: "Cargando...",
    especialidad: "Cargando...",
    fecha: "Cargando...",
    hora: "Cargando...",
    historialMedico: "Cargando...",
    estado: "Cargando...",
    linkZoom: "",
    isSpecialist: false,
    isPatient: false
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [, setIsStartingConsultation] = useState(false);

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Verificar que tenemos un token
        const storedToken = localStorage.getItem('token');
        console.log('Token desde localStorage:', storedToken);
        console.log('Token desde contexto:', token);
        
        if (!storedToken && !token) {
          throw new Error('No se encontró token de autenticación. Por favor, inicia sesión.');
        }
        
        // Primero, obtener la lista de citas disponibles para debugging
        try {
          const allAppointmentsResponse = await doctorAppointmentService.getAllAppointments();
          console.log('Todas las citas disponibles:', allAppointmentsResponse);
        } catch (debugError) {
          console.log('Error obteniendo lista de citas (para debugging):', debugError);
        }
        
        // Obtener el appointmentId de los parámetros de la URL
        if (!appointmentId) {
          throw new Error('No se proporcionó un ID de cita. Por favor, selecciona una cita específica desde la lista de citas programadas.');
        }
        
        let currentAppointmentId = appointmentId;
        
        // Solo intentar buscar citas disponibles si no hay ID específico (esto no debería pasar normalmente)
        if (currentAppointmentId === '1' || !currentAppointmentId) {
          try {
            const upcomingResponse = await doctorAppointmentService.getUpcomingAppointments();
            if (upcomingResponse.success && upcomingResponse.data.length > 0) {
              currentAppointmentId = upcomingResponse.data[0].id.toString();
              console.log('Usando primera cita disponible:', currentAppointmentId);
            } else {
              throw new Error('No hay citas disponibles para mostrar.');
            }
          } catch (upcomingError) {
            console.log('Error obteniendo próximas citas:', upcomingError);
            throw new Error('No se pudo encontrar una cita válida para mostrar.');
          }
        }
        
        console.log('Fetching appointment data for ID:', currentAppointmentId);
        
        const response = await doctorAppointmentService.getAppointmentDetails(currentAppointmentId);
        console.log('Response from API:', response);
        
        if (response.success) {
          setPatientData(response.data.patientData);
        } else {
          throw new Error(response.error || 'Error al cargar los datos de la cita');
        }
      } catch (error) {
        console.error('Error fetching appointment data:', error);
        setError(error.error || error.message || 'Error al cargar los datos de la cita');
      } finally {
        setLoading(false);
      }
    };

    // Siempre intentar cargar los datos si hay token en localStorage o contexto
    const storedToken = localStorage.getItem('token');
    if (token || storedToken) {
      fetchAppointmentData();
    } else {
      setError('No se encontró token de autenticación. Por favor, inicia sesión.');
      setLoading(false);
    }
  }, [appointmentId, token]);

  const handleIniciarConsulta = async () => {
    try {
      setIsStartingConsultation(true);
      
      if (!appointmentId) {
        throw new Error('No hay un ID de cita válido para iniciar la consulta.');
      }
      
      const response = await doctorAppointmentService.startConsultation(appointmentId);
      
      if (response.success) {
        // Actualizar los datos locales
        setPatientData(prev => ({
          ...prev,
          estado: response.data.estado,
          linkZoom: response.data.linkZoom
        }));
        
        // Redirigir a la historia clínica
        navigate('/EdicionHistoriaC');
      } else {
        throw new Error(response.error || 'Error al iniciar la consulta');
      }
    } catch (error) {
      console.error('Error starting consultation:', error);
      alert(error.error || error.message || 'Error al iniciar la consulta');
    } finally {
      setIsStartingConsultation(false);
    }
  };

  // Mostrar loading
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando datos de la cita...</p>
        </div>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gray-900 text-white py-2 px-4 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

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
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${
                            patientData.estado === 'Confirmada' ? 'bg-green-100 text-green-800' :
                            patientData.estado === 'En curso' ? 'bg-blue-100 text-blue-800' :
                            patientData.estado === 'Completada' ? 'bg-gray-100 text-gray-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {patientData.estado === 'Confirmada' && '✓ '}
                            {patientData.estado === 'En curso' && '● '}
                            {patientData.estado === 'Completada' && '✓ '}
                            {patientData.estado}
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
                    {patientData.linkZoom ? (
                      <a 
                        href={patientData.linkZoom} 
                        className="text-blue-600 text-sm underline break-all"
                        target="_blank"
                        rel="noopener noreferrer">
                        {patientData.linkZoom}
                      </a>
                    ) : (
                      <p className="text-gray-400 text-sm">El link se generará al iniciar la consulta</p>
                    )}
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