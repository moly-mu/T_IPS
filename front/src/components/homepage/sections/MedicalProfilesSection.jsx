
import { useState } from 'react';

const MedicalProfilesSection = () => {
  const [showAll, setShowAll] = useState(false);

  const doctors = [
    {
      id: 1,
      name: "Dr. Carlos Mendoza",
      specialty: "Cardiología",
      description: "Especialista en cardiología con 15 años de experiencia en diagnóstico y tratamiento de enfermedades cardiovasculares.",
      photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      rating: 4.8,
      reviews: 247,
      modality: "videollamada",
      availability: "Atención inmediata",
      price: 85000,
      isAvailable: true
    },
    {
      id: 2,
      name: "Dra. Ana Rodríguez",
      specialty: "Dermatología",
      description: "Dermatóloga certificada especializada en tratamientos estéticos y dermatología clínica.",
      photo: "https://images.unsplash.com/photo-1594824884009-6c3c6e4c6da7?w=400&h=400&fit=crop&crop=face",
      rating: 4.9,
      reviews: 189,
      modality: "chat",
      availability: "Atención inmediata",
      price: 65000,
      isAvailable: true
    },
    {
      id: 3,
      name: "Dr. Miguel Torres",
      specialty: "Pediatría",
      description: "Pediatra con amplia experiencia en atención infantil y medicina preventiva.",
      photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
      rating: 4.7,
      reviews: 312,
      modality: "llamada",
      availability: "Segun agenda",
      price: 70000,
      isAvailable: false
    },
    {
      id: 4,
      name: "Dra. Laura García",
      specialty: "Ginecología",
      description: "Ginecóloga especializada en salud reproductiva y medicina preventiva femenina.",
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      rating: 4.9,
      reviews: 425,
      modality: "videollamada",
      availability: "Segun agenda",
      price: 80000,
      isAvailable: true
    },
    {
      id: 5,
      name: "Dr. Roberto Silva",
      specialty: "Neurología",
      description: "Neurólogo con especialización en trastornos del sistema nervioso y neurología clínica.",
      photo: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face",
      rating: 4.6,
      reviews: 156,
      modality: "Atención inmediata",
      availability: "16 horas",
      price: 95000,
      isAvailable: true
    },
    {
      id: 6,
      name: "Dra. Patricia López",
      specialty: "Psiquiatría",
      description: "Psiquiatra especializada en trastornos de ansiedad, depresión y salud mental.",
      photo: "https://images.unsplash.com/photo-1594824884009-6c3c6e4c6da7?w=400&h=400&fit=crop&crop=face",
      rating: 4.8,
      reviews: 298,
      modality: "chat",
      availability: "Segun agenda",
      price: 75000,
      isAvailable: true
    }
  ];

  const displayedDoctors = showAll ? doctors : doctors.slice(0, 4);

  const handleSpecialtyClick = (specialty) => {
    console.log('Specialty clicked:', specialty);
  };

  const handleBookAppointment = (doctorId) => {
    console.log('Book appointment for doctor:', doctorId);
  };

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <div className="space-y-2 mb-8">
            <p className="text-sm font-light text-gray-500 tracking-widest uppercase">
              Profesionales Certificados
            </p>
            <div className="w-12 h-px bg-gray-900 mx-auto"></div>
          </div>
          <h2 className="text-5xl font-light text-gray-900 leading-tight mb-6">
            PERFILES
            <br />
            <span className="font-medium">MÉDICOS</span>
          </h2>
          <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Conecta con especialistas certificados disponibles para atenderte desde la comodidad de tu hogar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {displayedDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-gray-50 rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={doctor.photo} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-sm">
                  <span className="text-sm font-medium text-gray-900">
                    ${Math.round(doctor.price / 1000)}k/hr
                  </span>
                </div>
                {doctor.isAvailable && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-sm text-xs font-medium">
                    disponible
                  </div>
                )}
                <div 
                  className="absolute bottom-4 left-4 bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-sm text-sm font-light cursor-pointer hover:bg-gray-900 transition-all duration-200"
                  onClick={() => handleSpecialtyClick(doctor.specialty)}
                >
                  {doctor.specialty}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-light text-gray-900 mb-2 leading-tight">
                  {doctor.name}
                </h3>
                <p className="text-gray-600 text-sm font-light leading-relaxed mb-4 line-clamp-2">
                  {doctor.description}
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        doctor.modality === 'videollamada' ? 'bg-blue-500' :
                        doctor.modality === 'llamada' ? 'bg-green-500' :
                        'bg-purple-500'
                      }`}></div>
                      <span className="text-sm font-light text-gray-600 capitalize">{doctor.modality}</span>
                    </div>
                    <span className="text-sm font-light text-gray-500">{doctor.availability.replace('horas', 'h')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-light text-gray-600">{doctor.rating}</span>
                    </div>
                    <span className="text-sm font-light text-gray-500">{doctor.reviews.toLocaleString()} reseñas</span>
                  </div>
                </div>
                <button
                  onClick={() => handleBookAppointment(doctor.id)}
                  className="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-sm text-sm font-medium tracking-wide transition-all duration-200"
                >
                  VER PERFIL
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-white border border-gray-200 text-gray-900 px-8 py-4 text-sm font-medium tracking-wide hover:bg-gray-50 transition-colors"
          >
            {showAll ? 'VER MENOS' : 'VER MÁS MÉDICOS'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default MedicalProfilesSection;


