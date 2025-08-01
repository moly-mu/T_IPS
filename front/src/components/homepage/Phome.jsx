import { useRef, useEffect } from 'react';
import Footer from "../layout/Footer";
import ServicesSection from './sections/ServicesSection';
import AdditionalServices from './sections/AdditionalServices';
import PaymentMethods from './sections/PaymentMethods';
import MedicalProfiles from './sections/MedicalProfiles';
import homeImage from '../../assets/home.png';
import MedicalProfilesSection from './sections/MedicalProfilesSection';
import { Link } from 'react-router-dom';
;


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
            <a href="/Sins" className="text-sm font-medium text-gray-900 border-b border-gray-900 pb-1 tracking-wide">
              PACIENTE
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const elements = [titleRef.current, subtitleRef.current, imageRef.current];
    
    elements.forEach((el, index) => {
      if (el) {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, index * 300);
      }
    });
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-sm font-light text-gray-500 tracking-widest uppercase">
                Certificado Ministerio de Salud
              </p>
              <div className="w-12 h-px bg-gray-900"></div>
            </div>
            
            <div ref={titleRef} className="opacity-0 transform translate-y-8 transition-all duration-1000">
              <h1 className="text-6xl lg:text-7xl font-light text-gray-900 leading-tight">
                ATENCIÓN
                <br />
                <span className="font-medium">MÉDICA</span>
                <br />
                VIRTUAL
              </h1>
            </div>
            
            <div ref={subtitleRef} className="opacity-0 transform translate-y-8 transition-all duration-1000 delay-300">
              <p className="text-lg font-light text-gray-600 max-w-md leading-relaxed">
                Conecta con especialistas certificados desde cualquier lugar. 
                Diagnósticos precisos y tratamientos personalizados las 24 horas.
              </p>
            </div>

            <div className="flex items-center space-x-8 pt-8">
              <Link to="/calendarQuotes">
              <button className="bg-gray-900 text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors">
                AGENDAR CONSULTA
              </button>
              </Link>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
                <span className="text-sm text-gray-600">250+ médicos en línea</span>
              </div>
            </div>
          </div>

          <div ref={imageRef} className="opacity-0 transform translate-y-8 transition-all duration-1000 delay-600">
            <img
              src={homeImage} 
              alt="home"
              className="rounded-sm w-2/3 h-auto object-cover"
            />

            <div className="absolute -bottom-4 -right-4 bg-white p-6 shadow-lg rounded-sm">
              <div className="text-center">
                <div className="text-2xl font-light text-gray-900">24/7</div>
                <div className="text-xs text-gray-500 tracking-wide">DISPONIBLE</div>
              </div>
            </div>
          </div>
          </div>
      </div>
    </section>
  );
};


const Phome = () => {
  return (
    <div className="font-sans bg-white text-gray-900 antialiased">
      <Navbar />
      <Hero />
      <MedicalProfilesSection/>
      <MedicalProfiles/>
      <PaymentMethods/>
      <ServicesSection/>
      <AdditionalServices/>
      <Footer />
    </div>
  );
};

export default Phome;
