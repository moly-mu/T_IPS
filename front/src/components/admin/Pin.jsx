import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Users,
  UserCheck,
  Activity,
  FolderClock,
  Calendar,
  BanknoteArrowUp,
  TrendingUp,
  TrendingDown,
  Star,
  Filter,
  Bell,
  Settings,
  ChevronDown,
  CheckCircle,
  XCircle,
  Home,
  User,
  FileText,
} from "lucide-react";
import UserSection from "../admin/user/UserSection";
import SpecialistsSection from "../admin/specialist/SpecialistsSection";
import ServicesSection from "../admin/service/ServicesSection";
import RecentActivityTable from "./recentActivity/RecentActivityTable";

const Layout = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-white border-r fixed top-0 left-0 z-50 h-full flex flex-col">
        <div className="h-[var(--h-nav)] p-4 flex items-center gap-2 cursor-pointer">
          <div className="h-10 w-10 flex items-center justify-center bg-gradient-to-br from-[#003366] to-[#003366] rounded-full text-white">
            <User size={24} />
          </div>
          <div>
            <Link to="/" className="text-sm font-bold text-gray-800">
              IPS IUDC
            </Link>
          </div>
        </div>

        <hr className="bg-gray-400 mx-2" />

        {/* menu de navegacion */}
        <div className="flex flex-col space-y-2 text-gray-500 font-medium py-6 overflow-y-auto flex-grow">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex hover:bg-gray-100 px-6 py-2 items-center gap-2 ${
              activeTab === "dashboard" ? "bg-gray-100 text-gray-800" : ""
            }`}
          >
            <Home size={16} />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`flex hover:bg-gray-100 px-6 py-2 items-center gap-2 ${
              activeTab === "users" ? "bg-gray-100 text-gray-800" : ""
            }`}
          >
            <User size={16} />
            Usuarios
          </button>

          <button
            onClick={() => setActiveTab("specialists")}
            className={`flex hover:bg-gray-100 px-6 py-2 items-center gap-2 ${
              activeTab === "specialists" ? "bg-gray-100 text-gray-800" : ""
            }`}
          >
            <UserCheck size={16} />
            Especialistas
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`flex hover:bg-gray-100 px-6 py-2 items-center gap-2 ${
              activeTab === "services" ? "bg-gray-100 text-gray-800" : ""
            }`}
          >
            <FileText size={16} />
            Servicios
          </button>

          <button
            onClick={() => setActiveTab("recentActivity")}
            className={`flex hover:bg-gray-100 px-6 py-2 items-center gap-2 ${
              activeTab === "recentActivity" ? "bg-gray-100 text-gray-800" : ""
            }`}
          >
            <FolderClock size={16} />
            Actividad Reciente
          </button>
        </div>

        {/* el perfil del usuario inferior */}
        <div className="mt-auto p-6 border-t">
          <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
              <User size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Admin</p>
              <p className="text-xs text-gray-500">admin@correo.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* contenido principal */}
      <div className="flex-1 p-6 pl-80 pr-16">
        <header className="bg-white shadow-sm z-10 h-16 mb-6 rounded-lg">
          <div className="flex items-center justify-between px-6 h-full">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-600">
                {activeTab === "dashboard" && "Panel de Control"}
                {activeTab === "users" && "Gestión de Usuarios"}
                {activeTab === "specialists" && "Gestión de Especialistas"}
                {activeTab === "services" && "Gestión de Servicios"}
                {activeTab === "recentActivity" && "Actividad Reciente"}
              </span>
            </div>

            <div className="flex items-center space-x-6">
              <div className="relative cursor-pointer">
                <Bell size={20} className="text-gray-500" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </div>

              <Settings size={20} className="text-gray-500 cursor-pointer" />

              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-900">A</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Admin</span>
                <ChevronDown size={16} className="text-gray-500" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-white rounded-lg">
          {children}
        </main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
};

const NavItem = ({ icon, text, active = false, expanded, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-6 py-3 flex items-center ${
        active
          ? "bg-blue-50 text-gray-900 border-r-4 border-gray-900"
          : "text-gray-600 hover:bg-gray-100"
      } cursor-pointer transition-colors`}
    >
      <div className="flex items-center">
        <div className={`${expanded ? "mr-4" : "mx-auto"}`}>{icon}</div>
        {expanded && <span className="text-sm font-medium">{text}</span>}
      </div>
    </button>
  );
};

NavItem.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
  expanded: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

