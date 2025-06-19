import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, Users, Clock, DollarSign, Star, Activity, Calendar, TrendingUp } from 'lucide-react';

const ServicesSection = () => {
  const [servicios, setServicios] = useState([
    {
      id: 1,
      nombre: 'Consulta General',
      especialidad: 'Medicina General',
      precio: 25000,
      duracion: 30,
      estado: 'activo',
      descripcion: 'Consulta médica general para diagnóstico y tratamiento',
      totalConsultas: 156,
      calificacionPromedio: 4.8,
      especialistasDisponibles: 12,
      fechaCreacion: '2024-01-15'
    },
    {
      id: 2,
      nombre: 'Consulta Pediátrica',
      especialidad: 'Pediatría',
      precio: 35000,
      duracion: 45,
      estado: 'activo',
      descripcion: 'Atención médica especializada para niños y adolescentes',
      totalConsultas: 89,
      calificacionPromedio: 4.9,
      especialistasDisponibles: 8,
      fechaCreacion: '2024-01-20'
    },
    {
      id: 3,
      nombre: 'Consulta Cardiológica',
      especialidad: 'Cardiología',
      precio: 45000,
      duracion: 60,
      estado: 'activo',
      descripcion: 'Evaluación y seguimiento de enfermedades cardiovasculares',
      totalConsultas: 67,
      calificacionPromedio: 4.7,
      especialistasDisponibles: 5,
      fechaCreacion: '2024-02-01'
    },
    {
      id: 4,
      nombre: 'Consulta Psicológica',
      especialidad: 'Psicología',
      precio: 40000,
      duracion: 50,
      estado: 'inactivo',
      descripcion: 'Apoyo psicológico y terapia online',
      totalConsultas: 43,
      calificacionPromedio: 4.6,
      especialistasDisponibles: 6,
      fechaCreacion: '2024-02-10'
    }
  ]);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalTipo, setModalTipo] = useState('crear'); // 'crear', 'editar', 'ver'
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroEspecialidad, setFiltroEspecialidad] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  const [formData, setFormData] = useState({
    nombre: '',
    especialidad: '',
    precio: '',
    duracion: '',
    estado: 'activo',
    descripcion: ''
  });

  const especialidades = [
    'Medicina General',
    'Pediatría',
    'Cardiología',
    'Psicología',
    'Dermatología',
    'Ginecología',
    'Neurología',
    'Traumatología'
  ];

  const serviciosFiltrados = servicios.filter(servicio => {
    return (
      servicio.nombre.toLowerCase().includes(filtroTexto.toLowerCase()) &&
      (filtroEspecialidad === '' || servicio.especialidad === filtroEspecialidad) &&
      (filtroEstado === '' || servicio.estado === filtroEstado)
    );
  });

  const abrirModal = (tipo, servicio = null) => {
    setModalTipo(tipo);
    setServicioSeleccionado(servicio);
    if (servicio && tipo === 'editar') {
      setFormData({
        nombre: servicio.nombre,
        especialidad: servicio.especialidad,
        precio: servicio.precio.toString(),
        duracion: servicio.duracion.toString(),
        estado: servicio.estado,
        descripcion: servicio.descripcion
      });
    } else if (tipo === 'crear') {
      setFormData({
        nombre: '',
        especialidad: '',
        precio: '',
        duracion: '',
        estado: 'activo',
        descripcion: ''
      });
    }
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setServicioSeleccionado(null);
    setFormData({
      nombre: '',
      especialidad: '',
      precio: '',
      duracion: '',
      estado: 'activo',
      descripcion: ''
    });
  };

  const manejarSubmit = () => {
    if (modalTipo === 'crear') {
      const nuevoServicio = {
        id: Date.now(),
        ...formData,
        precio: parseInt(formData.precio),
        duracion: parseInt(formData.duracion),
        totalConsultas: 0,
        calificacionPromedio: 0,
        especialistasDisponibles: 0,
        fechaCreacion: new Date().toISOString().split('T')[0]
      };
      setServicios([...servicios, nuevoServicio]);
    } else if (modalTipo === 'editar') {
      setServicios(servicios.map(servicio => 
        servicio.id === servicioSeleccionado.id 
          ? {
              ...servicio,
              ...formData,
              precio: parseInt(formData.precio),
              duracion: parseInt(formData.duracion)
            }
          : servicio
      ));
    }
    
    cerrarModal();
  };

  const eliminarServicio = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
      setServicios(servicios.filter(servicio => servicio.id !== id));
    }
  };

  const cambiarEstado = (id) => {
    setServicios(servicios.map(servicio => 
      servicio.id === id 
        ? { ...servicio, estado: servicio.estado === 'activo' ? 'inactivo' : 'activo' }
        : servicio
    ));
  };

  // Estadísticas
  const totalServicios = servicios.length;
  const serviciosActivos = servicios.filter(s => s.estado === 'activo').length;
  const totalConsultas = servicios.reduce((sum, s) => sum + s.totalConsultas, 0);
  const ingresoTotal = servicios.reduce((sum, s) => sum + (s.totalConsultas * s.precio), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Servicios</h1>
              <p className="text-sm text-gray-600 mt-1">Gestión de servicios de teleconsulta</p>
            </div>
            <button
              onClick={() => abrirModal('crear')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Nuevo Servicio
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* estadis */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">TOTAL SERVICIOS</p>
                <p className="text-2xl font-bold text-gray-900">{totalServicios}</p>
                <p className="text-xs text-green-600 mt-1">+2 nuevos este mes</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">SERVICIOS ACTIVOS</p>
                <p className="text-2xl font-bold text-gray-900">{serviciosActivos}</p>
                <p className="text-xs text-green-600 mt-1">85% del total</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">CONSULTAS TOTALES</p>
                <p className="text-2xl font-bold text-gray-900">{totalConsultas}</p>
                <p className="text-xs text-green-600 mt-1">+12% vs mes anterior</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">INGRESOS</p>
                <p className="text-2xl font-bold text-gray-900">${ingresoTotal.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+18% este mes</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* filtros */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar servicios..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filtroTexto}
                  onChange={(e) => setFiltroTexto(e.target.value)}
                />
              </div>
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filtroEspecialidad}
              onChange={(e) => setFiltroEspecialidad(e.target.value)}
            >
              <option value="">Todas las especialidades</option>
              {especialidades.map(esp => (
                <option key={esp} value={esp}>{esp}</option>
              ))}
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
        </div>

        {/* tabla de servicios */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Servicio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Especialidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duración
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Consultas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Calificación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Especialistas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {serviciosFiltrados.map(servicio => (
                  <tr key={servicio.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{servicio.nombre}</div>
                        <div className="text-sm text-gray-500">{servicio.descripcion.substring(0, 50)}...</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{servicio.especialidad}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">${servicio.precio.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock size={16} className="text-gray-400 mr-1" />
                        <span className="text-sm text-gray-900">{servicio.duracion} min</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar size={16} className="text-gray-400 mr-1" />
                        <span className="text-sm text-gray-900">{servicio.totalConsultas}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star size={16} className="text-yellow-400 mr-1" fill="currentColor" />
                        <span className="text-sm text-gray-900">{servicio.calificacionPromedio}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users size={16} className="text-gray-400 mr-1" />
                        <span className="text-sm text-gray-900">{servicio.especialistasDisponibles}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => cambiarEstado(servicio.id)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                          servicio.estado === 'activo'
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {servicio.estado === 'activo' ? 'Activo' : 'Inactivo'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => abrirModal('ver', servicio)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => abrirModal('editar', servicio)}
                          className="text-green-600 hover:text-green-900 transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => eliminarServicio(servicio.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* modal */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {modalTipo === 'crear' && 'Crear Nuevo Servicio'}
                {modalTipo === 'editar' && 'Editar Servicio'}
                {modalTipo === 'ver' && 'Detalles del Servicio'}
              </h2>
            </div>

            {modalTipo === 'ver' ? (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">{servicioSeleccionado.nombre}</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Especialidad:</span>
                        <p className="text-sm text-gray-900">{servicioSeleccionado.especialidad}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Descripción:</span>
                        <p className="text-sm text-gray-900">{servicioSeleccionado.descripcion}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Precio:</span>
                        <p className="text-sm text-gray-900">${servicioSeleccionado.precio.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Duración:</span>
                        <p className="text-sm text-gray-900">{servicioSeleccionado.duracion} minutos</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Estadísticas</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Total consultas:</span>
                        <span className="text-sm font-medium text-gray-900">{servicioSeleccionado.totalConsultas}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Calificación promedio:</span>
                        <span className="text-sm font-medium text-gray-900">{servicioSeleccionado.calificacionPromedio}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Especialistas disponibles:</span>
                        <span className="text-sm font-medium text-gray-900">{servicioSeleccionado.especialistasDisponibles}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Fecha de creación:</span>
                        <span className="text-sm font-medium text-gray-900">{servicioSeleccionado.fechaCreacion}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Estado:</span>
                        <span className={`text-sm font-medium ${servicioSeleccionado.estado === 'activo' ? 'text-green-600' : 'text-red-600'}`}>
                          {servicioSeleccionado.estado === 'activo' ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Servicio
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.nombre}
                      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Especialidad
                    </label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.especialidad}
                      onChange={(e) => setFormData({...formData, especialidad: e.target.value})}
                    >
                      <option value="">Seleccionar especialidad</option>
                      {especialidades.map(esp => (
                        <option key={esp} value={esp}>{esp}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio (COP)
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="1000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.precio}
                      onChange={(e) => setFormData({...formData, precio: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duración (minutos)
                    </label>
                    <input
                      type="number"
                      required
                      min="15"
                      max="120"
                      step="5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.duracion}
                      onChange={(e) => setFormData({...formData, duracion: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estado
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.estado}
                      onChange={(e) => setFormData({...formData, estado: e.target.value})}
                    >
                      <option value="activo">Activo</option>
                      <option value="inactivo">Inactivo</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.descripcion}
                    onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                    placeholder="Describe el servicio que se ofrece..."
                  />
                </div>
              </div>
            )}

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                type="button"
                onClick={cerrarModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {modalTipo === 'ver' ? 'Cerrar' : 'Cancelar'}
              </button>
              {modalTipo !== 'ver' && (
                <button
                  type="button"
                  onClick={manejarSubmit}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {modalTipo === 'crear' ? 'Crear Servicio' : 'Guardar Cambios'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesSection;