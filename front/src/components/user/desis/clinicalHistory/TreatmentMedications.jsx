import { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar, Pill, Save, X } from 'lucide-react';

const TreatmentMedications = () => {
  const [recetas, setRecetas] = useState([
    {
      idreceta: 1564,
      cie10: 'HM001',
      medicine: 'Ibuprofeno 400mg',
      dosage: '1 tableta',
      prescripcion: 'Tomar después de las comidas para reducir irritación gástrica',
      issuedAt: '2025-01-15',
      sentBy: 'Dr. García Martínez',
      numeroFormula: '0623-34771412',
      contrato: '10-7724020-1-1',
      historiaClinica: '1058099135'
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    idreceta: '',
    cie10: '',
    medicine: '',
    dosage: '',
    prescripcion: '',
    issuedAt: '',
    sentBy: '',
    numeroFormula: '',
    contrato: '',
    historiaClinica: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAdd = () => {
    setIsEditing(true);
    setEditingId(null);
    setFormData({
      idreceta: '',
      cie10: '',
      medicine: '',
      dosage: '',
      prescripcion: '',
      issuedAt: '',
      sentBy: '',
      numeroFormula: '',
      contrato: '',
      historiaClinica: ''
    });
  };

  const handleEdit = (receta) => {
    setIsEditing(true);
    setEditingId(receta.idreceta);
    setFormData(receta);
  };

  const handleSave = () => {
    if (editingId) {
      setRecetas(prev => prev.map(item => 
        item.idreceta === editingId ? { ...formData, idreceta: editingId } : item
      ));
    } else {
      const newId = Math.max(...recetas.map(r => r.idreceta), 0) + 1;
      setRecetas(prev => [...prev, { ...formData, idreceta: newId }]);
    }
    setIsEditing(false);
    setEditingId(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar esta receta médica?')) {
      setRecetas(prev => prev.filter(item => item.idreceta !== id));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }) + ', ' + date.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-end mb-6">
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-[#00102D] text-white rounded hover:bg-[#003366] transition-colors text-sm">
          <Plus className="h-4 w-4" />
          <span>Agregar medicamento</span>
        </button>
      </div>

      {/* formulario */}
      {isEditing && (
        <div className="bg-[#E6EEFF] p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CIE-10
              </label>
              <input
                type="text"
                value={formData.cie10}
                onChange={(e) => handleInputChange('cie10', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#002F86] text-sm"
                placeholder="ID de historia médica"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID Receta
              </label>
              <input
                type="text"
                value={formData.idreceta}
                onChange={(e) => handleInputChange('idreceta', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#002F86] text-sm"
                placeholder="ID de la receta"
                disabled={editingId}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de Fórmula
              </label>
              <input
                type="text"
                value={formData.numeroFormula}
                onChange={(e) => handleInputChange('numeroFormula', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#002F86] text-sm"
                placeholder="0623-34771412"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enviado Por
              </label>
              <input
                type="text"
                value={formData.sentBy}
                onChange={(e) => handleInputChange('sentBy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#002F86] text-sm"
                placeholder="Médico que emite la receta"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contrato EPS
              </label>
              <input
                type="text"
                value={formData.contrato}
                onChange={(e) => handleInputChange('contrato', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#002F86] text-sm"
                placeholder="10-7724020-1-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Historia Clínica
              </label>
              <input
                type="text"
                value={formData.historiaClinica}
                onChange={(e) => handleInputChange('historiaClinica', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#002F86] text-sm"
                placeholder="1058099135"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medicamento
              </label>
              <input
                type="text"
                value={formData.medicine}
                onChange={(e) => handleInputChange('medicine', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#002F86] text-sm"
                placeholder="Nombre y presentación"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dosificación
              </label>
              <input
                type="text"
                value={formData.dosage}
                onChange={(e) => handleInputChange('dosage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#002F86] text-sm"
                placeholder="Dosis por toma"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Emisión
              </label>
              <input
                type="date"
                value={formData.issuedAt}
                onChange={(e) => handleInputChange('issuedAt', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#002F86] text-sm"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prescripción
              </label>
              <textarea
                value={formData.prescripcion}
                onChange={(e) => handleInputChange('prescripcion', e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#002F86] text-sm resize-none"
                placeholder="Prescripciones especiales para la administración del medicamento..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm">
              <X className="h-4 w-4" />
              <span>Cancelar</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-[#00102D] text-white rounded hover:bg-[#003366] transition-colors text-sm">
              <Save className="h-4 w-4" />
              <span>Guardar</span>
            </button>
          </div>
        </div>
      )}

      {/* lista recetas existentes */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
          <h3 className="font-medium text-gray-900 flex items-center space-x-2">
            <Pill className="h-5 w-5 text-[#002F86]" />
            <span>Recetas Registradas ({recetas.length})</span>
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {recetas.map((receta, index) => (
            <div key={receta.idreceta}>
              {/* Cabecera profesional de cada receta */}
              <div className="bg-white px-8 py-4 border-b border-gray-300">
                <div className="flex justify-between">
                  <div className="text-left">
                    <h1 className="text-xl font-bold text-[#00102D] mb-2">TELECONSULTAS IPS</h1>
                    <div className="space-y-1 text-xs text-[#00102D]">
                      <div className="font-medium">IPS Universitaria de Colombia - NIT. 00.00000</div>
                      <div>Calle 34 5 89, Bogotá Teléfono: (+57) 310-8731876</div>
                      <div>Nombre: JUAN MANUEL PÉREZ RODRÍGUEZ</div>
                      <div>Identificación: CC 1098765432</div>
                      <div>Sexo: Masculino - Edad: 40 Años</div>
                    </div>
                  </div>

                  <div className="text-left">
                    <h1 className="text-sm font-bold text-[#00102D] mb-2">
                      FÓRMULA MÉDICA <br /> No. {receta.numeroFormula || '0623-34771412'}
                    </h1>
                    <div className="space-y-1 text-xs text-[#00102D]">
                      <div>BOGOTÁ</div>
                      <div>{formatDate(receta.issuedAt) || '05/03/2021, 17:02:14'}</div>
                      <div>Contrato E.P.S Sanitas: {receta.contrato || '10-7724020-1-1'}</div>
                      <div>Historia Clínica: {receta.historiaClinica || '1058099135'}</div>
                      <div>Tipo de Usuario: Contributivo</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenido original de la receta */}
              <div className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#BAD2FF] rounded-full flex items-center justify-center text-sm font-bold text-[#00102D]">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{receta.medicine}</h4>
                      <p className="text-sm text-gray-500">Receta #{receta.idreceta} - Diagnóstico: {receta.cie10}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleEdit(receta)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Editar">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(receta.idreceta)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Eliminar">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-500">Dosificación:</span>
                    <p className="text-gray-900">{receta.dosage}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Enviado Por:</span>
                    <p className="text-gray-900">{receta.sentBy}</p>
                  </div>
                </div>

                {receta.prescripcion && (
                  <div className="mb-3">
                    <span className="font-medium text-gray-500 text-sm">Prescripción:</span>
                    <p className="text-sm text-gray-700 mt-1 p-2 bg-blue-50 border-l-4 border-[#003EB1] rounded">
                      {receta.prescripcion}
                    </p>
                  </div>
                )}

                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Emitida: {receta.issuedAt}</span>
                </div>

                <div className="flex items-center text-xs text-gray-500">*Los medicamentos únicamente deben ser administrados durante el tiempo definido en la formulación</div>
              </div>
              
            </div>
          ))}

          {recetas.length === 0 && (
            <div className="p-8 text-center">
              <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay recetas médicas registradas</h3>
              <p className="text-gray-500 mb-4">Comience agregando una nueva receta médica utilizando el botón "Agregar" en la parte superior.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TreatmentMedications;