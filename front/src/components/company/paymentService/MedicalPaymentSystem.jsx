import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Building2, Smartphone, Globe, ArrowLeft, Check, Calendar, Clock, User, Mail, Phone } from 'lucide-react';
import PropTypes from 'prop-types';

export default function MedicalPaymentSystem() {
  const [currentStep, setCurrentStep] = useState('payment'); 
  const [selectedMethod, setSelectedMethod] = useState('cards');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: ''
  });

  const navigate = useNavigate();

  const handleBackToServices = () => {
    navigate('/');
  };

  // Datos del servicio seleccionado
  const selectedService = {
    id: 'medicina-general',
    title: 'Medicina General',
    price: 135000,
    date: '20 May 2024',
    time: '10:00 AM',
    duration: '30 min'
  };

  const bookingDetails = {
    name: 'Valentina Guerrero',
    phone: '+57 300 123 4567',
    email: 'valentina.guerrero@email.com',
    appointmentType: 'Medicina General'
  };

  const paymentMethods = [
    {
      id: 'cards',
      title: 'Tarjetas de Crédito/Débito',
      icon: CreditCard,
      options: ['Visa', 'Mastercard', 'American Express']
    },
    {
      id: 'pse',
      title: 'PSE',
      icon: Globe,
      options: ['Pagos Seguros en Línea']
    },
    {
      id: 'transfer',
      title: 'Transferencia Bancaria',
      icon: Building2,
      options: ['Bancolombia', 'Banco de Bogotá', 'Davivienda']
    },
    {
      id: 'digital',
      title: 'Billeteras Digitales',
      icon: Smartphone,
      options: ['Nequi', 'Daviplata']
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedMethod(method);
    setCurrentStep('checkout');
  };

  const handleInputChange = (field, value) => {
    setPaymentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePayment = () => {
    setCurrentStep('confirmation');
  };

  const Navbar = () => {
      return (
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <Link to="/" className="text-2xl font-light tracking-wide text-gray-900">
                TELECONSULTAS<span className="font-medium">IPS</span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-12">
                <a href="/Tins" className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors tracking-wide">
                  ADMINISTRADOR
                </a>
                <a href="/Sins" className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors tracking-wide">
                  PACIENTE
                </a>
                <a href="/Pins" className="text-sm font-medium text-gray-900 border-b border-gray-900 pb-1 tracking-wide">
                  INICIAR SESIÓN
                </a>
              </div>
            </div>
          </div>
        </nav>
      );
    };

  // Componente reutilizable para el resumen de reserva
  const BookingSummary = ({ showOrderTitle = false }) => (
    <div className="sticky top-6 space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {showOrderTitle ? 'Resumen de la orden' : 'Resumen de reserva'}
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Fecha</p>
              <p className="font-medium">{selectedService.date}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Hora</p>
              <p className="font-medium">{selectedService.time}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Servicio</p>
              <p className="font-medium">{selectedService.title}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Detalles de contacto</h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm">{bookingDetails.name}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-4 h-4 text-gray-400" />
            <span className="text-sm">{bookingDetails.phone}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-sm">{bookingDetails.email}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Resumen de precio</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Servicio</span>
            <span>{formatPrice(selectedService.price)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Impuestos</span>
            <span>$0</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span className="text-blue-600">{formatPrice(selectedService.price)}</span>
            </div>
          </div>
        </div>

        {currentStep === 'checkout' && (
          <button
            onClick={handlePayment}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors mt-6">
            Confirmar pago
          </button>
        )}
      </div>
    </div>
  );

  BookingSummary.propTypes = {
  showOrderTitle: PropTypes.bool,
};

  // Pantalla de selección de método de pago
  if (currentStep === 'payment') {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <Navbar/>
        <div className="max-w-6xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center mb-8">
            <button onClick={handleBackToServices} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-light text-gray-900">Método de Pago</h1>
              <p className="text-gray-600">{selectedService.title} - {formatPrice(selectedService.price)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Methods */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Selecciona tu método de pago</h2>
                <div className="space-y-4">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => handlePaymentMethodSelect(method.id)}
                        className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                      >
                        <div className="flex items-center space-x-4">
                          <IconComponent className="w-6 h-6 text-gray-600" />
                          <div>
                            <h3 className="font-medium text-gray-900">{method.title}</h3>
                            <p className="text-sm text-gray-500">{method.options.join(', ')}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Booking Summary - Fixed */}
            <div>
              <BookingSummary />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de checkout
  if (currentStep === 'checkout') {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <Navbar/>
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center mb-8">
            <button onClick={() => setCurrentStep('payment')} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-light text-gray-900">Finalizar Pago</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment formulario */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-2">Información de pago</h2>
                  <p className="text-gray-600">Método: {paymentMethods.find(m => m.id === selectedMethod)?.title}</p>
                </div>

                {selectedMethod === 'cards' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre en tarjeta</label>
                      <input
                        type="text"
                        placeholder="Como aparece en tu tarjeta"
                        value={paymentData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Número de tarjeta</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={paymentData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          value={paymentData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Vencimiento</label>
                        <input
                          type="text"
                          placeholder="MM/YYYY"
                          value={paymentData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Enviar factura a</label>
                      <input
                        type="email"
                        placeholder="tu@email.com"
                        value={paymentData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      <CreditCard className="w-4 h-4" />
                      <span>Transacción segura. Aceptamos Visa, Mastercard, American Express</span>
                    </div>
                  </div>
                )}

                {selectedMethod !== 'cards' && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Redirección a plataforma de pago</h3>
                    <p className="text-gray-600 mb-6">Serás redirigido a la plataforma segura de {paymentMethods.find(m => m.id === selectedMethod)?.title}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary - Fixed */}
            <div>
              <BookingSummary showOrderTitle={true} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de confirmación
  if (currentStep === 'confirmation') {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <Navbar/>
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-light text-gray-900 mb-2">¡Pago Exitoso!</h1>
            <p className="text-gray-600 mb-8">Tu consulta ha sido agendada correctamente</p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Resumen de tu compra</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Servicio:</span>
                  <span className="text-gray-900 font-medium">{selectedService.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fecha:</span>
                  <span className="text-gray-900 font-medium">{selectedService.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hora:</span>
                  <span className="text-gray-900 font-medium">{selectedService.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Precio:</span>
                  <span className="text-gray-900 font-medium">{formatPrice(selectedService.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Método de pago:</span>
                  <span className="text-gray-900 font-medium">{paymentMethods.find(m => m.id === selectedMethod)?.title}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Importante:</strong> Recibirás un correo de confirmación con los detalles de tu cita en breve.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleBackToServices}
                className="flex bg-gray-100 text-gray-700 py-3 px-20 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Ver más servicios
              </button>
              <Link to="/Sins">
              <button
                onClick={() => console.log('Ver mis citas')}
                className="flex bg-blue-600 text-white py-3 px-20 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Ver mis citas
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}