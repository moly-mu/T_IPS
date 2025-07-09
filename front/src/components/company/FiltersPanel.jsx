import PropTypes from 'prop-types';

const FiltersPanel = ({ filters, setFilters, viewMode, setViewMode }) => {
  const specialties = ['Medicina General', 'Ortopedia', 'Psicología', 'Nutrición', 'Medicina Alternativa'];
  const availabilityOptions = [
    { value: '1hora', label: '1 hora' },
    { value: '4horas', label: '4 horas' },
    { value: '8horas', label: '8 horas' },
    { value: '24horas', label: '24 horas' }
  ];
  const modalityOptions = [
    { value: 'videollamada', label: 'Videollamada' },
    { value: 'llamada', label: 'Llamada' },
    { value: 'chat', label: 'Chat' }
  ];

  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value) || 0;
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: value
      }
    }));
  };

  const handleRatingClick = (rating) => {
    setFilters(prev => ({
      ...prev,
      rating: prev.rating === rating ? 0 : rating
    }));
  };

  const inputCheckStyle = "w-4 h-4 text-[#1F2937] border-gray-300 focus:ring-[#1F2937]";

  return (
    <div className="w-full md:w-72 bg-white border border-gray-200 p-6 text-sm text-[#1F2937] space-y-6 rounded-xl">
      <h2 className="text-base font-bold">Filtros</h2>

      {/* Especialidad */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase">Especialidad</h3>
        <div className="space-y-2">
          {specialties.map(specialty => (
            <label key={specialty} className="flex items-center gap-3">
              <input
                type="checkbox"
                name="specialty"
                checked={filters.specialty === specialty}
                onChange={() =>
                  setFilters(prev => ({
                    ...prev,
                    specialty: prev.specialty === specialty ? '' : specialty
                  }))
                }
                className={inputCheckStyle}
              />
              <span>{specialty}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rango de precio */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase">Rango de precio</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="$0"
            value={filters.priceRange.min}
            onChange={(e) => handlePriceChange(e, 'min')}
            className="border border-gray-300 text-[#1F2937] p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1F2937]"
          />
          <input
            type="number"
            placeholder="$500.000"
            value={filters.priceRange.max}
            onChange={(e) => handlePriceChange(e, 'max')}
            className="border border-gray-300 text-[#1F2937] p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1F2937]"
          />
        </div>
      </div>

      {/* Calificación */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase">Calificación</h3>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingClick(star)}
              className={`transition-transform hover:scale-110 ${
                filters.rating >= star ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
          {filters.rating > 0 && <span className="text-xs ml-2">y más</span>}
        </div>
      </div>

      {/* Disponibilidad */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase">Disponibilidad</h3>
        <div className="space-y-2">
          {availabilityOptions.map(option => (
            <label key={option.value} className="flex items-center gap-3">
              <input
                type="checkbox"
                name="availability"
                checked={filters.availability === option.value}
                onChange={() =>
                  setFilters(prev => ({
                    ...prev,
                    availability: prev.availability === option.value ? '' : option.value
                  }))
                }
                className={inputCheckStyle}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Modalidad */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase">Modalidad</h3>
        <div className="space-y-2">
          {modalityOptions.map(option => (
            <label key={option.value} className="flex items-center gap-3">
              <input
                type="checkbox"
                name="modality"
                checked={filters.modality === option.value}
                onChange={() =>
                  setFilters(prev => ({
                    ...prev,
                    modality: prev.modality === option.value ? '' : option.value
                  }))
                }
                className={inputCheckStyle}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Vista */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase">Vista</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`w-10 h-10 flex items-center justify-center border rounded-md transition-colors ${
              viewMode === 'grid' ? 'bg-[#1F2937] text-white' : 'border-gray-300 text-[#1F2937]'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`w-10 h-10 flex items-center justify-center border rounded-md transition-colors ${
              viewMode === 'list' ? 'bg-[#1F2937] text-white' : 'border-gray-300 text-[#1F2937]'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Limpiar filtros */}
      <button
        onClick={() =>
          setFilters({
            specialty: '',
            priceRange: { min: 0, max: 500000 },
            rating: 0,
            availability: '',
            modality: ''
          })
        }
        className="w-full py-2 text-center bg-gray-100 text-[#1F2937] hover:bg-gray-200 transition-colors rounded-md"
      >
        Limpiar filtros
      </button>
    </div>
  );
};

FiltersPanel.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  viewMode: PropTypes.string.isRequired,
  setViewMode: PropTypes.func.isRequired
};

export default FiltersPanel;
