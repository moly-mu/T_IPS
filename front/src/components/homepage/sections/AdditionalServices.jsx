const AdditionalServices = () => {
  const services = [
    {
      title: "Agendamiento",
      subtitle: "Sistema inteligente de citas",
      code: "01",
      route: "/agendamiento"
    },
    {
      title: "Videollamadas",
      subtitle: "Consultas en tiempo real",
      code: "02",
      route: "/videollamadas"
    },
    {
      title: "Diagnóstico Previo",
      subtitle: "Evaluación automatizada",
      code: "03",
      route: "/diagnostico"
    },
    {
      title: "Historia Clínica",
      subtitle: "Registro digital completo",
      code: "04",
      route: "/historia-clinica"
    },
    {
      title: "Satisfacción",
      subtitle: "Evaluación de experiencia",
      code: "05",
      route: "/satisfaccion"
    },
    {
      title: "Soporte",
      subtitle: "FAQs y asistencia",
      code: "06",
      route: "/quans"
    }
  ];

  const handleServiceClick = (route) => {
    window.location.href = route;
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-20">
          <p className="text-sm font-light text-gray-500 tracking-widest uppercase mb-4">
            Herramientas Digitales
          </p>
          <h2 className="text-4xl font-light text-gray-900">
            SERVICIOS <br />
            <span className="font-medium">ADICIONALES</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
          {services.map((service, index) => (
            <div
            key={index}
            className="bg-white p-8 hover:bg-gray-50 transition-colors group cursor-pointer"
            onClick={() => handleServiceClick(service.route)}>
              
              <div className="space-y-4">
                <div className="text-xs font-light text-gray-400 tracking-widest">
                  {service.code}
                </div>
                <h3 className="text-lg font-medium text-gray-900 group-hover:font-light transition-all">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">
                  {service.subtitle}
                </p>

                <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-xs font-medium text-gray-900 border-b border-gray-900 pb-1 tracking-wide">
                    ACCEDER
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdditionalServices;