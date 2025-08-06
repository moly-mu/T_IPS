import { useState } from 'react';
import { Plus, Edit2, Trash2, FileText, Calendar, Save, X } from 'lucide-react';

const MedicalOrders = () => {
  const [historyData, setHistoryData] = useState([
    {
      idAntecedente: 1,
      antecedenteP: 'Ingreso Hospitalario por Apendicitis Aguda',
      tipo: 'Hospitalario',
      fechaDiagnostico: '2019-03-15',
      descripcion: 'El paciente fue ingresado en el Hospital XYZ el 15 de marzo de 2019 debido a un cuadro de dolor abdominal intenso en el lado derecho. Tras realizar los exámenes pertinentes, se diagnosticó apendicitis aguda. Fue sometido a una apendicectomía laparoscópica, que fue exitosa. No se presentaron complicaciones postoperatorias y fue dado de alta al segundo día.'
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    idAntecedente: '',
    antecedenteP: '',
    tipo: '',
    fechaDiagnostico: '',
    descripcion: ''
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
      idAntecedente: '',
      antecedenteP: '',
      tipo: '',
      fechaDiagnostico: '',
      descripcion: ''
    });
  };

  const handleEdit = (history) => {
    setIsEditing(true);
    setEditingId(history.idAntecedente);
    setFormData(history);
  };

  const handleSave = () => {
    if (editingId) {
      setHistoryData(prev => prev.map(item => 
        item.idAntecedente === editingId ? { ...formData, idAntecedente: editingId } : item
      ));
    } else {
      const newId = Math.max(...historyData.map(r => r.idAntecedente), 0) + 1;
      setHistoryData(prev => [...prev, { ...formData, idAntecedente: newId }]);
    }
    setIsEditing(false);
    setEditingId(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar este antecedente médico?')) {
      setHistoryData(prev => prev.filter(item => item.idAntecedente !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-end mb-6">
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600 transition-colors text-sm">
          <Plus className="h-4 w-4" />
          <span>Agregar Antecedente</span>
        </button>
      </div>

      {isEditing && (
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Antecedente
              </label>
              <input
                type="text"
                value={formData.antecedenteP}
                onChange={(e) => handleInputChange('antecedenteP', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-700 text-sm"
                placeholder="Indica el nombre o el diagnóstico relacionado"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select
                value={formData.tipo}
                onChange={(e) => handleInputChange('tipo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-700 text-sm">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Diagnóstico
              </label>
              <input
                type="date"
                value={formData.fechaDiagnostico}
                onChange={(e) => handleInputChange('fechaDiagnostico', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-700 text-sm"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => handleInputChange('descripcion', e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-700 text-sm resize-none"
                placeholder="Descripción detallada del antecedente y cuando inició este..."
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
              className="flex items-center space-x-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600 transition-colors text-sm">
              <Save className="h-4 w-4" />
              <span>Guardar</span>
            </button>
          </div>
        </div>
      )}

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
          <h3 className="font-medium text-gray-900 flex items-center space-x-2">
            <FileText className="h-5 w-5 text-green-600" />
            <span>Antecedentes Registrados ({historyData.length})</span>
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {historyData.map((history, index) => (
            <div key={history.idAntecedente} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-bold text-green-900">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Antecedente #{history.idAntecedente}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleEdit(history)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Editar">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(history.idAntecedente)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Eliminar">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 text-sm">
                <div>
                  <span className="font-medium text-gray-500">Antecedente:</span>
                  <p className="text-gray-900">{history.antecedenteP}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Tipo:</span>
                  <p className="text-gray-900">{history.tipo}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Fecha de Diagnóstico:</span>
                  <p className="text-gray-900">{history.fechaDiagnostico}</p>
                </div>
              </div>

              {history.descripcion && (
                <div className="mb-3">
                  <span className="font-medium text-gray-500 text-sm">Descripción:</span>
                  <p className="text-sm text-gray-700 mt-1 p-2 bg-green-50 border-l-4 border-green-700 rounded">
                    {history.descripcion}
                  </p>
                </div>
              )}
            </div>
          ))}

          {historyData.length === 0 && (
            <div className="p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay antecedentes médicos registrados</h3>
              <p className="text-gray-500 mb-4">Comience agregando un nuevo antecedente médico utilizando el botón "Agregar" en la parte superior.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalOrders;