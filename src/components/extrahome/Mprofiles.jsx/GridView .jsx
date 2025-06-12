import PropTypes from 'prop-types';
import DoctorCard from './DoctorCard';

const GridView = ({ filteredDoctors, formatPrice }) => {
  return (
    <div className="pt-40 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No se encontraron médicos con los filtros seleccionados</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor, index) => (
              <div
                key={doctor.id}
                className="opacity-0 animate-fadeInUp"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'forwards'
                }}
              >
                <DoctorCard doctor={doctor} formatPrice={formatPrice} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Definición de PropTypes
GridView.propTypes = {
  filteredDoctors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
    })
  ).isRequired,
  formatPrice: PropTypes.func.isRequired,
};

export default GridView;