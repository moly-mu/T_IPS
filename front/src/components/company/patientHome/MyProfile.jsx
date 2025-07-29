import { useState } from 'react';
import { Edit3, Save, X } from 'lucide-react';

const MyProfile = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // Estados para el perfil
  const [profile, setProfile] = useState({
    primerNombre: 'Juan',
    segundoNombre: 'Manuel',
    primerApellido: 'Pérez',
    segundoApellido: 'Rodríguez',
    fechaNacimiento: '1985-03-15',
    genero: 'Masculino',
    sexo: 'Masculino',
    lenguaje: 'Español',
    numeroDocumento: '1234567',
    tipoDocumento: 'CC - Cédula de Ciudadanía',
    telefono: '+57 300 123 4567',
    contactoEmergencia: 'María Pérez - 300 765 4321',
    email: 'juan.perez@email.com',
    direccion: 'Calle 123 #45-67, Bogotá',
    tipoSangre: 'O+',
    alergias: 'Penicilina, Mariscos',
    eps: 'Salud Total',
  
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
            className="flex items-center gap-2 text-green-600 hover:text-gray-900 transition-colors">
            <Edit3 size={20} className="text-green-600 font-semibold"/>
            Editar
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={handleSaveProfile}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors">
              <Save size={16} />
              Guardar
            </button>
            <button
              onClick={() => setIsEditingProfile(false)}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors">
              <X size={16} />
              Cancelar
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-500 mb-2">Primer Nombre </label>
            {isEditingProfile ? (
              <input
                type="text"
                value={profile.primerNombre}
                onChange={(e) => setProfile({...profile, primerNombre: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{profile.primerNombre}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Primer Apellido </label>
            {isEditingProfile ? (
              <input
                type="text"
                value={profile.primerApellido}
                onChange={(e) => setProfile({...profile, primerApellido: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{profile.primerApellido}</p>
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

          <div>
            <label className="block text-sm text-gray-500 mb-2">Sexo</label>
            {isEditingProfile ? (
              <select
                value={profile.sexo}
                onChange={(e) => setProfile({...profile, sexo: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              >
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{profile.sexo}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Tipo de Documento</label>
            {isEditingProfile ? (
              <select
                value={profile.tipoDocumento}
                onChange={(e) => setProfile({...profile, tipoDocumento: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              >
                <option value="CC">CC - Cédula de ciudadania</option>
                <option value="TI">TI - Tarjeta de Identidad</option>
                <option value="CE">CE - Cédula de Extranjería</option>
                <option value="PAS">PPT - Permiso por Protección Temporal</option>
                <option value="NIT">RC - Registro Civil de Nacimiento</option>
                <option value="RC">PAS - Registro Civil</option>
              </select>
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{profile.tipoDocumento}</p>
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
            <label className="block text-sm text-gray-500 mb-2">Eps</label>
            {isEditingProfile ? (
              <select
                value={profile.eps}
                onChange={(e) => setProfile({...profile, eps: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent">
                <option value="sura">Sura</option>
                <option value="sanitas">Sanitas</option>
                <option value="compensar">Compensar</option>
                <option value="famisanar">Famisanar</option>
                <option value="saludTotal">Salud Total</option>
                <option value="nuevaEps">Nueva Eps</option>
                <option value="Coosalud">Coosalud</option>
                <option value="mutualSer">MutualSer</option>
                <option value="ninguna">Ninguna</option>
                <option value="otra">Otra</option>
              </select>
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{profile.eps}</p>
            )}
          </div>
        </div>

        <div className="space-y-6">

          <div>
            <label className="block text-sm text-gray-500 mb-2">Segundo Nombre</label>
            {isEditingProfile ? (
              <input
                type="text"
                value={profile.segundoNombre}
                onChange={(e) => setProfile({...profile, segundoNombre: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{profile.segundoNombre}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Segundo Apellido </label>
            {isEditingProfile ? (
              <input
                type="text"
                value={profile.segundoApellido}
                onChange={(e) => setProfile({...profile, segundoApellido: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{profile.segundoApellido}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Género</label>
            {isEditingProfile ? (
              <select
                value={profile.genero}
                onChange={(e) => setProfile({...profile, genero: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              >
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{profile.genero}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Lenguaje</label>
            {isEditingProfile ? (
              <select
                value={profile.lenguaje}
                onChange={(e) => setProfile({...profile, lenguaje: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              >
                <option value="Español">Español</option>
                <option value="Ingles">Inglés</option>
                <option value="Frances">Frnacés</option>
                <option value="Aleman">Alemán</option>
                <option value="Portugues">Portugués</option>
              </select>
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{profile.lenguaje}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Número de Documento</label>
            {isEditingProfile ? (
              <input
                type="text"
                value={profile.numeroDocumento}
                onChange={(e) => setProfile({...profile, numeroDocumento: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{profile.numeroDocumento}</p>
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

        </div>
      </div>
    </div>
  );
};

export default MyProfile;