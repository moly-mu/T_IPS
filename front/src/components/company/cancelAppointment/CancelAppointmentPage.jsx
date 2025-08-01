import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CancelAppointmentM from './CancelAppointmentM';

const CancelAppointmentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen] = useState(true);

  // Datos de ejemplo para la cita (en una app real esto vendría de props o estado global)
  const appointment = location.state?.appointment || {
    id: 1,
    fecha: '2024-08-15',
    hora: '10:00',
    doctor: 'Dr. García',
    especialidad: 'Cardiología'
  };

  const handleClose = () => {
    navigate(-1); // Regresa a la página anterior
  };

  const handleCancel = (appointmentId, reason, details) => {
    console.log('Cita cancelada:', { appointmentId, reason, details });
    // Aquí harías la llamada al backend para cancelar la cita
    navigate('/perfilPaciente'); // Redirige al perfil del paciente
  };

  return (
    <CancelAppointmentM
      isOpen={isOpen}
      onClose={handleClose}
      appointment={appointment}
      onCancel={handleCancel}
    />
  );
};

export default CancelAppointmentPage;
