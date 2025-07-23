import React, { useState } from 'react';
import { User, FileText, Shield, Plus, Trash2 } from 'lucide-react';

const GeneralData = () => {
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
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-blue-500 p-2 rounded-lg">
            <User className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-blue-900">Información del Paciente</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">ID Historia Médica</label>
            <input
              type="text"
              value={patientData.idhistoria_medica}
              onChange={(e) => handlePatientDataChange('idhistoria_medica', e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">ID Paciente</label>
            <input
              type="text"
              value={patientData.patient_idPaciente}
              onChange={(e) => handlePatientDataChange('patient_idPaciente', e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">ID Datos Paciente</label>
            <input
              type="text"
              value={patientData.patient_pac_data_idpac_data}
              onChange={(e) => handlePatientDataChange('patient_pac_data_idpac_data', e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">ID Usuario</label>
            <input
              type="text"
              value={patientData.patient_User_idUser}
              onChange={(e) => handlePatientDataChange('patient_User_idUser', e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">ID Credencial Usuario</label>
            <input
              type="text"
              value={patientData.patient_User_credential_users_idcred}
              onChange={(e) => handlePatientDataChange('patient_User_credential_users_idcred', e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">ID Rol</label>
            <input
              type="text"
              value={patientData.patient_User_rol_idrol}
              onChange={(e) => handlePatientDataChange('patient_User_rol_idrol', e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">Email</label>
            <input
              type="email"
              value={patientData.email}
              onChange={(e) => handlePatientDataChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">Tipo EPS</label>
            <select
              value={patientData.eps_type}
              onChange={(e) => handlePatientDataChange('eps_type', e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar EPS</option>
              <option value="Sura">Sura</option>
              <option value="Sanitas">Sanitas</option>
              <option value="Compensar">Compensar</option>
              <option value="Nueva EPS">Nueva EPS</option>
              <option value="Famisanar">Famisanar</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">Contacto de Emergencia</label>
            <input
              type="text"
              value={patientData.emergency_contact}
              onChange={(e) => handlePatientDataChange('emergency_contact', e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">Teléfono de Contacto</label>
            <input
              type="tel"
              value={patientData.contact_phone}
              onChange={(e) => handlePatientDataChange('contact_phone', e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
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
                  <label className="block text-sm font-medium text-green-700 mb-2">ID Antecedente</label>
                  <input
                    type="text"
                    value={history.idantecedente}
                    onChange={(e) => handleMedicalHistoryChange(index, 'idantecedente', e.target.value)}
                    className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">ID Historia Médica</label>
                  <input
                    type="text"
                    value={history.medicalHistoryId}
                    onChange={(e) => handleMedicalHistoryChange(index, 'medicalHistoryId', e.target.value)}
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

      {/* Consentimientos Informados */}
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-6 border border-purple-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-purple-500 p-2 rounded-lg">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-purple-900">Consentimientos Informados</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">ID Consentimiento</label>
            <input
              type="text"
              value={consent.idconsentimiento}
              onChange={(e) => handleConsentChange('idconsentimiento', e.target.value)}
              className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">ID Especialidad</label>
            <input
              type="text"
              value={consent.especialidad_id}
              onChange={(e) => handleConsentChange('especialidad_id', e.target.value)}
              className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">Fecha de Firma</label>
            <input
              type="datetime-local"
              value={consent.fecha_firma}
              onChange={(e) => handleConsentChange('fecha_firma', e.target.value)}
              className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">Firmado Por</label>
            <input
              type="text"
              value={consent.firmado_por}
              onChange={(e) => handleConsentChange('firmado_por', e.target.value)}
              className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">Relación con Paciente</label>
            <select
              value={consent.relacion_con_paciente}
              onChange={(e) => handleConsentChange('relacion_con_paciente', e.target.value)}
              className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Seleccionar relación</option>
              <option value="Paciente">Paciente</option>
              <option value="Padre/Madre">Padre/Madre</option>
              <option value="Tutor Legal">Tutor Legal</option>
              <option value="Cónyuge">Cónyuge</option>
              <option value="Hijo/a">Hijo/a</option>
              <option value="Hermano/a">Hermano/a</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">Documento de Identidad</label>
            <input
              type="text"
              value={consent.documento_identidad}
              onChange={(e) => handleConsentChange('documento_identidad', e.target.value)}
              className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-purple-700 mb-2">Texto del Consentimiento</label>
            <textarea
              value={consent.consentimiento_texto}
              onChange={(e) => handleConsentChange('consentimiento_texto', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Texto completo del consentimiento informado..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">Estado Firmado</label>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={consent.firmado}
                onChange={(e) => handleConsentChange('firmado', e.target.checked)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-purple-300 rounded"
              />
              <span className="text-sm text-purple-700">Documento firmado</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">Firma Digital</label>
            <input
              type="text"
              value={consent.firma_digital}
              onChange={(e) => handleConsentChange('firma_digital', e.target.value)}
              className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Hash o referencia de la firma digital"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">Fecha de Creación</label>
            <input
              type="datetime-local"
              value={consent.fecha_creacion}
              onChange={(e) => handleConsentChange('fecha_creacion', e.target.value)}
              className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-purple-700 mb-2">Observaciones</label>
            <textarea
              value={consent.observaciones}
              onChange={(e) => handleConsentChange('observaciones', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Observaciones adicionales sobre el consentimiento..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralData;