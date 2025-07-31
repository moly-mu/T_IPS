import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Barral from '../../user/desis/Barral';
import NavbarI from '../../user/desis/NavbarI';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  MessageCircle, 
  Users, 
  Clock, 
  TrendingUp, 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  Calendar, 
  BarChart3, 
  RefreshCw 
} from 'lucide-react';

const AnalyticsDashboard = () => {
  const { token } = useAuth();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  
  // Estados para NavbarI
  const [isOpen, setIsOpen] = useState(false);

  // Función para manejar cambios en el sidebar
  const handleSidebarChange = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      setError(null);
      
      const response = await fetch('http://127.0.0.1:8000/api/analitica', {
        method: 'GET',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      setData(result);
      console.log('✅ Datos cargados:', result);
      
    } catch (err) {
      console.error('❌ Error al cargar datos:', err);
      setError(err.message);
      
      // Datos de ejemplo para desarrollo
      setData({
        totales: {
          total_conversaciones: 15,
          total_mensajes: 89,
          promedio_mensajes_conversacion: 5.9,
          promedio_duracion_conversacion: 245.5,
          promedio_tiempo_primera_respuesta: 32.8
        },
        por_cliente: {
          top_clientes_mensajes: [
            { numero_cliente: "573136368783", count: 25 },
            { numero_cliente: "573136368856", count: 18 },
            { numero_cliente: "573136368901", count: 12 },
            { numero_cliente: "573136368745", count: 8 }
          ],
          clientes_sin_respuesta: [],
          clientes_mas_activos_hoy: ["573136368783", "573136368856"],
          clientes_mas_activos_esta_semana: [
            "573136368783", "573136368856", "573136368901", "573136368745"
          ]
        },
        temporales: {
          conversaciones_por_hora: {
            hora: [9, 10, 11, 14, 15, 16, 19, 20],
            count: [3, 5, 8, 12, 15, 18, 22, 16]
          },
          mensajes_por_dia: {
            dia: ["2025-07-27", "2025-07-28", "2025-07-29", "2025-07-30", "2025-07-31"],
            count: [12, 18, 25, 20, 14]
          },
          hora_mas_frecuente: 19,
          dia_con_mas_conversaciones: "2025-07-29"
        },
        estado: {
          porcentaje_conversaciones_sin_respuesta: 5.2,
          cantidad_conversaciones_cerradas: 12
        }
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto-refresh cada 30 segundos
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [token]);

  // Funciones de formateo
  const formatDuration = (seconds) => {
    if (!seconds || seconds === 0) return '0m 0s';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('es-ES', { 
        day: '2-digit', 
        month: 'short' 
      });
    } catch {
      return dateString;
    }
  };

  // Preparar datos para gráficos
  const clientesData = React.useMemo(() => {
    if (!data?.por_cliente?.top_clientes_mensajes) return [];
    
    return data.por_cliente.top_clientes_mensajes.map((cliente, index) => ({
      cliente: `...${cliente.numero_cliente.slice(-4)}`,
      mensajes: cliente.count,
      numero_completo: cliente.numero_cliente
    }));
  }, [data]);

  const horasData = React.useMemo(() => {
    if (!data?.temporales?.conversaciones_por_hora?.hora) return [];
    
    return data.temporales.conversaciones_por_hora.hora.map((hora, index) => ({
      hora: `${hora}:00`,
      conversaciones: data.temporales.conversaciones_por_hora.count[index] || 0
    }));
  }, [data]);

  const diasData = React.useMemo(() => {
    if (!data?.temporales?.mensajes_por_dia?.dia) return [];
    
    return data.temporales.mensajes_por_dia.dia.map((dia, index) => ({
      dia: formatDate(dia),
      mensajes: data.temporales.mensajes_por_dia.count[index] || 0,
      fecha_completa: dia
    }));
  }, [data]);

  // Loading state
  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Barral />
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#00102D]"></div>
            <p className="text-gray-600 font-medium">Cargando dashboard de analítica...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Barral />

      {/* Contenido principal */}
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <NavbarI 
          isOpen={isOpen} 
          sidebarChange={handleSidebarChange}
        />
        
        <div className="max-w-7xl mx-auto mt-4">
          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <BarChart3 className="text-[#00102D]" size={32} />
                Dashboard de Analítica
              </h1>
              <p className="text-gray-600">Análisis en tiempo real de conversaciones</p>
            </div>
            
            <div className="flex items-center gap-4">
              {error && (
                <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-lg border border-orange-200">
                  <AlertCircle size={16} />
                  <span className="text-sm">Datos de ejemplo</span>
                </div>
              )}
              <button
                onClick={fetchData}
                disabled={refreshing}
                className="flex items-center gap-2 bg-[#00102D] hover:bg-[#003366] disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-all shadow-md"
              >
                <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
                {refreshing ? 'Actualizando...' : 'Actualizar'}
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#00102D]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Conversaciones</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {data?.totales?.total_conversaciones ?? 0}
                  </p>
                </div>
                <MessageCircle className="text-[#00102D]" size={28} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#003366]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Mensajes</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {data?.totales?.total_mensajes ?? 0}
                  </p>
                </div>
                <Users className="text-[#003366]" size={28} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#0066CC]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Promedio por Conv.</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {data?.totales?.promedio_mensajes_conversacion?.toFixed(1) ?? '0.0'}
                  </p>
                </div>
                <TrendingUp className="text-[#0066CC]" size={28} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#3399FF]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Duración Prom.</p>
                  <p className="text-lg font-bold text-gray-800">
                    {formatDuration(data?.totales?.promedio_duracion_conversacion)}
                  </p>
                </div>
                <Clock className="text-[#3399FF]" size={28} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#66B2FF]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Primera Respuesta</p>
                  <p className="text-lg font-bold text-gray-800">
                    {formatDuration(data?.totales?.promedio_tiempo_primera_respuesta)}
                  </p>
                </div>
                <CheckCircle className="text-[#66B2FF]" size={28} />
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Top Clientes */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Users size={20} className="text-[#00102D]" />
                Top Clientes por Mensajes
              </h3>
              <div style={{ width: '100%', height: 280 }}>
                <ResponsiveContainer>
                  <BarChart data={clientesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="cliente" 
                      stroke="#666"
                      fontSize={12}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="#666" 
                      fontSize={12}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value, name) => [`${value} mensajes`, name]}
                      labelFormatter={(label) => `Cliente: ${label}`}
                    />
                    <Bar 
                      dataKey="mensajes" 
                      fill="#00102D" 
                      radius={[4, 4, 0, 0]}
                      name="Mensajes"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Conversaciones por Hora */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Clock size={20} className="text-[#003366]" />
                Conversaciones por Hora
              </h3>
              <div style={{ width: '100%', height: 280 }}>
                <ResponsiveContainer>
                  <AreaChart data={horasData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="hora" 
                      stroke="#666" 
                      fontSize={12}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="#666" 
                      fontSize={12}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value, name) => [`${value} conversaciones`, name]}
                      labelFormatter={(label) => `Hora: ${label}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="conversaciones" 
                      stroke="#003366" 
                      fill="#003366"
                      fillOpacity={0.3}
                      strokeWidth={2}
                      name="Conversaciones"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Mensajes por Día y Estado */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Mensajes por Día */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-[#0066CC]" />
                Mensajes por Día
              </h3>
              <div style={{ width: '100%', height: 250 }}>
                <ResponsiveContainer>
                  <LineChart data={diasData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="dia" 
                      stroke="#666" 
                      fontSize={12}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="#666" 
                      fontSize={12}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value, name) => [`${value} mensajes`, name]}
                      labelFormatter={(label) => `Fecha: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="mensajes" 
                      stroke="#0066CC" 
                      strokeWidth={3}
                      dot={{ fill: '#0066CC', strokeWidth: 2, r: 5 }}
                      name="Mensajes"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Estado de Conversaciones */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Estado General</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Sin Respuesta</span>
                    <span className="text-lg font-bold text-gray-800">
                      {data?.estado?.porcentaje_conversaciones_sin_respuesta?.toFixed(1) ?? '0.0'}%
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Cerradas</span>
                    <span className="text-lg font-bold text-gray-800">
                      {data?.estado?.cantidad_conversaciones_cerradas ?? 0}
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-[#00102D]">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Hora Pico</span>
                    <span className="text-lg font-bold text-gray-800">
                      {data?.temporales?.hora_mas_frecuente ?? 0}:00
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-orange-500">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Día Top</span>
                    <span className="text-sm font-bold text-gray-800">
                      {data?.temporales?.dia_con_mas_conversaciones ? 
                        formatDate(data.temporales.dia_con_mas_conversaciones) : 
                        'N/A'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Clientes Activos */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Activity size={20} className="text-[#3399FF]" />
              Clientes Más Activos Esta Semana
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {data?.por_cliente?.clientes_mas_activos_esta_semana?.length > 0 ? (
                data.por_cliente.clientes_mas_activos_esta_semana.map((cliente, index) => (
                  <div key={`${cliente}-${index}`} className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-[#00102D] rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 text-sm font-medium">...{cliente.slice(-4)}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-8">
                  <Activity size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No hay clientes activos esta semana</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;