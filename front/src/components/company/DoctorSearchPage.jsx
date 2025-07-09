import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import FiltersPanel from './FiltersPanel';
import DoctorCardGrid from './DoctorCardGrid';
import SpecialtyInfoModal from './SpecialtyInfoModal';

const DoctorSearchPage = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); 

  const [filters, setFilters] = useState({
    specialty: '',
    priceRange: { min: 0, max: 500000 },
    rating: 0,
    availability: '',
    modality: ''
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const mockDoctors = [
          {
            id: 1,
            name: 'Dr. Juan Pérez',
            specialty: 'Medicina General',
            description: 'Médico general con 10 años de experiencia en atención primaria.',
            rating: 4.5,
            reviews: 128,
            modality: 'videollamada',
            availability: '24horas',
            price: 80000,
            photo: 'https://www.future-doctor.de/wp-content/uploads/2024/08/shutterstock_2480850611.jpg'
          },
          {
            id: 2,
            name: 'Dra. María Gómez',
            specialty: 'Psicología',
            description: 'Especialista en terapia cognitivo-conductual con enfoque en ansiedad y depresión.',
            rating: 4.8,
            reviews: 95,
            modality: 'llamada',
            availability: '8horas',
            price: 120000,
            photo: 'https://www.scripps.org/sparkle-assets/images/new_doctor_fb-32abb9ba141c8223aadebce90782ac68.jpeg'
          }
        ];
        setDoctors(mockDoctors);
        setFilteredDoctors(mockDoctors);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error cargando resultados');
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    let results = doctors;

    if (searchTerm) {
      results = results.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.specialty) {
      results = results.filter(doctor => doctor.specialty === filters.specialty);
    }

    if (filters.priceRange) {
      results = results.filter(doctor =>
        doctor.price >= filters.priceRange.min &&
        doctor.price <= filters.priceRange.max
      );
    }

    if (filters.rating > 0) {
      results = results.filter(doctor => doctor.rating >= filters.rating);
    }

    if (filters.availability) {
      results = results.filter(doctor => doctor.availability === filters.availability);
    }

    if (filters.modality) {
      results = results.filter(doctor => doctor.modality === filters.modality);
    }

    setFilteredDoctors(results);
  }, [searchTerm, filters, doctors]);

  const handleSpecialtyClick = (specialty) => {
    setSelectedSpecialty(specialty);
  };

  const closeModal = () => {
    setSelectedSpecialty(null);
  };

  const handleBookAppointment = () => {
    navigate('/Sins');
  };

  const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-light tracking-wide text-gray-900">
              TELECONSULTAS<span className="font-medium">IPS</span>
            </Link>
          
          <div className="hidden md:flex items-center space-x-12">
            <a href="/Tins" className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors tracking-wide">
              ADMINISTRADOR
            </a>
            <a href="/Pins" className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors tracking-wide">
              MÉDICO
            </a>
            <a href="/Sins" className="text-sm font-medium text-gray-900 border-b border-gray-900 pb-1 tracking-wide">
              PACIENTE
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Navbar/>
      <div className="max-w-7xl mx-auto">
        <h1 className="mt-24 ml-80 text-3xl font-light text-gray-800 mb-6">Buscar Médico</h1>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <FiltersPanel
            filters={filters}
            setFilters={setFilters}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            ) : filteredDoctors.length === 0 ? (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                No se encontraron profesionales con estas características
              </div>
            ) : (
              <DoctorCardGrid
                doctors={filteredDoctors}
                viewMode={viewMode}
                onSpecialtyClick={handleSpecialtyClick}
                onBookAppointment={handleBookAppointment}
              />
            )}
          </div>
        </div>
      </div>

      {selectedSpecialty && (
        <SpecialtyInfoModal
          specialty={selectedSpecialty}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default DoctorSearchPage;
