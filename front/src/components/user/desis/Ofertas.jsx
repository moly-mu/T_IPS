import { useState } from 'react';
import Barral from "src/components/user/desis/Barral";
import PropTypes from 'prop-types';

import { 
  Users, 
  Calendar, 
  DollarSign, 
  Star, 
  Clock, 
  MessageSquare, 
  Award,
  ChevronUp,
  ChevronDown,
  Filter
} from 'lucide-react';

const Ofertas = () => {
  const [filtroTiempo, setFiltroTiempo] = useState('mes');
  
  // ejemplos
  const metricas = {
    usuariosActivos: { valor: 1234, cambio: 12, tipo: 'positivo' },
    especialistas: { valor: 89, cambio: 5, tipo: 'positivo' },
    consultasHoy: { valor: 156, cambio: 8, tipo: 'positivo' },
    ingresos: { valor: 45670, cambio: 15, tipo: 'positivo' },
    rating: { valor: 4.8, cambio: 0.2, tipo: 'positivo' }
  };

  const actividadReciente = [
    { tipo: 'consulta', nombre: 'María González', tiempo: '5 min', icono: Calendar },
    { tipo: 'especialista', nombre: 'Dr. Carlos Ruiz', tiempo: '15 min', icono: Award },
    { tipo: 'pago', nombre: 'Ana Rodríguez', tiempo: '30 min', icono: DollarSign },
    { tipo: 'consulta_finalizada', nombre: 'Dr. Luis Pérez', tiempo: '1 hora', icono: MessageSquare }
  ];

  const demografiaEdad = [
    { rango: '18-30 años', porcentaje: 35, color: 'bg-blue-500' },
    { rango: '31-45 años', porcentaje: 28, color: 'bg-green-500' },
    { rango: '46-60 años', porcentaje: 22, color: 'bg-purple-500' },
    { rango: '60+ años', porcentaje: 15, color: 'bg-orange-500' }
  ];

  const visitasPorDia = [
    { dia: '1', visitas: 45 },
    { dia: '2', visitas: 52 },
    { dia: '3', visitas: 38 },
    { dia: '4', visitas: 65 },
    { dia: '5', visitas: 48 },
    { dia: '6', visitas: 72 },
    { dia: '7', visitas: 58 },
    { dia: '8', visitas: 43 },
    { dia: '9', visitas: 67 },
    { dia: '10', visitas: 55 },
    { dia: '11', visitas: 49 },
    { dia: '12', visitas: 71 },
    { dia: '13', visitas: 62 },
    { dia: '14', visitas: 45 },
    { dia: '15', visitas: 58 },
    { dia: '16', visitas: 66 },
    { dia: '17', visitas: 53 },
    { dia: '18', visitas: 47 },
    { dia: '19', visitas: 59 },
    { dia: '20', visitas: 64 },
    { dia: '21', visitas: 48 },
    { dia: '22', visitas: 56 },
    { dia: '23', visitas: 61 },
    { dia: '24', visitas: 44 },
    { dia: '25', visitas: 69 },
    { dia: '26', visitas: 52 },
    { dia: '27', visitas: 58 },
    { dia: '28', visitas: 63 },
    { dia: '29', visitas: 47 },
    { dia: '30', visitas: 55 }
  ];

  const proximasCitas = [
    { paciente: 'Carmen Herrera', hora: '09:00', tipo: 'Consulta General' },
    { paciente: 'Miguel Torres', hora: '10:30', tipo: 'Seguimiento' },
    { paciente: 'Laura Vega', hora: '11:15', tipo: 'Primera Consulta' },
    { paciente: 'Roberto Silva', hora: '14:00', tipo: 'Control' },
    { paciente: 'Ana Martín', hora: '15:30', tipo: 'Teleconsulta' }
  ];

  const comentariosRecientes = [
    { 
      paciente: 'María G.', 
      comentario: 'Excelente atención, muy profesional y empático.',
      rating: 5,
      tiempo: '2 horas'
    },
    { 
      paciente: 'Carlos R.', 
      comentario: 'Consulta muy clara, resolvió todas mis dudas.',
      rating: 5,
      tiempo: '1 día'
    },
    { 
      paciente: 'Ana L.', 
      comentario: 'Muy satisfecha con el tratamiento recomendado.',
      rating: 4,
      tiempo: '3 días'
    }
  ];

  const MetricaCard = ({ titulo, valor, cambio, tipo, icono: Icon, formato = 'numero' }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="w-6 h-6 text-[#003366]" />
        </div>
        <div className={`flex items-center text-sm font-medium ${
          tipo === 'positivo' ? 'text-green-600' : 'text-red-600'
        }`}>
          {tipo === 'positivo' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {cambio}%
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold text-gray-900">
          {formato === 'dinero' ? `$${valor.toLocaleString()}` : valor.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">{titulo}</p>
      </div>
    </div>
  );

  MetricaCard.propTypes = {
  titulo: PropTypes.string.isRequired,
  valor: PropTypes.number.isRequired,
  cambio: PropTypes.number.isRequired,
  tipo: PropTypes.oneOf(['positivo', 'negativo']).isRequired,
  icono: PropTypes.elementType.isRequired,
  formato: PropTypes.oneOf(['numero', 'dinero']),
};

  const maxVisitas = Math.max(...visitasPorDia.map(d => d.visitas));

  return (
    <div className="min-h-screen bg-gray-50 p-6 -mt-244">
      <Barral/>
      <div className="max-w-[102rem] ml-84 mx-auto space-y-6">
        
        {/* header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Médico</h1>
            <p className="text-gray-600 mt-1">Estadísticas y métricas de tu práctica médica</p>
          </div>
          <div className="flex gap-3">
            <select 
              value={filtroTiempo} 
              onChange={(e) => setFiltroTiempo(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00102D] focus:border-transparent"
            >
              <option value="dia">Hoy</option>
              <option value="semana">Esta semana</option>
              <option value="mes">Este mes</option>
              <option value="año">Este año</option>
            </select>
            <button className="px-4 py-2 bg-[#00102D] text-white rounded-lg hover:bg-[#003366] transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </button>
          </div>
        </div>

        {/* metricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <MetricaCard 
            titulo="Usuarios Activos" 
            valor={metricas.usuariosActivos.valor} 
            cambio={metricas.usuariosActivos.cambio}
            tipo={metricas.usuariosActivos.tipo}
            icono={Users}
          />
          <MetricaCard 
            titulo="Especialistas" 
            valor={metricas.especialistas.valor} 
            cambio={metricas.especialistas.cambio}
            tipo={metricas.especialistas.tipo}
            icono={Award}
          />
          <MetricaCard 
            titulo="Consultas Hoy" 
            valor={metricas.consultasHoy.valor} 
            cambio={metricas.consultasHoy.cambio}
            tipo={metricas.consultasHoy.tipo}
            icono={Calendar}
          />
          <MetricaCard 
            titulo="Ingresos" 
            valor={metricas.ingresos.valor} 
            cambio={metricas.ingresos.cambio}
            tipo={metricas.ingresos.tipo}
            icono={DollarSign}
            formato="dinero"
          />
          <MetricaCard 
            titulo="Rating Promedio" 
            valor={metricas.rating.valor} 
            cambio={metricas.rating.cambio}
            tipo={metricas.rating.tipo}
            icono={Star}
          />
        </div>

        {/* fila principal de graficos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* demografia por edad */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Demografía por Edad</h3>
              <Filter className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {demografiaEdad.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm text-gray-600">{item.rango}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${item.porcentaje}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{item.porcentaje}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Distribucion por Genero */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Distribución por Género</h3>
              <Filter className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray="60, 40"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">60%</div>
                    <div className="text-xs text-gray-600">Mujeres</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#3B82F6]  rounded-full"></div>
                  <span className="text-gray-600">Mujeres (60%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-gray-600">Hombres (40%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* actividad reciente */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Actividad Reciente</h3>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {actividadReciente.map((actividad, index) => {
                const Icon = actividad.icono;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Icon className="w-4 h-4 text-[#003366] " />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {actividad.nombre}
                      </p>
                      <p className="text-xs text-gray-600 capitalize">
                        {actividad.tipo.replace('_', ' ')}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">{actividad.tiempo}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* grafico de visitas y proximas citas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Visitas por dia */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Visitas por Día</h3>
              <div className="text-sm text-gray-600">Últimos 30 días</div>
            </div>
            <div className="flex items-end justify-between h-48 gap-1">
              {visitasPorDia.map((dia, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-2 bg-[#003366] rounded-t-sm hover:bg-[#00102D]  transition-colors cursor-pointer"
                    style={{ height: `${(dia.visitas / maxVisitas) * 180}px` }}
                    title={`Día ${dia.dia}: ${dia.visitas} visitas`}
                  ></div>
                  {index % 5 === 0 && (
                    <span className="text-xs text-gray-400 mt-2">{dia.dia}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* proximas citas */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Próximas Citas</h3>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {proximasCitas.map((cita, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{cita.paciente}</p>
                    <p className="text-sm text-gray-600">{cita.tipo}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-[#003366]">{cita.hora}</p>
                    <p className="text-xs text-gray-500">Hoy</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* comentarios y rating */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Comentarios Recientes</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">4.8 promedio</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {comentariosRecientes.map((comentario, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-gray-900">{comentario.paciente}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < comentario.rating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{comentario.comentario}</p>
                <p className="text-xs text-gray-500">{comentario.tiempo}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Ofertas;