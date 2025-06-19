import { useLocation } from "react-router-dom";
import Barral from 'src/components/user/desis/Barral';
import { Link } from "react-router-dom";
import NavbarI from 'src/components/user/desis/NavbarI';

const Pperfil = () => {
  const location = useLocation(); 

  return (
    <div className="flex h-screen bg-gray-100">
      <Barral />

      {/* Contenido principal */}
      <div className="flex-1 p-6 bg-gray-50">
      <NavbarI />
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
                  <h2 className="text-3xl font-semibold text-gray-800">Juan Perez</h2>
                  <p className="text-gray-600 mt-2">Medico General | Especialista en Ortopedia</p>
                </div>
              </div>
            </div>
            
            {/* secciones de informacion */}
            <div className="mt-32">
              <div className="flex justify-between space-x-4">

                {/* informacion personal */}
                <div className="flex flex-col items-center w-1/2 bg-gray-50 rounded-lg shadow-md p-6">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4">Información Personal</h3>
                  <p className="text-gray-600 text-lg">Detalles sobre tu información personal.</p>
                </div>

                {/* informacion profesional */}
                <div className="flex flex-col items-center w-1/2 bg-gray-50 rounded-lg shadow-md p-6">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4">Información Profesional</h3>
                  <p className="text-gray-600 text-lg">Detalles sobre tu experiencia profesional.</p>
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
