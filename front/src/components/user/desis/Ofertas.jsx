import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext";
import Barral from "../desis/Barral";
import PropTypes from 'prop-types';
import { 
  Users, Calendar, DollarSign, Star, Clock, 
  MessageSquare, Award, ChevronUp, ChevronDown, Filter
} from 'lucide-react';
import axios from 'axios';

const Ofertas = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [filtroTiempo, setFiltroTiempo] = useState('mes');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    metricas: {
      usuariosActivos: { valor: 0, cambio: 0, tipo: 'positivo' },
      especialistas: { valor: 0, cambio: 0, tipo: 'positivo' },
      consultasHoy: { valor: 0, cambio: 0, tipo: 'positivo' },
      ingresos: { valor: 0, cambio: 0, tipo: 'positivo' },
      rating: { valor: 0, cambio: 0, tipo: 'positivo' }
    },
    actividadReciente: [],
    demografiaEdad: [],
    visitasPorDia: [],
    proximasCitas: [],
    comentariosRecientes: [],
    demografiaGenero: { mujeres: 0, hombres: 0 }
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:3000/specialist/dashboard/metricas', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        
        const data = response.data;
        
        setDashboardData({
          metricas: {
            usuariosActivos: data.metricas?.usuariosActivos || { valor: 0, cambio: 0, tipo: 'positivo' },
            especialistas: data.metricas?.especialistas || { valor: 0, cambio: 0, tipo: 'positivo' },
            consultasHoy: data.metricas?.consultasHoy || { valor: 0, cambio: 0, tipo: 'positivo' },
            ingresos: data.metricas?.ingresos || { valor: 0, cambio: 0, tipo: 'positivo' },
            rating: data.metricas?.rating || { valor: 0, cambio: 0, tipo: 'positivo' }
          },
          actividadReciente: data.actividadReciente || [],
          demografiaEdad: data.demografiaEdad || [],
          visitasPorDia: data.visitasPorDia || [],
          proximasCitas: data.proximasCitas || [],
          comentariosRecientes: data.comentariosRecientes || [],
          demografiaGenero: data.demografiaGenero || { mujeres: 0, hombres: 0 }
        });
        
      } catch (err) {
        console.error('Error al obtener datos:', err);
        
        if (err.response?.status === 401) {
          setError('Sesión expirada - Por favor inicie sesión nuevamente');
          // Opcional: puedes forzar logout aquí si lo prefieres
          // logout();
        } else {
          setError(err.message || 'Error al cargar los datos del dashboard');
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [token]);

  const getActivityIcon = (tipo) => {
    switch (tipo) {
      case 'consulta':
      case 'cita':
        return Calendar;
      case 'especialista':
        return Award;
      case 'pago':
      case 'factura':
        return DollarSign;
      case 'consulta_finalizada':
      case 'comentario':
        return MessageSquare;
      default:
        return Calendar;
    }
  };

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

  // Calcular valores derivados
  const maxVisitas = dashboardData.visitasPorDia.length > 0 
    ? Math.max(...dashboardData.visitasPorDia.map(d => d.visitas), 1) 
    : 1;
    
  const totalGenero = dashboardData.demografiaGenero.mujeres + dashboardData.demografiaGenero.hombres;
  const porcentajeMujeres = totalGenero > 0 
    ? Math.round((dashboardData.demografiaGenero.mujeres / totalGenero) * 100)
    : 50;

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 -mt-244">
        <Barral/>
        <div className="max-w-[102rem] ml-84 mx-auto space-y-6">
          <div className="flex justify-center items-center h-64 flex-col gap-4">
            <div className="text-lg text-red-600">No autenticado - Por favor inicie sesión</div>
            <button 
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-[#00102D] text-white rounded-lg hover:bg-[#003366]"
            >
              Ir a Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 -mt-244">
        <Barral/>
        <div className="max-w-[102rem] ml-84 mx-auto space-y-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Cargando datos del dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 -mt-244">
        <Barral/>
        <div className="max-w-[102rem] ml-84 mx-auto space-y-6">
          <div className="flex justify-center items-center h-64 flex-col gap-4">
            <div className="text-lg text-red-600">{error}</div>
            {error.includes('Sesión expirada') && (
              <button 
                onClick={() => navigate('/login')}
                className="px-4 py-2 bg-[#00102D] text-white rounded-lg hover:bg-[#003366]"
              >
                Ir a Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

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
            valor={dashboardData.metricas.usuariosActivos.valor} 
            cambio={dashboardData.metricas.usuariosActivos.cambio}
            tipo={dashboardData.metricas.usuariosActivos.tipo}
            icono={Users}
          />
          <MetricaCard 
            titulo="Especialistas" 
            valor={dashboardData.metricas.especialistas.valor} 
            cambio={dashboardData.metricas.especialistas.cambio}
            tipo={dashboardData.metricas.especialistas.tipo}
            icono={Award}
          />
          <MetricaCard 
            titulo="Consultas Hoy" 
            valor={dashboardData.metricas.consultasHoy.valor} 
            cambio={dashboardData.metricas.consultasHoy.cambio}
            tipo={dashboardData.metricas.consultasHoy.tipo}
            icono={Calendar}
          />
          <MetricaCard 
            titulo="Ingresos" 
            valor={dashboardData.metricas.ingresos.valor} 
            cambio={dashboardData.metricas.ingresos.cambio}
            tipo={dashboardData.metricas.ingresos.tipo}
            icono={DollarSign}
            formato="dinero"
          />
          <MetricaCard 
            titulo="Rating Promedio" 
            valor={dashboardData.metricas.rating.valor} 
            cambio={dashboardData.metricas.rating.cambio}
            tipo={dashboardData.metricas.rating.tipo}
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
              {dashboardData.demografiaEdad.length > 0 ? (
                dashboardData.demografiaEdad.map((item, index) => (
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
                ))
              ) : (
                <div className="text-center text-gray-500">No hay datos disponibles</div>
              )}
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
                    strokeDasharray={`${porcentajeMujeres}, ${100 - porcentajeMujeres}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{porcentajeMujeres}%</div>
                    <div className="text-xs text-gray-600">Mujeres</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#3B82F6] rounded-full"></div>
                  <span className="text-gray-600">Mujeres ({porcentajeMujeres}%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-gray-600">Hombres ({100 - porcentajeMujeres}%)</span>
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
              {dashboardData.actividadReciente.length > 0 ? (
                dashboardData.actividadReciente.map((actividad, index) => {
                  const Icon = getActivityIcon(actividad.tipo);
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Icon className="w-4 h-4 text-[#003366]" />
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
                })
              ) : (
                <div className="text-center text-gray-500">No hay actividad reciente</div>
              )}
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
              {dashboardData.visitasPorDia.length > 0 ? (
                dashboardData.visitasPorDia.map((dia, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-2 bg-[#003366] rounded-t-sm hover:bg-[#00102D] transition-colors cursor-pointer"
                      style={{ 
                        height: `${(dia.visitas / maxVisitas) * 180}px`,
                        minHeight: dia.visitas === 0 ? '2px' : ''
                      }}
                      title={`${dia.fecha}: ${dia.visitas} visitas`}
                    ></div>
                    {index % 5 === 0 && (
                      <span className="text-xs text-gray-400 mt-2">{dia.fecha.split('/')[0]}</span>
                    )}
                  </div>
                ))
              ) : (
                <div className="w-full text-center text-gray-500">No hay datos de visitas</div>
              )}
            </div>
          </div>

          {/* proximas citas */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Próximas Citas</h3>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {dashboardData.proximasCitas.length > 0 ? (
                dashboardData.proximasCitas.map((cita, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{cita.paciente}</p>
                      <p className="text-sm text-gray-600">{cita.tipo}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-[#003366]">{cita.hora}</p>
                      <p className="text-xs text-gray-500">{cita.fecha || 'Hoy'}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">No hay citas próximas</div>
              )}
            </div>
          </div>
        </div>

        {/* comentarios y rating */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Comentarios Recientes</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{dashboardData.metricas.rating.valor} promedio</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dashboardData.comentariosRecientes.length > 0 ? (
              dashboardData.comentariosRecientes.map((comentario, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-900">{comentario.paciente}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < Math.round(comentario.rating) 
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
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500">No hay comentarios recientes</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Ofertas;