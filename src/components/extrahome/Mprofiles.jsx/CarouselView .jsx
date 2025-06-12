import { useRef } from 'react';
import PropTypes from 'prop-types';
import { Star, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const CarouselView = ({ 
  filteredDoctors, 
  currentIndex, 
  animating, 
  nextSlide, 
  prevSlide, 
  goToSlide,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  formatPrice 
}) => {
  const containerRef = useRef(null);

  if (filteredDoctors.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">No se encontraron médicos con los filtros seleccionados</p>
        </div>
      </div>
    );
  }

  const currentDoctor = filteredDoctors[currentIndex];

  return (
    <div
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-gray-50"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="pt-32 h-full">
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
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{currentDoctor.experience}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{currentDoctor.rating}</span>
                      <span>({currentDoctor.reviews} reseñas)</span>
                    </div>
                  </div>
                </div>

                {/* Price and Availability */}
                <div className="flex items-center gap-6">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPrice(currentDoctor.price)}
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                    currentDoctor.available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    <Clock className="w-4 h-4" />
                    {currentDoctor.available ? 'Disponible ahora' : 'Próximo: ' + currentDoctor.nextAvailable}
                  </div>
                </div>

                {/* Description */}
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {currentDoctor.description}
                  </p>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                      Formación Académica
                    </h3>
                    <p className="text-gray-700">{currentDoctor.education}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                      Ubicación
                    </h3>
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="w-4 h-4" />
                      {currentDoctor.location}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button className="bg-gray-900 text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors rounded-lg">
                    AGENDAR CONSULTA
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-8 py-3 text-sm font-medium hover:bg-gray-50 transition-colors rounded-lg">
                    VER PERFIL COMPLETO
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
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gray-900/5 rounded-full -z-10"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gray-900/5 rounded-full -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed top-1/2 left-8 transform -translate-y-1/2 z-40">
        <button
          onClick={prevSlide}
          className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      
      <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-40">
        <button
          onClick={nextSlide}
          className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Counter */}
      <div className="fixed top-32 right-8 z-40">
        <div className="text-right bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-sm">
          <div className="text-3xl font-bold text-gray-900">
            {(currentIndex + 1).toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-gray-500 border-t border-gray-200 pt-1 mt-1">
            de {filteredDoctors.length.toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex space-x-2 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
          {filteredDoctors.map((_, index) => (
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
    </div>
  );
};

// Definición de PropTypes
CarouselView.propTypes = {
  filteredDoctors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      specialty: PropTypes.string.isRequired,
      experience: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      reviews: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      available: PropTypes.bool.isRequired,
      nextAvailable: PropTypes.string,
      description: PropTypes.string.isRequired,
      education: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentIndex: PropTypes.number.isRequired,
  animating: PropTypes.bool.isRequired,
  nextSlide: PropTypes.func.isRequired,
  prevSlide: PropTypes.func.isRequired,
  goToSlide: PropTypes.func.isRequired,
  handleTouchStart: PropTypes.func.isRequired,
  handleTouchMove: PropTypes.func.isRequired,
  handleTouchEnd: PropTypes.func.isRequired,
  formatPrice: PropTypes.func.isRequired,
};

export default CarouselView;