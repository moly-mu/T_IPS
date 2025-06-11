
const PaymentMethods = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        
        <div className="text-center mb-20">
          <p className="text-sm font-light text-gray-500 tracking-widest uppercase mb-4">
            Medios de Pago
          </p>
          <h2 className="text-4xl font-light text-gray-900">
            TRANSACCIONES
            <br />
            <span className="font-medium">SEGURAS</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1 bg-white">
          {[
            { name: "Tarjetas", detail: "Visa, Mastercard, Amex", icon: "01" },
            { name: "Transferencia", detail: "Bancos nacionales", icon: "02" },
            { name: "PSE", detail: "Pagos en línea", icon: "03" },
            { name: "Digital", detail: "Nequi, Daviplata", icon: "04" },
          ].map((method, index) => (
            <div key={index} className="p-8 hover:bg-gray-50 transition-colors group">
              <div className="space-y-4">
                <div className="text-xs font-light text-gray-400 tracking-widest">{method.icon}</div>
                <h3 className="text-lg font-medium text-gray-900">{method.name}</h3>
                <p className="text-sm text-gray-500 font-light">{method.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white rounded-sm">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-light text-gray-600 tracking-wide">
              Encriptación SSL • Certificado PCI DSS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethods;
