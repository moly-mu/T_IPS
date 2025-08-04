import { useState } from 'react';
import { CreditCard, Plus, Trash2, Eye, EyeOff, CheckCircle, X } from 'lucide-react';

const Wallet = () => {
  const [metodosPago, setMetodosPago] = useState([
    {
      id: 1,
      tipo: 'Tarjeta de Crédito',
      marca: 'Visa',
      numero: '**** **** **** 1234',
      numeroCompleto: '4532 1234 5678 1234',
      titular: 'Juan Pérez',
      vencimiento: '12/26',
      principal: true
    },
    {
      id: 2,
      tipo: 'Tarjeta de Débito',
      marca: 'Mastercard',
      numero: '**** **** **** 5678',
      numeroCompleto: '5555 4444 3333 5678',
      titular: 'Juan Pérez',
      vencimiento: '08/25',
      principal: false
    }
  ]);

  const [registrosPagos] = useState([
    {
      id: 1,
      fecha: '2024-01-15',
      concepto: 'Consulta Cardiología',
      doctor: 'Dr. García',
      monto: 85000,
      estado: 'Completado',
      metodoPago: 'Visa **** 1234'
    },
    {
      id: 2,
      fecha: '2024-01-10',
      concepto: 'Consulta Dermatología',
      doctor: 'Dra. Martínez',
      monto: 75000,
      estado: 'Completado',
      metodoPago: 'Mastercard **** 5678'
    },
    {
      id: 3,
      fecha: '2024-01-05',
      concepto: 'Consulta Pediatría',
      doctor: 'Dr. López',
      monto: 65000,
      estado: 'Completado',
      metodoPago: 'Visa **** 1234'
    }
  ]);

  const [mostrarAgregarMetodo, setMostrarAgregarMetodo] = useState(false);
  const [mostrarDetallesNumero, setMostrarDetallesNumero] = useState({});
  const [formData, setFormData] = useState({
    numero: '',
    vencimiento: '',
    cvv: '',
    titular: '',
    tipo: 'Tarjeta de Crédito'
  });
  const [errores, setErrores] = useState({});

  // Función para detectar el tipo de tarjeta
  const detectarMarca = (numero) => {
    const numeroLimpio = numero.replace(/\s/g, '');
    if (numeroLimpio.startsWith('4')) return 'Visa';
    if (numeroLimpio.startsWith('5') || numeroLimpio.startsWith('2')) return 'Mastercard';
    if (numeroLimpio.startsWith('3')) return 'American Express';
    return 'Tarjeta';
  };

  // Función para formatear número de tarjeta
  const formatearNumeroTarjeta = (numero) => {
    return numero.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  // Función para validar formulario
  const validarFormulario = () => {
    const nuevosErrores = {};
    
    if (!formData.numero || formData.numero.replace(/\s/g, '').length < 13) {
      nuevosErrores.numero = 'Número de tarjeta inválido';
    }
    
    if (!formData.vencimiento || !/^\d{2}\/\d{2}$/.test(formData.vencimiento)) {
      nuevosErrores.vencimiento = 'Formato MM/AA requerido';
    }
    
    if (!formData.cvv || formData.cvv.length < 3) {
      nuevosErrores.cvv = 'CVV inválido';
    }
    
    if (!formData.titular.trim()) {
      nuevosErrores.titular = 'Titular requerido';
    }
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Función para manejar cambios en el formulario
  const handleInputChange = (campo, valor) => {
    let valorFormateado = valor;
    
    if (campo === 'numero') {
      valorFormateado = formatearNumeroTarjeta(valor);
      if (valorFormateado.length > 19) return;
    }
    
    if (campo === 'vencimiento') {
      valorFormateado = valor.replace(/\D/g, '');
      if (valorFormateado.length >= 2) {
        valorFormateado = valorFormateado.substring(0, 2) + '/' + valorFormateado.substring(2, 4);
      }
      if (valorFormateado.length > 5) return;
    }
    
    if (campo === 'cvv') {
      valorFormateado = valor.replace(/\D/g, '');
      if (valorFormateado.length > 4) return;
    }
    
    setFormData(prev => ({
      ...prev,
      [campo]: valorFormateado
    }));
    
    // Limpiar error del campo cuando se modifica
    if (errores[campo]) {
      setErrores(prev => ({
        ...prev,
        [campo]: ''
      }));
    }
  };

  // Función para agregar método de pago
  const handleAgregarMetodo = () => {
    if (!validarFormulario()) return;
    
    const numeroCompleto = formData.numero;
    const ultimosCuatro = numeroCompleto.slice(-4);
    const marca = detectarMarca(formData.numero);
    
    const nuevoMetodo = {
      id: Date.now(),
      tipo: formData.tipo,
      marca,
      numero: `**** **** **** ${ultimosCuatro}`,
      numeroCompleto,
      titular: formData.titular,
      vencimiento: formData.vencimiento,
      principal: metodosPago.length === 0
    };
    
    setMetodosPago(prev => [...prev, nuevoMetodo]);
    setFormData({
      numero: '',
      vencimiento: '',
      cvv: '',
      titular: '',
      tipo: 'Tarjeta de Crédito'
    });
    setMostrarAgregarMetodo(false);
  };

  // Función para manejar eliminación de método de pago
  const handleEliminarMetodo = (id) => {
    const metodoAEliminar = metodosPago.find(m => m.id === id);
    const nuevosMetodos = metodosPago.filter(metodo => metodo.id !== id);
    
    // Si eliminamos el método principal y hay otros métodos, hacer principal al primero
    if (metodoAEliminar.principal && nuevosMetodos.length > 0) {
      nuevosMetodos[0].principal = true;
    }
    
    setMetodosPago(nuevosMetodos);
  };

  // Función para establecer método principal
  const handleSetPrincipal = (id) => {
    setMetodosPago(metodosPago.map(metodo => ({
      ...metodo,
      principal: metodo.id === id
    })));
  };

  // Función para formatear montos
  const formatearMonto = (monto) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(monto);
  };

  // Función para alternar visibilidad de número de tarjeta
  const toggleMostrarNumero = (id) => {
    setMostrarDetallesNumero(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-2xl font-light text-gray-900 mb-8">Billetera</h2>
      


      {/* Métodos de Pago */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Métodos de Pago</h3>
          <button
            onClick={() => setMostrarAgregarMetodo(true)}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors"
          >
            <Plus size={16} />
            AGREGAR MÉTODO
          </button>
        </div>

        <div className="space-y-4">
          {/* Método Principal */}
          {metodosPago.filter(metodo => metodo.principal).map((metodo) => (
            <div 
              key={metodo.id} 
              className="bg-gray-900 text-white border-gray-900 shadow-lg border rounded-xl p-6 transition-all duration-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <CreditCard size={20} className="text-gray-300" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-white">{metodo.marca}</h4>
                      <span className="text-sm text-gray-300">• {metodo.tipo}</span>
                      <div className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full">
                        <CheckCircle size={12} />
                        <span className="text-xs font-medium">Principal</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-mono text-gray-300">
                        {mostrarDetallesNumero[metodo.id] ? metodo.numeroCompleto : metodo.numero}
                      </p>
                      <button
                        onClick={() => toggleMostrarNumero(metodo.id)}
                        className="text-gray-400 hover:text-gray-200 transition-colors"
                      >
                        {mostrarDetallesNumero[metodo.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <p className="text-sm text-gray-300">
                      {metodo.titular} • Vence {metodo.vencimiento}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEliminarMetodo(metodo.id)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Otros Métodos */}
          {metodosPago.filter(metodo => !metodo.principal).map((metodo) => (
            <div 
              key={metodo.id} 
              className="border-gray-100 hover:shadow-md bg-white border rounded-xl p-6 transition-all duration-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <CreditCard size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{metodo.marca}</h4>
                      <span className="text-sm text-gray-500">• {metodo.tipo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-mono text-gray-600">
                        {mostrarDetallesNumero[metodo.id] ? metodo.numeroCompleto : metodo.numero}
                      </p>
                      <button
                        onClick={() => toggleMostrarNumero(metodo.id)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {mostrarDetallesNumero[metodo.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">
                      {metodo.titular} • Vence {metodo.vencimiento}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSetPrincipal(metodo.id)}
                    className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1 border border-gray-200 rounded-lg transition-colors hover:bg-gray-50"
                  >
                    Hacer Principal
                  </button>
                  <button
                    onClick={() => handleEliminarMetodo(metodo.id)}
                    className="p-2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historial de Pagos */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Historial de Pagos</h3>
        <div className="space-y-4">
          {registrosPagos.map((pago) => (
            <div key={pago.id} className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{pago.concepto}</h4>
                  <p className="text-sm text-gray-500 mb-1">{pago.doctor}</p>
                  <p className="text-sm text-gray-500">{pago.fecha} • {pago.metodoPago}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900 mb-1">{formatearMonto(pago.monto)}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                      pago.estado === 'Completado' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {pago.estado}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para agregar método de pago */}
      {mostrarAgregarMetodo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Agregar Método de Pago</h3>
              <button
                onClick={() => setMostrarAgregarMetodo(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Tarjeta</label>
                <select
                  value={formData.tipo}
                  onChange={(e) => handleInputChange('tipo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                  <option value="Tarjeta de Débito">Tarjeta de Débito</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número de Tarjeta</label>
                <input
                  type="text"
                  value={formData.numero}
                  onChange={(e) => handleInputChange('numero', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                    errores.numero ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errores.numero && <p className="text-red-500 text-xs mt-1">{errores.numero}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Vencimiento</label>
                  <input
                    type="text"
                    value={formData.vencimiento}
                    onChange={(e) => handleInputChange('vencimiento', e.target.value)}
                    placeholder="MM/AA"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                      errores.vencimiento ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errores.vencimiento && <p className="text-red-500 text-xs mt-1">{errores.vencimiento}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    placeholder="123"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                      errores.cvv ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errores.cvv && <p className="text-red-500 text-xs mt-1">{errores.cvv}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titular de la Tarjeta</label>
                <input
                  type="text"
                  value={formData.titular}
                  onChange={(e) => handleInputChange('titular', e.target.value)}
                  placeholder="Nombre completo"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                    errores.titular ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errores.titular && <p className="text-red-500 text-xs mt-1">{errores.titular}</p>}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setMostrarAgregarMetodo(false)}
                  className="flex-1 px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleAgregarMetodo}
                  className="flex-1 px-4 py-2 text-sm bg-gray-900 text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Agregar Tarjeta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;