import { Star, MapPin, Award } from 'lucide-react';
import PropTypes from 'prop-types';

const ListViewCard = ({ doctor = {}, formatPrice = (price) => `$${price}` }) => {
  // Destructuring con valores por defecto para evitar errores de props
  const {
    image = '/api/placeholder/128/128',
    name = 'Doctor',
    specialty = 'Especialidad',
    experience = 'Experiencia',
    price = 0,
    available = false,
    nextAvailable = 'Próximo disponible',
    rating = 0,
    reviews = 0,
    location = 'Ubicación',
    certifications = [],
    description = 'Descripción del doctor'
  } = doctor;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="w-32 h-32 rounded-lg overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
              <p className="text-gray-600 mb-1">{specialty}</p>
              <p className="text-sm text-gray-500">{experience}</p>
            </div>
            
            <div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
              <div className="text-xl font-bold text-gray-900">
                {formatPrice(price)}
              </div>
              <div className={`px-3 py-1 rounded-full text-xs ${
                available ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {available ? 'Disponible ahora' : nextAvailable}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
              <span className="text-gray-500 text-sm">({reviews} reseñas)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              {location}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Award className="w-4 h-4" />
              {certifications.length} certificaciones
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-6 line-clamp-2">
            {description}
          </p>

          <div className="flex gap-3">
            <button className="bg-gray-900 text-white py-2 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Agendar Consulta
            </button>
            <button className="border border-gray-300 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Ver Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes para validación de props
ListViewCard.propTypes = {
  doctor: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    specialty: PropTypes.string,
    experience: PropTypes.string,
    price: PropTypes.number,
    available: PropTypes.bool,
    nextAvailable: PropTypes.string,
    rating: PropTypes.number,
    reviews: PropTypes.number,
    location: PropTypes.string,
    certifications: PropTypes.array,
    description: PropTypes.string
  }),
  formatPrice: PropTypes.func
};

// Valores por defecto (opcional, ya que ya están en destructuring)
ListViewCard.defaultProps = {
  doctor: {},
  formatPrice: (price) => `${price}`
};

export default ListViewCard;