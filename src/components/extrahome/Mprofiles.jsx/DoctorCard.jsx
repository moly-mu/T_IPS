import PropTypes from 'prop-types';
import { Star, MapPin } from 'lucide-react';

const DoctorCard = ({ doctor, formatPrice }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
            <p className="text-gray-600">{doctor.specialty}</p>
            <p className="text-sm text-gray-500">{doctor.experience}</p>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs ${
            doctor.available ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {doctor.available ? 'Disponible' : 'Ocupado'}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{doctor.rating}</span>
            <span className="text-gray-500 text-sm">({doctor.reviews})</span>
          </div>
          <div className="text-lg font-bold text-gray-900">
            {formatPrice(doctor.price)}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          {doctor.location}
        </div>

        <p className="text-gray-600 text-sm mb-6 line-clamp-2">
          {doctor.description}
        </p>

        <div className="flex gap-3">
          <button className="flex-1 bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Agendar
          </button>
          <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Ver Perfil
          </button>
        </div>
      </div>
    </div>
  );
};

// Definición de PropTypes
DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    name: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    experience: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    available: PropTypes.bool.isRequired,
    image: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  formatPrice: PropTypes.func.isRequired,
};


export default DoctorCard;