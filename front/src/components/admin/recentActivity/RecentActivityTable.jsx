import React, { useState, useMemo } from 'react';
import { Calendar, Search, Filter, Star, FileText, Video, CreditCard, UserCheck, Stethoscope, Clock, User, Download, Play, Eye } from 'lucide-react';

const RecentActivityTable = () => {
  const [activeTab, setActiveTab] = useState('citas');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // Datos de ejemplo
  const specialists = [
    'Dr. Carlos Ruiz',
    'Dra. María González',
    'Dr. Luis Pérez',
    'Dra. Ana Rodríguez',
    'Dr. Roberto Silva'
  ];

  const users = [
    'María González',
    'Ana Rodríguez',
    'Carlos López',
    'Luisa Martín',
    'Pedro Sánchez',
    'Carmen Díaz',
    'José García'
  ];

  const citas = [
    { id: 1, paciente: 'María González', especialista: 'Dr. Carlos Ruiz', fecha: '2024-07-31', hora: '10:00', estado: 'Completada', tipo: 'Consulta General' },
    { id: 2, paciente: 'Ana Rodríguez', especialista: 'Dra. María González', fecha: '2024-07-31', hora: '11:30', estado: 'Pendiente', tipo: 'Seguimiento' },
    { id: 3, paciente: 'Carlos López', especialista: 'Dr. Luis Pérez', fecha: '2024-07-30', hora: '15:00', estado: 'Completada', tipo: 'Primera Consulta' },
    { id: 4, paciente: 'Luisa Martín', especialista: 'Dra. Ana Rodríguez', fecha: '2024-07-30', hora: '09:00', estado: 'Cancelada', tipo: 'Control' },
    { id: 5, paciente: 'Pedro Sánchez', especialista: 'Dr. Roberto Silva', fecha: '2024-07-29', hora: '14:00', estado: 'Completada', tipo: 'Consulta General' }
  ];

  const pagos = [
    { id: 1, paciente: 'María González', monto: 150000, fecha: '2024-07-31', metodo: 'PSE', estado: 'Completado', concepto: 'Consulta General' },
    { id: 2, paciente: 'Ana Rodríguez', monto: 120000, fecha: '2024-07-30', metodo: 'Tarjeta', estado: 'Completado', concepto: 'Seguimiento' },
    { id: 3, paciente: 'Carlos López', monto: 200000, fecha: '2024-07-30', metodo: 'Transferencia', estado: 'Pendiente', concepto: 'Primera Consulta' },
    { id: 4, paciente: 'Pedro Sánchez', monto: 150000, fecha: '2024-07-29', metodo: 'Tarjeta', estado: 'Completado', concepto: 'Consulta General' },
    { id: 5, paciente: 'Carmen Díaz', monto: 180000, fecha: '2024-07-28', metodo: 'PSE', estado: 'Completado', concepto: 'Control' }
  ];

  const registros = [
    { id: 1, usuario: 'María González', email: 'maria@email.com', fecha: '2024-07-31', estado: 'Activo', telefono: '300-123-4567' },
    { id: 2, usuario: 'Ana Rodríguez', email: 'ana@email.com', fecha: '2024-07-30', estado: 'Activo', telefono: '301-234-5678' },
    { id: 3, usuario: 'Carlos López', email: 'carlos@email.com', fecha: '2024-07-29', estado: 'Pendiente', telefono: '302-345-6789' },
    { id: 4, usuario: 'Luisa Martín', email: 'luisa@email.com', fecha: '2024-07-28', estado: 'Activo', telefono: '303-456-7890' },
    { id: 5, usuario: 'Pedro Sánchez', email: 'pedro@email.com', fecha: '2024-07-27', estado: 'Inactivo', telefono: '304-567-8901' }
  ];

  const ratings = [
    { id: 1, paciente: 'María González', especialista: 'Dr. Carlos Ruiz', rating: 5, fecha: '2024-07-31', comentario: 'Excelente atención, muy profesional' },
    { id: 2, paciente: 'Ana Rodríguez', especialista: 'Dra. María González', rating: 4, fecha: '2024-07-30', comentario: 'Muy buena consulta, recomendado' },
    { id: 3, paciente: 'Pedro Sánchez', especialista: 'Dr. Roberto Silva', rating: 5, fecha: '2024-07-29', comentario: 'Perfecto, resolvió todas mis dudas' },
    { id: 4, paciente: 'Carmen Díaz', especialista: 'Dr. Luis Pérez', rating: 3, fecha: '2024-07-28', comentario: 'Buena atención pero algo apresurado' },
    { id: 5, paciente: 'José García', especialista: 'Dra. Ana Rodríguez', rating: 4, fecha: '2024-07-27', comentario: 'Muy profesional y amable' }
  ];

  const historias = [
    { id: 1, paciente: 'María González', especialista: 'Dr. Carlos Ruiz', fecha: '2024-07-31', tipo: 'Historia Clínica', archivo: 'historia_maria_001.pdf' },
    { id: 2, paciente: 'Ana Rodríguez', especialista: 'Dra. María González', fecha: '2024-07-30', tipo: 'Exámenes', archivo: 'examenes_ana_002.pdf' },
    { id: 3, paciente: 'Pedro Sánchez', especialista: 'Dr. Roberto Silva', fecha: '2024-07-29', tipo: 'Diagnóstico', archivo: 'diagnostico_pedro_003.pdf' },
    { id: 4, paciente: 'Carmen Díaz', especialista: 'Dr. Luis Pérez', fecha: '2024-07-28', tipo: 'Tratamiento', archivo: 'tratamiento_carmen_004.pdf' },
    { id: 5, paciente: 'José García', especialista: 'Dra. Ana Rodríguez', fecha: '2024-07-27', tipo: 'Historia Clínica', archivo: 'historia_jose_005.pdf' }
  ];

  const grabaciones = [
    { id: 1, paciente: 'María González', especialista: 'Dr. Carlos Ruiz', fecha: '2024-07-31', duracion: '45:30', tamaño: '250 MB', estado: 'Disponible' },
    { id: 2, paciente: 'Ana Rodríguez', especialista: 'Dra. María González', fecha: '2024-07-30', duracion: '38:15', tamaño: '195 MB', estado: 'Procesando' },
    { id: 3, paciente: 'Pedro Sánchez', especialista: 'Dr. Roberto Silva', fecha: '2024-07-29', duracion: '52:20', tamaño: '310 MB', estado: 'Disponible' },
    { id: 4, paciente: 'Carmen Díaz', especialista: 'Dr. Luis Pérez', fecha: '2024-07-28', duracion: '41:10', tamaño: '220 MB', estado: 'Disponible' },
    { id: 5, paciente: 'José García', especialista: 'Dra. Ana Rodríguez', fecha: '2024-07-27', duracion: '35:45', tamaño: '180 MB', estado: 'Error' }
  ];

  const tabs = [
    { id: 'citas', name: 'Citas', icon: Calendar, count: citas.length },
    { id: 'pagos', name: 'Pagos', icon: CreditCard, count: pagos.length },
    { id: 'registros', name: 'Usuarios', icon: UserCheck, count: registros.length },
    { id: 'ratings', name: 'Calificaciones', icon: Star, count: ratings.length },
    { id: 'historias', name: 'Historias Clínicas', icon: FileText, count: historias.length },
    { id: 'grabaciones', name: 'Grabaciones', icon: Video, count: grabaciones.length }
  ];

  const filterData = (data, type) => {
    return data.filter(item => {
      const matchesSearch = searchTerm === '' || 
        Object.values(item).some(value => 
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const matchesDate = dateFilter === '' || item.fecha === dateFilter;
      
      return matchesSearch && matchesDate;
    }).sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.fecha) - new Date(a.fecha);
      }
      return new Date(a.fecha) - new Date(b.fecha);
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getStatusColor = (estado) => {
    const colors = {
      'Completada': 'bg-green-100 text-green-800',
      'Completado': 'bg-green-100 text-green-800',
      'Pendiente': 'bg-yellow-100 text-yellow-800',
      'Cancelada': 'bg-red-100 text-red-800',
      'Activo': 'bg-green-100 text-green-800',
      'Inactivo': 'bg-gray-100 text-gray-800',
      'Disponible': 'bg-green-100 text-green-800',
      'Procesando': 'bg-blue-100 text-blue-800',
      'Error': 'bg-red-100 text-red-800'
    };
    return colors[estado] || 'bg-gray-100 text-gray-800';
  };

  const renderTable = () => {
    switch (activeTab) {
      case 'citas':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especialista</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filterData(citas, 'citas').map((cita) => (
                  <tr key={cita.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{cita.paciente}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Stethoscope className="w-5 h-5 text-blue-500 mr-2" />
                        <span className="text-sm text-gray-900">{cita.especialista}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cita.fecha}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cita.hora}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cita.tipo}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(cita.estado)}`}>
                        {cita.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'pagos':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Método</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Concepto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filterData(pagos, 'pagos').map((pago) => (
                  <tr key={pago.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{pago.paciente}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      ${pago.monto.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pago.fecha}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pago.metodo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pago.concepto}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(pago.estado)}`}>
                        {pago.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'registros':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Registro</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filterData(registros, 'registros').map((registro) => (
                  <tr key={registro.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <UserCheck className="w-5 h-5 text-blue-500 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{registro.usuario}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{registro.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{registro.telefono}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{registro.fecha}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(registro.estado)}`}>
                        {registro.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'ratings':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especialista</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calificación</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comentario</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filterData(ratings, 'ratings').map((rating) => (
                  <tr key={rating.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{rating.paciente}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Stethoscope className="w-5 h-5 text-blue-500 mr-2" />
                        <span className="text-sm text-gray-900">{rating.especialista}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        {renderStars(rating.rating)}
                        <span className="ml-2 text-sm text-gray-600">({rating.rating}/5)</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rating.fecha}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{rating.comentario}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'historias':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especialista</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Archivo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filterData(historias, 'historias').map((historia) => (
                  <tr key={historia.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{historia.paciente}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Stethoscope className="w-5 h-5 text-blue-500 mr-2" />
                        <span className="text-sm text-gray-900">{historia.especialista}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{historia.tipo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{historia.fecha}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-900">{historia.archivo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900 flex items-center transition-colors"
                          onClick={() => alert(`Ver archivo: ${historia.archivo}`)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Ver
                        </button>
                        <button 
                          className="text-green-600 hover:text-green-900 flex items-center transition-colors"
                          onClick={() => alert(`Descargar archivo: ${historia.archivo}`)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Descargar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'grabaciones':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especialista</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duración</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tamaño</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filterData(grabaciones, 'grabaciones').map((grabacion) => (
                  <tr key={grabacion.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{grabacion.paciente}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Stethoscope className="w-5 h-5 text-blue-500 mr-2" />
                        <span className="text-sm text-gray-900">{grabacion.especialista}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grabacion.fecha}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-900">{grabacion.duracion}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grabacion.tamaño}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(grabacion.estado)}`}>
                        {grabacion.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {grabacion.estado === 'Disponible' && (
                          <>
                            <button 
                              className="text-blue-600 hover:text-blue-900 flex items-center transition-colors"
                              onClick={() => alert(`Reproducir grabación de ${grabacion.paciente}`)}>
                              <Play className="w-4 h-4 mr-1" />
                              Reproducir
                            </button>
                            <button 
                              className="text-green-600 hover:text-green-900 flex items-center transition-colors"
                                                            onClick={() => alert(`Descargar grabación de ${grabacion.paciente}`)}>
                              <Download className="w-4 h-4 mr-1" />
                              Descargar
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-gray-700">Actividades Recientes</h1>
      </div>

      {/* tabs */}
      <div className="flex flex-wrap gap-2 mb-4 border-b-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 transition-colors text-sm ${
              activeTab === tab.id
                ? 'text-lg bg-none text-[#003366] font-bold border-b-2 border-[#003366]'
                : 'text-gray-600 hover:bg-gray-100'
            }`}>
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.name}
            <span className="ml-2 bg-gray-200 text-gray-800 rounded-full px-2 py-0.5 text-xs">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* filtros */}
      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Buscar</label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              className="pl-8 pr-4 py-2 border border-gray-300 rounded-md w-64"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Fecha</label>
          <input
            type="date"
            className="border border-gray-300 rounded-md py-2 px-4"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Ordenar por</label>
          <select
            className="border border-gray-300 rounded-md py-2 px-4"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="recent">Más reciente</option>
            <option value="oldest">Más antiguo</option>
          </select>
        </div>
      </div>

      {/* tabla */}
      <div className="bg-white shadow rounded-lg p-4">{renderTable()}</div>
    </div>
  );
};

export default RecentActivityTable;
