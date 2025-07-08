import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"
import {
	Users,
	UserCheck,
	Calendar,
	Activity,
	TrendingUp,
	Star,
	Filter,
	Bell,
	Settings,
	ChevronDown,
	Eye,
	CheckCircle,
	XCircle,
	Clock,
	Home,
	User,
	FileText,
} from "lucide-react";
import UserSection from "../admin/user/UserSection";
import SpecialistsSection from "../admin/specialist/SpecialistsSection";
import ServicesSection from "../admin/service/ServicesSection";

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

				<main className="flex-1 overflow-y-auto bg-white rounded-lg">{children}</main>
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
		orange: "bg-orange-50 text-orange-600",
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
	color: PropTypes.oneOf(["blue", "green", "purple", "orange"]),
};

const ChartCard = ({ title, children, className = "" }) => {
	return (
		<div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
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

const DemographicsChart = () => {
	const demographics = [
		{ label: "18-30 años", value: 35, color: "bg-blue-500" },
		{ label: "31-45 años", value: 28, color: "bg-green-500" },
		{ label: "46-60 años", value: 22, color: "bg-purple-500" },
		{ label: "60+ años", value: 15, color: "bg-orange-500" },
	];

	return (
		<ChartCard title="Demografía por Edad">
			<div className="space-y-4">
				{demographics.map((item, index) => (
					<div key={index} className="flex items-center">
						<div className="w-20 text-sm text-gray-600">{item.label}</div>
						<div className="flex-1 mx-4">
							<div className="w-full bg-gray-200 rounded-full h-2">
								<div
									className={`h-2 rounded-full ${item.color}`}
									style={{ width: `${item.value}%` }}
								></div>
							</div>
						</div>
						<div className="w-12 text-sm text-gray-900 text-right">{item.value}%</div>
					</div>
				))}
			</div>
		</ChartCard>
	);
};

const GenderChart = () => {
	return (
		<ChartCard title="Distribución por Género">
			<div className="flex items-center justify-center h-40">
				<div className="relative w-32 h-32">
					<svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
						<path
							d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
							fill="none"
							stroke="#e5e7eb"
							strokeWidth="3"
						/>
						<path
							d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
							fill="none"
							stroke="#3b82f6"
							strokeWidth="3"
							strokeDasharray="60, 40"
						/>
					</svg>
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="text-center">
							<div className="text-2xl font-light text-gray-900">60%</div>
							<div className="text-sm text-gray-600">Mujeres</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-center space-x-6 mt-4">
				<div className="flex items-center">
					<div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
					<span className="text-sm text-gray-600">Mujeres (60%)</span>
				</div>
				<div className="flex items-center">
					<div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
					<span className="text-sm text-gray-600">Hombres (40%)</span>
				</div>
			</div>
		</ChartCard>
	);
};

const SpecialistRequests = () => {
	const [requests, setRequests] = useState([]);

useEffect(() => {
  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/profesional");
      const data = res.data;

      // Mapea los datos a lo que el frontend espera
      const mapped = await Promise.all(
        data.map(async (pro) => {
          const ratingRes = await axios.get(
            `http://localhost:3000/admin/profesional/${pro.id}/rating`
          );

          return {
            id: pro.id,
            name: `${pro.User.firstname} ${pro.User.lastname}`,
            specialty: pro.ProfesionalHasSpecialty[0]?.Specialty?.name ?? "Sin especialidad",
            experience: pro.prof_data.working_experience,
            rating: parseFloat(ratingRes.data.avg).toFixed(1),
            status: pro.User.status.toLowerCase(),
            date: new Date(pro.prof_data.joinDate).toISOString().split("T")[0],
          };
        })
      );
      const pendientes = mapped.filter((pro) => pro.status === "pendiente");

      setRequests(pendientes);
    } catch (err) {
      console.error("Error al obtener solicitudes de especialistas:", err);
    }
  };

  fetchRequests();
}, []);


	const handleApprove = (id) => {
		console.log(`Aprobar especialista ${id}`);
	};

	const handleReject = (id) => {
		console.log(`Rechazar especialista ${id}`);
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
							<button className="p-2 text-gray-400 hover:text-gray-600">
								<Eye className="w-4 h-4" />
							</button>
						</div>
					</div>
				))}
			</div>
		</ChartCard>
	);
};

const RecentActivity = () => {
	const activities = [
		{
			id: 1,
			action: "Nueva consulta",
			user: "María González",
			time: "Hace 5 min",
			type: "consultation",
		},
		{
			id: 2,
			action: "Especialista registrado",
			user: "Dr. Carlos Ruiz",
			time: "Hace 15 min",
			type: "specialist",
		},
		{
			id: 3,
			action: "Pago completado",
			user: "Ana Rodríguez",
			time: "Hace 30 min",
			type: "payment",
		},
		{
			id: 4,
			action: "Consulta finalizada",
			user: "Dr. Luis Pérez",
			time: "Hace 1 hora",
			type: "consultation",
		},
	];

	const getIcon = (type) => {
		switch (type) {
			case "consultation":
				return <Calendar className="w-4 h-4 text-blue-600" />;
			case "specialist":
				return <UserCheck className="w-4 h-4 text-green-600" />;
			case "payment":
				return <Activity className="w-4 h-4 text-purple-600" />;
			default:
				return <Clock className="w-4 h-4 text-gray-600" />;
		}
	};

	return (
		<ChartCard title="Actividad Reciente">
			<div className="space-y-4">
				{activities.map((activity) => (
					<div key={activity.id} className="flex items-center space-x-3">
						<div className="flex-shrink-0">{getIcon(activity.type)}</div>
						<div className="flex-1 min-w-0">
							<p className="text-sm font-medium text-gray-900">{activity.action}</p>
							<p className="text-sm text-gray-600">{activity.user}</p>
						</div>
						<div className="flex-shrink-0 text-xs text-gray-500">{activity.time}</div>
					</div>
				))}
			</div>
		</ChartCard>
	);
};

const Pin = () => {
	const [activeTab, setActiveTab] = useState("dashboard");

	const renderContent = () => {
		switch (activeTab) {
			case "users":
				return <UserSection />;
			case "specialists":
				return <SpecialistsSection />;
			case "services":
				return <ServicesSection />;
			default:
				return (
					<>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
							<StatsCard
								title="Usuarios Activos"
								value="1,234"
								icon={Users}
								trend="+12% este mes"
								color="blue"
							/>
							<StatsCard
								title="Especialistas"
								value="89"
								icon={UserCheck}
								trend="+5 nuevos"
								color="green"
							/>
							<StatsCard
								title="Consultas Hoy"
								value="156"
								icon={Calendar}
								trend="+8% vs ayer"
								color="purple"
							/>
							<StatsCard
								title="Ingresos"
								value="$45,670"
								icon={Activity}
								trend="+15% este mes"
								color="orange"
							/>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
							<DemographicsChart />
							<GenderChart />
							<RecentActivity />
						</div>

						<div className="grid grid-cols-1 gap-6">
							<SpecialistRequests />
						</div>
					</>
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
