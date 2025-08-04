import React, { useState } from 'react';
import { User, FileText, Shield, Plus, Trash2, Edit3, Save, X } from 'lucide-react';

const GeneralData = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [formData, setFormData] = useState({
    primerNombre: 'Juan',
    segundoNombre: 'Manuel',
    primerApellido: 'Pérez',
    segundoApellido: 'Rodríguez',
    fechaNacimiento: '1985-03-15',
    genero: 'Masculino',
    sexo: 'Masculino',
    lenguaje: 'Español',
    numeroDocumento: '1.098.765.432',
    tipoDocumento: 'CC - Cédula de Ciudadanía',
    telefono: '+57 300 123 4567',
    contactoEmergencia: 'María Pérez - 300 765 4321',
    email: 'juan.perez@email.com',
    direccion: 'Calle 123 #45-67, Bogotá',
    tipoSangre: 'O+',
    alergias: 'Penicilina, Mariscos',
    eps: 'Salud Total',
    profesion: 'Minero',
    estadoCivil: 'Casado',
    grupoEtnico: 'N//A',
    departamento: 'Bogotá',
  });

  const handleEpsChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, eps: value});
  }

  const [medicalHistory, setMedicalHistory] = useState([
    {
      idantecedente: '',
      medicalHistoryId: '',
      type: '',
      description: ''
    }
  ]);

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
  }

    //agregar en datos del paciente:
  //causa de atención, edad, tipo de paciente

  //agregar en datos generales:
  //notas medicas, signos vitales 

  const handlePatientDataChange = (field, value) => {
    setPatientData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMedicalHistoryChange = (index, field, value) => {
    const updated = [...medicalHistory];
    updated[index] = { ...updated[index], [field]: value };
    setMedicalHistory(updated);
  };

  const addMedicalHistory = () => {
    setMedicalHistory([...medicalHistory, {
      idantecedente: '',
      medicalHistoryId: '',
      type: '',
      description: ''
    }]);
  };

  const removeMedicalHistory = (index) => {
    if (medicalHistory.length > 1) {
      setMedicalHistory(medicalHistory.filter((_, i) => i !== index));
    }
  };

  const handleConsentChange = (field, value) => {
    setConsent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-8">
      {/* Información del Paciente */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-lg font-semibold text-blue-700'>Información del paciente</h2>
          {!isEditingProfile ? (
          <button
            onClick={() => setIsEditingProfile(true)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-900 transition-colors">
            <Edit3 size={20} className="text-blue-600 font-semibold"/>
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
                value={formData.primerNombre}
                onChange={(e) => setProfile({...formData, primerNombre: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{formData.primerNombre}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Primer Apellido </label>
            {isEditingProfile ? (
              <input
                type="text"
                value={formData.primerApellido}
                onChange={(e) => setProfile({...formData, primerApellido: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{formData.primerApellido}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Fecha de Nacimiento</label>
            {isEditingProfile ? (
              <input
                type="date"
                value={formData.fechaNacimiento}
                onChange={(e) => setProfile({...formData, fechaNacimiento: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{formData.fechaNacimiento}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Sexo</label>
            {isEditingProfile ? (
              <select
                value={formData.sexo}
                onChange={(e) => setProfile({...formData, sexo: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              >
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{formData.sexo}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Tipo de Documento</label>
            {isEditingProfile ? (
              <select
                value={formData.tipoDocumento}
                onChange={(e) => setProfile({...formData, tipoDocumento: e.target.value})}
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
              <p className="text-gray-900 pb-3 border-b border-gray-100">{formData.tipoDocumento}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Teléfono</label>
            {isEditingProfile ? (
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) => setProfile({...formData, telefono: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{formData.telefono}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Email</label>
            {isEditingProfile ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setProfile({...formData, email: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{formData.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Alergias</label>
            {isEditingProfile ? (
              <textarea
                value={formData.alergias}
                onChange={(e) => setProfile({...formData, alergias: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent resize-none"
                rows="2"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{formData.alergias}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Eps</label>
            {isEditingProfile ? (
              <div>
              <select
                value={formData.eps === '' || ! ['sura', 'sanitas', 'compensar', 'famisanar', 'saludTotal', 'nuevaEps', 'Coosalud', 'mutualSer', 'ninguna'].includes(formData.eps) ? 'otra' : formData.eps}
                onChange={handleEpsChange}
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

              {(formData.eps === 'otra' || !['sura', 'sanitas', 'compensar', 'famisanar', 'saludTotal', 'nuevaEps', 'Coosalud', 'mutualSer', 'ninguna'].includes(formData.eps)) && (
                <input 
                type="text"
                value={formData.eps === 'otra' ? '' : formData.eps}
                onChange={(e) => setFormData({ ...formData, eps: e.target.value })}
                placeholder='Especifica tu EPS'
                className='w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent mt-2' />
              )}
              </div>

              ) : (
                <p className="text-gray-900 pb-3 border-b border-gray-100">{formData.eps}</p>
              )}
            </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Estado Civil </label>
            {isEditingProfile ? (
              <input
                type="text"
                value={formData.estadoCivil}
                onChange={(e) => setProfile({...formData, estadoCivil: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{formData.estadoCivil}</p>
            )}
          </div>
        </div>


        <div className="space-y-6">

          <div>
            <label className="block text-sm text-gray-500 mb-2">Segundo Nombre</label>
            {isEditingProfile ? (
              <input
                type="text"
                value={formData.segundoNombre}
                onChange={(e) => setProfile({...formData, segundoNombre: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{formData.segundoNombre}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Segundo Apellido </label>
            {isEditingProfile ? (
              <input
                type="text"
                value={formData.segundoApellido}
                onChange={(e) => setProfile({...formData, segundoApellido: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{formData.segundoApellido}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Género</label>
            {isEditingProfile ? (
              <select
                value={formData.genero}
                onChange={(e) => setProfile({...formData, genero: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              >
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{formData.genero}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Lenguaje</label>
            {isEditingProfile ? (
              <select
                value={formData.lenguaje}
                onChange={(e) => setProfile({...formData, lenguaje: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              >
                <option value="Español">Español</option>
                <option value="Ingles">Inglés</option>
                <option value="Frances">Frnacés</option>
                <option value="Aleman">Alemán</option>
                <option value="Portugues">Portugués</option>
              </select>
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{formData.lenguaje}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Número de Documento</label>
            {isEditingProfile ? (
              <input
                type="text"
                value={formData.numeroDocumento}
                onChange={(e) => setProfile({...formData, numeroDocumento: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{formData.numeroDocumento}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Contacto de Emergencia</label>
            {isEditingProfile ? (
              <input
                type="text"
                value={formData.contactoEmergencia}
                onChange={(e) => setProfile({...formData, contactoEmergencia: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{formData.contactoEmergencia}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Dirección</label>
            {isEditingProfile ? (
              <textarea
                value={formData.direccion}
                onChange={(e) => setProfile({...formData, direccion: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent resize-none"
                rows="2"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{formData.direccion}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Tipo de Sangre</label>
            {isEditingProfile ? (
              <select
                value={formData.tipoSangre}
                onChange={(e) => setProfile({...formData, tipoSangre: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent">
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
              <p className="text-gray-900 pb-3 border-b border-gray-100">{formData.tipoSangre}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Profesión </label>
            {isEditingProfile ? (
              <input
                type="text"
                value={formData.profesion}
                onChange={(e) => setProfile({...formData, profesion: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{formData.profesion}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Grupo Étnico</label>
            {isEditingProfile ? (
              <select
                value={formData.grupoEtnico}
                onChange={(e) => setProfile({...formData, grupoEtnico: e.target.value})}
                className="w-full p-3 border-b border-gray-200 focus:border-gray-400 focus:outline-none bg-transparent">
                <option value="noSabe">N/A</option>
                <option value="otro">Otro</option>
              </select>
            ) : (
              <p className="text-gray-900 pb-3 border-b border-gray-100">{formData.grupoEtnico}</p>
            )}
          </div>
        </div>
      </div>
    </div>
          {/* Antecedentes Médicos */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-green-500 p-2 rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-green-900">Antecedentes Médicos</h3>
          </div>
          <button
            onClick={addMedicalHistory}
            className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Agregar</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {medicalHistory.map((history, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-green-200">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-sm font-medium text-green-800">Antecedente #{index + 1}</h4>
                {medicalHistory.length > 1 && (
                  <button
                    onClick={() => removeMedicalHistory(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">Antecedente</label>
                  <input
                    type="text"
                    value={history.idantecedente}
                    onChange={(e) => handleMedicalHistoryChange(index, 'idantecedente', e.target.value)}
                    className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">Tipo</label>
                  <select
                    value={history.type}
                    onChange={(e) => handleMedicalHistoryChange(index, 'type', e.target.value)}
                    className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="Medico">Médico</option>
                    <option value="Hospitalario">Hospitalario</option>
                    <option value="Ginecoobstétrico">Ginecoobstétrico - Solo en mujeres</option>
                    <option value="Quirúrgico">Quirúrgico</option>
                    <option value="Farmacológico">Farmacológico</option>
                    <option value="NoFarmacológico">No Farmacológico</option>
                    <option value="AlergiaMedicamento">Alergia a Medicamento</option>
                    <option value="OtrasAlergias">Otras Alergias</option>
                    <option value="Tóxico">Tóxico</option>
                    <option value="Transfusional">Transfusional</option>
                    <option value="Familiar">Familiar</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-green-700 mb-2">Descripción</label>
                  <textarea
                    value={history.description}
                    onChange={(e) => handleMedicalHistoryChange(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Descripción detallada del antecedente y cuando inicio este..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeneralData;