import PropTypes from 'prop-types';
import DoctorCard from './DoctorCard';

const DoctorCardGrid = ({ doctors, viewMode, onSpecialtyClick, onBookAppointment }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-2xl font-light text-gray-800">
          <span className="font-medium">{doctors.length}</span> {doctors.length === 1 ? 'profesional encontrado' : 'profesionales encontrados'}
        </h2>
        <div className="flex items-center w-full md:w-auto">
          <span className="text-sm text-gray-500 mr-3 whitespace-nowrap">Ordenar por:</span>
          <select className="w-full md:w-auto text-sm border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-500 bg-white">
            <option>Relevancia</option>
            <option>Precio (menor a mayor)</option>
            <option>Precio (mayor a menor)</option>
            <option>Rating</option>
          </select>
        </div>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {doctors.map(doctor => (
            <DoctorCard 
              key={doctor.id} 
              doctor={doctor} 
              onSpecialtyClick={onSpecialtyClick}
              onBookAppointment={onBookAppointment}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4 max-w-4xl mx-auto">
          {doctors.map(doctor => (
            <div key={doctor.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-col lg:flex-row">
                {/* Imagen del doctor */}
                <div className="lg:w-1/3 relative flex-shrink-0">
                  <img 
                    src={doctor.photo} 
                    alt={doctor.name} 
                    className="w-full h-48 lg:h-full object-cover"
                  />
                  <div 
                    className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-black/80 transition-all duration-200"
                    onClick={() => onSpecialtyClick(doctor.specialty)}
                  >
                    {doctor.specialty}
                  </div>
                  
                  {/* Rating flotante */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-800">{doctor.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                {/* Contenido principal */}
                <div className="lg:w-2/3 p-6 flex flex-col justify-between">
                  {/* Header con nombre */}
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{doctor.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{doctor.description}</p>
                  </div>
                  
                  {/* Información de servicio - minimalista */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          doctor.modality === 'videollamada' ? 'bg-blue-500' :
                          doctor.modality === 'llamada' ? 'bg-green-500' :
                          'bg-purple-500'
                        }`}></div>
                        <span className="text-sm text-gray-600 capitalize">{doctor.modality}</span>
                      </div>
                      <span className="text-sm text-gray-500">{doctor.availability.replace('horas', 'h')}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        <span className="text-sm text-green-600">Disponible ahora</span>
                      </div>
                      <span className="text-sm text-gray-500">{doctor.reviews.toLocaleString()} reseñas</span>
                    </div>
                  </div>
                  
                  {/* Footer con precio y botones */}
                  <div className="space-y-4">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline">
                        <span className="text-2xl font-semibold text-gray-900">${doctor.price.toLocaleString()}</span>
                        <span className="text-sm text-gray-500 ml-1">por consulta</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => onBookAppointment(doctor.id)}
                        className="flex-1 py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                      >
                        Agendar Consulta
                      </button>
                      <button className="flex-1 py-3 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl text-sm font-medium transition-all duration-200 border border-gray-200">
                        Ver Perfil
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

DoctorCardGrid.propTypes = {
  doctors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      specialty: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      reviews: PropTypes.number.isRequired,
      modality: PropTypes.oneOf(['videollamada', 'llamada', 'chat']).isRequired,
      availability: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })
  ).isRequired,
  viewMode: PropTypes.oneOf(['grid', 'list']).isRequired,
  onSpecialtyClick: PropTypes.func.isRequired,
  onBookAppointment: PropTypes.func.isRequired
};

export default DoctorCardGrid;