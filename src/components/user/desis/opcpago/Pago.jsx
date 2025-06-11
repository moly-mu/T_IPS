// Pago.js
import { useState } from 'react';

function Pago() {
  const [isPlanSelected, setIsPlanSelected] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsPlanSelected(true)}
        className="mt-4 inline-block px-4 py-2 text-white bg-[#00102D] rounded-md hover:bg-[#003366] text-center">
        Más información
      </button>

      
      {isPlanSelected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
         
          <div className="bg-white p-10 rounded-lg shadow-lg max-w-4xl w-full relative">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Seleccionaste el plan pago</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="p-6 bg-gray-100 rounded-lg border shadow-md">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked
                    readOnly
                    className="form-checkbox h-5 w-5 text-blue-600"/>
                  <span className="text-lg font-semibold text-gray-900">Plan de $15,000</span>
                </label>
                <p className="text-sm text-gray-700 mt-2">
                  Acceso a asistencia con inteligencia artificial en cualquier momento
                </p>
                <p className="text-gray-500 text-sm mt-1">Pago por un mes</p>
              </div>

              
              <div className="p-6 bg-gray-100 rounded-lg border shadow-md">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked
                    readOnly
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="text-lg font-semibold text-gray-900">Plan Avanzado de $30,000</span>
                </label>
                <p className="text-sm text-gray-700 mt-2">
                  Acceso a funciones premium y soporte personalizado las 24 horas.
                </p>
                <p className="text-gray-500 text-sm mt-1">Pago por un mes</p>
              </div>

              <div className="p-6 bg-gray-100 rounded-lg border shadow-md lg:col-span-2">
                <h4 className="text-lg font-semibold text-gray-900">Opciones de pago</h4>
                <p className="text-sm text-gray-700 mt-2">Aceptamos tarjetas de crédito y débito</p>
              </div>
            </div>

            <button
              onClick={() => setIsPlanSelected(false)} 
              className="mt-8 px-6 py-3 w-full text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Continuar con la compra
            </button>

            
            <button
              onClick={() => setIsPlanSelected(false)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pago;
