import ListViewCard from './ListViewCard ';
import PropTypes from 'prop-types';

const ListView = ({ filteredDoctors = [], formatPrice = (price) => `$${price}` }) => {
  return (
    <div className="pt-40 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No se encontraron médicos con los filtros seleccionados</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredDoctors.map((doctor, index) => (
              <div
                key={doctor.id}
                className="opacity-0 animate-fadeInUp"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'forwards'
                }}
              >
                <ListViewCard doctor={doctor} formatPrice={formatPrice} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// PropTypes para validación de props
ListView.propTypes = {
  filteredDoctors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
    })
  ),
  formatPrice: PropTypes.func
};

// Valores por defecto
ListView.defaultProps = {
  filteredDoctors: [],
  formatPrice: (price) => `$${price}`
};

export default ListView;