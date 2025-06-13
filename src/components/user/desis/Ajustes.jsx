import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Barral from './Barral'; 
import NavbarI from "./NavbarI";

const Ajustes = () => {
  const location = useLocation(); 

  const [estadoCuenta, setEstadoCuenta] = useState('activa');

  // funciones de accion
  const handleDesactivarCuenta = () => setEstadoCuenta('desactivada');
  const handleEliminarCuenta = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar tu cuenta de forma permanente?')) {
      console.log('Cuenta eliminada');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Barral />

      <div className="flex-1 p-6 bg-gray-50">
        <NavbarI />
      <div className="container mx-auto p-6">
        {location.pathname === "/ajus" && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Configuración de Cuenta</h2>

            {/* estado de la cuenta */}
            <div className="mb-6">
              <h3 className="text-lg text-gray-700">Estado de la Cuenta</h3>
              <div className={`px-4 py-2 rounded-md ${estadoCuenta === 'activa' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                <span className="font-medium">Estado:</span> {estadoCuenta === 'activa' ? 'Activa' : 'Desactivada'}
              </div>
            </div>

            {/* desactivar cuenta */}
            <div className="mb-6">
              <h3 className="text-lg text-gray-700">¿Deseas desactivar tu cuenta?</h3>
              <p
                onClick={handleDesactivarCuenta}
                className="mt-2 text-lg text-yellow-500 hover:text-yellow-600 cursor-pointer">
                Desactivar Cuenta
              </p>
            </div>

            {/* cambiar contraseña */}
            <div className="mb-6">
              <h3 className="text-lg text-gray-700">¿Deseas cambiar tu contraseña?</h3>
              <Link
                to="/cambiar-contraseña"
                className="mt-2 text-lg text-blue-500 hover:text-blue-700">
                Cambiar Contraseña
              </Link>
            </div>

            {/* eliminar cuenta */}
            <div className="mb-6">
              <h3 className="text-lg text-gray-700">¿Deseas eliminar tu cuenta permanentemente?</h3>
              <p
                onClick={handleEliminarCuenta}
                className="mt-2 text-lg text-red-500 hover:text-red-600 cursor-pointer">
                Eliminar Cuenta
              </p>
            </div>

            {/* enlaces extra */}
            <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Más Opciones</h3>
            <div className="space-y-6">
              <Link to="/politicas-de-privacidad" className="text-blue-500 hover:text-blue-700 block">
                Políticas de Privacidad
              </Link>

              <Link to="/ayuda" className="text-blue-500 hover:text-blue-700 block">
                Centro de Ayuda
              </Link>

              <Link to="/configuraciones-adicionales" className="text-blue-500 hover:text-blue-700 block">
                Configuraciones Avanzadas
              </Link>
            </div>
          </div>


            {/* notones de accion */}
            <div className="flex justify-between mt-6">
              <button className="px-6 py-2 text-sm text-gray-700 bg-gray-300 hover:bg-gray-400 rounded-md">Cancelar</button>
              <button className="px-6 py-2 text-sm text-white bg-[#00102D] hover:bg-[#003366] rounded-md">Guardar Cambios</button>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Ajustes;
