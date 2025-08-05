import { useEffect, useState } from "react";
import {
  Calendar,
  Search,
  Star,
  FileText,
  CreditCard,
  UserCheck,
  Stethoscope,
  User,
  Download,
  Eye,
} from "lucide-react";

import axios from "axios";

const RecentActivityTable = () => {
  const [citas, setCitas] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [historias, setHistorias] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [activeTab, setActiveTab] = useState("citas");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [resCitas, resPagos, resRegistros, resRatings, resHistorias] =
          await Promise.all([
            axios.get("http://localhost:3000/admin/activity/citas"),
            axios.get("http://localhost:3000/admin/activity/pagos"),
            axios.get("http://localhost:3000/admin/activity/registros"),
            axios.get("http://localhost:3000/admin/activity/ratings"),
            axios.get("http://localhost:3000/admin/activity/historias"),
          ]);

        setCitas(resCitas.data);
        setPagos(resPagos.data);
        setRegistros(resRegistros.data);
        setRatings(resRatings.data);
        setHistorias(resHistorias.data);
      } catch (error) {
        console.error("Error al obtener datos de actividad:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const tabs = [
    { id: "citas", name: "Citas", icon: Calendar, count: citas.length },
    { id: "pagos", name: "Pagos", icon: CreditCard, count: pagos.length },
    {
      id: "registros",
      name: "Usuarios",
      icon: UserCheck,
      count: registros.length,
    },
    {
      id: "ratings",
      name: "Calificaciones",
      icon: Star,
      count: ratings.length,
    },
    {
      id: "historias",
      name: "Historias Clínicas",
      icon: FileText,
      count: historias.length,
    },
  ];

  const filterData = (data, type) => {
    const safeData = Array.isArray(data) ? data : [];
    return safeData
      .filter((item) => {
        const matchesSearch =
          searchTerm === "" ||
          Object.values(item).some((value) =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
          );

        const matchesDate = dateFilter === "" || item.fecha === dateFilter;

        return matchesSearch && matchesDate;
      })
      .sort((a, b) => {
        if (sortBy === "recent") {
          return new Date(b.fecha) - new Date(a.fecha);
        }
        return new Date(a.fecha) - new Date(b.fecha);
      });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const getStatusColor = (estado) => {
    const colors = {
      Completada: "bg-green-100 text-green-800",
      Completado: "bg-green-100 text-green-800",
      Pendiente: "bg-yellow-100 text-yellow-800",
      Cancelada: "bg-red-100 text-red-800",
      Activo: "bg-green-100 text-green-800",
      Inactivo: "bg-gray-100 text-gray-800",
      Disponible: "bg-green-100 text-green-800",
      Procesando: "bg-blue-100 text-blue-800",
      Error: "bg-red-100 text-red-800",
    };
    return colors[estado] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Cargando datos recientes...
      </div>
    );
  }

  const renderTable = () => {
    switch (activeTab) {
      case "citas":
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full max-w6xl bg-white shadow-md rounded-lg border">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Paciente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Especialista
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filterData(citas, "citas").map((cita) => (
                  <tr key={cita.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          {cita.paciente}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1 ml-7">
                        {cita.documento}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Stethoscope className="w-5 h-5 text-blue-500 mr-2" />
                        <span className="text-sm text-gray-900">
                          {cita.especialista}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1 ml-7">
                        {cita.documentoE}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cita.fecha}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cita.hora}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cita.tipo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          cita.estado
                        )}`}
                      >
                        {cita.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "pagos":
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full max-w6xl bg-white shadow-md rounded-lg border">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Paciente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Monto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Método
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Concepto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filterData(pagos, "pagos").map((pago) => (
                  <tr key={pago.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          {pago.paciente}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1 ml-7">
                        {pago.documento}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      ${pago.monto.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pago.fecha}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pago.metodo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pago.concepto}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          pago.estado
                        )}`}
                      >
                        {pago.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "registros":
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full max-w6xl bg-white shadow-md rounded-lg border">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Teléfono
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Fecha Registro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filterData(registros, "registros").map((registro) => (
                  <tr key={registro.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <UserCheck className="w-5 h-5 text-blue-500 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          {registro.usuario}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1 ml-7">
                        {registro.documento}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {registro.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {registro.telefono}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {registro.fecha}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          registro.estado
                        )}`}
                      >
                        {registro.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "ratings":
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full max-w6xl bg-white shadow-md rounded-lg border">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Paciente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Especialista
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Calificación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Comentario
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filterData(ratings, "ratings").map((rating) => (
                  <tr key={rating.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          {rating.paciente}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1 ml-7">
                        {rating.documento}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Stethoscope className="w-5 h-5 text-blue-500 mr-2" />
                        <span className="text-sm text-gray-900">
                          {rating.especialista}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1 ml-7">
                        {rating.documentoE}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        {renderStars(rating.rating)}
                        <span className="ml-2 text-sm text-gray-600">
                          ({rating.rating}/5)
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {rating.fecha}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {rating.comentario}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "historias":
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full max-w6xl bg-white shadow-md rounded-lg border">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Paciente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Especialista
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Archivo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filterData(historias, "historias").map((historia) => (
                  <tr key={historia.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          {historia.paciente}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1 ml-7">
                        {historia.documento}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Stethoscope className="w-5 h-5 text-blue-500 mr-2" />
                        <span className="text-sm text-gray-900">
                          {historia.especialista}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1 ml-7">
                        {historia.documentoE}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {historia.tipo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {historia.fecha}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-900">
                          {historia.archivo}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-900 flex items-center transition-colors"
                          onClick={() =>
                            alert(`Ver archivo: ${historia.archivo}`)
                          }
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Ver
                        </button>
                        <button
                          className="text-green-600 hover:text-green-900 flex items-center transition-colors"
                          onClick={() =>
                            alert(`Descargar archivo: ${historia.archivo}`)
                          }
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

      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-gray-700">
          Actividades Recientes
        </h1>
      </div>

      {/* tabs */}
      <div className="flex flex-wrap gap-2 mb-4 border-b-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 transition-colors text-sm ${
              activeTab === tab.id
                ? "text-lg bg-none text-[#003366] font-bold border-b-2 border-[#003366]"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Fecha</label>
          <input
            type="date"
            className="border border-gray-300 rounded-md py-2 px-4"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Ordenar por
          </label>
          <select
            className="border border-gray-300 rounded-md py-2 px-4"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recent">Más reciente</option>
            <option value="oldest">Más antiguo</option>
          </select>
        </div>
      </div>

      {/* tabla */}
      <div>{renderTable()}</div>
    </div>
  );
};

export default RecentActivityTable;
