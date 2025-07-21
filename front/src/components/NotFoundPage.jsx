import I404 from '../assets/I404.png';
import { Link } from 'react-router-dom';

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
              <a href="/Sreg" className="text-sm font-medium text-gray-900 border-b border-gray-900 pb-1 tracking-wide">
                INICIAR SESIÓN
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  };

export default function NotFoundPage() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-[#FFFEFB] px-6">
      <div className="flex flex-col md:flex-row items-center max-w-4xl">
        <img
          src={I404}
          alt="404 TV Doctors"
          className="w-full md:w-1/2 mb-8 md:mb-0"
        />
        <div className="md:ml-12 text-center md:text-left">
          <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">
            Oops! La página que buscas no se encuentra.
          </p>
          <a
            href="/"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
