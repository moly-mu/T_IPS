// Barral.js
import { useState } from "react";
import { Profile2User, Document, Calendar, Setting2 } from "iconsax-react";

const Barral = () => {
  const [isPlanSelected, setIsPlanSelected] = useState(false); // Estado para mostrar el modal

  return (
    <div className="flex h-screen">
      {/* Sidebar siempre visible */}
      <div className="w-64 bg-white border-r fixed top-0 left-0 z-50 h-full flex flex-col">


        {/* parte superior */}
        <div className="h-[var(--h-nav)] p-4 flex items-center gap-2 cursor-pointer">
          <div className="h-10 w-10 flex items-center justify-center bg-gradient-to-br from-[#003366] to-[#003366] rounded-full text-white">
            <Profile2User size={24} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-800">UDC TALENTO</h1>
          </div>
        </div>

        <hr className="bg-gray-400 mx-2" />

        {/* menu de navegacion */}
        <div className="flex flex-col space-y-2 text-gray-500 font-medium py-6 overflow-y-auto flex-grow">
          <a href="/pagusuario" className="flex hover:bg-gray-100 px-6 py-2 items-center gap-2">
            <Profile2User size={16} />
            Mi perfil
          </a>

          <a href="/not" className="flex hover:bg-gray-100 px-6 py-2 items-center gap-2">
            <Calendar size={16} />
            Notificaciones
          </a>

          <a href="/oft" className="flex hover:bg-gray-100 px-6 py-2 items-center gap-2">
            <Document size={16} />
            Ofertas
          </a>

          <a href="/ajus" className="flex hover:bg-gray-100 px-6 py-2 items-center gap-2">
            <Setting2 size={16} />
            Configuración
          </a>
        </div>

        {/* cuadro de Pago */}
        <div className="p-4 bg-blue-100 rounded-lg shadow-md mx-4 mt-auto mb-6">
          <h2 className="text-xl font-semibold text-[#00102D]">Pago</h2>
          <p className="text-sm text-gray-700 mt-2">
            Adquiere nuestra versión de pago y obtén múltiples beneficios como obtener asistencia de nuestra Inteligencia Artificial.
          </p>
          <button
            onClick={() => setIsPlanSelected(true)} // mostrar el modal
            className="mt-4 inline-block px-4 py-2 text-white bg-[#00102D] rounded-md hover:bg-[#003366] text-center"
          >
            Más información
          </button>
        </div>

        {/* seccion inferior con el perfil del usuario */}
        <div className="mt-auto p-6 border-t">
          <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
              <Profile2User size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Nombre Usuario</p>
              <p className="text-xs text-gray-500">usuario@correo.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* contenido principal */}
      <div className="flex-1 p-6 pl-64">
        {/* aqui se mostraran las rutas */}
      </div>

      {/* modal de plan de pago */}
      {isPlanSelected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded-lg shadow-lg max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
            
            {/* lado izquierdo -  factura */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-800">Datos de compra</h3>
              
              {/* detalles de la factura */}
              <div className="text-lg text-gray-800">
                <p><strong>Nombre del Cliente:</strong> Juan Pérez</p>
                <p><strong>Correo Electrónico:</strong> juan.perez@correo.com</p>
                <p><strong>Dirección de Facturación:</strong> Calle Ficticia 123, Ciudad</p>
              </div>

              {/* opciones de pago */}
              <div className="space-y-4 mt-8">
                <h4 className="text-xl font-semibold text-gray-800">Opciones de pago</h4>

                {/* opcion 1: tarjetas de credito/debito */}
                <div className="flex items-center space-x-3">
                  <input type="radio" name="payment" id="credit-debit" className="form-radio h-5 w-5 text-[#003366]" />
                  <label htmlFor="credit-debit" className="text-lg text-gray-700">Tarjeta de Crédito/Débito</label>
                </div>

                {/* opcion 2: PSE */}
                <div className="flex items-center space-x-3">
                  <input type="radio" name="payment" id="pse" className="form-radio h-5 w-5 text-[#003366]" />
                  <label htmlFor="pse" className="text-lg text-gray-700">PSE (Pago Seguro en Línea)</label>
                </div>
              </div>

              {/* toltal de la factura */}
              <div className="text-lg text-gray-800 mt-4">
                <p><strong>Total a pagar:</strong></p>
                <p className="text-2xl font-bold">$15,000.00</p>
              </div>

              {/* boton de continuar compra */}
              <button
                onClick={() => setIsPlanSelected(false)} // Cerrar el modal
                className="mt-24 px-8 py-3 w-full text-white bg-[#00102D] rounded-md hover:bg-[#003366]">
                Continuar con la compra
              </button>
            </div>

            {/* lado derecho - tarjetas de pago */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-800">Selecciona tu plan</h3>
              
              {/* Primera tarjeta de $0 */}
              <div className="p-6 bg-gray-100 rounded-lg border shadow-md">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-[#00102D]"/>
                  <span className="text-xl font-semibold text-gray-900">Plan de $0</span>
                </label>
                <p className="text-sm text-gray-700 mt-2">
                  Acceso a asistencia con inteligencia artificial una vez.
                </p>
                <p className="text-gray-500 text-sm mt-1">Pago por un mes.</p>
              </div>

              {/* segunda tarjeta de $15,000 (plan avanzado) */}
              <div className="p-6 bg-gray-100 rounded-lg border shadow-md">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked
                    readOnly
                    className="form-checkbox h-5 w-5 text-[#00102D]"/>
                  <span className="text-xl font-semibold text-gray-900">Plan Avanzado de $15,000</span>
                </label>
                <p className="text-sm text-gray-700 mt-2">
                  Acceso a funciones premium y soporte personalizado las 24 horas.
                </p>
                <p className="text-gray-500 text-sm mt-1">Pago por un mes.</p>
              </div>

              {/* terminos y condiciones */}
              <div className="flex items-center space-x-3 mt-6">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-[#00102D]" />
                <label className="text-sm text-gray-700">Acepto los términos y condiciones</label>
              </div>
            </div>

            {/* boton de cerrar */}
            <button
              onClick={() => setIsPlanSelected(false)} // cerrar el modal
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
              ✕
            </button>
          </div>
        </div>
)}



    </div>
  );
};

export default Barral;
