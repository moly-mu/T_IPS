import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const ServicesSection = () => {
  const navigate = useNavigate();
  
  const handleNavigation = (path) => {
    navigate(path);
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const containerRef = useRef(null);
  const lastScrollTime = useRef(0);
  const scrollDelta = useRef(0);
  const scrollableContentRef = useRef(null);

  const services = [
    {
      name: "Medicina General",
      price: "70.000 - 200.000",
      code: "01",
      description: "Consultas médicas integrales con diagnóstico profesional y tratamiento personalizado para toda la familia.",
      bgColor: "bg-gradient-to-br from-gray-50 to-gray-100",
    },
    {
      name: "Medicina Alternativa",
      price: "50.000 - 160.000",
      code: "02",
      description: "Terapias naturales y medicina complementaria para tu bienestar integral y equilibrio corporal.",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
    },
    {
      name: "Psicología",
      price: "70.000 - 320.000",
      code: "03",
      description: "Apoyo psicológico profesional para tu salud mental y emocional con enfoques modernos.",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
    },
    {
      name: "Nutrición",
      price: "70.000 - 200.000",
      code: "04",
      description: "Planes nutricionales personalizados para una vida más saludable y balanceada.",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
    },
    {
      name: "Ortopedia",
      price: "120.000 - 300.000",
      code: "05",
      description: "Especialistas en lesiones y rehabilitación del sistema musculoesquelético.",
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
    }
  ];

  const navigateToSection = useCallback((newIndex) => {
    if (isAnimating || newIndex === currentIndex || newIndex < 0 || newIndex >= services.length) return;
    
    setIsAnimating(true);
    setCurrentIndex(newIndex);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, [currentIndex, isAnimating, services.length]);

  const handleWheel = useCallback((e) => {
    const now = Date.now();
    
    const isScrollableContent = scrollableContentRef.current && 
                              scrollableContentRef.current.contains(e.target) && 
                              scrollableContentRef.current.scrollHeight > scrollableContentRef.current.clientHeight;
    
    if (isScrollableContent) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableContentRef.current;
      const isAtTop = scrollTop === 0;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;
      
      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        e.preventDefault();
      }
      return;
    }
    
    if (now - lastScrollTime.current < 100) {
      e.preventDefault();
      return;
    }
    
    scrollDelta.current += e.deltaY;
    
    if (Math.abs(scrollDelta.current) < 50) {
      e.preventDefault();
      return;
    }
    
    const direction = scrollDelta.current > 0 ? 1 : -1;
    const newIndex = currentIndex + direction;
    
    if (newIndex >= 0 && newIndex < services.length) {
      e.preventDefault();
      scrollDelta.current = 0;
      lastScrollTime.current = now;
      navigateToSection(newIndex);
    }
  }, [currentIndex, navigateToSection, services.length]);

  const handleKeyDown = useCallback((e) => {
    if (isAnimating) return;
    
    switch(e.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        navigateToSection(currentIndex - 1);
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        navigateToSection(currentIndex + 1);
        break;
      default:
        break;
    }
  }, [currentIndex, isAnimating, navigateToSection]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchEnd = (e) => {
    if (isAnimating) return;
    
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > 50) {
      const direction = diff > 0 ? 1 : -1;
      const newIndex = currentIndex + direction;
      
      if (newIndex >= 0 && newIndex < services.length) {
        navigateToSection(newIndex);
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleWheel, handleKeyDown]);

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-white select-none"
      style={{ overflow: 'hidden' }}
    >
      <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${services[currentIndex].bgColor}`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white mix-blend-soft-light"></div>
          <div className="absolute bottom-32 right-32 w-48 h-48 rounded-full bg-white mix-blend-soft-light"></div>
        </div>
      </div>

      <div className="relative h-full w-full z-10 flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <div className="space-y-8">
              <div className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500/90">
                ESPECIALIDADES MÉDICAS
              </div>
              
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-2 text-gray-900 leading-tight">
                  Consultas <span className="font-bold">Especializadas</span>
                </h1>
              </div>

              <div className="max-w-lg">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Atención médica profesional con especialistas certificados. 
                  Diagnósticos precisos y tratamientos personalizados adaptados a tus necesidades.
                </p>
              </div>

              <div className="flex items-center space-x-4 pt-6">
                <div className="flex-1 h-1 bg-gray-200 rounded-full relative overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gray-800 transition-all duration-500 ease-out rounded-full"
                    style={{ 
                      width: `${((currentIndex + 1) / services.length) * 100}%`
                    }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 font-medium min-w-max">
                  {currentIndex + 1} <span className="text-gray-400">/ {services.length}</span>
                </div>
              </div>
            </div>

            <div className="relative h-[28rem] w-full">
              {services.map((service, index) => {
                const [minPrice, maxPrice] = service.price.split(' - ');
                
                return (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${
                      index === currentIndex 
                        ? 'translate-x-0 opacity-100 z-10' 
                        : index < currentIndex 
                          ? '-translate-x-8 opacity-0 z-0'
                          : 'translate-x-8 opacity-0 z-0'
                    }`}
                  >
                    <div className="bg-white rounded-2xl shadow-xl p-0 h-full w-full max-w-2xl mx-auto flex flex-col overflow-hidden border border-gray-100/50">
                      <div className={`px-8 pt-6 pb-4 ${service.bgColor.replace('bg-gradient-to-br', '')} bg-opacity-30`}>
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-4xl mb-3">{service.icon}</div>
                            <div className="text-s font-semibold text-gray-500 tracking-wider">{service.code}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-medium text-gray-500 mb-1">Rango de precios</div>
                            <div className="flex items-baseline space-x-2">
                              <div className="text-lg font-bold text-gray-800">
                                ${minPrice}
                              </div>
                              <div className="text-sm text-gray-400">-</div>
                              <div className="text-lg font-bold text-gray-800">
                                ${maxPrice}
                              </div>
                              <div className="text-sm font-normal text-gray-500">COP</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 p-8 flex flex-col">
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 leading-tight">
                          {service.name}
                        </h2>
                        
                        <div ref={scrollableContentRef} className="mb-6 overflow-y-auto pr-2 flex-1">
                          <p className=" text-gray-600 leading-relaxed">
                            {service.description}
                          </p>
                        </div>

                        <button className="mt-auto w-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5"
                        onClick={() => handleNavigation('/Sreg')}>
                          Agendar Consulta
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex items-center justify-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-200">
          <span className="text-xs font-medium text-gray-600">Desliza para navegar</span>
          <span className="text-gray-400">→</span>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;