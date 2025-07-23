import { useState } from 'react';
import { Edit3, Save, X } from 'lucide-react';

const MyProfile = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // Estados para el perfil
  const [profile, setProfile] = useState({
    nombre: 'Juan Manuel Pérez Rodríguez',
    email: 'juan.perez@email.com',
    telefono: '+57 300 123 4567',
    fechaNacimiento: '1985-03-15',
    direccion: 'Calle 123 #45-67, Bogotá',
    tipoSangre: 'O+',
    alergias: 'Penicilina, Mariscos',
    contactoEmergencia: 'María Pérez - 300 765 4321'
  });

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-light text-gray-900">Mi Perfil</h2>
        {!isEditingProfile ? (
          <button
            onClick={() => setIsEditingProfile(true)}
            className="flex items-center gap-2 text-green-600 hover:text-gray-900 transition-colors"
          >
            <Edit3 size={20} className="text-green-600 font-semibold"/>
            Editar
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={handleSaveProfile}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <Save size={16} />
              Guardar
            </button>
            <button
              onClick={() => setIsEditingProfile(false)}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={16} />
              Cancelar
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-500 mb-2">Nombre Completo</label>
            {isEditingProfile ? (
              <input
                type="text"
                value={profile.nombre}
                onChange={(e) => setProfile({...profile, nombre: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{profile.nombre}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Email</label>
            {isEditingProfile ? (
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{profile.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Teléfono</label>
            {isEditingProfile ? (
              <input
                type="tel"
                value={profile.telefono}
                onChange={(e) => setProfile({...profile, telefono: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{profile.telefono}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Fecha de Nacimiento</label>
            {isEditingProfile ? (
              <input
                type="date"
                value={profile.fechaNacimiento}
                onChange={(e) => setProfile({...profile, fechaNacimiento: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{profile.fechaNacimiento}</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-500 mb-2">Dirección</label>
            {isEditingProfile ? (
              <textarea
                value={profile.direccion}
                onChange={(e) => setProfile({...profile, direccion: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent resize-none"
                rows="2"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{profile.direccion}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Tipo de Sangre</label>
            {isEditingProfile ? (
              <select
                value={profile.tipoSangre}
                onChange={(e) => setProfile({...profile, tipoSangre: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{profile.tipoSangre}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Alergias</label>
            {isEditingProfile ? (
              <textarea
                value={profile.alergias}
                onChange={(e) => setProfile({...profile, alergias: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent resize-none"
                rows="2"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{profile.alergias}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Contacto de Emergencia</label>
            {isEditingProfile ? (
              <input
                type="text"
                value={profile.contactoEmergencia}
                onChange={(e) => setProfile({...profile, contactoEmergencia: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{profile.contactoEmergencia}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;