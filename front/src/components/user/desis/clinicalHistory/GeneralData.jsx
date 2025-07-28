import React, { useState } from 'react';
import { User, FileText, Shield, Plus, Trash2, Edit3, Save, X } from 'lucide-react';

const GeneralData = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [patientData, setPatientData] = useState({
    idhistoria_medica: '',
    patient_idPaciente: '',
    patient_pac_data_idpac_data: '',
    patient_User_idUser: '',
    patient_User_credential_users_idcred: '',
    patient_User_rol_idrol: '',
    email: '',
    eps_type: '',
    emergency_contact: '',
    contact_phone: ''
  });

  const [formData, setFormData] = useState({
    nombre: 'Juan Manuel Pérez Rodríguez',
    edad: '40',
    email: 'juan.perez@email.com',
    telefono: '+57 300 123 4567',
    fechaNacimiento: '1985-03-15',
    direccion: 'Calle 123 #45-67, Bogotá',
    tipoSangre: 'O+',
    alergias: 'Penicilina, Mariscos',
    contactoEmergencia: 'María Pérez - 300 765 4321',
    gender: 'Masculino',


  });

  const [medicalHistory, setMedicalHistory] = useState([
    {
      idantecedente: '',
      medicalHistoryId: '',
      type: '',
      description: ''
    }
  ]);

  const [consent, setConsent] = useState({
    idconsentimiento: '',
    patient_idPaciente: '',
    patient_pac_data_idpac_data: '',
    patient_User_idUser: '',
    patient_User_credential_users_idcred: '',
    patient_User_rol_idrol: '',
    especialidad_id: '',
    fecha_firma: '',
    firmado_por: '',
    relacion_con_paciente: '',
    documento_identidad: '',
    consentimiento_texto: '',
    firmado: false,
    firma_digital: '',
    observaciones: '',
    fecha_creacion: '',
    fecha_actualizacion: ''
  });

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
      {/*Boton para editar datos*/}
      <div className="flex kistify-between items-center mb-8">
        {!isEditingProfile ? (
          <button
          onClick={() => setIsEditingProfile(true)}
          className="flex items-center gap-2 text-green-600 hover:text-gray-900 transition-colors">
            <Edit3 size={20} className='text-green-600 font-semibold'/>Editar</button>
        ) : (
          <div className='flex gap-4'>
            <button
            onClick={handleSaveProfile}
            className='flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors'>
              <Save size={16}/>Guardar</button>
              <button
              onClick={() => setIsEditingProfile(false)}
              className='flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors'>
              <X size={16}/>Cancelar</button>
          </div>
        )}
      </div>
      
      {/* Información del Paciente */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-blue-500 p-2 rounded-lg">
            <User className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-blue-900">Información del Paciente</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-700 mb-1">Nombres y Apellidos</label>
            {isEditingProfile ? (
              <input 
              type="text"
              value={formData.nombre} 
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}/>
            ) : (
              <p className="text-base text-blue-900 font-semibold">{formData.nombre}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-700 mb-1">Edad</label>
            {isEditingProfile ? (
            <input 
            type="text"
            value={formData.edad}
            onChange={(e) => setFormData({...formData, nombre: e.target.value})}/>
            ) : (
              <p className="text-base text-blue-900 font-semibold">{formData.edad}</p>
            )}
          </div>

          <div>
              <label className="block text-sm font-medium text-blue-700 mb-1 pt-1">Fecha de nacimiento</label>
              {isEditingProfile ? (
              <input
                type="date"
                value={formData.fechaNacimiento}
                onChange={(e) => setFormData({...formData, fechaNacimiento: e.target.value})}
                className="w-full px-3 py-2 border-b border-blue-300 pb-3 text-sm focus:border-blue-300 focus:outline-none transition-colors rounded-sm"/>
              ) : (
                <p className="text-gray-900 pb-3 border-b border-gray-100">{formData.fechaNacimiento}</p>
              )}
            </div>

          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">Género</label>
            {isEditingProfile ? (
            <select
              value={patientData.gender}
              onChange={(e) => handlePatientDataChange('gender', e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-md"
            >
              <option value="">Selecciona</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
            ) : ( 
              <p className="text-gray-900 pb-3 border-b border-gray-100">{formData.gender}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-700 mb-1">Correo</label>
            <p className="text-base text-blue-900 font-semibold">juan.perez@email.com</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-700 mb-1">Dirección</label>
            <p className="text-base text-blue-900 font-semibold">Calle 123 #45-67, Bogotá</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-700 mb-1">Teléfono</label>
            <p className="text-base text-blue-900 font-semibold">+57 300 123 4567</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">Tipo de documento</label>
            <select
              value={patientData.gender}
              onChange={(e) => handlePatientDataChange('gender', e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-md">
              <option value="">Selecciona</option>
              <option value="Cedula">Cédula de Ciudadanía</option>
              <option value="TarjetaIdentidad">Tarjeta de Identidad</option>
              <option value="Otro">Cédula de Extranjería</option>
              <option value="Pasaporte">Pasaporte</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-700 mb-1">Número de documento</label>
            <p className="text-base text-blue-900 font-semibold">1.098.765.432</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-700 mb-1">Alergias</label>
            <p className="text-base text-blue-900 font-semibold">Penicilina, Mariscos</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-700 mb-1">Contacto de emergencia</label>
            <p className="text-base text-blue-900 font-semibold">María Pérez - 300 765 4321</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-700 mb-1">Profesión</label>
            <p className="text-base text-blue-900 font-semibold">Maestro de obra</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-700 mb-1">Estado civil</label>
            <p className="text-base text-blue-900 font-semibold">Soltero</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-700 mb-1">Grupo étnico</label>
            <p className="text-base text-blue-900 font-semibold">N/A</p>
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
            className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
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
                    <option value="Familiar">Familiar</option>
                    <option value="Personal">Personal</option>
                    <option value="Quirúrgico">Quirúrgico</option>
                    <option value="Alérgico">Alérgico</option>
                    <option value="Farmacológico">Farmacológico</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-green-700 mb-2">Descripción</label>
                  <textarea
                    value={history.description}
                    onChange={(e) => handleMedicalHistoryChange(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Descripción detallada del antecedente..."
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