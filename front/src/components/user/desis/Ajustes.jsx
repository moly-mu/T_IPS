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

  // Auto-dismiss error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // funciones de accion
  const handleDesactivarCuenta = async () => {
    if (!window.confirm('¿Estás seguro de que deseas desactivar tu cuenta? Podrás reactivarla más tarde contactando soporte.')) {
      return;
    }

    setError(null);

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
      alert('Cuenta desactivada exitosamente. Tu cuenta ha sido desactivada temporalmente.');
      // Actualizar los datos de la cuenta
      fetchAccountSettings();
    } catch (err) {
      console.error("Error al desactivar cuenta:", err);
      setError("Error al desactivar la cuenta. Inténtalo de nuevo.");
    }
  };

  const handleEliminarCuenta = async () => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar tu cuenta de forma permanente? Esta acción NO se puede deshacer y perderás todos tus datos.')) {
      return;
    }

    if (!window.confirm('Esta es tu última oportunidad. ¿Realmente deseas eliminar permanentemente tu cuenta? Todos tus datos, citas y configuraciones se perderán para siempre.')) {
      return;
    }

    setError(null);

    try {
      await axios.delete(
        "http://localhost:3000/specialist/settings/deleteSpecialist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      alert('Cuenta eliminada exitosamente. Serás redirigido al inicio.');
      // Limpiar token y redirigir
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      window.location.href = '/';
    } catch (err) {
      console.error("Error al eliminar cuenta:", err);
      setError("Error al eliminar la cuenta. Inténtalo de nuevo.");
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

    setError(null);

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
      if (err.response?.status === 401) {
        setError("La contraseña actual es incorrecta");
      } else {
        setError(err.response?.data?.error || "Error al cambiar la contraseña");
      }
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
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Información de la Cuenta</h3>
              
              {accountData && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-600">Nombre:</span>
                    <span className="text-gray-800">{accountData.personalInfo.firstname} {accountData.personalInfo.lastname}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-600">Email:</span>
                    <span className="text-gray-800">{accountData.personalInfo.email}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-600">Rol:</span>
                    <span className="text-gray-800 capitalize">{accountData.accountStatus.role}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-600">Estado:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      estadoCuenta === 'activa' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {estadoCuenta === 'activa' ? 'Activa' : 'Desactivada'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-600">Fecha de registro:</span>
                    <span className="text-gray-800">
                      {accountData.accountStatus.joinDate 
                        ? new Date(accountData.accountStatus.joinDate).toLocaleDateString('es-ES')
                        : 'No disponible'
                      }
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Secciones de acciones */}
            <div className="space-y-6">
              {/* desactivar cuenta */}
              <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Desactivar Cuenta</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Tu cuenta será desactivada temporalmente. Podrás reactivarla contactando soporte.
                </p>
                <button
                  onClick={handleDesactivarCuenta}
                  disabled={estadoCuenta === 'desactivada'}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md transition-colors">
                  {estadoCuenta === 'desactivada' ? 'Cuenta ya desactivada' : 'Desactivar Cuenta'}
                </button>
              </div>

              {/* cambiar contraseña */}
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Cambiar Contraseña</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Actualiza tu contraseña por seguridad. Debe tener al menos 8 caracteres.
                </p>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
                  Cambiar Contraseña
                </button>
              </div>

              {/* eliminar cuenta */}
              <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Eliminar Cuenta Permanentemente</h3>
                <p className="text-sm text-gray-600 mb-3">
                  ⚠️ <strong>Acción irreversible:</strong> Todos tus datos, citas y configuraciones se eliminarán para siempre.
                </p>
                <button
                  onClick={handleEliminarCuenta}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors">
                  Eliminar Cuenta
                </button>
              </div>
            </div>

            {/* enlaces extra */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700 mb-6">Enlaces Útiles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/politicas-de-privacidad" className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-blue-500 hover:text-blue-700 transition-colors">
                  <div className="font-medium">Políticas de Privacidad</div>
                  <div className="text-sm text-gray-600">Consulta nuestras políticas</div>
                </Link>

                <Link to="/ayuda" className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-blue-500 hover:text-blue-700 transition-colors">
                  <div className="font-medium">Centro de Ayuda</div>
                  <div className="text-sm text-gray-600">Obtén soporte técnico</div>
                </Link>

                <Link to="/configuraciones-adicionales" className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-blue-500 hover:text-blue-700 transition-colors">
                  <div className="font-medium">Configuraciones Avanzadas</div>
                  <div className="text-sm text-gray-600">Ajustes adicionales</div>
                </Link>
              </div>
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
              onClick={() => {
                setShowPasswordModal(false);
                setPasswordData({
                  currentPassword: '',
                  newPassword: '',
                  confirmPassword: ''
                });
                setError(null);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña Actual *
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
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nueva Contraseña *
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mínimo 8 caracteres"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                La contraseña debe tener al menos 8 caracteres
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Nueva Contraseña *
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
                required
              />
              {passwordData.newPassword && passwordData.confirmPassword && 
               passwordData.newPassword !== passwordData.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  Las contraseñas no coinciden
                </p>
              )}
            </div>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setShowPasswordModal(false);
                setPasswordData({
                  currentPassword: '',
                  newPassword: '',
                  confirmPassword: ''
                });
                setError(null);
              }}
              className="px-4 py-2 text-gray-500 hover:text-gray-700"
            >
              Cancelar
            </button>
            <button
              onClick={handleChangePassword}
              disabled={
                !passwordData.currentPassword || 
                !passwordData.newPassword || 
                !passwordData.confirmPassword ||
                passwordData.newPassword !== passwordData.confirmPassword ||
                passwordData.newPassword.length < 8
              }
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md transition-colors"
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
