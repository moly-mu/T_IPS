import PropTypes from 'prop-types';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-full ml-80 max-w-4xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar médico o especialidad..."
          className="w-full py-3 px-6 pl-14 text-base bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired
};

export default SearchBar;