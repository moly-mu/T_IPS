
import { Link } from "react-router-dom";
import { useState } from 'react';
import { 
  User, 
  FileText, 
  Calendar, 
  Star, 
  Search, 
  Edit3,
  Save,
  X,
  CheckCircle,
  Clock,
  Download
} from 'lucide-react';

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('perfil');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Estados para el perfil
  const [profile, setProfile] = useState({
    nombre: 'Juan Pérez',
    email: 'juan.perez@email.com',
    telefono: '+57 300 123 4567',
    fechaNacimiento: '1985-03-15',
    direccion: 'Calle 123 #45-67, Bogotá',
    tipoSangre: 'O+',
    alergias: 'Penicilina, Mariscos',
    contactoEmergencia: 'María Pérez - 300 765 4321'
  });

  const [historiaClinica] = useState([
    {
      id: 1,
      fecha: '15 DIC 2024',
      doctor: 'Dr. Carlos Rodríguez',
      especialidad: 'Cardiología',
      diagnostico: 'Control rutinario - Presión arterial normal',
      tratamiento: 'Continuar con ejercicio regular y dieta balanceada'
    },
    {
      id: 2,
      fecha: '20 NOV 2024',
      doctor: 'Dra. Ana Martínez',
      especialidad: 'Medicina General',
      diagnostico: 'Gripe común',
      tratamiento: 'Acetaminofén cada 8 horas por 5 días'
    }
  ]);

  const [citas] = useState([
    {
      id: 1,
      fecha: '15 ENE 2025',
      hora: '10:00',
      doctor: 'Dr. Luis García',
      especialidad: 'Dermatología',
      estado: 'confirmada'
    },
    {
      id: 2,
      fecha: '08 ENE 2025',
      hora: '14:30',
      doctor: 'Dra. Patricia Gómez',
      especialidad: 'Ginecología',
      estado: 'pendiente'
    }
  ]);

  const [encuestas] = useState([
    {
      id: 1,
      doctor: 'Dr. Carlos Rodríguez',
      fecha: '15 DIC 2024',
      completada: false
    },
    {
      id: 2,
      doctor: 'Dra. Ana Martínez',
      fecha: '20 NOV 2024',
      completada: true,
      calificacion: 5
    }
  ]);

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
  };

  const handleSubmitSurvey = (encuestaId) => {
    console.log(`Encuesta ${encuestaId} enviada con calificación: ${selectedRating}`);
    setSelectedRating(0);
  };

  const renderPerfil = () => (
    <div className="bg-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-light text-gray-900">Mi Perfil</h2>
        {!isEditingProfile ? (
          <button
            onClick={() => setIsEditingProfile(true)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Edit3 size={16} />
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

  const renderHistoriaClinica = () => (
    <div className="bg-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-light text-gray-900">Historia Clínica</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
          />
        </div>
      </div>

      <div className="space-y-6">
        {historiaClinica.map((consulta) => (
          <div key={consulta.id} className="border-b border-gray-100 pb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {consulta.fecha}
                  </span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{consulta.doctor}</h3>
                <p className="text-sm text-gray-500">{consulta.especialidad}</p>
              </div>
              <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors">
                <Download size={16} />
                <span className="text-sm">Descargar</span>
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Diagnóstico</p>
                <p className="text-gray-900">{consulta.diagnostico}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Tratamiento</p>
                <p className="text-gray-900">{consulta.tratamiento}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCitas = () => (
    <div className="bg-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-light text-gray-900">Mis Citas</h2>
          <Link to="/calendarQuotes">
            <button className="bg-gray-900 text-white px-6 py-2 text-sm hover:bg-gray-800 transition-colors">
              AGENDAR CITA
            </button>
          </Link>
      </div>

      <div className="space-y-4">
        {citas.map((cita) => (
          <div key={cita.id} className="border-b border-gray-100 pb-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-gray-400" size={16} />
                    <span className="font-medium">{cita.fecha}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="text-gray-400" size={16} />
                    <span className="text-gray-600">{cita.hora}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    cita.estado === 'confirmada' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {cita.estado === 'confirmada' ? 'CONFIRMADA' : 'PENDIENTE'}
                  </span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{cita.doctor}</h3>
                <p className="text-sm text-gray-500">{cita.especialidad}</p>
              </div>
              <div className="text-right space-y-2">
                <button className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Reagendar
                </button>
                <button className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEncuestas = () => (
    <div className="bg-white">
      <h2 className="text-2xl font-light text-gray-900 mb-8">Encuestas de Satisfacción</h2>

      <div className="space-y-6">
        {encuestas.map((encuesta) => (
          <div key={encuesta.id} className="border-b border-gray-100 pb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-1">{encuesta.doctor}</h3>
                <p className="text-sm text-gray-500">Consulta del {encuesta.fecha}</p>
              </div>
              <div className="flex items-center gap-2">
                {encuesta.completada ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={16} />
                    <span className="text-sm">Completada</span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">Pendiente</span>
                )}
              </div>
            </div>

            {encuesta.completada ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Calificación:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={star <= encuesta.calificacion ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Califica tu experiencia:</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setSelectedRating(star)}
                      className="transition-colors"
                    >
                      <Star
                        size={20}
                        className={star <= selectedRating ? 'text-yellow-500 fill-current' : 'text-gray-300 hover:text-yellow-400'}
                      />
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handleSubmitSurvey(encuesta.id)}
                  disabled={selectedRating === 0}
                  className="bg-gray-900 text-white px-4 py-2 text-sm hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  ENVIAR CALIFICACIÓN
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
  <div className="min-h-screen bg-gray-50">
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

    <div className="pt-24 pb-20"> 
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-light text-gray-900 mb-2">Bienvenido, {profile.nombre}</h2>
          <p className="text-gray-500">Gestiona tu información médica y citas</p>
        </div>

        <div className="border-b border-gray-200 mb-12">
          <div className="flex gap-12">
            {[{ key: 'perfil', label: 'Mi Perfil', icon: User },
              { key: 'historia', label: 'Historia Clínica', icon: FileText },
              { key: 'citas', label: 'Mis Citas', icon: Calendar },
              { key: 'encuestas', label: 'Encuestas', icon: Star }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 pb-4 font-light transition-colors ${activeTab === key ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          {activeTab === 'perfil' && renderPerfil()}
          {activeTab === 'historia' && renderHistoriaClinica()}
          {activeTab === 'citas' && renderCitas()}
          {activeTab === 'encuestas' && renderEncuestas()}
        </div>
      </div>
    </div>
  </div>
);
};

export default PatientDashboard;