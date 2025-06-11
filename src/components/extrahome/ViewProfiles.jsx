import { useEffect, useRef, useState } from 'react';

const MedicalProfile = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const containerRef = useRef(null);
  
  const doctors = [
    {
      name: "Dra. María González",
      specialty: "Medicina General",
      experience: "15 años de experiencia",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      education: "Universidad Nacional de Colombia",
      certifications: ["Medicina Interna", "Geriatría", "Medicina Familiar"],
      description: "Especialista en atención primaria con amplia experiencia en diagnóstico y tratamiento integral. Enfoque en medicina preventiva y cuidado personalizado para pacientes de todas las edades.",
      achievements: [
        "Certificación en Medicina Familiar - Universidad Javeriana",
        "Especialización en Geriatría - Hospital San Ignacio",
        "Miembro activo de la Sociedad Colombiana de Medicina Familiar"
      ],
      languages: ["Español", "Inglés"],
      schedule: "Lunes a Viernes: 8:00 AM - 6:00 PM"
    },
    {
      name: "Dr. Carlos Rodríguez",
      specialty: "Cardiología",
      experience: "12 años de experiencia",
      image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      education: "Universidad de los Andes",
      certifications: ["Cardiología Intervencionista", "Ecocardiografía", "Electrofisiología"],
      description: "Cardiólogo especializado en procedimientos mínimamente invasivos y diagnóstico cardiovascular avanzado. Experiencia en tratamiento de arritmias y enfermedades coronarias.",
      achievements: [
        "Fellowship en Cardiología Intervencionista - Cleveland Clinic",
        "Certificación en Ecocardiografía Avanzada",
        "Más de 500 procedimientos cardiovasculares realizados"
      ],
      languages: ["Español", "Inglés", "Francés"],
      schedule: "Martes y Jueves: 9:00 AM - 5:00 PM"
    },
    {
      name: "Dra. Ana Martínez",
      specialty: "Pediatría",
      experience: "10 años de experiencia",
      image: "https://images.unsplash.com/photo-1594824388550-7824cb011742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      education: "Universidad El Bosque",
      certifications: ["Neonatología", "Pediatría Intensiva", "Desarrollo Infantil"],
      description: "Pediatra dedicada al cuidado integral de niños desde recién nacidos hasta adolescentes. Especialista en desarrollo infantil y medicina preventiva pediátrica.",
      achievements: [
        "Especialización en Neonatología - Hospital Militar Central",
        "Certificación en Lactancia Materna - UNICEF",
        "Investigadora en desarrollo neurológico infantil"
      ],
      languages: ["Español", "Inglés"],
      schedule: "Lunes, Miércoles y Viernes: 8:00 AM - 4:00 PM"
    },
    {
      name: "Dr. Luis Fernández",
      specialty: "Dermatología",
      experience: "8 años de experiencia",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      education: "Universidad Nacional de Colombia",
      certifications: ["Dermatología Cosmética", "Dermopatología", "Cirugía Dermatológica"],
      description: "Dermatólogo con enfoque en diagnóstico y tratamiento de enfermedades de la piel, cabello y uñas. Especialista en procedimientos estéticos y cirugía dermatológica.",
      achievements: [
        "Especialización en Dermatología - Universidad CES",
        "Certificación en Dermatoscopia Avanzada",
        "Miembro de la Asociación Colombiana de Dermatología"
      ],
      languages: ["Español", "Inglés"],
      schedule: "Martes, Jueves y Sábados: 9:00 AM - 5:00 PM"
    },
    {
      name: "Dra. Patricia Torres",
      specialty: "Ginecología",
      experience: "14 años de experiencia",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      education: "Universidad de la Sabana",
      certifications: ["Ginecología Oncológica", "Reproducción Asistida", "Cirugía Laparoscópica"],
      description: "Ginecóloga especializada en salud femenina integral, desde la adolescencia hasta la menopausia. Experta en cirugía mínimamente invasiva y medicina reproductiva.",
      achievements: [
        "Fellowship en Ginecología Oncológica - Instituto Nacional de Cancerología",
        "Certificación en Reproducción Asistida - ESHRE",
        "Más de 1000 cirugías laparoscópicas realizadas"
      ],
      languages: ["Español", "Inglés"],
      schedule: "Lunes a Viernes: 9:00 AM - 6:00 PM"
    },
    {
      name: "Dr. Miguel Herrera",
      specialty: "Ortopedia",
      experience: "16 años de experiencia",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      education: "Universidad Militar Nueva Granada",
      certifications: ["Cirugía de Columna", "Traumatología Deportiva", "Artroplastia"],
      description: "Ortopedista especializado en cirugía de columna vertebral y traumatología deportiva. Amplia experiencia en tratamiento de lesiones complejas y rehabilitación.",
      achievements: [
        "Fellowship en Cirugía de Columna - Hospital Universitario San Ignacio",
        "Certificación en Traumatología Deportiva - FIFA",
        "Cirujano oficial de equipos deportivos profesionales"
      ],
      languages: ["Español", "Inglés", "Portugués"],
      schedule: "Lunes, Miércoles y Viernes: 7:00 AM - 3:00 PM"
    }
  ];

  const nextSlide = () => {
    if (!animating) {
      setAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % doctors.length);
      setTimeout(() => setAnimating(false), 600);
    }
  };

  const prevSlide = () => {
    if (!animating) {
      setAnimating(true);
      setCurrentIndex((prev) => (prev - 1 + doctors.length) % doctors.length);
      setTimeout(() => setAnimating(false), 600);
    }
  };

  const goToSlide = (index) => {
    if (!animating && index !== currentIndex) {
      setAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setAnimating(false), 600);
    }
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && !animating) {
      nextSlide();
    }
    if (isRightSwipe && !animating) {
      prevSlide();
    }
  };

  // Wheel handler
  const handleWheel = (e) => {
    e.preventDefault();
    if (animating) return;
    
    if (e.deltaY > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  // Keyboard handler
  const handleKeyDown = (e) => {
    if (animating) return;
    
    if (e.code === "ArrowUp" || e.code === "ArrowLeft") {
      prevSlide();
    }
    if (e.code === "ArrowDown" || e.code === "ArrowRight" || e.code === "Space" || e.code === "Enter") {
      e.preventDefault();
      nextSlide();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [animating]);

  const currentDoctor = doctors[currentIndex];

  const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-light tracking-wide text-gray-900">
            TELECONSULTAS<span className="font-medium">IPS</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-12">
            <a href="/Tins" className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors tracking-wide">
              ADMINISTRADOR
            </a>
            <a href="/Pins" className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors tracking-wide">
              MÉDICO
            </a>
            <a href="/Sreg" className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors tracking-wide">
              PACIENTE
            </a>
            <a href="/Sins" className="text-sm font-medium text-gray-900 border-b border-gray-900 pb-1 tracking-wide">
              SERVICIOS
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

  return (
    <div
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-gray-50 text-gray-800 font-sans select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
        <Navbar/>

      {/* Main Content */}
      <div className="pt-20 h-full">
        <div className="max-w-7xl mx-auto px-6 h-full">
          <div className="grid grid-cols-12 gap-8 h-full py-12">
            
            {/* Left Column - Doctor Info */}
            <div className="col-span-12 lg:col-span-7 flex flex-col justify-center space-y-8">
              
              {/* Section Title */}
              <div className={`transform transition-all duration-600 ${
                animating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
              }`}>
                <p className="text-sm font-medium text-gray-500 tracking-wider uppercase mb-2">
                  NUESTRO EQUIPO
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-tight">
                  ESPECIALISTAS
                  <br />
                  <span className="font-bold">CERTIFICADOS</span>
                </h1>
              </div>

              {/* Doctor Details */}
              <div className={`space-y-6 transform transition-all duration-600 delay-100 ${
                animating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
              }`}>
                
                {/* Name and Specialty */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {currentDoctor.name}
                  </h2>
                  <p className="text-xl text-gray-600 mb-1">{currentDoctor.specialty}</p>
                  <p className="text-sm text-gray-500">{currentDoctor.experience}</p>
                </div>

                {/* Description */}
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {currentDoctor.description}
                  </p>
                </div>

                {/* Education & Certifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                      Formación Académica
                    </h3>
                    <p className="text-gray-700">{currentDoctor.education}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                      Idiomas
                    </h3>
                    <p className="text-gray-700">{currentDoctor.languages.join(", ")}</p>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                    Logros y Certificaciones
                  </h3>
                  <ul className="space-y-1">
                    {currentDoctor.achievements.map((achievement, index) => (
                      <li key={index} className="text-gray-700 text-sm flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Schedule */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                    Horarios de Atención
                  </h3>
                  <p className="text-gray-700">{currentDoctor.schedule}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button className="bg-gray-900 text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors">
                    VER PERFIL COMPLETO
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-8 py-3 text-sm font-medium hover:bg-gray-50 transition-colors">
                    AGENDAR CONSULTA
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Doctor Image */}
            <div className="col-span-12 lg:col-span-5 flex items-center justify-center">
              <div className={`w-full max-w-md transform transition-all duration-600 delay-200 ${
                animating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
              }`}>
                <div className="relative">
                  <div className="aspect-[4/5] rounded-lg overflow-hidden bg-gray-200 shadow-xl">
                    <img
                      src={currentDoctor.image}
                      alt={currentDoctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gray-900/5 rounded-full -z-10"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gray-900/5 rounded-full -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Counter */}
      <div className="fixed top-24 right-8 z-50">
        <div className="text-right bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-sm">
          <div className="text-3xl font-bold text-gray-900">
            {(currentIndex + 1).toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-gray-500 border-t border-gray-200 pt-1 mt-1">
            de {doctors.length.toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex space-x-2 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
          {doctors.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-gray-900 w-6' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir al doctor ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Instructions */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="text-right text-xs text-gray-500 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-sm">
          <p className="mb-1">🖱️ Scroll para navegar</p>
          <p className="mb-1">👆 Desliza en móvil</p>
          <p>⌨️ Usa las flechas</p>
        </div>
      </div>
    </div>
  );
};

export default MedicalProfile;