const StatsCard = ({ title, value, icon: Icon, trend, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {title}
          </p>
          <p className="text-3xl font-light text-gray-900 mt-2">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div
          className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center`}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType.isRequired,
  trend: PropTypes.string,
  color: PropTypes.oneOf(["blue", "green", "purple", "black"]),
};

const IncomeCard = ({ color = "black" }) => {
  IncomeCard.propTypes = {
    color: PropTypes.oneOf(["blue", "green", "purple", "black"]),
  };

  IncomeCard.defaultProps = {
    color: "black",
  };
  
  const [selectedSpecialty, setSelectedSpecialty] = useState("todas");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos de especialidades desde el backend
  useEffect(() => {
    const fetchIncomeBySpecialty = async () => {
      try {
        setLoading(true);
        console.log("🔍 Fetching income by specialty...");
        
        const response = await axios.get("http://localhost:3000/admin/stats/income");
        console.log("📊 Income data received:", response.data);
        console.log("📊 Response status:", response.status);
        
        if (Array.isArray(response.data) && response.data.length > 0) {
          setSpecialties(response.data);
          
          // Seleccionar "todas" por defecto si existe
          const allSpecialty = response.data.find(s => s.id === "todas");
          if (allSpecialty) {
            setSelectedSpecialty("todas");
            console.log("✅ Selected 'todas' specialty");
          } else if (response.data.length > 0) {
            setSelectedSpecialty(response.data[0].id);
            console.log("✅ Selected first specialty:", response.data[0].name);
          }
        } else {
          console.log("⚠️ No specialties data received or empty array");
          throw new Error("No data received");
        }
      } catch (error) {
        console.error("❌ Error al cargar ingresos por especialidad:", error);
        console.error("Response:", error.response?.data);
        console.error("Status:", error.response?.status);
        
        // Fallback a datos de ejemplo en caso de error
        setSpecialties([
          {
            id: "error",
            name: "Error al cargar datos",
            income: "$0",
            trend: "Verifique la conexión",
          }
        ]);
        setSelectedSpecialty("error");
      } finally {
        setLoading(false);
        console.log("🏁 Loading finished");
      }
    };

    fetchIncomeBySpecialty();
  }, []);

  const currentSpecialty = specialties.find((s) => s.id === selectedSpecialty);

  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    black: "bg-black-600 text-black-600",
  };

  const handleSpecialtyChange = (specialtyId) => {
    setSelectedSpecialty(specialtyId);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            Ingresos
          </p>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              disabled={loading}
            >
              <span className="text-gray-600 max-w-20 truncate">
                {loading ? "Cargando..." : 
                 selectedSpecialty === "todas" ? "Todas" : 
                 currentSpecialty?.name || "Seleccionar"}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-gray-500 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && !loading && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {specialties.length > 0 ? (
                  specialties.map((specialty) => (
                    <button
                      key={specialty.id}
                      onClick={() => handleSpecialtyChange(specialty.id)}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        selectedSpecialty === specialty.id
                          ? "bg-gray-50 text-gray-900"
                          : "text-gray-700"
                      }`}
                    >
                      {specialty.name}
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-500">
                    No hay especialidades disponibles
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div
          className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center`}
        >
          <BanknoteArrowUp className="w-6 h-6" />
        </div>
      </div>

      <div>
        {loading ? (
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
          </div>
        ) : currentSpecialty ? (
          <>
            <p className="text-3xl font-light text-gray-900 mb-2">
              {currentSpecialty.income}
            </p>
            {(() => {
              const isNegative = currentSpecialty.trend.includes('-');
              const isZero = currentSpecialty.trend.includes('0.0%');
              
              let TrendIcon = TrendingUp;
              let colorClass = 'text-green-600';
              
              if (isNegative) {
                TrendIcon = TrendingDown;
                colorClass = 'text-red-600';
              } else if (isZero) {
                TrendIcon = TrendingUp;
                colorClass = 'text-gray-600';
              }
              
              return (
                <p className={`text-sm ${colorClass} flex items-center`}>
                  <TrendIcon className="w-4 h-4 mr-1" />
                  {currentSpecialty.trend}
                </p>
              );
            })()}
          </>
        ) : (
          <div className="text-center">
            <p className="text-2xl font-light text-gray-400">Sin datos</p>
            <p className="text-sm text-gray-500">No se pudo cargar información</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ChartCard = ({ title, children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <Filter className="w-5 h-5 text-gray-400" />
      </div>
      {children}
    </div>
  );
};

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

const DemographicsChart = ({ edades }) => {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-purple-500",
  ];

  return (
    <ChartCard title="Demografía por Edad (Pacientes) ">
      <div className="space-y-4">
        {edades.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-20 text-sm text-gray-600">{item.range}</div>
            <div className="flex-1 mx-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    colors[index % colors.length]
                  }`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
            <div className="w-12 text-sm text-gray-900 text-right">
              {item.percentage}%
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
};

