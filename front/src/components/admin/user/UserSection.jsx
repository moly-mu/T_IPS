import { useEffect, useState } from "react";
import axios from "axios";
import {
	Search,
	Eye,
	Edit,
	Trash2,
	UserPlus,
	MoreVertical,
	Users,
	Activity,
	Calendar,
	Star,
} from "lucide-react";
import dayjs from "dayjs";

const UserSection = () => {
	const [users, setUsers] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("Todos los estados");
	const [filterGender, setFilterGender] = useState("Todos los géneros");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [modalType, setModalType] = useState("ver");
	const [selectedUser, setSelectedUser] = useState(null);
	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		email: "",
		phone: "",
		age: "",
		gender: "",
		status: "Activo",
	});

	const fetchUsers = async () => {
		try {
			const response = await axios.get("http://localhost:3000/admin/patient");
			setUsers(response.data);
		} catch (err) {
			console.error("Error al obtener pacientes:", err);
			setError("No se pudo cargar la información de pacientes");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

		const filteredUsers = users.filter((user) => {
			const matchesSearch =
				user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				user.email.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesStatus = filterStatus === "Todos los estados" || user.status === filterStatus;
			const matchesGender = filterGender === "Todos los géneros" || user.gender === filterGender;
			return matchesSearch && matchesStatus && matchesGender;
		});

		const stats = {
			totalUsers: filteredUsers.length,
			activeUsers: filteredUsers.filter((u) => u.status === "Activo").length,
			totalConsultations: filteredUsers.reduce((acc, u) => acc + u.consultations, 0),
			avgRating:
				filteredUsers.length > 0
					? (
							filteredUsers.reduce((acc, u) => acc + u.rating, 0) / filteredUsers.length
					).toFixed(1)
					: 0,
		};

		

	const getStatusColor = (status) =>
		status === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";

	const getRatingStars = (rating) =>
		Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				size={12}
				className={
					i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
				}
			/>
		));

	const handleView = async (id) => {
		try {
			const response = await axios.get(`http://localhost:3000/admin/patient/${id}`);
			const user = response.data;

			let firstname = "";
			let lastname = "";

			if (typeof user.name === "string" && user.name.trim() !== "") {
				const nameParts = user.name.trim().split(" ");
				if (nameParts.length === 1) {
					firstname = nameParts[0];
				} else {
					firstname = nameParts.slice(0, -1).join(" ");
					lastname = nameParts.slice(-1).join(" ");
				}
			}

			setModalType("ver");
			setSelectedUser(user);
			setFormData({
				firstname,
				lastname,
				email: user.email || "",
				phone: user.phone || "",
				age: user.age || "",
				gender: user.gender || "",
				status: user.status || "Activo",
			});
			setModalOpen(true);
		} catch (error) {
			console.error("Error al obtener paciente:", error);
			alert("Error al obtener datos del paciente");
		}
	};

	const handleEdit = async (id) => {
		try {
			const response = await axios.get(`http://localhost:3000/admin/patient/${id}`);
			const fetchedUser = response.data;

			console.log("Paciente recibido:", fetchedUser);

			let firstname = "";
			let lastname = "";

			if (typeof fetchedUser.name === "string" && fetchedUser.name.trim() !== "") {
				const nameParts = fetchedUser.name.trim().split(" ");
				if (nameParts.length === 1) {
					firstname = nameParts[0];
				} else {
					firstname = nameParts.slice(0, -1).join(" ");
					lastname = nameParts.slice(-1).join(" ");
				}
			} else {
				console.warn("El campo 'name' no es válido o está vacío");
			}

			setModalType("editar");
			setSelectedUser(fetchedUser);
			setFormData({
				firstname,
				lastname,
				email: fetchedUser.email || "",
				phone: fetchedUser.phone || "",
				age: fetchedUser.age || "",
				gender: fetchedUser.gender || "",
				status: fetchedUser.status || "Activo",
				joinDate: fetchedUser.User.joinDate || "",
			});
			setModalOpen(true);
		} catch (error) {
			console.error("Error al obtener paciente:", error);
			alert("Error al obtener datos del paciente");
		}
	};

	const handleSubmit = async () => {
		try {
			await axios.put(`http://localhost:3000/admin/patient/${selectedUser.id}`, formData);
			alert("Paciente actualizado correctamente");
			setModalOpen(false);
			fetchUsers();
		} catch (error) {
			console.error("Error al actualizar paciente:", error);
			alert("Error al actualizar paciente");
		}
	};

	const handleDelete = async (id) => {
		const confirmDelete = confirm("¿Estás seguro de eliminar este paciente?");
		if (!confirmDelete) return;

		try {
			await axios.delete(`http://localhost:3000/admin/patient/${id}`);
			alert("Paciente eliminado correctamente");
			fetchUsers(); // Refresca la tabla
		} catch (error) {
			console.error("Error al eliminar paciente:", error);
			alert("Error al eliminar paciente");
		}
	};

	const toggleStatus = async (id, currentStatus) => {
		try {
			const newStatus = currentStatus === "Activo" ? "Inactivo" : "Activo";
			await axios.put(`http://localhost:3000/admin/patient/${id}`, {
				status: newStatus,
			});
			fetchUsers(); // Actualiza la tabla
		} catch (error) {
			console.error("Error al cambiar el estado:", error);
			alert("No se pudo cambiar el estado del paciente.");
		}
	};

	if (loading) {
		return <div className="p-6 text-gray-600">Cargando pacientes...</div>;
	}

	if (error) {
		return <div className="p-6 text-red-600">{error}</div>;
	}

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-2xl font-semibold text-gray-900 mb-2">Usuarios</h1>
				<p className="text-gray-600">Gestión de usuarios de teleconsulta</p>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
				<div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">TOTAL USUARIOS</p>
							<p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
							<p className="text-sm text-blue-600">+2 nuevos este mes</p>
						</div>
						<div className="p-3 bg-blue-50 rounded-lg">
							<Users className="h-6 w-6 text-blue-600" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">USUARIOS ACTIVOS</p>
							<p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
							<p className="text-sm text-green-600">
								{Math.round((stats.activeUsers / stats.totalUsers) * 100)}% del
								total
							</p>
						</div>
						<div className="p-3 bg-green-50 rounded-lg">
							<Activity className="h-6 w-6 text-green-600" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">CONSULTAS TOTALES</p>
							<p className="text-2xl font-bold text-gray-900">
								{stats.totalConsultations}
							</p>
							<p className="text-sm text-purple-600">+12% vs mes anterior</p>
						</div>
						<div className="p-3 bg-purple-50 rounded-lg">
							<Calendar className="h-6 w-6 text-purple-600" />
						</div>
					</div>
				</div>

				<div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">
								CALIFICACIÓN PROMEDIO
							</p>
							<p className="text-2xl font-bold text-gray-900">{stats.avgRating}</p>
							<p className="text-sm text-orange-600">+0.2 este mes</p>
						</div>
						<div className="p-3 bg-orange-50 rounded-lg">
							<Star className="h-6 w-6 text-orange-600" />
						</div>
					</div>
				</div>
			</div>

			{/* Filters and Search */}
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
				<div className="p-6">
					<div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
						<div className="flex flex-1 items-center gap-4">
							<div className="relative flex-1 max-w-md">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
								<input
									type="text"
									placeholder="Buscar usuarios..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>

							<select
								value={filterGender}
								onChange={(e) => setFilterGender(e.target.value)}
								className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							>
								<option>Todos los géneros</option>
								<option>Masculino</option>
								<option>Femenino</option>
							</select>

							<select
								value={filterStatus}
								onChange={(e) => setFilterStatus(e.target.value)}
								className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							>
								<option>Todos los estados</option>
								<option>Activo</option>
								<option>Inactivo</option>
							</select>
						</div>

						<button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
							<UserPlus className="h-4 w-4" />
							Nuevo Usuario
						</button>
					</div>
				</div>
			</div>

			{/*  Tabla usuarios */}
			<div className="bg-white rounded-lg shadow-sm border border-gray-200">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className="bg-gray-50 border-b border-gray-200">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									USUARIO
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									CONTACTO
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									EDAD/GÉNERO
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									CONSULTAS
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									CALIFICACIÓN
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									ÚLTIMA CONSULTA
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									ESTADO
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									ACCIONES
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{filteredUsers.map((user) => (
								<tr key={user.id} className="hover:bg-gray-50">
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center">
											<div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
												{user.name
													.split(" ")
													.map((n) => n[0])
													.join("")}
											</div>
											<div className="ml-4">
												<div className="text-sm font-medium text-gray-900">
													{user.name}
												</div>
												<div className="text-sm text-gray-500">
													Miembro desde{" "}
													{dayjs(user.joinDate).format("DD/MM/YYYY")}
												</div>
											</div>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-900">{user.email}</div>
										<div className="text-sm text-gray-500">{user.phone}</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-900">{user.age} años</div>
										<div className="text-sm text-gray-500">{user.gender}</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center">
											<Calendar className="h-4 w-4 text-gray-400 mr-1" />
											<span className="text-sm font-medium text-gray-900">
												{user.consultations}
											</span>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center gap-1">
											{getRatingStars(user.rating)}
											<span className="text-sm font-medium text-gray-900 ml-1">
												{user.rating}
											</span>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-900">
											{new Date(user.joinDate).toLocaleDateString()}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<button
											onClick={() => toggleStatus(user.id, user.status)}
											className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full transition-colors duration-200 ${getStatusColor(
												user.status
											)} hover:opacity-80`}
											title="Cambiar estado"
										>
											{user.status}
										</button>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
										<div className="flex items-center gap-2">
											<button
												className="text-blue-600 hover:text-blue-900"
												onClick={() => handleView(user.id)}
											>
												<Eye className="h-4 w-4" />
											</button>
											<button
												className="text-green-600 hover:text-green-900"
												onClick={() => handleEdit(user.id)}
											>
												<Edit className="h-4 w-4" />
											</button>
											<button
												className="text-red-600 hover:text-red-900"
												onClick={() => handleDelete(user.id)}
											>
												<Trash2 className="h-4 w-4" />
											</button>
											<button className="text-gray-600 hover:text-gray-900">
												<MoreVertical className="h-4 w-4" />
											</button>
										</div>
									</td>
								</tr>
							))}
							{filteredUsers.length === 0 && (
								<tr>
									<td colSpan={8} className="px-6 py-4 text-center text-gray-500">
										No se encontraron usuarios.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
			{modalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white p-6 rounded-lg w-full max-w-md">
						<h2 className="text-xl font-semibold mb-4">
							{modalType === "ver" ? "Ver Paciente" : "Editar Paciente"}
						</h2>
						<div className="space-y-4">
							<input
								type="text"
								placeholder="Nombre"
								value={formData.firstname}
								disabled={modalType === "ver"}
								onChange={(e) =>
									setFormData({ ...formData, firstname: e.target.value })
								}
								className="w-full border px-3 py-2 rounded-lg"
							/>
							<input
								type="text"
								placeholder="Apellido"
								value={formData.lastname}
								disabled={modalType === "ver"}
								onChange={(e) =>
									setFormData({ ...formData, lastname: e.target.value })
								}
								className="w-full border px-3 py-2 rounded-lg"
							/>
							<input
								type="email"
								placeholder="Email"
								value={formData.email}
								disabled={modalType === "ver"}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
								className="w-full border px-3 py-2 rounded-lg"
							/>
							<input
								type="text"
								placeholder="Teléfono"
								value={formData.phone}
								disabled={modalType === "ver"}
								onChange={(e) =>
									setFormData({ ...formData, phone: e.target.value })
								}
								className="w-full border px-3 py-2 rounded-lg"
							/>
							<input
								type="number"
								placeholder="Edad"
								value={formData.age}
								disabled={modalType === "ver"}
								onChange={(e) => setFormData({ ...formData, age: e.target.value })}
								className="w-full border px-3 py-2 rounded-lg"
							/>
							<select
								value={formData.gender}
								disabled={modalType === "ver"}
								onChange={(e) =>
									setFormData({ ...formData, gender: e.target.value })
								}
								className="w-full border px-3 py-2 rounded-lg"
							>
								<option value="">Seleccionar género</option>
								<option value="Masculino">Masculino</option>
								<option value="Femenino">Femenino</option>
							</select>
							<select
								value={formData.status}
								disabled={modalType === "ver"}
								onChange={(e) =>
									setFormData({ ...formData, status: e.target.value })
								}
								className="w-full border px-3 py-2 rounded-lg"
							>
								<option value="Activo">Activo</option>
								<option value="Inactivo">Inactivo</option>
							</select>
						</div>
						<div className="mt-6 flex justify-end space-x-3">
							<button
								onClick={() => setModalOpen(false)}
								className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
							>
								Cerrar
							</button>
							{modalType === "editar" && (
								<button
									onClick={handleSubmit}
									className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
								>
									Guardar
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserSection;
