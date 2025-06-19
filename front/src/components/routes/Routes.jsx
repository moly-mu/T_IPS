
import { Route, Routes } from "react-router-dom";
import Phome from "src/components/homepage/Phome";
import Pins from "src/components/company/Pins";
import Sinsesion from "src/components/user/desis/Sinsesion";
import Sregistro from "src/components/user/desis/Sregistro";
import PinSesion from "src/components/company/Pinsesion";
import Pregistro from "src/components/company/Pregistro";
import Tinsesion from "src/components/admin/Tinsesion";
import Pin from "src/components/admin/Pin";
import Pperfil from "src/components/user/desis/Pperfil";
import Cards from "src/components/user/desis/Cards";
import Noti from "src/components/user/desis/Noti";
import Ofertas from "src/components/user/desis/Ofertas";
import Ajustes from "src/components/user/desis/Ajustes";
import FAQSection from "src/components/extrahome/FAQSection";
import UserSection from "src/components/admin/user/UserSection";
import SpecialistsSection from "src/components/admin/specialist/SpecialistsSection";
import ServicesSection from "src/components/homepage/sections/ServicesSection";
import Calendar from "src/components/user/desis/Calendar";
import ScheduledDays from "src/components/user/desis/ScheduledDays";


const AppRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Inicio */}
        <Route path="/" element={<Phome />} />
        <Route path="/Sins" element={<Sinsesion />} />
        <Route path="/Sreg" element={<Sregistro />} />

        {/* Usuario */}
        <Route path="/pagusuario" element={<Pperfil />} />
        <Route path="/card" element={<Cards/>} />
        <Route path="/not" element={<Noti />} />
        <Route path="/oft" element={<Ofertas />} />
        <Route path="/ajus" element={<Ajustes />} />
        <Route path="/calendar" element={<Calendar/>} />
        <Route path="/listopc" element={<ScheduledDays/>} />

        
        {/* Empresa*/}
        <Route path="/Pins" element={<PinSesion />} />
        <Route path="/Preg" element={<Pregistro />} />
        <Route path="/pagempresa" element={<Pins />} />


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
