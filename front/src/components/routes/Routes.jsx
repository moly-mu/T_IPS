
import { Route, Routes } from "react-router-dom";
import Phome from "../homepage/Phome";
import Pins from "../company/Pins";
import Sinsesion from "../user/desis/Sinsesion";
import Sregistro from "../user/desis/Sregistro";
import PinSesion from "../company/Pinsesion";
import Pregistro from "../company/Pregistro";
import Tinsesion from "../admin/Tinsesion";
import Pin from "../admin/Pin";
import Pperfil from "../user/desis/Pperfil";
import Cards from "../user/desis/Cards";
import Noti from "../user/desis/Noti";
import Ofertas from "../user/desis/Ofertas";
import Ajustes from "../user/desis/Ajustes";
import FAQSection from "../extrahome/FAQSection";
import UserSection from "../admin/user/UserSection";
import SpecialistsSection from "../admin/specialist/SpecialistsSection";
import ServicesSection from "../homepage/sections/ServicesSection";
import Calendar from "../user/desis/Calendar";
import ScheduledDays from "../user/desis/ScheduledDays";
import DoctorProfile from "../company/DoctorProfile";
import DoctorProfileAfterLogin from "../company/DoctorProfileAfterLogin";
import MedicalCalendar from "../company/MedicalCalendar";
import DoctorSearchPage from "../company/DoctorSearchPage";
import PatientDashboard from "../company/PatientDashboard ";
import MedicalPaymentSystem from "../company/paymentService/MedicalPaymentSystem";
import MedicalProfilesSection from "../homepage/sections/MedicalProfilesSection";
import SymptomQuestionnaire from "../company/AssistanceConsultation/SymptomQuestionnaire ";
import MedicalAppointmentSection from "../company/AssistanceConsultation/MedicalAppointmentSection";


const AppRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Inicio */}
        <Route path="/" element={<Phome />} />
        <Route path="/Sins" element={<Sinsesion />} />
        <Route path="/Sreg" element={<Sregistro />} />
        <Route path="/PrePerfiles" element={<MedicalProfilesSection />} />

        {/* medico */}
        <Route path="/pagusuario" element={<Pperfil />} />
        <Route path="/card" element={<Cards/>} />
        <Route path="/not" element={<Noti />} />
        <Route path="/oft" element={<Ofertas />} />
        <Route path="/ajus" element={<Ajustes />} />
        <Route path="/calendar" element={<Calendar/>} />
        <Route path="/listopc" element={<ScheduledDays/>} />

        
        {/* usuario*/}
        <Route path="/Pins" element={<PinSesion />} />
        <Route path="/Preg" element={<Pregistro />} />
        <Route path="/pagempresa" element={<Pins />} />
        <Route path="/perfilPaciente" element={<PatientDashboard/>} />
        <Route path="/perfilDoctor" element={<DoctorProfile/>} />
        <Route path="/perfilDoctorDes" element={<DoctorProfileAfterLogin/>} />
        <Route path="/calendarQuotes" element={<MedicalCalendar/>} />
        <Route path="/buscarMedico" element={<DoctorSearchPage/>} />
        <Route path="/pago" element={<MedicalPaymentSystem/>} />
        <Route path="/DiagnosticoPrevio" element={<SymptomQuestionnaire/>} />
        <Route path="/AsistirAConsulta" element={<MedicalAppointmentSection/>} />


        {/* Administrador*/}
        <Route path="/Tins" element={<Tinsesion/>} />
        <Route path="/pagadmin" element={<Pin />} />
        <Route path="/userD" element={<UserSection />} />
        <Route path="/specialistD" element={<SpecialistsSection/>} />
        <Route path="/serviceD" element={<ServicesSection/>} />

        {/* Extrahome*/}
        <Route path="/quans" element={<FAQSection/>} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
