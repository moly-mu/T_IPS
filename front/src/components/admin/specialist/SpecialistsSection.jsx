import { useState, useEffect } from "react";
import axios from "axios";
import {
  Star,
  User,
  Calendar,
  Award,
  CheckCircle,
  XCircle,
  Eye,
  Filter,
} from "lucide-react";

const API_BASE = "http://localhost:3000/admin/profesional";

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

const SpecialistsSection = () => {
  const [specialists, setSpecialists] = useState([]);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  function decodeByteObject(obj) {
    if (!obj || typeof obj !== "object") return null;
    try {
      const byteArray = Object.values(obj);
      return new TextDecoder().decode(new Uint8Array(byteArray));
    } catch (e) {
      console.error("Error decodificando objeto binario:", obj, e);
      return null;
    }
  }

  useEffect(() => {
    axios
      .get(API_BASE)
      .then((res) => {
        const formatted = res.data.map((item) => {
          const certifications = [
            decodeByteObject(item.prof_data?.educational_certificates),
            decodeByteObject(item.prof_data?.degrees),
          ].filter(Boolean); // si alguno es null

          return {
            id: item.id,
            name: `${item.User?.firstname || ""} ${item.User?.lastname || ""}`,
            specialty:
              item.ProfesionalHasSpecialty?.[0]?.Specialty?.name ||
              "Sin especialidad",
            experience: item.prof_data?.working_experience || "No registrada",
            rating: item.prof_data?.mppc || 0,
            education:
              decodeByteObject(item.prof_data?.degrees) || "No registrada",
            consultations: item.prof_data?.consultations || 0,
            certifications,
            status: item.User?.status || "Pendiente", // para que sea 'Pendiente' o 'Aprovado'
          };
        });

        setSpecialists(formatted);
        console.log("Especialistas formateados:", formatted);
      })
      .catch((err) => console.error("Error cargando especialistas:", err));
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/admin/profesional/${id}`, {
        status: newStatus,
      });

      // Actualiza el estado local
      setSpecialists((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
      );
    } catch (err) {
      console.error(`Error al actualizar estado a ${newStatus}:`, err);
    }
  };

  const handleApprove = (id) => handleUpdateStatus(id, "Activo");
  const handleReject = (id) => handleUpdateStatus(id, "Inactivo");

  const filteredSpecialists = specialists.filter((s) =>
    filterStatus === "all" ? true : s.status === filterStatus
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Solicitudes de Especialistas
        </h1>
        <p className="text-gray-600">
          Revisa y gestiona las solicitudes de registro de especialistas
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            Filtrar por estado:
          </span>
          {["all", "Pendiente", "Activo", "Inactivo"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                filterStatus === status
                  ? {
                      all: "bg-blue-100 text-blue-700",
                      Pendiente: "bg-yellow-100 text-yellow-700",
                      Activo: "bg-green-100 text-green-700",
                      Inactivo: "bg-red-100 text-red-700",
                    }[status]
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {getStatusText(status)}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de especialistas */}
      <div className="grid gap-6">
        {filteredSpecialists.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {s.name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          s.status
                        )}`}
                      >
                        {getStatusText(s.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="font-medium text-green-600">
                        {s.specialty}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {s.experience}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {s.rating}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Educación:</span>
                        <p className="text-gray-900 font-medium">
                          {s.education}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">
                          Consultas realizadas:
                        </span>
                        <p className="text-gray-900 font-medium">
                          {s.consultations}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-500">Certificaciones:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {Array.isArray(s.certifications) &&
                            s.certifications.map((c, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs"
                              >
                                <Award className="w-3 h-3 inline mr-1" />
                                {c}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedSpecialist(s)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Ver perfil completo"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleApprove(s.id)}
                    className="flex items-center px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Aprobar
                  </button>
                  <button
                    onClick={() => handleReject(s.id)}
                    className="flex items-center px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                  >
                    <XCircle className="w-4 h-4" />
                    Rechazar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedSpecialist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Perfil Completo
                </h2>
                <button
                  onClick={() => setSelectedSpecialist(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {selectedSpecialist && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {selectedSpecialist.name}
                      </h3>
                      <p className="text-green-600 font-medium">
                        {selectedSpecialist.specialty}
                      </p>
                      <p className="text-gray-500">
                        {selectedSpecialist.experience}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Información Académica
                      </h4>
                      <p className="text-gray-700">
                        Universidad: {selectedSpecialist.education}
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Calificación
                      </h4>
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-2xl font-bold text-gray-900">
                          {selectedSpecialist.rating}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Consultas
                      </h4>
                      <p className="text-2xl font-bold text-green-600">
                        {selectedSpecialist.consultations}
                      </p>
                    </div>

                    <div className="col-span-2 p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Certificaciones
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(selectedSpecialist.certifications)
                          ? selectedSpecialist.certifications.map(
                              (cert, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md text-sm"
                                >
                                  {cert}
                                </span>
                              )
                            )
                          : null}
                      </div>
                    </div>
                  </div>

                  {selectedSpecialist.status === "Pendiente" && (
                    <div className="flex gap-4 pt-4 border-t">
                      <button
                        onClick={() => {
                          handleApprove(selectedSpecialist.id);
                          setSelectedSpecialist(null);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Aprobar Especialista
                      </button>
                      <button
                        onClick={() => {
                          handleReject(selectedSpecialist.id);
                          setSelectedSpecialist(null);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <XCircle className="w-5 h-5" />
                        Rechazar Solicitud
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Solicitudes Pendientes
              </p>
              <p className="text-2xl font-bold text-yellow-600">
                {specialists.filter((s) => s.status === "Pendiente").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Especialistas Aprobados
              </p>
              <p className="text-2xl font-bold text-green-600">
                {specialists.filter((s) => s.status === "Activo").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Especialistas
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {specialists.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialistsSection;
