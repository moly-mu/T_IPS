import { useState, useEffect } from 'react';
import { Edit3, Save, X } from 'lucide-react';
import PropTypes from 'prop-types';

const MyProfile = ({ profile: initialProfile, onProfileUpdate }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [localProfile, setLocalProfile] = useState(initialProfile || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Actualizar el perfil local cuando cambie el prop, pero solo si NO está editando
  useEffect(() => {
    if (!isEditingProfile) {
      setLocalProfile(initialProfile || {});
    }
  }, [initialProfile, isEditingProfile]);

  const handleSaveProfile = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await onProfileUpdate(localProfile);
      setSuccessMessage('Perfil actualizado correctamente');
      setIsEditingProfile(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error al actualizar perfil:', err);
      setError('Error al actualizar el perfil. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setLocalProfile(initialProfile || {});
    setIsEditingProfile(false);
    setError(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      {/* Mensajes de estado */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}
      
      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600">{successMessage}</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-light text-gray-900">Mi Perfil</h2>
        {!isEditingProfile ? (
          <button
            onClick={() => setIsEditingProfile(true)}
            className="flex items-center gap-2 text-green-600 hover:text-gray-900 transition-colors">
            <Edit3 size={20} className="text-green-600 font-semibold"/>
            Editar
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={handleSaveProfile}
              disabled={loading}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors disabled:opacity-50">
              <Save size={16} />
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              onClick={handleCancelEdit}
              disabled={loading}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50">
              <X size={16} />
              Cancelar
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-500 mb-2">Primer Nombre</label>
            {isEditingProfile ? (
              <input
                type="text"
                value={localProfile.primerNombre || ''}
                onChange={(e) => setLocalProfile({...localProfile, primerNombre: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{localProfile.primerNombre || 'No especificado'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Segundo Nombre</label>
            {isEditingProfile ? (
              <input
                type="text"
                value={localProfile.segundoNombre || ''}
                onChange={(e) => setLocalProfile({...localProfile, segundoNombre: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{localProfile.segundoNombre || 'No especificado'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Primer Apellido</label>
            {isEditingProfile ? (
              <input
                type="text"
                value={localProfile.primerApellido || ''}
                onChange={(e) => setLocalProfile({...localProfile, primerApellido: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{localProfile.primerApellido || 'No especificado'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Segundo Apellido</label>
            {isEditingProfile ? (
              <input
                type="text"
                value={localProfile.segundoApellido || ''}
                onChange={(e) => setLocalProfile({...localProfile, segundoApellido: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{localProfile.segundoApellido || 'No especificado'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Fecha de Nacimiento</label>
            {isEditingProfile ? (
              <input
                type="date"
                value={localProfile.fechaNacimiento || ''}
                onChange={(e) => setLocalProfile({...localProfile, fechaNacimiento: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{localProfile.fechaNacimiento || 'No especificado'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Género</label>
            {isEditingProfile ? (
              <select
                value={localProfile.genero || ''}
                onChange={(e) => setLocalProfile({...localProfile, genero: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              >
                <option value="">Seleccionar</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{localProfile.genero || 'No especificado'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Sexo</label>
            {isEditingProfile ? (
              <select
                value={localProfile.sexo || ''}
                onChange={(e) => setLocalProfile({...localProfile, sexo: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              >
                <option value="">Seleccionar</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{localProfile.sexo || 'No especificado'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Teléfono</label>
            {isEditingProfile ? (
              <input
                type="tel"
                value={localProfile.telefono || ''}
                onChange={(e) => setLocalProfile({...localProfile, telefono: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{localProfile.telefono || 'No especificado'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Email</label>
            <p className="text-gray-900 pb-3 border-b border-gray-100">{localProfile.email || 'No especificado'}</p>
            <small className="text-gray-400">El email no se puede modificar</small>
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Número de Documento</label>
            <p className="text-gray-900 pb-3 border-b border-gray-100">{localProfile.numeroDocumento || 'No especificado'}</p>
            <small className="text-gray-400">El documento no se puede modificar</small>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-500 mb-2">Dirección</label>
            {isEditingProfile ? (
              <textarea
                value={localProfile.direccion || ''}
                onChange={(e) => setLocalProfile({...localProfile, direccion: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent resize-none"
                rows="2"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{localProfile.direccion || 'No especificado'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Tipo de Sangre</label>
            {isEditingProfile ? (
              <select
                value={localProfile.tipoSangre || ''}
                onChange={(e) => setLocalProfile({...localProfile, tipoSangre: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              >
                <option value="">Seleccionar</option>
                <option value="A_POS">A+</option>
                <option value="A_NEG">A-</option>
                <option value="B_POS">B+</option>
                <option value="B_NEG">B-</option>
                <option value="AB_POS">AB+</option>
                <option value="AB_NEG">AB-</option>
                <option value="O_POS">O+</option>
                <option value="O_NEG">O-</option>
              </select>
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{localProfile.tipoSangre || 'No especificado'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Alergias</label>
            {isEditingProfile ? (
              <textarea
                value={localProfile.alergias || ''}
                onChange={(e) => setLocalProfile({...localProfile, alergias: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent resize-none"
                rows="2"
                placeholder="Ejemplo: Penicilina, Mariscos"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{localProfile.alergias || 'No especificado'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Contacto de Emergencia</label>
            {isEditingProfile ? (
              <input
                type="text"
                value={localProfile.contactoEmergencia || ''}
                onChange={(e) => setLocalProfile({...localProfile, contactoEmergencia: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
                placeholder="Nombre - Teléfono"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{localProfile.contactoEmergencia || 'No especificado'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">EPS</label>
            {isEditingProfile ? (
              <input
                type="text"
                value={localProfile.eps || ''}
                onChange={(e) => setLocalProfile({...localProfile, eps: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{localProfile.eps || 'No especificado'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Profesión</label>
            {isEditingProfile ? (
              <input
                type="text"
                value={localProfile.profesion || ''}
                onChange={(e) => setLocalProfile({...localProfile, profesion: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{localProfile.profesion || 'No especificado'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Grupo Étnico</label>
            {isEditingProfile ? (
              <select
                value={localProfile.grupoEtnico || ''}
                onChange={(e) => setLocalProfile({...localProfile, grupoEtnico: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              >
                <option value="">Seleccionar</option>
                <option value="Mestizo">Mestizo</option>
                <option value="Indígena">Indígena</option>
                <option value="Afrodescendiente">Afrodescendiente</option>
                <option value="Blanco">Blanco</option>
                <option value="ROM (Gitano)">ROM (Gitano)</option>
                <option value="Raizal">Raizal</option>
                <option value="Palenquero">Palenquero</option>
                <option value="Otro">Otro</option>
                <option value="No especifica">No especifica</option>
              </select>
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{localProfile.grupoEtnico || 'No especificado'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

MyProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  onProfileUpdate: PropTypes.func.isRequired
};

export default MyProfile;
