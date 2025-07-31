import { useState, useEffect, useContext, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import Barral from '../desis/Barral'; 
import NavbarI from "../desis/NavbarI";

const Ajustes = () => {
  const location = useLocation(); 
  const { token } = useContext(AuthContext);
  
  // Estados básicos
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Estados para cambio de contraseña
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [estadoCuenta, setEstadoCuenta] = useState('activa');
  const [accountData, setAccountData] = useState(null);

  // Cargar datos de la cuenta
  const fetchAccountSettings = useCallback(async () => {
    if (!token) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get("http://localhost:3000/specialist/settings/account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setAccountData(response.data);
      setEstadoCuenta(response.data.accountStatus.status === 'Activo' ? 'activa' : 'desactivada');
    } catch (err) {
      console.error("Error al cargar configuración:", err);
      setError("Error al cargar la configuración de la cuenta");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchAccountSettings();
    }
  }, [token, fetchAccountSettings]);

  // funciones de accion
  const handleDesactivarCuenta = async () => {
    if (!window.confirm('¿Estás seguro de que deseas desactivar tu cuenta?')) {
      return;
    }

    try {
      await axios.put(
        "http://localhost:3000/specialist/settings/deactivateSpecialist",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setEstadoCuenta('desactivada');
      alert('Cuenta desactivada exitosamente');
    } catch (err) {
      console.error("Error al desactivar cuenta:", err);
      setError("Error al desactivar la cuenta");
    }
  };

  const handleEliminarCuenta = async () => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar tu cuenta de forma permanente? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      await axios.delete(
        "http://localhost:3000/specialist/settings/deleteSpecialist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      alert('Cuenta eliminada exitosamente');
      // Redireccionar al login o página principal
      window.location.href = '/';
    } catch (err) {
      console.error("Error al eliminar cuenta:", err);
      setError("Error al eliminar la cuenta");
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    try {
      // Primero verificar la contraseña actual
      await axios.post(
        "http://localhost:3000/specialist/settings/verify-password",
        { currentPassword: passwordData.currentPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Si es válida, cambiar la contraseña
      await axios.put(
        "http://localhost:3000/specialist/settings/changePassword",
        { newPassword: passwordData.newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Contraseña cambiada exitosamente');
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      console.error("Error al cambiar contraseña:", err);
      setError(err.response?.data?.error || "Error al cambiar la contraseña");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Barral />

      <div className="flex-1 p-6 bg-gray-50">
        <NavbarI />
        
        {/* Error notification */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-600"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <p className="ml-3 text-sm text-blue-800">Cargando configuración...</p>
            </div>
          </div>
        )}

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
              <button
                onClick={() => setShowPasswordModal(true)}
                className="mt-2 text-lg text-blue-500 hover:text-blue-700">
                Cambiar Contraseña
              </button>
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
    
    {/* Modal de cambio de contraseña */}
    {showPasswordModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Cambiar Contraseña</h3>
            <button
              onClick={() => setShowPasswordModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña Actual
              </label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tu contraseña actual"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nueva Contraseña
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tu nueva contraseña"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Nueva Contraseña
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({
                  ...passwordData,
                  confirmPassword: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirma tu nueva contraseña"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowPasswordModal(false)}
              className="px-4 py-2 text-gray-500 hover:text-gray-700"
            >
              Cancelar
            </button>
            <button
              onClick={handleChangePassword}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Cambiar Contraseña
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default Ajustes;
