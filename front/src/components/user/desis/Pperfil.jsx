import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useUserData } from "../../../context/UserDataContext";
import { useNavigate } from "react-router-dom";
import { useUserService } from "../../../services/userService";
import Barral from '../desis/Barral';
import { Link } from "react-router-dom";
import NavbarI from '../desis/NavbarI';
import { useAuth } from "../../../context/AuthContext";

const Pperfil = () => {
  const { token } = useAuth(); 
  const location = useLocation();
  const navigate = useNavigate();
  const { userData, setUserData } = useUserData();
  const userService = useUserService();
  
  // Estados para la información personal y profesional
  const [formData, setFormData] = useState({
    profileInfo: null,
    professionalInfo: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para NavbarI
  const [isOpen, setIsOpen] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Función para manejar cambios en el sidebar
  const handleSidebarChange = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      
      // Evitar múltiples llamadas si ya se cargaron los datos
      if (dataLoaded) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        console.log("🔄 Iniciando carga de datos...");
        
        // Obtener datos del usuario usando el servicio
        const userResponse = await userService.getProfile();
        console.log("✅ Usuario principal:", userResponse);
        
        // Extraer los datos del usuario de la respuesta
        const userData = userResponse.user;
        setUserData(userData);

        // Configurar los datos del formulario con la información del usuario
        setFormData({
          profileInfo: userData,
          professionalInfo: userData
        });

        setDataLoaded(true);
        console.log("✅ Datos cargados correctamente");
        
        // Solo navegar si no estamos ya en la ruta correcta
        if (location.pathname !== "/pagusuario") {
          navigate("/pagusuario");
        }
        
      } catch (error) {
        console.error("❌ Error al obtener datos:", error);
        setError(`Error al cargar la información del perfil: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }; 
    
    if (token && !dataLoaded) {
      fetchAllData();
    } else if (!token) {
      setLoading(false);
    }
  }, [token, dataLoaded, location.pathname, navigate, setUserData, userService]);

  // Función para renderizar información personal
  const renderPersonalInfo = () => {
    const renderState = {
      loading,
      error,
      formData: formData.profileInfo
    };
    
    console.log("🔍 Renderizando información personal:", renderState);

    if (loading) return <p className="text-gray-600">Cargando información personal...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!formData.profileInfo) return <p className="text-gray-600">No hay información personal disponible</p>;

    const profileInfo = formData.profileInfo;

    return (
      <div className="text-left space-y-3">
        {profileInfo.firstname && (
          <p><span className="font-medium text-gray-700">Nombre:</span> <span className="text-gray-600">{profileInfo.firstname}</span></p>
        )}
        {profileInfo.second_firstname && (
          <p><span className="font-medium text-gray-700">Segundo Nombre:</span> <span className="text-gray-600">{profileInfo.second_firstname}</span></p>
        )}
        {profileInfo.lastname && (
          <p><span className="font-medium text-gray-700">Apellido:</span> <span className="text-gray-600">{profileInfo.lastname}</span></p>
        )}
        {profileInfo.second_lastname && (
          <p><span className="font-medium text-gray-700">Segundo Apellido:</span> <span className="text-gray-600">{profileInfo.second_lastname}</span></p>
        )}
        {profileInfo.birthdate && (
          <p><span className="font-medium text-gray-700">Fecha de Nacimiento:</span> <span className="text-gray-600">{new Date(profileInfo.birthdate).toLocaleDateString('es-ES')}</span></p>
        )}
        {profileInfo.gender && (
          <p><span className="font-medium text-gray-700">Género:</span> <span className="text-gray-600">{profileInfo.gender}</span></p>
        )}
        {profileInfo.sex && (
          <p><span className="font-medium text-gray-700">Sexo:</span> <span className="text-gray-600">{profileInfo.sex}</span></p>
        )}
        {profileInfo.language && (
          <p><span className="font-medium text-gray-700">Idioma:</span> <span className="text-gray-600">{profileInfo.language}</span></p>
        )}
        {profileInfo.document_type && profileInfo.credential_users?.document && (
          <p><span className="font-medium text-gray-700">{profileInfo.document_type}:</span> <span className="text-gray-600">{profileInfo.credential_users.document}</span></p>
        )}
        {profileInfo.credential_users?.email && (
          <p><span className="font-medium text-gray-700">Email:</span> <span className="text-gray-600">{profileInfo.credential_users.email}</span></p>
        )}
        {profileInfo.phone && (
          <p><span className="font-medium text-gray-700">Teléfono:</span> <span className="text-gray-600">{profileInfo.phone}</span></p>
        )}
        {profileInfo.status && (
          <p><span className="font-medium text-gray-700">Estado:</span> <span className="text-gray-600">{profileInfo.status}</span></p>
        )}
        {profileInfo.joinDate && (
          <p><span className="font-medium text-gray-700">Fecha de Registro:</span> <span className="text-gray-600">{new Date(profileInfo.joinDate).toLocaleDateString('es-ES')}</span></p>
        )}
      </div>
    );
  };

  // Función para renderizar información profesional/médica del paciente
  const renderProfessionalInfo = () => {
    const renderState = {
      loading,
      error,
      formData: formData.professionalInfo
    };
    
    console.log("🔍 Renderizando información médica/profesional:", renderState);

    if (loading) return <p className="text-gray-600">Cargando información médica...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!formData.professionalInfo) return <p className="text-gray-600">No hay información médica disponible</p>;

    const professionalInfo = formData.professionalInfo;
    const pacienteData = professionalInfo.Paciente?.pac_data;

    return (
      <div className="text-left space-y-3">
        {/* Información básica del usuario */}
        {professionalInfo.rol?.rol_name && (
          <p><span className="font-medium text-gray-700">Tipo de Usuario:</span> <span className="text-gray-600">{professionalInfo.rol.rol_name}</span></p>
        )}
        
        {/* Información médica del paciente */}
        {pacienteData && (
          <>
            {pacienteData.Direction && (
              <p><span className="font-medium text-gray-700">Dirección:</span> <span className="text-gray-600">{pacienteData.Direction}</span></p>
            )}
            {pacienteData.bloodType && (
              <p><span className="font-medium text-gray-700">Tipo de Sangre:</span> <span className="text-gray-600">{pacienteData.bloodType}</span></p>
            )}
            {pacienteData.allergies && (
              <p><span className="font-medium text-gray-700">Alergias:</span> <span className="text-gray-600">{pacienteData.allergies}</span></p>
            )}
            {pacienteData.emergency_contact && (
              <p><span className="font-medium text-gray-700">Contacto de Emergencia:</span> <span className="text-gray-600">{pacienteData.emergency_contact}</span></p>
            )}
            {pacienteData.eps_type && (
              <p><span className="font-medium text-gray-700">EPS:</span> <span className="text-gray-600">{pacienteData.eps_type}</span></p>
            )}
            {pacienteData.profession && (
              <p><span className="font-medium text-gray-700">Profesión:</span> <span className="text-gray-600">{pacienteData.profession}</span></p>
            )}
            {pacienteData.ethnicgroup && (
              <p><span className="font-medium text-gray-700">Grupo Étnico:</span> <span className="text-gray-600">{pacienteData.ethnicgroup}</span></p>
            )}
          </>
        )}
        
        {/* Información específica según el rol */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="font-medium text-blue-700 mb-2">
            {professionalInfo.rol?.rol_name === 'Paciente' ? 'Información del Paciente' : 'Información del Usuario'}
          </p>
          <p className="text-sm text-blue-600">
            {professionalInfo.rol?.rol_name === 'Paciente' 
              ? 'Como paciente registrado, puedes agendar citas médicas, consultar tu historial clínico y acceder a servicios de telemedicina.'
              : 'Usuario registrado en el sistema de telemedicina.'
            }
          </p>
          {professionalInfo.status === 'Activo' && (
            <p className="text-sm text-blue-600 mt-1">
              Tu cuenta está activa y puedes acceder a todos los servicios disponibles.
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Barral />

      {/* Contenido principal */}
      <div className="flex-1 p-6 bg-gray-50">
        {/* Pasar las props requeridas a NavbarI */}
        <NavbarI 
          isOpen={isOpen} 
          sidebarChange={handleSidebarChange}
        />
        
        {/* Si estamos en la ruta "/pagusuario" mostrar los detalles del perfil */}
        {location.pathname === "/pagusuario" && (
          <div className="max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <div className="relative">
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-12"></div>

              {/* foto de perfil y "Sobre mi" */}
              <div className="absolute top-32 left-6 flex items-center space-x-6">
                {/* foto de perfil */}
                <div className="w-34 h-34 rounded-full bg-gray-200 overflow-hidden shadow-lg">
                  <img
                    src="/src/assets/img_user/people.png" 
                    alt="Foto de perfil"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* informacion del usuario */}
                <div className="mt-20">
                  <h2 className="text-3xl font-semibold text-gray-800">
                    {formData.profileInfo?.firstname && formData.profileInfo?.lastname 
                      ? `${formData.profileInfo.firstname} ${formData.profileInfo.lastname}` 
                      : userData?.firstname && userData?.lastname
                      ? `${userData.firstname} ${userData.lastname}`
                      : "Usuario"}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    {formData.profileInfo?.rol?.rol_name || "Usuario del Sistema"}
                  </p>
                </div>
              </div>
            </div>
            
            {/* secciones de informacion */}
            <div className="mt-32">
              <div className="flex justify-between space-x-4">
                {/* informacion personal */}
                <div className="flex flex-col w-1/2 bg-gray-50 rounded-lg shadow-md p-6">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Información Personal</h3>
                  <div className="flex-1">
                    {renderPersonalInfo()}
                  </div>
                </div>

                {/* informacion médica/profesional */}
                <div className="flex flex-col w-1/2 bg-gray-50 rounded-lg shadow-md p-6">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Información Médica</h3>
                  <div className="flex-1">
                    {renderProfessionalInfo()}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <Link to="/card">
                <button className="px-6 py-2 bg-[#00102D] text-white font-semibold rounded-lg hover:bg-[#003366] shadow-md">
                  Realizar Solicitud
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* otros contenidos dependiendo de la ruta */}
        {location.pathname === "/card" && (
          <h1 className="text-3xl font-bold mb-4">Card de Usuario</h1>
        )}
        {location.pathname === "/not" && (
          <h1 className="text-3xl font-bold mb-4">Notificaciones</h1>
        )}
        {location.pathname === "/oft" && (
          <h1 className="text-3xl font-bold mb-4">Ofertas</h1>
        )}
        {location.pathname === "/ajus" && (
          <h1 className="text-3xl font-bold mb-4">Configuración</h1>
        )}
      </div>
    </div>
  );
};

export default Pperfil;