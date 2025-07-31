import { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Clock,
  DollarSign,
  Activity,
  Calendar,
  TrendingUp,
} from "lucide-react";

const ServicesSection = () => {
  const [servicios, setServicios] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalTipo, setModalTipo] = useState("crear");
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroEspecialidad, setFiltroEspecialidad] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [especialidades, setEspecialidades] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    price: "",
    duration: "",
    status: "Activo",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/specialty")
      .then((res) => {
        setServicios(res.data);

        const especialidadesUnicas = [
          ...new Set(res.data.map((s) => s.service)),
        ];
        setEspecialidades(especialidadesUnicas);
      })
      .catch((err) => console.error("Error al obtener especialidades:", err));
  }, []);

  const serviciosFiltrados = servicios.filter((s) => {
    return (
      s.name.toLowerCase().includes(filtroTexto.toLowerCase()) &&
      (filtroEspecialidad === "" || s.service === filtroEspecialidad) &&
      (filtroEstado === "" || s.status === filtroEstado)
    );
  });

  const abrirModal = (tipo, servicio = null) => {
    setModalTipo(tipo);
    setServicioSeleccionado(servicio);
    if (servicio && tipo === "editar") {
      setFormData({
        name: servicio.name,
        service: servicio.service,
        price: servicio.price.toString(),
        duration: servicio.duration.toString(),
        status: servicio.status,
        joinDate: new Date(servicio.joinDate).toISOString().split("T")[0],
      });
    } else {
      setFormData({
        name: "",
        service: "",
        price: "",
        duration: "",
        status: "Activo",
      });
    }
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setServicioSeleccionado(null);
  };

  const manejarSubmit = () => {
    const payload = {
      ...formData,
      price: parseInt(formData.price),
      duration: parseInt(formData.duration),
    };

    if (modalTipo === "crear") {
      axios
        .post("http://localhost:3000/admin/specialty", payload)
        .then((res) => {
          setServicios([...servicios, res.data]);
          cerrarModal();
        })
        .catch((err) => console.error("Error al crear especialidad:", err));
    } else if (modalTipo === "editar") {
      axios
        .put(
          `http://localhost:3000/admin/specialty/${servicioSeleccionado.id}`,
          payload
        )
        .then((res) => {
          setServicios(
            servicios.map((s) =>
              s.id === servicioSeleccionado.id ? res.data : s
            )
          );
          cerrarModal();
        })
        .catch((err) =>
          console.error("Error al actualizar especialidad:", err)
        );
    }
  };

  const eliminarServicio = (id) => {
    if (!confirm("¿Estás seguro de eliminar esta especialidad?")) return;
    axios
      .delete(`http://localhost:3000/admin/specialty/${id}`)
      .then(() => setServicios(servicios.filter((s) => s.id !== id)))
      .catch((err) => console.error("Error al eliminar especialidad:", err));
  };

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const newSpecialtyThisMonth = serviciosFiltrados.filter((s) => {
    const joinedDate = new Date(s.joinDate);
    return (
      joinedDate.getMonth() === currentMonth &&
      joinedDate.getFullYear() === currentYear
    );
  });

  const cambiarEstado = (id) => {
    const servicio = servicios.find((s) => s.id === id);
    const nuevoEstado = servicio.status === "Activo" ? "Inactivo" : "Activo";

    const payload = {
      name: servicio.name,
      service: servicio.service,
      price: servicio.price,
      duration: servicio.duration,
      status: nuevoEstado,
      joinDate: servicio.joinDate, // si el backend lo requiere
    };

    axios
      .put(`http://localhost:3000/admin/specialty/${id}`, payload)
      .then((res) => {
        setServicios(servicios.map((s) => (s.id === id ? res.data : s)));
      })
      .catch((err) => console.error("Error al cambiar estado:", err));
  };

  const totalServicios = serviciosFiltrados.length;
  const serviciosActivos = serviciosFiltrados.filter(
    (s) => s.status === "Activo"
  ).length;
  const totalConsultas = serviciosFiltrados.reduce(
    (acc, s) => acc + (s._count?.Appointment || 0),
    0
  );
  const ingresoTotal = serviciosFiltrados
    .filter((s) => s.status === "Activo")
    .reduce((acc, s) => acc + s.price * (s._count?.Appointment || 0), 0);

  const ingresosPorMes = servicios
    .filter((s) => s.status === "Activo") // Filtra aquí también
    .reduce(
      (acc, s) => {
        const joined = new Date(s.joinDate);
        const month = joined.getMonth();
        const year = joined.getFullYear();
        const consultas = s._count?.Appointment || 0;
        const total = s.price * consultas;

        if (month === currentMonth && year === currentYear) {
          acc.actual += total;
        }
        if (
          (month === currentMonth - 1 && year === currentYear) ||
          (currentMonth === 0 && month === 11 && year === currentYear - 1)
        ) {
          acc.anterior += total;
        }

        return acc;
      },
      { actual: 0, anterior: 0 }
    );

  const variacionIngresos =
    ingresosPorMes.anterior > 0
      ? ((ingresosPorMes.actual - ingresosPorMes.anterior) /
          ingresosPorMes.anterior) *
        100
      : 0;

  const colorClase = variacionIngresos >= 0 ? "text-green-600" : "text-red-600";
  const signo = variacionIngresos >= 0 ? "+" : "";

  const porcentajeActivos =
    totalServicios > 0
      ? Math.round((serviciosActivos / totalServicios) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Servicios
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Gestión de servicios de teleconsulta
              </p>
            </div>
            <button
              onClick={() => abrirModal("crear")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Nuevo Servicio
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 py-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                TOTAL SERVICIOS
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {totalServicios}
              </p>
              <p className="text-xs text-green-600 mt-1">
                +{newSpecialtyThisMonth.length} nuevos este mes
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                SERVICIOS ACTIVOS
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {serviciosActivos}
              </p>
              <p className="text-xs text-green-600 mt-1">
                {porcentajeActivos}% del total
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                CONSULTAS TOTALES
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {totalConsultas}
              </p>
              <p className="text-xs text-green-600 mt-1">
                +12% vs mes anterior
              </p>
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
              <p className="text-2xl font-bold text-gray-900">
                ${ingresoTotal.toLocaleString()}
              </p>
              <p
                className={`text-xs ${colorClase} mt-1`}
              >{`${signo}${variacionIngresos.toFixed(1)}% este mes`}</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 px-6 pb-4">
        <div className="relative w-full md:w-1/3">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={filtroTexto}
            onChange={(e) => setFiltroTexto(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={filtroEspecialidad}
          onChange={(e) => setFiltroEspecialidad(e.target.value)}
        >
          <option value="">Todas las especialidades</option>
          {especialidades.map((esp) => (
            <option key={esp} value={esp}>
              {esp}
            </option>
          ))}
        </select>

        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>

      {/* Tabla */}
      <div className="px-6 pb-10">
        <table className="min-w-full bg-white rounded-md overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Servicio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                RANGO Duración
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CONSULTAS
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {serviciosFiltrados.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.service}</td>
                <td className="px-4 py-2 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" /> {s.duration} min
                </td>
                <td>
                  <div className="px-4 py-2 flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-400" />{" "}
                    {s._count?.Appointment || 0}
                  </div>
                </td>
                <td className="px-4 py-2">${s.price.toLocaleString()}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => cambiarEstado(s.id)}
                    className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                      s.status === "Activo"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {s.status}
                  </button>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => abrirModal("editar", s)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => eliminarServicio(s.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {modalTipo === "crear"
                ? "Crear Especialidad"
                : "Editar Especialidad"}
            </h2>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Servicio
              </label>
              <input
                type="text"
                placeholder="Nombre"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg"
              />
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Especialidad
              </label>
              <input
                type="text"
                placeholder="Servicio"
                value={formData.service}
                onChange={(e) =>
                  setFormData({ ...formData, service: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg"
              />
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio (COP)
              </label>
              <input
                type="number"
                placeholder="Precio"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg"
              />
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duración (minutos)
              </label>
              <input
                type="number"
                placeholder="Duración"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg"
              />
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg"
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
              <input
                type="text"
                placeholder="Fecha de registro"
                disabled
                value={formData.joinDate}
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={cerrarModal}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={manejarSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesSection;
