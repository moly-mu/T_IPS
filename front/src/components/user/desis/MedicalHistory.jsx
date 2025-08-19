import React, { useState, useEffect } from 'react';
import { useUserService } from '../../../services/userService';
import { useAuth } from '../../../context/AuthContext';

const MedicalHistory = () => {
  const { token } = useAuth();
  const userService = useUserService();
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("🔄 Cargando historial médico...");
        
        const response = await userService.getMedicalHistory();
        console.log("✅ Historial médico obtenido:", response);
        
        setMedicalHistory(response.medicalHistory || []);
      } catch (error) {
        console.error("❌ Error al obtener historial médico:", error);
        setError(`Error al cargar el historial médico: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalHistory();
  }, [token, userService]);

  if (!token) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Debes iniciar sesión para ver tu historial médico</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Cargando historial médico...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Historial Médico</h1>
      
      {medicalHistory.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">No tienes consultas médicas registradas.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {medicalHistory.map((consultation, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 border">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Consulta #{consultation.id || index + 1}
                </h3>
                <span className="text-sm text-gray-500">
                  {consultation.date ? new Date(consultation.date).toLocaleDateString('es-ES') : 'Fecha no disponible'}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Información de la Consulta</h4>
                  <p><span className="font-medium">Especialista:</span> {consultation.specialist || 'No especificado'}</p>
                  <p><span className="font-medium">Especialidad:</span> {consultation.specialty || 'No especificado'}</p>
                  <p><span className="font-medium">Motivo:</span> {consultation.reason || 'No especificado'}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Diagnóstico y Tratamiento</h4>
                  <p><span className="font-medium">Diagnóstico:</span> {consultation.diagnosis || 'No especificado'}</p>
                  <p><span className="font-medium">Tratamiento:</span> {consultation.treatment || 'No especificado'}</p>
                  <p><span className="font-medium">Observaciones:</span> {consultation.notes || 'Ninguna'}</p>
                </div>
              </div>
              
              {consultation.prescriptions && consultation.prescriptions.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700 mb-2">Medicamentos Recetados</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {consultation.prescriptions.map((prescription, idx) => (
                      <li key={idx} className="text-sm text-gray-600">
                        {prescription.medication} - {prescription.dosage} - {prescription.frequency}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalHistory;
