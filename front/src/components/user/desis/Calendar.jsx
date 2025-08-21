import { useState, useEffect, useContext, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, X, Edit3, Trash2 } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import Barral from '../desis/Barral';

const Calendar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useContext(AuthContext);
  const [currentDate, setCurrentDate] = useState(new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())));
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventColor, setEventColor] = useState('blue');
  const [eventTime, setEventTime] = useState('all-day');
  const [editingEvent, setEditingEvent] = useState(null);
  const [view, setView] = useState('month');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const fullDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const timeSlots = [
    'all-day', '6am', '7am', '8am', '9am', '10am', '11am', '12pm',
    '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm'
  ];

  // Función de navegación movida al nivel del componente
  const handleNavigation = (route) => {
    navigate(route);
  };

  // Cargar eventos del backend
  const fetchCalendarEvents = useCallback(async () => {
    if (!token) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get("http://localhost:3000/specialist/calendar/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log('📡 Eventos recibidos del backend:', response.data);
      console.log('🏥 Citas médicas encontradas:', response.data.filter(e => e.type === 'appointment'));
      console.log('📝 Eventos personales encontrados:', response.data.filter(e => e.type !== 'appointment'));
      
      setEvents(response.data);
    } catch (err) {
      console.error("Error al cargar eventos:", err);
      setError("Error al cargar los eventos del calendario");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchCalendarEvents();
    }
  }, [token, fetchCalendarEvents]);

  // Crear evento
  const createEvent = async (eventData) => {
    if (!token) return;
    
    try {
      const response = await axios.post(
        "http://localhost:3000/specialist/calendar/events",
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // El evento ya se recargará con fetchCalendarEvents
      return response.data.event;
    } catch (err) {
      console.error("Error al crear evento:", err);
      setError("Error al crear el evento");
      throw err;
    }
  };

  // Actualizar evento
  const updateEvent = async (eventId, eventData) => {
    if (!token) return;
    
    try {
      const response = await axios.put(
        `http://localhost:3000/specialist/calendar/events/${eventId}`,
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // El evento ya se recargará con fetchCalendarEvents
      return response.data.event;
    } catch (err) {
      console.error("Error al actualizar evento:", err);
      setError("Error al actualizar el evento");
      throw err;
    }
  };

  // Eliminar evento
  const deleteEvent = async (eventId) => {
    if (!token) return;
    
    try {
      await axios.delete(
        `http://localhost:3000/specialist/calendar/events/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // El evento ya se eliminará cuando se recarguen los eventos
    } catch (err) {
      console.error("Error al eliminar evento:", err);
      setError("Error al eliminar el evento");
      throw err;
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(Date.UTC(year, month, 1));
    const lastDay = new Date(Date.UTC(year, month + 1, 0));
    const daysInMonth = lastDay.getUTCDate();
    const startingDayOfWeek = firstDay.getUTCDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getWeekDays = (date) => {
    const start = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const day = start.getUTCDay();
    const diff = start.getUTCDate() - day;
    start.setUTCDate(diff);
    
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(Date.UTC(start.getFullYear(), start.getMonth(), start.getUTCDate() + i));
      week.push(day);
    }
    return week;
  };

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const formatDateFromDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
  };

  const getEventsForDate = (dateString) => {
    const filteredEvents = events.filter(event => event.date === dateString);
    
    // Debug para la vista de día
    if (view === 'day') {
      console.log('🔍 Debug Vista Día:');
      console.log('📅 Fecha buscada:', dateString);
      console.log('📋 Todos los eventos:', events);
      console.log('🎯 Eventos filtrados:', filteredEvents);
    }
    
    return filteredEvents;
  };

  const handlePrevious = () => {
    if (view === 'month') {
      setCurrentDate(new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)));
    } else if (view === 'week') {
      const newDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getUTCDate() - 7));
      setCurrentDate(newDate);
    } else if (view === 'day') {
      const newDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getUTCDate() - 1));
      setCurrentDate(newDate);
    }
  };

  const handleNext = () => {
    if (view === 'month') {
      setCurrentDate(new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)));
    } else if (view === 'week') {
      const newDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getUTCDate() + 7));
      setCurrentDate(newDate);
    } else if (view === 'day') {
      const newDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getUTCDate() + 1));
      setCurrentDate(newDate);
    }
  };

  const getTitle = () => {
    if (view === 'month') {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    } else if (view === 'week') {
      const weekDays = getWeekDays(currentDate);
      const start = weekDays[0];
      const end = weekDays[6];
      return `${monthNames[start.getMonth()].substring(0, 3)} ${start.getUTCDate()} – ${end.getUTCDate()}, ${start.getFullYear()}`;
    } else if (view === 'day') {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getUTCDate()}, ${currentDate.getFullYear()}`;
    }
  };

  const handleAddEvent = () => {
    setShowModal(true);
    setEditingEvent(null);
    setEventTitle('');
    setEventColor('blue');
    setEventTime('all-day');
    setSelectedDate(formatDateFromDate(currentDate));
  };

  const handleDateClick = (day) => {
    if (day) {
      const dateString = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
      setSelectedDate(dateString);
      setShowModal(true);
      setEditingEvent(null);
      setEventTitle('');
      setEventColor('blue');
      setEventTime('all-day');
    }
  };

  const handleSaveEvent = async () => {
    if (eventTitle.trim() && selectedDate) {
      try {
        const eventData = {
          title: eventTitle,
          description: '', // Campo de descripción opcional
          date: selectedDate,
          color: eventColor,
          time: eventTime,
          type: 'personal'
        };

        if (editingEvent) {
          // Actualizar evento existente
          await updateEvent(editingEvent.id, eventData);
        } else {
          // Crear nuevo evento
          await createEvent(eventData);
        }
        
        setShowModal(false);
        setEventTitle('');
        setSelectedDate('');
        setEditingEvent(null);
        
        // Recargar eventos para mostrar cambios
        await fetchCalendarEvents();
      } catch (err) {
        console.error("Error al guardar evento:", err);
        // El error ya se maneja en las funciones createEvent/updateEvent
      }
    }
  };

  const handleEditEvent = (event) => {
    // Solo permitir editar eventos personalizados (no citas médicas)
    if (!event.id.startsWith('custom_')) {
      setError("No se pueden editar citas médicas desde el calendario. Use la sección de citas para modificarlas.");
      return;
    }

    setEditingEvent(event);
    setEventTitle(event.title);
    setEventColor(event.color);
    setEventTime(event.time);
    setSelectedDate(event.date);
    setShowModal(true);
  };

  const handleDeleteEvent = async (eventId) => {
    // Solo permitir eliminar eventos personalizados (no citas médicas)
    if (!eventId.startsWith('custom_')) {
      setError("No se pueden eliminar citas médicas desde el calendario");
      return;
    }

    try {
      await deleteEvent(eventId);
      // Recargar eventos para reflejar cambios
      await fetchCalendarEvents();
    } catch (err) {
      console.error("Error al eliminar evento:", err);
      // El error ya se maneja en la función deleteEvent
    }
  };

  const getColorClasses = (color) => {
    const colorMap = {
      red: 'bg-red-50 border-l-red-500 text-red-700',
      green: 'bg-green-50 border-l-green-500 text-green-700',
      blue: 'bg-blue-50 border-l-blue-500 text-blue-700',
      purple: 'bg-purple-50 border-l-purple-500 text-purple-700',
      yellow: 'bg-yellow-50 border-l-yellow-500 text-yellow-700',
      pink: 'bg-pink-50 border-l-pink-500 text-pink-700'
    };
    return colorMap[color] || colorMap.blue;
  };

  const getColorClassesDark = (color) => {
    const colorMap = {
      red: 'bg-red-500 border-red-600',
      green: 'bg-green-500 border-green-600',
      blue: 'bg-blue-500 border-blue-600',
      purple: 'bg-purple-500 border-purple-600',
      yellow: 'bg-yellow-500 border-yellow-600',
      pink: 'bg-pink-500 border-pink-600'
    };
    return colorMap[color] || colorMap.blue;
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
    const isToday = (day) => {
      return day && 
             currentDate.getFullYear() === todayUTC.getFullYear() &&
             currentDate.getMonth() === todayUTC.getMonth() &&
             day === todayUTC.getUTCDate();
    };

    return (
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="grid grid-cols-7 border-b border-gray-200">
          {dayNames.map(day => (
            <div key={day} className="text-center text-gray-500 text-sm font-medium py-4 px-2 bg-gray-50">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            const dateString = day ? formatDate(currentDate.getFullYear(), currentDate.getMonth(), day) : '';
            const dayEvents = day ? getEventsForDate(dateString) : [];
            
            return (
              <div
                key={index}
                className={`h-32 p-2 border-r border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer ${
                  isToday(day) ? 'bg-blue-50 border-blue-200' : 'bg-white'
                } ${index % 7 === 6 ? 'border-r-0' : ''}`}
                onClick={() => handleDateClick(day)}>
                {day && (
                  <>
                    <div className={`text-sm mb-2 font-medium ${
                      isToday(day) ? 'text-blue-600' : 'text-gray-700'
                    }`}>
                      {day}
                    </div>
                    <div className="space-y-1 overflow-hidden">
                      {dayEvents.slice(0, 2).map(event => (
                        <div
                          key={event.id}
                          className={`text-xs px-2 py-1 rounded border-l-4 ${getColorClasses(event.color)} truncate group relative`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="truncate flex-1">
                              <span className="truncate block">{event.title}</span>
                              {event.type === 'appointment' && event.startTime && (
                                <span className="text-xs text-gray-500 block">
                                  {new Date(event.startTime).toLocaleTimeString('es-ES', { 
                                    hour: '2-digit', 
                                    minute: '2-digit',
                                    timeZone: 'UTC'
                                  })}
                                </span>
                              )}
                            </div>
                            {event.type !== 'appointment' && (
                              <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-1 ml-1 transition-opacity">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditEvent(event);
                                  }}
                                  className="p-1 hover:bg-black/20 rounded"
                                >
                                  <Edit3 className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteEvent(event.id);
                                  }}
                                  className="p-1 hover:bg-black/20 rounded"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-500 pl-2">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);
    
    return (
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="grid grid-cols-8 border-b border-gray-200">
          <div className="p-4 text-sm font-medium text-gray-500 bg-gray-50"></div>
          {weekDays.map((day, index) => (
            <div key={index} className="p-4 text-center border-l border-gray-200">
              <div className="text-sm font-medium text-gray-500">
                {dayNames[index]}
              </div>
              <div className="text-lg font-bold text-gray-900 mt-1">
                {day.getUTCDate()}
              </div>
            </div>
          ))}
        </div>

        <div className="max-h-96 overflow-y-auto">
          {timeSlots.map((time) => (
            <div key={time} className="grid grid-cols-8 border-b border-gray-100 min-h-16">
              <div className="p-3 text-sm text-gray-500 bg-gray-50 border-r border-gray-200 flex items-start">
                {time}
              </div>
              {weekDays.map((day, dayIndex) => {
                const dateString = formatDateFromDate(day);
                const dayEvents = getEventsForDate(dateString);
                
                // Filtrar eventos para este slot de tiempo
                const timeEvents = dayEvents.filter(event => {
                  if (event.time === time) {
                    return true;
                  }
                  
                  // Para citas médicas, verificar si el horario está dentro del slot
                  if (event.type === 'appointment' && event.startTime) {
                    const eventDate = new Date(event.startTime);
                    const eventHour = eventDate.getUTCHours();
                    
                    // Convertir el slot de tiempo a hora
                    let slotHour = 0;
                    if (time !== 'all-day') {
                      if (time.includes('am')) {
                        slotHour = parseInt(time.replace('am', ''));
                        if (slotHour === 12) slotHour = 0;
                      } else if (time.includes('pm')) {
                        slotHour = parseInt(time.replace('pm', ''));
                        if (slotHour !== 12) slotHour += 12;
                      }
                      
                      // Verificar si el evento está en esta hora
                      return eventHour === slotHour;
                    }
                  }
                  
                  return false;
                });
                
                return (
                  <div key={dayIndex} className="p-2 border-l border-gray-200 relative">
                    {timeEvents.map(event => (
                      <div
                        key={event.id}
                        className={`text-xs px-2 py-1 rounded border-l-4 ${getColorClasses(event.color)} mb-1 group relative cursor-pointer`}
                        onClick={() => handleEditEvent(event)}>
                        <div className="flex items-center justify-between">
                          <span className="truncate">
                            {event.type === 'appointment' ? 
                              `${event.title}` : 
                              event.title
                            }
                          </span>
                          {event.type !== 'appointment' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteEvent(event.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-black/20 rounded transition-opacity">
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        {event.type === 'appointment' && (
                          <div className="text-xs text-gray-600 mt-1">
                            {event.specialty}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dateString = formatDateFromDate(currentDate);
    const dayName = fullDayNames[currentDate.getUTCDay()];
    const dayEvents = getEventsForDate(dateString);
    const dayAppointments = dayEvents.filter(event => event.type === 'appointment');
    const dayPersonalEvents = dayEvents.filter(event => event.type !== 'appointment');
    
    return (
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700">{dayName.toUpperCase()}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {currentDate.getUTCDate()} {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </p>
          
          {/* Resumen del día */}
          <div className="mt-4 flex gap-4 text-sm">
            <div className="bg-blue-100 px-3 py-1 rounded-full">
              <span className="text-blue-800 font-medium">{dayAppointments.length} Citas médicas</span>
            </div>
            <div className="bg-green-100 px-3 py-1 rounded-full">
              <span className="text-green-800 font-medium">{dayPersonalEvents.length} Eventos personales</span>
            </div>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {timeSlots.map((time) => {
            const dayEvents = getEventsForDate(dateString);
            
            // Filtrar eventos para este slot de tiempo
            const timeEvents = dayEvents.filter(event => {
              // Si es un evento personalizado, verificar coincidencia exacta de tiempo
              if (event.time === time) {
                return true;
              }
              
              // Para citas médicas, verificar si el horario está dentro del slot
              if (event.type === 'appointment' && event.startTime) {
                const eventDate = new Date(event.startTime);
                const eventHour = eventDate.getUTCHours();
                
                // Convertir el slot de tiempo a hora
                let slotHour = 0;
                if (time !== 'all-day') {
                  if (time.includes('am')) {
                    slotHour = parseInt(time.replace('am', ''));
                    if (slotHour === 12) slotHour = 0; // 12am = 0 horas
                  } else if (time.includes('pm')) {
                    slotHour = parseInt(time.replace('pm', ''));
                    if (slotHour !== 12) slotHour += 12; // 1pm = 13 horas, pero 12pm = 12 horas
                  }
                  
                  // Verificar si el evento está en esta hora
                  return eventHour === slotHour;
                }
              }
              
              return false;
            });
            
            return (
              <div key={time} className="flex border-b border-gray-100 min-h-20">
                <div className="w-24 p-4 text-sm text-gray-500 bg-gray-50 border-r border-gray-200 flex items-start">
                  {time}
                </div>
                <div className="flex-1 p-4 bg-white">
                  {timeEvents.map(event => (
                    <div
                      key={event.id}
                      className={`text-sm px-3 py-2 rounded border-l-4 ${getColorClasses(event.color)} mb-2 group relative cursor-pointer`}
                      onClick={() => event.type !== 'appointment' ? handleEditEvent(event) : null}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <span className="truncate block font-medium">
                            {event.title}
                          </span>
                          {event.type === 'appointment' && (
                            <div className="text-xs text-gray-600 mt-1">
                              <div><strong>Especialidad:</strong> {event.specialty}</div>
                              <div><strong>Paciente:</strong> {event.patientName}</div>
                              <div><strong>Estado:</strong> {event.state}</div>
                              {event.startTime && (
                                <div><strong>Hora:</strong> {new Date(event.startTime).toLocaleTimeString('es-ES', { 
                                  hour: '2-digit', 
                                  minute: '2-digit',
                                  timeZone: 'UTC'
                                })} - {new Date(event.endTime).toLocaleTimeString('es-ES', { 
                                  hour: '2-digit', 
                                  minute: '2-digit',
                                  timeZone: 'UTC'
                                })}</div>
                              )}
                              {event.linkZoom && (
                                <div className="mt-2">
                                  <a 
                                    href={event.linkZoom} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 text-xs underline"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    🔗 Unirse a la consulta
                                  </a>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        {event.type !== 'appointment' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteEvent(event.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-black/20 rounded transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {timeEvents.length === 0 && (
                    <div className="text-gray-400 text-sm italic">Sin eventos programados</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Barral/>

      <div className="ml-64 min-h-screen bg-gray-100">
        <div className="-mt-244 px-6 pt-6">
          {/* Error notification */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <X className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
                <div className="ml-auto pl-3">
                  <button
                    onClick={() => setError(null)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Loading indicator */}
          {loading && (
            <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <p className="ml-3 text-sm text-blue-800">Cargando eventos...</p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={handlePrevious}
                  className="p-2 rounded-lg hover:bg-gray-100 border border-gray-200 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-lg hover:bg-gray-100 border border-gray-200 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={handleAddEvent}
                className="flex items-center gap-2 bg-[#00102D] hover:bg-[#003366] px-4 py-2 rounded-lg transition-colors text-white"
>
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </button>
              
              {/* Botones de navegación al lado de Add Event */}
              <div className="flex gap-2 ml-2">
                <button
                  onClick={() => handleNavigation('/calendar')}
                  className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                    location.pathname === '/' 
                      ? 'bg-[#00102D] text-white' 
                      : 'bg-[#00102D] text-gray-200'}`}>
                      Calendar
                </button>
                <button
                  onClick={() => handleNavigation('/listopc')}
                  className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                    location.pathname === '/listopc' 
                      ? 'bg-[#00102D] text-white' 
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                      List
                </button>
              </div>
            </div>
            
            <h1 className="text-2xl font-semibold text-gray-900">
              {getTitle()}
            </h1>
            
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView('month')}
                className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                  view === 'month' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                  view === 'week' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setView('day')}
                className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                  view === 'day' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Day
              </button>
            </div>
          </div>

          {/* Calendar content */}
          <div className="mb-6">
            {view === 'month' && renderMonthView()}
            {view === 'week' && renderWeekView()}
            {view === 'day' && renderDayView()}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingEvent ? 'Edit Event' : 'Add New Event'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Event Title</label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter event title"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Time</label>
                <select
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Color</label>
                <div className="flex space-x-2">
                  {['red', 'green', 'blue', 'purple', 'yellow', 'pink'].map(color => (
                    <button
                      key={color}
                      onClick={() => setEventColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${getColorClassesDark(color)} ${
                        eventColor === color ? 'ring-2 ring-gray-400' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEvent}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {editingEvent ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;