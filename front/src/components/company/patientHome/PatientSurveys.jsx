import { useState } from 'react';
import { Star, CheckCircle } from 'lucide-react';

const PatientSurveys = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState('');

  const [encuestas, setEncuestas] = useState([
    {
      id: 1,
      doctor: 'Dr. Carlos Rodríguez',
      fecha: '15 DIC 2024',
      completada: false,
      calificacion: 0
    },
    {
      id: 2,
      doctor: 'Dra. Ana Martínez',
      fecha: '20 NOV 2024',
      completada: true,
      calificacion: 5
    }
  ]);

  const handleSubmitSurvey = (encuestaId) => {
    console.log(`Encuesta ${encuestaId} enviada con calificación: ${selectedRating}${comment ? ` y comentario: ${comment}` : ''}`);
    
    // Actualizar el estado de la encuesta
    setEncuestas(prevEncuestas => 
      prevEncuestas.map(encuesta => 
        encuesta.id === encuestaId 
          ? { ...encuesta, completada: true, calificacion: selectedRating }
          : encuesta
      )
    );
    
    // Limpia el formulario
    setSelectedRating(0);
    setComment('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-2xl font-light text-gray-900 mb-8">Encuestas de Satisfacción</h2>

      <div className="space-y-6">
        {encuestas.map((encuesta) => (
          <div key={encuesta.id} className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-lg">{encuesta.doctor}</h3>
                <p className="text-sm text-gray-500 font-medium">Consulta del {encuesta.fecha}</p>
              </div>
              <div className="flex items-center gap-2">
                {encuesta.completada ? (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <CheckCircle size={16} />
                    <span className="text-sm font-medium">Completada</span>
                  </div>
                ) : (
                  <span className="text-sm font-medium text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">Pendiente</span>
                )}
              </div>
            </div>

            {encuesta.completada ? (
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
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
              </div>
            ) : (
              <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Califica tu experiencia:</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setSelectedRating(star)}
                      className="transition-all hover:scale-110">
                      <Star
                        size={20}
                        className={star <= selectedRating ? 'text-yellow-500 fill-current' : 'text-gray-300 hover:text-yellow-400'}
                      />
                    </button>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="comment" className="text-sm font-medium text-gray-700">
                    Comentarios adicionales (opcional):
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Comparte tu experiencia con la consulta..."
                    className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-sm"
                    rows={3}
                  />
                </div>
                
                <button
                  onClick={() => handleSubmitSurvey(encuesta.id)}
                  disabled={selectedRating === 0}
                  className="bg-gray-900 text-white px-4 py-2 text-sm hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors rounded-lg">
                  ENVIAR CALIFICACIÓN
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientSurveys;