import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, CalendarDays, Zap, Phone, Video, MapPin } from 'lucide-react';
import ConfirmationAppointment from './appointment/ConfirmationAppointment';
import axios from 'axios';

const MedicalCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState('anytime');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar especialistas desde la base de datos
  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/admin/profesional');
        
        // Transformar los datos para que coincidan con el formato esperado del componente
        const transformedDoctors = response.data.map(specialist => {
          const specialty = specialist.specialties[0]; // Tomar la primera especialidad
          
          return {
            id: specialist.id,
            name: specialist.name,
            specialty: specialty?.name || 'Consulta General',
            rating: specialist.rating || 4.5,
            reviews: Math.floor(Math.random() * 200) + 50, // Reviews simulados por ahora
            availableNow: specialist.status === 'Activo',
            price: `$${specialty?.price?.toLocaleString() || '80.000'}`,
            consultationTypes: ['videollamada'],
            location: specialist.biography || 'Especialista médico profesional',
            disponible: specialist.status === 'Activo' ? 'Disponible ahora' : 'No disponible',
            workSchedule: specialist.schedule,
            timeSlots: generateTimeSlots(specialist.schedule?.start, specialist.schedule?.end)
          };
        });
        
        setDoctors(transformedDoctors);
        setError(null);
      } catch (err) {
        console.error('Error al cargar especialistas:', err);
        setError('Error al cargar especialistas. Usando datos de ejemplo.');
        // Fallback a datos de ejemplo si falla la API
        setDoctors([
          {
            id: 1,
            name: 'Dra. María Gómez',
            specialty: 'Cardiología',
            rating: 4.8,
            reviews: 95,
            availableNow: true,
            price: '$120.000',
            consultationTypes: ['videollamada'],
            location: 'Especialista en cardiología con enfoque en medicina preventiva.',
            disponible: 'Disponible ahora',
            timeSlots: ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM']
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialists();
  }, []);

  // Función para generar slots de tiempo basados en el horario de trabajo
  const generateTimeSlots = (startTime, endTime) => {
    if (!startTime || !endTime) {
      // Horario por defecto si no hay horario definido
      return [
        '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '12:00 PM', '2:00 PM', '2:30 PM', '3:00 PM',
        '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM'
      ];
    }

    const slots = [];
    const start = new Date(startTime);
    const end = new Date(endTime);
    const current = new Date(start);
    
    while (current < end) {
      const hours = current.getHours();
      const minutes = current.getMinutes();
      
      // Formato 12 horas
      const period = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
      const timeString = `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
      
      slots.push(timeString);
      
      // Incrementar 30 minutos
      current.setMinutes(current.getMinutes() + 30);
    }
    
    return slots.length > 0 ? slots : [
      '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
      '11:00 AM', '11:30 AM', '12:00 PM', '2:00 PM', '2:30 PM', '3:00 PM'
    ];
  };
  
  //Agregar Filtro por lenguage 
  //Agregar Filtro por especialidad
  //Calendario por especialidad 
  //

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  // Función corregida para obtener doctores disponibles en una fecha específica
  const getDoctorsForDate = (dateString) => {
    // Crear un hash simple basado en la fecha para determinar qué doctores están disponibles
    // Esto asegura que los mismos doctores siempre estén disponibles en la misma fecha
    const hash = dateString.split('-').reduce((acc, val) => acc + parseInt(val), 0);
    
    return doctors.filter((doctor, index) => {
      // Usar el hash y el índice del doctor para determinar disponibilidad de forma consistente
      return (hash + index) % 3 !== 0; // Aproximadamente 2/3 de los doctores estarán disponibles
    });
  };

  const handlePrevious = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNext = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    if (day) {
      const dateString = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
      setSelectedDate(dateString);
      setSelectedDoctor(null);
      setSelectedTime('');
    }
  };

  

  const getConsultationIcon = (type) => {
    switch (type) {
      case 'videollamada': return <Video className="w-3 h-3" />;
      case 'llamada': return <Phone className="w-3 h-3" />;
      case 'presencial': return <MapPin className="w-3 h-3" />;
      default: return <Video className="w-3 h-3" />;
    }
  };

  const Navbar = () => {
    return (
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-light tracking-wide text-gray-900">
              TELECONSULTAS<span className="font-medium">IPS</span>
            </a>
            
            <div className="hidden md:flex items-center space-x-12">
              <a href="/Tins" className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors tracking-wide">
                ADMINISTRADOR
              </a>
              <a href="/Sins" className="text-sm font-medium text-gray-900 border-b border-gray-900 pb-1 tracking-wide">
                INICIAR SESIÓN
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  };

  const renderCalendarView = () => {
    const days = getDaysInMonth(currentDate);
    const today = new Date();
    const isToday = (day) => {
      return day && 
            currentDate.getFullYear() === today.getFullYear() &&
            currentDate.getMonth() === today.getMonth() &&
            day === today.getDate();
    };

    return (
      <div className="bg-white border border-gray-200 max-w-xs mt-11">
        <div className="border-b border-gray-200 p-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-black">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <div className="flex gap-1">
              <button
                onClick={handlePrevious}
                className="p-1 hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button
                onClick={handleNext}
                className="p-1 hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 border-b border-gray-100">
          {dayNames.map(day => (
            <div key={day} className="text-center text-gray-400 text-xs py-2 font-medium">
              {day.slice(0, 2)}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            const dateString = day ? formatDate(currentDate.getFullYear(), currentDate.getMonth(), day) : '';
            const availableDoctors = day ? getDoctorsForDate(dateString) : [];
            
            return (
              <div
                key={index}
                className={`h-8 p-1 border-r border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors text-center ${
                  isToday(day) ? 'bg-gray-50' : ''
                } ${index % 7 === 6 ? 'border-r-0' : ''} ${
                  selectedDate === dateString ? 'bg-black text-white' : ''
                }`}
                onClick={() => handleDateClick(day)}>
                {day && (
                  <div className="relative">
                    <div className={`text-xs ${
                      selectedDate === dateString ? 'text-white' : 
                      isToday(day) ? 'text-black font-medium' : 'text-gray-700'
                    }`}>
                      {day}
                    </div>
                    {availableDoctors.length > 0 && (
                      <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                        selectedDate === dateString ? 'bg-white' : 'bg-black'
                      }`}></div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderInstantCards = () => {
    const availableNow = doctors.filter(doctor => doctor.availableNow);
    
    return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableNow.map(doctor => (
              <div key={doctor.id} className="bg-white border border-gray-200 p-6 hover:border-black transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{doctor.photo}</div>
                    <div>
                      <h3 className="font-medium text-black">{doctor.name}</h3>
                      <p className="text-sm text-gray-500">{doctor.specialty}</p>
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-black fill-current" />
                    <span>{doctor.rating}</span>
                    <span className="text-xs">({doctor.reviews} reseñas)</span>
                  </div>
                </div>

                <div className="text-ml text-gray-500 mb-4 line-clamp-2">
                  {doctor.location}
                </div>

                <div className="flex gap-1 mb-4">
                  {doctor.consultationTypes.map(type => (
                    <div key={type} className="flex items-center gap-1 text-xs text-gray-500">
                      {getConsultationIcon(type)}
                      <span className="capitalize">{type}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-medium text-black">{doctor.price}</span>
                    <span className="text-xs text-gray-500 ml-1">por consulta</span>
                  </div>
                  <button 
                    className="bg-black text-white px-4 py-2 text-sm hover:bg-gray-800 transition-colors"
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      setIsModalOpen(true);
                    }}
                  >
                    Agendar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal de Confirmación */}
          {isModalOpen && selectedDoctor && (
            <ConfirmationAppointment
              selectedDoctor={selectedDoctor}
              selectedTime={selectedTime}
              selectedDate={selectedDate}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </>
      );
    };

  const renderDoctorsList = () => {
    if (!selectedDate) return null;
    
    const availableDoctors = getDoctorsForDate(selectedDate);
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-black">
          {new Date(selectedDate).toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableDoctors.map(doctor => (
            <div 
              key={doctor.id} 
              className={`border p-4 cursor-pointer transition-colors ${
                selectedDoctor?.id === doctor.id 
                  ? 'border-black bg-[#30960b] text-white' 
                  : 'border-gray-200 hover:border-black'
              }`}
              onClick={() => setSelectedDoctor(doctor)}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="text-xl">{doctor.photo}</div>
                <div>
                  <h4 className="font-medium">{doctor.name}</h4>
                  <p className={`text-sm ${selectedDoctor?.id === doctor.id ? 'text-gray-300' : 'text-gray-500'}`}>
                    {doctor.specialty}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{doctor.rating}</span>
                  <span className="text-xs">({doctor.reviews} reseñas)</span>
                </div>
                <div className="text-lg font-medium">{doctor.price}</div>
              </div>
            </div>
          ))}
        </div>

        {selectedDoctor && (
          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-medium text-black mb-4">Horarios disponibles</h4>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
              {selectedDoctor.timeSlots?.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-3 py-2 text-sm border transition-colors ${
                    selectedTime === time
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 hover:border-black'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
            
            {selectedTime && (
              <button className="w-full bg-black text-white py-3 text-sm hover:bg-gray-800 transition-colors"
              onClick={() => setIsModalOpen(true)}
              >
                Confirmar cita - {selectedTime}
              </button>
            )}

            {isModalOpen && (
              <ConfirmationAppointment
                selectedTime={selectedTime}
                selectedDoctor={selectedDoctor}
                selectedDate={selectedDate}
                onClose={() => setIsModalOpen(false)} 
              />
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 pt-32">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-medium text-black">Calendario Médico</h1>
          </div>
          
          <div className="flex gap-1">
            <button
              onClick={() => setSelectedView('anytime')}
              className={`px-4 py-2 text-sm transition-colors flex items-center gap-2 ${
                selectedView === 'anytime' 
                  ? 'bg-black text-white' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              Agendar
            </button>
            <button
              onClick={() => setSelectedView('instant')}
              className={`px-4 py-2 text-sm transition-colors flex items-center gap-2 ${
                selectedView === 'instant' 
                  ? 'bg-black text-white' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Zap className="w-4 h-4" />
              Ahora
            </button>
          </div>
        </div>

        {/* Content */}
        {selectedView === 'anytime' ? (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content - Takes 3/4 of the space */}
            <div className="xl:col-span-3 mt-11">
              {loading ? (
                <div className="bg-gray-50 border border-gray-200 p-8 text-center">
                  <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-500 text-lg">Cargando especialistas...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 p-8 text-center">
                  <p className="text-red-600 text-lg mb-4">{error}</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Reintentar
                  </button>
                </div>
              ) : selectedDate ? (
                renderDoctorsList()
              ) : (
                <div className="bg-gray-50 border border-gray-200 p-8 text-center">
                  <CalendarDays className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Selecciona una fecha en el calendario para ver los médicos disponibles</p>
                </div>
              )}
            </div>
            
            {/* Sidebar Calendar - Takes 1/4 of the space */}
            <div className="xl:col-span-1">
              <div className="sticky top-32">
                {renderCalendarView()}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-black mb-1">Disponible Ahora</h2>
              <p className="text-gray-500 text-sm">Médicos listos para consulta inmediata</p>
            </div>
            {renderInstantCards()}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalCalendar;