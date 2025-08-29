
import { Profile2User, Calendar, Setting2, Chart, Graph  } from "iconsax-react";

const Barral = () => {

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-white border-r fixed top-0 left-0 z-50 h-full flex flex-col">

        <div className="h-[var(--h-nav)] p-4 flex items-center gap-2 cursor-pointer">
          <div className="h-10 w-10 flex items-center justify-center bg-gradient-to-br from-[#003366] to-[#003366] rounded-full text-white">
            <Profile2User size={24} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-800">IPS IUDC</h1>
          </div>
        </div>

        <hr className="bg-gray-400 mx-2" />

        {/* menu de navegacion */}
        <div className="flex flex-col space-y-2 text-gray-500 font-medium py-6 overflow-y-auto flex-grow">
          <a href="/pagusuario" className="flex hover:bg-gray-100 px-6 py-2 items-center gap-2">
            <Profile2User size={16} />
            Mi perfil
          </a>

          {/*}
          <a href="/not" className="flex hover:bg-gray-100 px-6 py-2 items-center gap-2">
            <Document size={16} />
            Notificaciones
          </a> */}

          <a href="/oft" className="flex hover:bg-gray-100 px-6 py-2 items-center gap-2">
            <Chart size={16} />
            Estadisticas
          </a>

          <a href="/calendar" className="flex hover:bg-gray-100 px-6 py-2 items-center gap-2">
            <Calendar size={16} />
            Agenda
          </a>

          <a href="/ajus" className="flex hover:bg-gray-100 px-6 py-2 items-center gap-2">
            <Setting2 size={16} />
            Configuración
          </a>

          <a href="/" className="flex hover:bg-gray-100 px-6 py-2 items-center gap-2">
            <Graph  size={16} />
            Analitica
          </a>
        </div>

        {/* el perfil del usuario inferiror*/}
        <div className="mt-auto p-6 border-t">
          <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
              <Profile2User size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Nombre Usuario</p>
              <p className="text-xs text-gray-500">usuario@correo.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 pl-64">
      </div>

    </div>
  );
};

export default Barral;
