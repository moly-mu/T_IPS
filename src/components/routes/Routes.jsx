
import { Route, Routes } from "react-router-dom";
import Phome from "../homepage/Phome";
import PerfilEmpresa from "../company/PerfilEmpresa";
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
import Stablas from "../admin/Stablas";
import Tofertas from "../admin/Tofertas";
import Pago from "../user/desis/opcpago/Pago";
import FAQSection from "../extrahome/FAQSection";
import ViewProfiles from "../extrahome/ViewProfiles";


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
        <Route path="/pgo" element={<Pago />} />

        
        {/* Empresa*/}
        <Route path="/Pins" element={<PinSesion />} />
        <Route path="/Preg" element={<Pregistro />} />
        <Route path="/perfilempresa" element={<PerfilEmpresa />} />
        {/* Ruta para la página de ofertas (Pins) */}
        <Route path="/pagempresa" element={<Pins />} />


        {/* Administrador*/}
        <Route path="/Tins" element={<Tinsesion/>} />
        <Route path="/pagadmin" element={<Pin />} />
        <Route path="/gusu" element={<Stablas />} />
        <Route path="/goft" element={<Tofertas />} />

        {/* Extrahome*/}
        <Route path="/quans" element={<FAQSection/>} />
        <Route path="/profiles" element={<ViewProfiles/>} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
