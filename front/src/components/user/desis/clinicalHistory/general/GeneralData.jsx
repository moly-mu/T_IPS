import { useState, useEffect, useCallback } from 'react';
import { FileText, Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import { generalDataService } from '../../../../../services/clinicalHistory/clinicalHistoryService';
import History from './history';

const GeneralData = ({ medicalHistory, patientId }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [patientData, setPatientData] = useState(null);
  
  const [formData, setFormData] = useState({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    fechaNacimiento: '',
    genero: 'Masculino',
    sexo: 'Masculino',
    lenguaje: 'Español',
    numeroDocumento: '',
    tipoDocumento: 'CC',
    telefono: '',
    contactoEmergencia: '',
    email: '',
    direccion: '',
    tipoSangre: 'O+',
    alergias: '',
    eps: 'Ninguna',
    profesion: '',
    estadoCivil: '',
    grupoEtnico: 'N/A',
  });

  const [medicalBackgrounds, setMedicalBackgrounds] = useState([]);

  const handleEpsChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, eps: value});
  }

  useEffect(() => {
    if (patientId) {
      loadPatientData();
    }
  }, [patientId, loadPatientData]);

  useEffect(() => {
    if (medicalHistory?.id) {
      loadMedicalBackgrounds();
    }
  }, [medicalHistory?.id, loadMedicalBackgrounds]);

  const loadPatientData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await generalDataService.getPatientData(patientId);
      if (response.success) {
        const patient = response.data;
        setPatientData(patient);
        
        setFormData({
          primerNombre: patient.User.firstname || '',
          segundoNombre: patient.User.second_firstname || '',
          primerApellido: patient.User.lastname || '',
          segundoApellido: patient.User.second_lastname || '',
          fechaNacimiento: patient.User.birthdate ? new Date(patient.User.birthdate).toISOString().split('T')[0] : '',
          genero: patient.User.gender || 'Masculino',
          sexo: patient.User.sex || 'Masculino',
          lenguaje: patient.User.language || 'Español',
          numeroDocumento: patient.User.credential_users.document?.toString() || '',
          tipoDocumento: patient.User.document_type || 'CC',
          telefono: patient.User.phone || '',
          contactoEmergencia: patient.pac_data.emergency_contact || '',
          email: patient.User.credential_users.email || '',
          direccion: patient.pac_data.Direction || '',
          tipoSangre: patient.pac_data.bloodType || 'O+',
          alergias: patient.pac_data.allergies || '',
          eps: patient.pac_data.eps_type || 'Ninguna',
          profesion: patient.pac_data.profession || '',
          estadoCivil: '',
          grupoEtnico: patient.pac_data.ethnicgroup || 'N/A',
        });
      }
    } catch (error) {
      console.error('Error loading patient data:', error);
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  const loadMedicalBackgrounds = useCallback(async () => {
    try {
      const response = await generalDataService.getBackgroundsByHistory(medicalHistory.id);
      if (response.success) {
        setMedicalBackgrounds(response.data);
      }
    } catch (error) {
      console.error('Error loading medical backgrounds:', error);
    }
  }, [medicalHistory?.id]);

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      await generalDataService.updatePatientData(patientId, formData);
      setIsEditingProfile(false);
      alert('Datos actualizados exitosamente');
    } catch (error) {
      console.error('Error updating patient data:', error);
      alert('Error al actualizar los datos');
    } finally {
      setLoading(false);
    }
  };

  const handleMedicalBackgroundChange = (index, field, value) => {
    const updated = [...medicalBackgrounds];
    updated[index] = { ...updated[index], [field]: value };
    setMedicalBackgrounds(updated);
  };

  const addMedicalBackground = async () => {
    const newBackground = {
      medicalHistoryId: medicalHistory?.id || '',
      type: '',
      description: ''
    };
    
    try {
      const response = await generalDataService.createBackground(newBackground);
      if (response.success) {
        setMedicalBackgrounds([...medicalBackgrounds, response.data]);
      }
    } catch (error) {
      console.error('Error creating medical background:', error);
      setMedicalBackgrounds([...medicalBackgrounds, { ...newBackground, id: Date.now() }]);
    }
  };

  const removeMedicalBackground = async (index) => {
    const background = medicalBackgrounds[index];
    if (background.id && window.confirm('¿Está seguro de eliminar este antecedente?')) {
      try {
        await generalDataService.deleteBackground(background.id);
        setMedicalBackgrounds(medicalBackgrounds.filter((_, i) => i !== index));
      } catch (error) {
        console.error('Error deleting medical background:', error);
        alert('Error al eliminar el antecedente');
      }
    } else {
      setMedicalBackgrounds(medicalBackgrounds.filter((_, i) => i !== index));
    }
  };

  if (loading && !patientData) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
        <span className="ml-2">Cargando datos del paciente...</span>
      </div>
    );
  }

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
                onChange={(e) => setFormData({...formData, primerNombre: e.target.value})}
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
                onChange={(e) => setFormData({...formData, primerApellido: e.target.value})}
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
                onChange={(e) => setFormData({...formData, fechaNacimiento: e.target.value})}
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
                onChange={(e) => setFormData({...formData, sexo: e.target.value})}
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
                onChange={(e) => setFormData({...formData, tipoDocumento: e.target.value})}
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
                onChange={(e) => setFormData({...formData, telefono: e.target.value})}
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
                onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                onChange={(e) => setFormData({...formData, alergias: e.target.value})}
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
                onChange={(e) => setFormData({...formData, estadoCivil: e.target.value})}
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
                onChange={(e) => setFormData({...formData, segundoNombre: e.target.value})}
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
                onChange={(e) => setFormData({...formData, segundoApellido: e.target.value})}
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
                onChange={(e) => setFormData({...formData, genero: e.target.value})}
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
                onChange={(e) => setFormData({...formData, lenguaje: e.target.value})}
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
                onChange={(e) => setFormData({...formData, numeroDocumento: e.target.value})}
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
                onChange={(e) => setFormData({...formData, contactoEmergencia: e.target.value})}
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
                onChange={(e) => setFormData({...formData, direccion: e.target.value})}
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
                onChange={(e) => setFormData({...formData, tipoSangre: e.target.value})}
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
                onChange={(e) => setFormData({...formData, profesion: e.target.value})}
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
                onChange={(e) => setFormData({...formData, grupoEtnico: e.target.value})}
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
            onClick={addMedicalBackground}
            className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Agregar</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {medicalBackgrounds.map((history, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-green-200">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-sm font-medium text-green-800">Antecedente #{index + 1}</h4>
                {medicalBackgrounds.length > 1 && (
                  <button
                    onClick={() => removeMedicalBackground(index)}
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
                    onChange={(e) => handleMedicalBackgroundChange(index, 'idantecedente', e.target.value)}
                    className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">Tipo</label>
                  <select
                    value={history.type}
                    onChange={(e) => handleMedicalBackgroundChange(index, 'type', e.target.value)}
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
                    onChange={(e) => handleMedicalBackgroundChange(index, 'description', e.target.value)}
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
    <History/>
    </div>
  );
};

export default GeneralData;
