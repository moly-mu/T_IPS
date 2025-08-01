import { useState, useEffect } from "react";
import {
  Star,
  Search,
  User,
  Calendar,
  CheckCircle,
  XCircle,
  Eye,
  Filter,
  Phone,
  FileText,
  Download,
} from "lucide-react";

const API_BASE = "http://localhost:3000/admin/profesional";

// Helper functions
const getStatusColor = (status) => {
  switch (status) {
    case "Pendiente":
      return "text-yellow-600 bg-yellow-50";
    case "Activo":
      return "text-green-600 bg-green-50";
    case "Inactivo":
      return "text-red-600 bg-red-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "Pendiente":
      return "Pendiente";
    case "Activo":
      return "Aprobado";
    case "Inactivo":
      return "Rechazado";
    default:
      return "Sin estado";
  }
};

const formatTime = (dateString) => {
  if (!dateString) return "No definido";
  try {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return "No definido", error.message;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "No definido";
  try {
    return new Date(dateString).toLocaleDateString();
  } catch (error) {
    return "No definido", error.message;
  }
};

const SpecialistsSection = () => {
  const [specialists, setSpecialists] = useState([]);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [selectedSpecialistDetail, setSelectedSpecialistDetail] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_BASE);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        const formattedData = data.map((specialist) => ({
          id: specialist.id,
          userId: specialist.userId,
          name: specialist.name,
          email: specialist.email,
          specialties: specialist.specialties || [],
          biography: specialist.biography || "Sin biografía disponible",
          experience: specialist.experience || "No especificado",
          consultations: specialist.consultations || 0,
          rating: specialist.rating || 0,
          status: specialist.status,
          schedule: {
            start: formatTime(specialist.schedule?.start),
            end: formatTime(specialist.schedule?.end),
          },
          lastAppointment: specialist.lastAppointment,
          joinDate: formatDate(specialist.joinDate),
        }));

        setSpecialists(formattedData);
      } catch (err) {
        console.error("Error fetching specialists:", err);
        setError(`Error al cargar los especialistas: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpecialists();
  }, []);

  const fetchSpecialistDetail = async (id) => {
    try {
      setIsLoadingDetail(true);
      const response = await fetch(`${API_BASE}/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      const formattedDetail = {
        id: data.id,
        userId: data.userId,
        name: data.name,
        email: data.email,
        document: data.document,
        phone: data.phone,
        status: data.status,
        rating: data.rating || 0,
        biography: data.professionalData?.biography || "Sin biografía disponible",
        experience: data.professionalData?.experience || "No especificado",
        consultations: data.professionalData?.consultations || 0,
        schedule: {
          start: formatTime(data.professionalData?.schedule?.start),
          end: formatTime(data.professionalData?.schedule?.end),
        },
        certificates: {
          cv: data.professionalData?.certificates?.cv,
          degrees: data.professionalData?.certificates?.degrees,
          educational: data.professionalData?.certificates?.educationalCertificates,
        },
        specialties: data.specialties || [],
        lastAppointments: data.lastAppointments || [],
        recentMedicalOrders: data.recentMedicalOrders || [],
      };
      
      setSelectedSpecialistDetail(formattedDetail);
    } catch (err) {
      console.error("Error fetching specialist detail:", err);
      setError(`Error al cargar el detalle del especialista: ${err.message}`);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE}/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSpecialists((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
      );

      if (selectedSpecialistDetail?.id === id) {
        setSelectedSpecialistDetail((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error("Error updating status:", err);
      setError(`Error al actualizar el estado: ${err.message}`);
    }
  };

  const handleApprove = (id) => handleUpdateStatus(id, "Activo");
  const handleReject = (id) => handleUpdateStatus(id, "Inactivo");

  const handleViewDetail = async (specialist) => {
    setSelectedSpecialist(specialist);
    await fetchSpecialistDetail(specialist.id);
  };

  const filteredSpecialists = specialists.filter((s) => {
    const matchesStatus = filterStatus === "all" || s.status === filterStatus;
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.specialties.some((sp) =>
        sp.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesStatus && matchesSearch;
  });

  const downloadCertificate = (base64Data, filename) => {
    if (!base64Data) return;
    
    try {
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${base64Data}`;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading certificate:', error);
    }
  };

  if (isLoading)
    return <div className="p-6 text-center">Cargando especialistas...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header and Stats */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Especialistas</h1>
        <p className="text-gray-600">
          Administra los especialistas registrados en la plataforma
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Pendiente", "Activo", "Inactivo"].map((status) => (
          <div
            key={status}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {getStatusText(status)}
                </p>
                <p
                  className={`text-2xl font-bold ${
                    status === "Pendiente"
                      ? "text-yellow-600"
                      : status === "Activo"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {
                    specialists.filter((s) => s.status === status)
                      .length
                  }
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  status === "Pendiente"
                    ? "bg-yellow-100"
                    : status === "Activo"
                    ? "bg-green-100"
                    : "bg-red-100"
                }`}
              >
                {status === "Pendiente" ? (
                  <Calendar className="w-6 h-6 text-yellow-600" />
                ) : status === "Activo" ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar por nombre o especialidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtrar:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1 border rounded-md text-sm"
            >
              <option value="all">Todos</option>
              <option value="Pendiente">Pendientes</option>
              <option value="Activo">Aprobados</option>
              <option value="Inactivo">Rechazados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Specialists List */}
      <div className="grid gap-6">
        {filteredSpecialists.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No se encontraron especialistas con los filtros aplicados
          </div>
        ) : (
          filteredSpecialists.map((specialist) => (
            <div
              key={specialist.id}
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                  <div className="flex items-start gap-4 w-full">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                      <User className="w-full h-full p-3 text-gray-400" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {specialist.name}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            specialist.status
                          )}`}
                        >
                          {getStatusText(specialist.status)}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>
                            {specialist.rating} ({specialist.rating > 0 ? ((specialist.rating / 5) * 100).toFixed(0) : 0}%)
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{specialist.experience}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{specialist.consultations} consultas</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Especialidades:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {specialist.specialties.map((spec) => (
                              <span
                                key={spec.id}
                                className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs"
                              >
                                {spec.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-gray-500">Horario:</span>
                          <p className="text-gray-900 font-medium">
                            {specialist.schedule.start} -{" "}
                            {specialist.schedule.end}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-end gap-2 w-full md:w-auto">
                    <button
                      onClick={() => handleViewDetail(specialist)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Ver perfil completo"
                    >
                      <Eye className="w-5 h-5" />
                    </button>

                    {specialist.status === "Pendiente" && (
                      <>
                        <button
                          onClick={() => handleApprove(specialist.id)}
                          className="flex items-center gap-1 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Aprobar
                        </button>
                        <button
                          onClick={() => handleReject(specialist.id)}
                          className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                        >
                          <XCircle className="w-4 h-4" />
                          Rechazar
                        </button>
                      </>
                    )}
                    
                    {specialist.status === "Activo" && (
                      <button
                        onClick={() => handleReject(specialist.id)}
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                      >
                        <XCircle className="w-4 h-4" />
                        Rechazar
                      </button>
                    )}
                    
                    {specialist.status === "Inactivo" && (
                      <button
                        onClick={() => handleApprove(specialist.id)}
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Aceptar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Specialist Detail Modal */}
      {selectedSpecialist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Perfil Completo
                </h2>
                <button
                  onClick={() => {
                    setSelectedSpecialist(null);
                    setSelectedSpecialistDetail(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {isLoadingDetail ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Cargando detalles...</p>
                </div>
              ) : selectedSpecialistDetail ? (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                      <User className="w-full h-full p-6 text-gray-400" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {selectedSpecialistDetail.name}
                      </h3>
                      <p className="text-gray-500">{selectedSpecialistDetail.email}</p>
                      
                      {selectedSpecialistDetail.phone && (
                        <div className="flex items-center gap-1 mt-1">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{selectedSpecialistDetail.phone}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-3 mt-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            selectedSpecialistDetail.status
                          )}`}
                        >
                          {getStatusText(selectedSpecialistDetail.status)}
                        </span>

                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{selectedSpecialistDetail.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200"></div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Professional Info */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Experiencia
                        </h4>
                        <p className="text-gray-700">
                          {selectedSpecialistDetail.experience}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Biografía
                        </h4>
                        <p className="text-gray-700 whitespace-pre-line">
                          {selectedSpecialistDetail.biography}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Horario de Trabajo
                        </h4>
                        <p className="text-gray-700">
                          {selectedSpecialistDetail.schedule.start} -{" "}
                          {selectedSpecialistDetail.schedule.end}
                        </p>
                      </div>

                      {selectedSpecialistDetail.document && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Documento
                          </h4>
                          <p className="text-gray-700">
                            {selectedSpecialistDetail.document}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Specialties and Stats */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Especialidades
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedSpecialistDetail.specialties.map((spec) => (
                            <div
                              key={spec.id}
                              className="bg-blue-50 px-3 py-2 rounded-lg"
                            >
                              <p className="font-medium text-blue-700">
                                {spec.name}
                              </p>
                              <p className="text-xs text-blue-600">
                                ${spec.price?.toLocaleString()} - {spec.duration} mins
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            Consultas
                          </h4>
                          <p className="text-2xl font-bold text-green-600">
                            {selectedSpecialistDetail.consultations}
                          </p>
                        </div>

                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            Usuario ID
                          </h4>
                          <p className="text-lg font-medium text-yellow-600">
                            {selectedSpecialistDetail.userId}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Certificates Section */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Certificaciones
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedSpecialistDetail.certificates.cv && (
                        <div className="bg-white p-3 rounded-lg border">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <h5 className="font-medium text-gray-700">CV</h5>
                          </div>
                          <button
                            onClick={() => downloadCertificate(
                              selectedSpecialistDetail.certificates.cv,
                              `CV_${selectedSpecialistDetail.name.replace(/\s+/g, "_")}.pdf`
                            )}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                          >
                            <Download className="w-4 h-4" />
                            Descargar
                          </button>
                        </div>
                      )}

                      {selectedSpecialistDetail.certificates.degrees && (
                        <div className="bg-white p-3 rounded-lg border">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-5 h-5 text-green-600" />
                            <h5 className="font-medium text-gray-700">Títulos</h5>
                          </div>
                          <button
                            onClick={() => downloadCertificate(
                              selectedSpecialistDetail.certificates.degrees,
                              `Titulos_${selectedSpecialistDetail.name.replace(/\s+/g, "_")}.pdf`
                            )}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                          >
                            <Download className="w-4 h-4" />
                            Descargar
                          </button>
                        </div>
                      )}

                      {selectedSpecialistDetail.certificates.educational && (
                        <div className="bg-white p-3 rounded-lg border">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-5 h-5 text-purple-600" />
                            <h5 className="font-medium text-gray-700">Certificados</h5>
                          </div>
                          <button
                            onClick={() => downloadCertificate(
                              selectedSpecialistDetail.certificates.educational,
                              `Certificados_${selectedSpecialistDetail.name.replace(/\s+/g, "_")}.pdf`
                            )}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                          >
                            <Download className="w-4 h-4" />
                            Descargar
                          </button>
                        </div>
                      )}
                    </div>

                    {!selectedSpecialistDetail.certificates.cv && 
                     !selectedSpecialistDetail.certificates.degrees && 
                     !selectedSpecialistDetail.certificates.educational && (
                      <p className="text-gray-500 text-center py-4">
                        No hay certificaciones disponibles
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {selectedSpecialistDetail.status === "Pendiente" && (
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
                      <button
                        onClick={() => {
                          handleApprove(selectedSpecialistDetail.id);
                          setSelectedSpecialist(null);
                          setSelectedSpecialistDetail(null);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Aprobar Especialista
                      </button>
                      <button
                        onClick={() => {
                          handleReject(selectedSpecialistDetail.id);
                          setSelectedSpecialist(null);
                          setSelectedSpecialistDetail(null);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <XCircle className="w-5 h-5" />
                        Rechazar Solicitud
                      </button>
                    </div>
                  )}

                  {selectedSpecialistDetail.status === "Activo" && (
                    <div className="flex justify-center pt-4 border-t">
                      <button
                        onClick={() => {
                          handleReject(selectedSpecialistDetail.id);
                          setSelectedSpecialist(null);
                          setSelectedSpecialistDetail(null);
                        }}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <XCircle className="w-5 h-5" />
                        Rechazar Especialista
                      </button>
                    </div>
                  )}

                  {selectedSpecialistDetail.status === "Inactivo" && (
                    <div className="flex justify-center pt-4 border-t">
                      <button
                        onClick={() => {
                          handleApprove(selectedSpecialistDetail.id);
                          setSelectedSpecialist(null);
                          setSelectedSpecialistDetail(null);
                        }}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Aceptar Especialista
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-red-500">
                  Error al cargar los detalles del especialista
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialistsSection;