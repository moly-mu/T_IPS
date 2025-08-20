import { useState, useEffect, useContext } from 'react';
import { Star, CheckCircle, AlertCircle } from 'lucide-react';
import { AuthContext } from '../../../context/AuthContext';
import axios from '../../../api/axios';

const PatientSurveys = () => {
  const [formData, setFormData] = useState({}); // Estado para manejar rating y comment por encuesta
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [encuestas, setEncuestas] = useState([]);
  const [loadingEncuestas, setLoadingEncuestas] = useState(true);
  const { token } = useContext(AuthContext);

  // Funciones para manejar el estado individual de cada encuesta
  const setRatingForEncuesta = (encuestaId, rating) => {
    setFormData(prev => ({
      ...prev,
      [encuestaId]: {
        ...prev[encuestaId],
        rating: rating
      }
    }));
  };

  const setCommentForEncuesta = (encuestaId, comment) => {
    setFormData(prev => ({
      ...prev,
      [encuestaId]: {
        ...prev[encuestaId],
        comment: comment
      }
    }));
  };

  const getRatingForEncuesta = (encuestaId) => {
    return formData[encuestaId]?.rating || 0;
  };

  const getCommentForEncuesta = (encuestaId) => {
    return formData[encuestaId]?.comment || '';
  };

  // Función para obtener las reseñas existentes del usuario
  const fetchUserReviews = async () => {
    try {
      const response = await axios.get('/api/User/Reviews');
      console.log('Reseñas existentes:', response.data);
      return response.data.reviews || [];
    } catch (error) {
      console.error('Error al obtener reseñas:', error);
      return [];
    }
  };

  // Función para obtener las citas completadas (encuestas pendientes)
  const fetchCompletedAppointments = async () => {
    try {
      setLoadingEncuestas(true);
      setSubmitMessage('');
      
      // Obtener citas y reseñas en paralelo
      const [appointmentsResponse, existingReviews] = await Promise.all([
        axios.get('/api/User/appointments'),
        fetchUserReviews()
      ]);
      
      console.log('Respuesta completa:', appointmentsResponse.data);
      console.log('Reseñas existentes:', existingReviews);
      
      if (appointmentsResponse.data && appointmentsResponse.data.appointments) {
        console.log('Citas encontradas:', appointmentsResponse.data.appointments);
        
        // Filtrar solo las citas completadas
        const completedAppointments = appointmentsResponse.data.appointments
          .filter(appointment => {
            console.log('Estado de la cita:', appointment.estado);
            return appointment.estado === 'completada' || 
                   appointment.estado === 'Completada' || 
                   appointment.estado === 'COMPLETADA';
          })
          .map(appointment => {
            // Buscar si ya existe una reseña para esta cita
            const existingReview = existingReviews.find(review => 
              review.appointmentId === appointment.id
            );
            
            return {
              id: appointment.id,
              doctor: appointment.doctor,
              fecha: new Date(appointment.fecha).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              }).toUpperCase(),
              completada: !!existingReview, // true si ya tiene reseña
              calificacion: existingReview?.rating || 0,
              comentario: existingReview?.comment || '',
              fechaReseña: existingReview?.createdAt || null,
              appointmentId: appointment.id,
              estadoOriginal: appointment.estado,
              reviewId: existingReview?.id || null
            };
          });
        
        console.log('Citas completadas con info de reseñas:', completedAppointments);
        setEncuestas(completedAppointments);
        
        if (completedAppointments.length === 0) {
          setSubmitMessage('No hay citas completadas disponibles.');
        }
      } else {
        setSubmitMessage('No se encontraron citas.');
      }
    } catch (error) {
      console.error('Error al obtener las citas:', error);
      setSubmitMessage(`Error al cargar las encuestas: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoadingEncuestas(false);
    }
  };

  // Cargar las encuestas cuando el componente se monta
  useEffect(() => {
    if (token) {
      fetchCompletedAppointments();
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmitSurvey = async (encuestaId) => {
    try {
      setLoading(true);
      setSubmitMessage('');

      // Encontrar la encuesta específica para obtener el appointmentId
      const encuesta = encuestas.find(e => e.id === encuestaId);
      
      if (!encuesta) {
        setSubmitMessage('Error: Encuesta no encontrada');
        return;
      }

      const currentRating = getRatingForEncuesta(encuestaId);
      const currentComment = getCommentForEncuesta(encuestaId);

      const reviewData = {
        appointmentId: encuesta.appointmentId,
        rating: currentRating,
        comment: currentComment || null
      };

      const response = await axios.post('/api/User/Reviews', reviewData);

      if (response.status === 201) {
        setSubmitMessage('¡Reseña enviada exitosamente!');
        
        // Actualizar la encuesta para mostrar la reseña completada
        setEncuestas(prevEncuestas => 
          prevEncuestas.map(enc => 
            enc.id === encuestaId 
              ? { 
                  ...enc, 
                  completada: true, 
                  calificacion: currentRating,
                  comentario: currentComment,
                  fechaReseña: new Date().toISOString(),
                  reviewId: response.data.review.id
                }
              : enc
          )
        );
        
        // Limpiar el formulario específico de esta encuesta
        setFormData(prev => {
          const newFormData = { ...prev };
          delete newFormData[encuestaId];
          return newFormData;
        });

        // Limpiar mensaje después de 3 segundos
        setTimeout(() => {
          setSubmitMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('Error al enviar la reseña:', error);
      if (error.response) {
        setSubmitMessage(`Error: ${error.response.data.error || 'No se pudo enviar la reseña'}`);
      } else {
        setSubmitMessage('Error de conexión. Inténtalo de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-2xl font-light text-gray-900 mb-8">Encuestas de Satisfacción</h2>

      {/* Mensaje de estado global */}
      {submitMessage && (
        <div className={`mb-6 p-4 rounded-lg ${
          submitMessage.includes('Error') 
            ? 'bg-red-50 text-red-700 border border-red-200' 
            : 'bg-green-50 text-green-700 border border-green-200'
        }`}>
          <div className="flex items-center">
            {submitMessage.includes('Error') ? (
              <AlertCircle className="w-5 h-5 mr-2" />
            ) : (
              <CheckCircle className="w-5 h-5 mr-2" />
            )}
            {submitMessage}
          </div>
        </div>
      )}

      {/* Estado de carga */}
      {loadingEncuestas ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">Cargando encuestas...</p>
        </div>
      ) : encuestas.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No hay encuestas pendientes.</p>
          <p className="text-sm">Las encuestas aparecerán después de completar una consulta.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {encuestas.map((encuesta) => (
            <div key={encuesta.id} className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-lg">{encuesta.doctor}</h3>
                  <p className="text-sm text-gray-500 font-medium">Consulta del {encuesta.fecha}</p>
                  {encuesta.estadoOriginal && (
                    <p className="text-xs text-blue-500">Estado: {encuesta.estadoOriginal}</p>
                  )}
                </div>
              <div className="flex items-center gap-2">
                {encuesta.estadoOriginal === "completada" ? (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <CheckCircle size={16} />
                    <span className="text-sm font-medium">Completada</span>
                  </div>
                ) : (
                  <span className="text-sm font-medium text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">{encuesta.estadoOriginal}</span>
                )}
              </div>
            </div>

            {encuesta.completada ? (
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-700">Tu reseña:</span>
                  <span className="text-xs text-gray-500">
                    {encuesta.fechaReseña && new Date(encuesta.fechaReseña).toLocaleDateString('es-ES')}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-medium text-gray-700">Calificación:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={star <= encuesta.calificacion ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({encuesta.calificacion}/5)</span>
                </div>
                
                {encuesta.comentario && (
                  <div className="mt-3">
                    <span className="text-sm font-medium text-gray-700">Comentario:</span>
                    <p className="mt-1 text-sm text-gray-600 bg-white p-3 rounded border">
                      &ldquo;{encuesta.comentario}&rdquo;
                    </p>
                  </div>
                )}
                
                <div className="mt-4 flex items-center gap-2 text-green-600">
                  <CheckCircle size={16} />
                  <span className="text-sm font-medium">Reseña completada</span>
                </div>
              </div>
            ) : (
              <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Califica tu experiencia:</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRatingForEncuesta(encuesta.id, star)}
                      className="transition-all hover:scale-110">
                      <Star
                        size={20}
                        className={star <= getRatingForEncuesta(encuesta.id) ? 'text-yellow-500 fill-current' : 'text-gray-300 hover:text-yellow-400'}
                      />
                    </button>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor={`comment-${encuesta.id}`} className="text-sm font-medium text-gray-700">
                    Comentarios adicionales (opcional):
                  </label>
                  <textarea
                    id={`comment-${encuesta.id}`}
                    value={getCommentForEncuesta(encuesta.id)}
                    onChange={(e) => setCommentForEncuesta(encuesta.id, e.target.value)}
                    placeholder="Comparte tu experiencia con la consulta..."
                    className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-sm"
                    rows={3}
                  />
                </div>
                
                <button
                  onClick={() => handleSubmitSurvey(encuesta.id)}
                  disabled={getRatingForEncuesta(encuesta.id) === 0 || loading}
                  className="bg-gray-900 text-white px-4 py-2 text-sm hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors rounded-lg">
                  {loading ? 'ENVIANDO...' : 'ENVIAR CALIFICACIÓN'}
                </button>
              </div>
            )}
          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default PatientSurveys;