DemographicsChart.propTypes = {
  edades: PropTypes.arrayOf(
    PropTypes.shape({
      range: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      percentage: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const GenderChart = ({ generos }) => {
  const mujeres = generos.find((g) => g.gender === "Femenino") || {
    percentage: "0.0",
  };
  const hombres = generos.find((g) => g.gender === "Masculino") || {
    percentage: "0.0",
  };

  const strokeDasharray = `${mujeres.percentage}, ${
    100 - parseFloat(mujeres.percentage)
  }`;

  return (
    <ChartCard title="Distribución por Género (Pacientes)">
      <div className="flex items-center justify-center h-40">
        <div className="relative w-32 h-32">
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
              strokeDasharray={strokeDasharray}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-light text-gray-900">
                {mujeres.percentage}%
              </div>
              <div className="text-sm text-gray-600">Mujeres</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">
            Mujeres ({mujeres.percentage}%)
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">
            Hombres ({hombres.percentage}%)
          </span>
        </div>
      </div>
    </ChartCard>
  );
};

GenderChart.propTypes = {
  generos: PropTypes.arrayOf(
    PropTypes.shape({
      gender: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      percentage: PropTypes.string.isRequired,
    })
  ).isRequired,
};
const SpecialistRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/admin/specialist-requests"
        );
        const data = res.data.data;

        const mapped = data.map((spec) => ({
          id: spec.id,
          name: `${spec.firstname} ${spec.lastname}`,
          specialty: spec.specialty || "Sin especialidad",
          experience: `${2025 - spec.graduationYear} años`, // asumimos año actual 2025
          rating: "N/A", // no hay rating disponible en la respuesta
          status: spec.status.toLowerCase(),
          date: new Date(spec.createdAt).toISOString().split("T")[0],
        }));

        const pendientes = mapped.filter((spec) => spec.status === "pendiente");
        if (isMounted) setRequests(pendientes);
      } catch (err) {
        console.error("Error al obtener solicitudes de especialistas:", err);
      }
    };

    fetchRequests();
    const interval = setInterval(fetchRequests, 100); // 0.1 s

    return () => {
      isMounted = false;
      clearInterval(interval); // 0.1 s
    };
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.patch(
        `http://localhost:3000/admin/specialist-requests/${id}/status`,
        {
          status: "Activo",
        }
      );
      setRequests((prev) => prev.filter((req) => req.id !== id));
    } catch (err) {
      console.error(`Error al aprobar especialista ${id}:`, err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(
        `http://localhost:3000/admin/specialist-requests/${id}/status`,
        {
          status: "Inactivo",
        }
      );
      setRequests((prev) => prev.filter((req) => req.id !== id));
    } catch (err) {
      console.error(`Error al rechazar especialista ${id}:`, err);
    }
  };

  return (
    <ChartCard title="Solicitudes de Especialistas" className="col-span-2">
      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{request.name}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{request.specialty}</span>
                  <span>•</span>
                  <span>{request.experience} experiencia</span>
                  <span>•</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                    {request.rating}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleApprove(request.id)}
                className="flex items-center px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Aprobar
              </button>
              <button
                onClick={() => handleReject(request.id)}
                className="flex items-center px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
              >
                <XCircle className="w-4 h-4 mr-1" />
                Rechazar
              </button>
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
};

const Pin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [stats, setStats] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:3000/admin/stats");
        if (isMounted) setStats(res.data);
      } catch (err) {
        console.error("Error al cargar estadísticas del dashboard:", err);
      }
    };

    fetchStats(); // primera carga inmediata
    const intervalId = setInterval(fetchStats, 100); // 0.1 s

    return () => {
      isMounted = false;
      clearInterval(intervalId); // limpiar al desmontar componente
    };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UserSection />;
      case "specialists":
        return <SpecialistsSection />;
      case "services":
        return <ServicesSection />;
      case "recentActivity":
        return <RecentActivityTable />;
      default:
        return stats ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Usuarios Activos"
                value={stats.usuariosActivos}
                icon={Users}
                trend=""
                color="blue"
              />
              <StatsCard
                title="Especialistas"
                value={stats.especialistas}
                icon={UserCheck}
                trend=""
                color="green"
              />
              <StatsCard
                title="Consultas Hoy"
                value={stats.consultas}
                icon={Calendar}
                trend=""
                color="purple"
              />
              <IncomeCard
                title="Ingresos"
                value={`$${stats.ingresos.toLocaleString()}`}
                icon={Activity}
                trend=""
                color="purple"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <DemographicsChart edades={stats.edades} />
              <GenderChart generos={stats.generos} />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <SpecialistRequests />
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">
            Cargando estadísticas...
          </div>
        );
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default Pin;
