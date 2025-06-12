import { useEffect, useState } from 'react';
import SearchAndFilters from './Mprofiles.jsx/SearchAndFilters ';
import CarouselView from './Mprofiles.jsx/CarouselView ';
import GridView from './Mprofiles.jsx/GridView ';
import ListView from './Mprofiles.jsx/ListView';
import { doctorsData } from './Mprofiles.jsx/DoctorsData';

const ViewProfiles = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [viewMode, setViewMode] = useState('carousel');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange] = useState([0, 500000]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const specialties = [
    'all',
    'Medicina General',
    'Cardiología',
    'Pediatría',
    'Dermatología',
    'Ginecología',
    'Ortopedia'
  ];

  // Filter and sort doctors
  useEffect(() => {
    let filtered = doctorsData.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
      const matchesPrice = doctor.price >= priceRange[0] && doctor.price <= priceRange[1];
      
      return matchesSearch && matchesSpecialty && matchesPrice;
    });

    // Sort filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'price':
          return a.price - b.price;
        default:
          return b.rating - a.rating;
      }
    });

    setFilteredDoctors(filtered);
  }, [searchTerm, selectedSpecialty, sortBy, priceRange]);

  const viewProps = {
    filteredDoctors,
    currentIndex,
    setCurrentIndex,
    animating,
    setAnimating
  };

  const searchProps = {
    searchTerm,
    setSearchTerm,
    selectedSpecialty,
    setSelectedSpecialty,
    specialties,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    filteredDoctors
  };

  const Navbar = () => {
    return (
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-light tracking-wide text-gray-900">
              TELECONSULTAS<span className="font-medium">IPS</span>
            </div>
            
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
    <div className="relative bg-gray-50 text-gray-800 font-sans">
      <Navbar />
      <SearchAndFilters {...searchProps} />
      
      {viewMode === 'carousel' && <CarouselView {...viewProps} />}
      {viewMode === 'grid' && <GridView {...viewProps} />}
      {viewMode === 'list' && <ListView {...viewProps} />}

      {/* CSS estándar para React */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out;
          }
          
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `
      }} />
    </div>
  );
};

export default ViewProfiles;