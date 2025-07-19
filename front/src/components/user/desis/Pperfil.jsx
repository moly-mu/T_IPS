import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useUserData } from "../../../context/UserDataContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Barral from '../desis/Barral';
import { Link } from "react-router-dom";
import NavbarI from '../desis/NavbarI';
import { useAuth } from "../../../context/AuthContext";

const Pperfil = () => {
  const { token } = useAuth(); 
  const location = useLocation();
  const navigate = useNavigate();
  const { userData, setUserData } = useUserData();
  
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
        
        // Obtener datos del usuario principal
        const userResponse = await axios.get("http://localhost:3000/api/getUser/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("✅ Usuario principal:", userResponse.data);
        setUserData(userResponse.data);

        // Obtener información del perfil (getProfile)
        const profileResponse = await axios.get("http://localhost:3000/specialist/appointments/getProfile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("✅ Información del perfil:", profileResponse.data);

        // Obtener información profesional (dataProfessional)
        const professionalResponse = await axios.get("http://localhost:3000/specialist/settings/dataProfessional", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("✅ Información profesional:", professionalResponse.data);

        // Actualizar formData con ambas respuestas
        setFormData({
          profileInfo: profileResponse.data,
          professionalInfo: professionalResponse.data
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
  }, [token, dataLoaded, location.pathname, navigate, setUserData]);

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
        {profileInfo.age && (
          <p><span className="font-medium text-gray-700">Edad:</span> <span className="text-gray-600">{profileInfo.age} años</span></p>
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
      </div>
    );
  };

  // Función para renderizar información profesional
  const renderProfessionalInfo = () => {
    const renderState = {
      loading,
      error,
      formData: formData.professionalInfo
    };
    
    console.log("🔍 Renderizando información profesional:", renderState);

    if (loading) return <p className="text-gray-600">Cargando información profesional...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!formData.professionalInfo) return <p className="text-gray-600">No hay información profesional disponible</p>;

    const professionalInfo = formData.professionalInfo;
    const profileInfo = formData.profileInfo;

    return (
      <div className="text-left space-y-3">
        {professionalInfo.biography && (
          <p><span className="font-medium text-gray-700">Especialidad:</span> <span className="text-gray-600">{professionalInfo.biography}</span></p>
        )}
        {professionalInfo.exp_lab && (
          <p><span className="font-medium text-gray-700">Experiencia Laboral:</span> <span className="text-gray-600">{professionalInfo.exp_lab}</span></p>
        )}
        {professionalInfo.working_experience && (
          <p><span className="font-medium text-gray-700">Años de Experiencia:</span> <span className="text-gray-600">{professionalInfo.working_experience}</span></p>
        )}
        {professionalInfo.consultations && (
          <p><span className="font-medium text-gray-700">Consultas Realizadas:</span> <span className="text-gray-600">{professionalInfo.consultations}</span></p>
        )}
        {profileInfo?.rol?.rol_name && (
          <p><span className="font-medium text-gray-700">Rol:</span> <span className="text-gray-600">{profileInfo.rol.rol_name}</span></p>
        )}
        {professionalInfo.joinDate && (
          <p><span className="font-medium text-gray-700">Fecha de Registro:</span> <span className="text-gray-600">{new Date(professionalInfo.joinDate).toLocaleDateString('es-ES')}</span></p>
        )}
        {professionalInfo.degrees && Object.keys(professionalInfo.degrees).length > 0 && (
          <div>
            <span className="font-medium text-gray-700">Diplomas:</span>
            <span className="text-gray-600 ml-2">Documentos disponibles</span>
          </div>
        )}
        {professionalInfo.educational_certificates && Object.keys(professionalInfo.educational_certificates).length > 0 && (
          <div>
            <span className="font-medium text-gray-700">Certificados Educativos:</span>
            <span className="text-gray-600 ml-2">Documentos disponibles</span>
          </div>
        )}
        {professionalInfo.cv && Object.keys(professionalInfo.cv).length > 0 && (
          <div>
            <span className="font-medium text-gray-700">Currículum:</span>
            <span className="text-gray-600 ml-2">Documento disponible</span>
          </div>
        )}
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
                      : userData?.nombre && userData?.apellido
                      ? `${userData.nombre} ${userData.apellido}`
                      : "Usuario"}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    {formData.professionalInfo?.biography 
                      ? formData.professionalInfo.biography 
                      : "Especialista Médico"}
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

                {/* informacion profesional */}
                <div className="flex flex-col w-1/2 bg-gray-50 rounded-lg shadow-md p-6">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Información Profesional</h3>
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