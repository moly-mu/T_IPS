import { useState } from 'react';
import { Star, MapPin} from 'lucide-react';

const DoctorProfileAfterLogin = () => {
  const [selectedDate, setSelectedDate] = useState('Mañana');
  const [selectedTime, setSelectedTime] = useState('');
  const [activeTab, setActiveTab] = useState('experiencia');
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  const doctorData = {
    name: "Dr. Juan Pérez",
    specialty: "Medicina General",
    rating: 4.5,
    reviews: 128,
    price: 80000,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
    location: "MEDELLÍN",
    experience: "Médico general con 10 años de experiencia en atención primaria. Especializado en medicina preventiva y atención integral del paciente.",
    services: [
      { name: "Consulta Medicina General", price: 80000 },
      { name: "Control de Hipertensión", price: 75000 },
      { name: "Examen Médico Preventivo", price: 90000 }
    ],
    schedule: {
      "Hoy": ["09:00", "10:00", "11:00", "14:00", "15:00"],
      "Mañana": ["08:00", "09:00", "10:00", "11:00", "16:00", "17:00"],
      "Vie": ["08:00", "09:00", "11:00", "14:00"],
      "Sáb": ["09:00", "10:00", "11:00"]
    }
  };

  const dates = ["Hoy", "Mañana", "Vie", "Sáb"];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-gray-900 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

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

  return (
    <>
      <Navbar />
      <div className="mt-20 max-w-6xl mx-auto p-8 bg-white min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="flex gap-8">
              <img
                src={doctorData.image}
                alt={doctorData.name}
                className="w-24 h-24 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 space-y-3">
                <h1 className="text-2xl font-light text-gray-900">{doctorData.name}</h1>
                <p className="text-gray-600 text-sm">{doctorData.specialty}</p>
                <div className="flex items-center gap-2">
                  {renderStars(doctorData.rating)}
                  <span className="text-sm text-gray-600">{doctorData.reviews} opiniones</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{doctorData.location}</span>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {[
                  { id: 'experiencia', label: 'Experiencia' },
                  { id: 'servicios', label: 'Servicios' },
                  { id: 'opiniones', label: 'Opiniones' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 text-sm font-light transition-colors ${
                      activeTab === tab.id
                        ? 'text-gray-900 border-b border-gray-900'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="py-8">
              {activeTab === 'experiencia' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-light text-gray-900">Experiencia</h3>
                  <p className="text-gray-600 leading-relaxed">{doctorData.experience}</p>
                </div>
              )}

              {activeTab === 'servicios' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-light text-gray-900">Servicios</h3>
                  <div className="space-y-4">
                    {doctorData.services.map((service, index) => (
                      <div key={index} className="flex items-center justify-between py-4 border-b border-gray-100">
                        <div>
                          <h4 className="font-light text-gray-900">{service.name}</h4>
                          <p className="text-sm text-gray-600">${service.price.toLocaleString()}</p>
                        </div>
                        <button className="text-sm text-gray-900 hover:underline">
                          Agendar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'opiniones' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-light text-gray-900">{doctorData.reviews} opiniones</h3>
                    <div className="flex items-center gap-2">
                      {renderStars(doctorData.rating)}
                      <span className="text-sm text-gray-600">{doctorData.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="border-b border-gray-100 pb-6">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-light">Dahianna C.</span>
                            <span className="text-xs text-gray-500">25 jun 2025</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {renderStars(5)}
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            Me siento feliz con los resultados. No había podido encontrar mejoría hasta que encontré al doctor.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-lg font-light text-gray-900">Agendar cita</h3>
                <div className="flex gap-2">
                  {dates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`px-4 py-2 text-sm font-light transition-colors ${
                        selectedDate === date
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {date}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {doctorData.schedule[selectedDate]?.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 text-sm font-light transition-colors ${
                        selectedTime === time
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Modalidad</p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs bg-gray-900 text-white">Videollamada</button>
                    <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700">Llamada</button>
                    <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700">Chat</button>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Primera visita</p>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="firstVisit"
                        checked={isFirstVisit}
                        onChange={() => setIsFirstVisit(true)}
                        className="w-3 h-3"
                      />
                      <span className="text-sm">Sí</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="firstVisit"
                        checked={!isFirstVisit}
                        onChange={() => setIsFirstVisit(false)}
                        className="w-3 h-3"
                      />
                      <span className="text-sm">No</span>
                    </label>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gray-900 text-white py-3 text-sm font-light hover:bg-gray-800 transition-colors">
                Confirmar cita
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DoctorProfileAfterLogin;