import { Calendar, Clock, User, Phone, Mail, MapPin, FileText, Video, CheckCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { doctorAppointmentService } from '../../../services/doctorAppointmentService';

const Footer = () => (
  <footer className="bg-gray-50 border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-8 py-8">
      <div className="text-center text-sm text-gray-600">
        © 2025 TeleconsultasIPS. Todos los derechos reservados.
      </div>
    </div>
  </footer>
);

const SpecialistAppointmentView = () => {
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
    especialista: "Cargando...",
    duracion: 30,
    precio: 0,
    isSpecialist: false,
    isPatient: false
  });
  
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isStartingConsultation, setIsStartingConsultation] = useState(false);
  const [loadingTodayAppointments, setLoadingTodayAppointments] = useState(false);

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Verificar que tenemos un token
        const storedToken = localStorage.getItem('token');
        console.log('Token desde localStorage:', storedToken);
        console.log('Token desde contexto:', token);
        
        // Debug: Verificar qué appointmentId estamos recibiendo
        console.log('appointmentId desde useParams:', appointmentId);
        console.log('Tipo de appointmentId:', typeof appointmentId);
        console.log('appointmentId es válido:', appointmentId && !isNaN(parseInt(appointmentId)));
        
        if (!storedToken && !token) {
          throw new Error('No se encontró token de autenticación. Por favor, inicia sesión.');
        }
        
        // Verificar que tenemos un appointmentId válido
        if (!appointmentId) {
          throw new Error('No se proporcionó un ID de cita. Por favor, selecciona una cita específica desde la lista de citas programadas.');
        }
        
        // Verificar que el appointmentId es un número válido
        const appointmentIdNum = parseInt(appointmentId);
        if (isNaN(appointmentIdNum)) {
          throw new Error(`El ID de cita '${appointmentId}' no es válido. Debe ser un número.`);
        }
        
        console.log('appointmentId parseado:', appointmentIdNum);
        
        // Primero, obtener la lista de citas disponibles para debugging
        try {
          const allAppointmentsResponse = await doctorAppointmentService.getAllAppointments();
          console.log('Todas las citas disponibles:', allAppointmentsResponse);
        } catch (debugError) {
          console.log('Error obteniendo lista de citas (para debugging):', debugError);
        }
        
        console.log('Fetching appointment data for ID:', appointmentIdNum);
        
        const response = await doctorAppointmentService.getAppointmentDetails(appointmentIdNum);
        console.log('Response from API:', response);
        
        if (response.success) {
          setPatientData(response.data.patientData);
          // Cargar las citas del día una vez que tengamos los datos del especialista
          loadTodayAppointments();
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

  const loadTodayAppointments = async () => {
    try {
      setLoadingTodayAppointments(true);
      const response = await doctorAppointmentService.getUpcomingAppointments();
      
      if (response.success) {
        // Filtrar solo las citas de hoy
        const today = new Date().toDateString();
        const todayOnly = response.data.filter(apt => {
          const aptDate = new Date(apt.fecha).toDateString();
          return aptDate === today;
        });
        setTodayAppointments(todayOnly);
      }
    } catch (error) {
      console.error('Error loading today appointments:', error);
    } finally {
      setLoadingTodayAppointments(false);
    }
  };

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
        
        // Actualizar también las citas del día
        loadTodayAppointments();
        
        alert('Consulta iniciada exitosamente. Puedes acceder al link de Zoom.');
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

  const handleEndConsultation = async () => {
    try {
      if (!appointmentId) {
        throw new Error('No hay un ID de cita válido para finalizar la consulta.');
      }
      
      const response = await doctorAppointmentService.endConsultation(appointmentId);
      
      if (response.success) {
        // Actualizar los datos locales
        setPatientData(prev => ({
          ...prev,
          estado: 'Completada'
        }));
        
        // Actualizar también las citas del día
        loadTodayAppointments();
        
        alert('Consulta finalizada exitosamente.');
      } else {
        throw new Error(response.error || 'Error al finalizar la consulta');
      }
    } catch (error) {
      console.error('Error ending consultation:', error);
      alert(error.error || error.message || 'Error al finalizar la consulta');
    }
  };

  const handleGoToAppointment = (aptId) => {
    navigate(`/especialista/cita/${aptId}`);
  };

  // Mostrar loading
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
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
            className="bg-blue-600 text-white py-2 px-4 text-sm font-medium tracking-wide hover:bg-blue-700 transition-colors rounded"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold tracking-wide text-blue-600">
              TELECONSULTAS<span className="font-normal text-gray-700">IPS</span>
            </a>
            
            <div className="hidden md:flex items-center space-x-6">
              <span className="text-sm text-gray-600">Dr. {patientData.especialista}</span>
              <a href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                CERRAR SESIÓN
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="flex-1 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            
            {/* Información del Paciente - Columnas principales */}
            <div className="xl:col-span-3">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="border-b border-gray-100 p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 tracking-wide flex items-center">
                    <User className="w-6 h-6 mr-3 text-blue-600" />
                    INFORMACIÓN DEL PACIENTE
                  </h2>
                </div>
                
                <div className="p-6">
                  {/* información personal */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 tracking-wide">
                      Datos Personales
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="text-xs text-gray-500 tracking-wide uppercase font-medium">Nombre Completo</label>
                        <p className="text-base text-gray-900 mt-1 font-medium">{patientData.nombre}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="text-xs text-gray-500 tracking-wide uppercase font-medium">Edad</label>
                        <p className="text-base text-gray-900 mt-1">{patientData.edad}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="text-xs text-gray-500 tracking-wide uppercase font-medium">Identificación</label>
                        <p className="text-base text-gray-900 mt-1">{patientData.identificacion}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="text-xs text-gray-500 tracking-wide uppercase font-medium">Teléfono</label>
                        <p className="text-base text-gray-900 mt-1 flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-blue-500" />
                          {patientData.telefono}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="text-xs text-gray-500 tracking-wide uppercase font-medium">Email</label>
                        <p className="text-base text-gray-900 mt-1 flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-blue-500" />
                          {patientData.email}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="text-xs text-gray-500 tracking-wide uppercase font-medium">Dirección</label>
                        <p className="text-base text-gray-900 mt-1 flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                          {patientData.direccion}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* información de la cita */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 tracking-wide">
                      Detalles de la Consulta
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <label className="text-xs text-blue-600 tracking-wide uppercase font-medium">Especialidad</label>
                        <p className="text-base text-gray-900 mt-1 font-medium">{patientData.especialidad}</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <label className="text-xs text-blue-600 tracking-wide uppercase font-medium">Estado</label>
                        <div className="mt-1">
                          <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
                            patientData.estado === 'Confirmada' ? 'bg-green-100 text-green-800 border border-green-200' :
                            patientData.estado === 'En curso' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                            patientData.estado === 'Completada' ? 'bg-gray-100 text-gray-800 border border-gray-200' :
                            'bg-yellow-100 text-yellow-800 border border-yellow-200'
                          }`}>
                            {patientData.estado === 'Confirmada' && <CheckCircle className="w-4 h-4 mr-1" />}
                            {patientData.estado === 'En curso' && '● '}
                            {patientData.estado === 'Completada' && '✓ '}
                            {patientData.estado}
                          </span>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <label className="text-xs text-blue-600 tracking-wide uppercase font-medium">Fecha</label>
                        <p className="text-base text-gray-900 mt-1 flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                          {patientData.fecha}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <label className="text-xs text-blue-600 tracking-wide uppercase font-medium">Hora</label>
                        <p className="text-base text-gray-900 mt-1 flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-blue-500" />
                          {patientData.hora}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* historial médico */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 tracking-wide flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-blue-600" />
                      Historial Médico
                    </h3>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700 leading-relaxed">{patientData.historialMedico}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel lateral - Acciones y citas del día */}
            <div className="xl:col-span-1 space-y-6">
              
              {/* Panel de consulta */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Video className="w-5 h-5 mr-2 text-blue-600" />
                  Consulta Virtual
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      patientData.estado === 'En curso' ? 'bg-green-500' : 
                      patientData.estado === 'Confirmada' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`}></div>
                    <span className="text-sm text-gray-600">
                      {patientData.estado === 'En curso' ? 'Consulta Activa' :
                       patientData.estado === 'Confirmada' ? 'Lista para Iniciar' : 'Consulta Finalizada'}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg border p-4">
                    <p className="text-sm text-gray-600 mb-2">Link de la consulta:</p>
                    {patientData.linkZoom ? (
                      <a 
                        href={patientData.linkZoom} 
                        className="text-blue-600 text-sm underline break-all hover:text-blue-800"
                        target="_blank"
                        rel="noopener noreferrer">
                        {patientData.linkZoom}
                      </a>
                    ) : (
                      <p className="text-gray-400 text-sm">El link se generará al iniciar la consulta</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {patientData.estado === 'Confirmada' && (
                      <button 
                        onClick={handleIniciarConsulta}
                        disabled={isStartingConsultation}
                        className="w-full bg-blue-600 text-white py-3 px-4 text-sm font-medium tracking-wide hover:bg-blue-700 disabled:bg-blue-400 transition-colors rounded-lg flex items-center justify-center"
                      >
                        {isStartingConsultation ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        ) : (
                          <Video className="w-4 h-4 mr-2" />
                        )}
                        {isStartingConsultation ? 'Iniciando...' : 'Iniciar Consulta'}
                      </button>
                    )}
                    
                    {patientData.estado === 'En curso' && (
                      <button 
                        onClick={handleEndConsultation}
                        className="w-full bg-red-600 text-white py-3 px-4 text-sm font-medium tracking-wide hover:bg-red-700 transition-colors rounded-lg flex items-center justify-center"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Finalizar Consulta
                      </button>
                    )}
                    
                    {patientData.linkZoom && (
                      <a
                        href={patientData.linkZoom}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-green-600 text-white py-3 px-4 text-sm font-medium tracking-wide hover:bg-green-700 transition-colors rounded-lg flex items-center justify-center"
                      >
                        <Video className="w-4 h-4 mr-2" />
                        Abrir Zoom
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Citas del día */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  Citas de Hoy
                </h3>
                
                {loadingTodayAppointments ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  </div>
                ) : todayAppointments.length === 0 ? (
                  <p className="text-gray-500 text-sm">No hay más citas para hoy</p>
                ) : (
                  <div className="space-y-3">
                    {todayAppointments.slice(0, 5).map((apt) => (
                      <div 
                        key={apt.id} 
                        className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-blue-50 ${
                          apt.id.toString() === appointmentId ? 'bg-blue-100 border-blue-300' : 'bg-gray-50 border-gray-200'
                        }`}
                        onClick={() => handleGoToAppointment(apt.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{apt.persona}</p>
                            <p className="text-xs text-gray-500">{apt.especialidad}</p>
                            <p className="text-xs text-blue-600 font-medium">{apt.hora}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            apt.estado === 'Confirmada' ? 'bg-green-100 text-green-800' :
                            apt.estado === 'En curso' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {apt.estado}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SpecialistAppointmentView;
