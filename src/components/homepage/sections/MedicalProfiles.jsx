import { useNavigate } from 'react-router-dom';

const MedicalProfiles = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-8">
        
        {/* Header Section */}
        <div className="mb-16 text-center">
          <p className="text-xs font-light text-gray-400 tracking-widest uppercase mb-4">
            NUESTRO EQUIPO
          </p>
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
            ESPECIALISTAS
            <br />
            <span className="font-semibold">CERTIFICADOS</span>
          </h2>
          <p className="text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
            Médicos con amplia experiencia y certificaciones internacionales, 
            disponibles para brindarte atención personalizada las 24 horas.
          </p>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          
          <div className="group cursor-pointer" onClick={() => handleNavigation('/medicos')}>
            <div className="bg-white rounded-none p-12 hover:bg-gray-50 transition-colors duration-300 border-b border-gray-100">
              <div className="flex items-start justify-between mb-8">
                <div className="flex-1">
                  <div className="text-xs font-light text-gray-400 tracking-widest uppercase mb-3">
                    01
                  </div>
                  <h3 className="text-2xl font-light text-gray-900 mb-4">
                    VER <span className="font-semibold">MÉDICOS</span>
                  </h3>
                  <p className="text-gray-500 font-light leading-relaxed mb-6">
                    Explora nuestro directorio completo de especialistas médicos certificados. 
                    Consulta perfiles, especialidades y disponibilidad.
                  </p>
                </div>
                <div className="ml-8">
                  <svg className="w-12 h-12 text-gray-300 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <button 
                  className="text-xs font-medium text-gray-900 border-b border-gray-900 pb-1 tracking-widest uppercase group-hover:text-gray-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation('/medicos');}}>
                  EXPLORAR PERFILES
                </button>
                <div className="text-xs text-gray-400 font-light">
                  250+ médicos disponibles
                </div>
              </div>
            </div>
          </div>

          {/* Médico Ya! Card */}
          <div className="group cursor-pointer" onClick={() => handleNavigation('/consulta-inmediata')}>
            <div className="bg-white rounded-none p-12 hover:bg-gray-50 transition-colors duration-300 border-b border-gray-100">
              <div className="flex items-start justify-between mb-8">
                <div className="flex-1">
                  <div className="text-xs font-light text-gray-400 tracking-widest uppercase mb-3">
                    02
                  </div>
                  <h3 className="text-2xl font-light text-gray-900 mb-4">
                    MÉDICO <span className="font-semibold">YA!</span>
                  </h3>
                  <p className="text-gray-500 font-light leading-relaxed mb-6">
                    Atención médica inmediata las 24 horas. Conecta con un especialista 
                    certificado en minutos desde cualquier lugar.
                  </p>
                </div>
                <div className="ml-8">
                  <svg className="w-12 h-12 text-gray-300 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <button 
                  className="text-xs font-medium text-gray-900 border-b border-gray-900 pb-1 tracking-widest uppercase group-hover:text-gray-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation('/ya');
                  }}>
                  CONSULTA AHORA
                </button>
                <div className="text-xs text-gray-400 font-light">
                  24/7 disponible
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </section>
  );
};

export default MedicalProfiles;