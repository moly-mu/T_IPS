import { useState} from 'react';
import { DollarSign, Edit3, Calendar, Star, FileText } from 'lucide-react';
import MyProfile from './MyProfile';
import PatientSurveys from './PatientSurveys';
import MyAppointments from './MyAppointments';
import Wallet from './Wallet';
import MedicalHistory from './MedicalHistory';

const PatientProfile = () => {
    const [activeTab, setActiveTab] = useState('perfil');

    const [profile, setProfile] = useState({
      nombre: 'Juan Pérez',
      email: 'juan.perez@email.com',
      telefono: '+57 300 123 4567',
      fechaNacimiento: '1985-03-15',
      direccion: 'Calle 123 #45-67, Bogotá',
      tipoSangre: 'O+',
      alergias: 'Penicilina, Mariscos',
      contactoEmergencia: 'María Pérez - 300 765 4321'
    });

    return (
        <div className='min-h-screen bg-gray-50'>
            <nav className='fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100'>
                <div className='max-w-7xl mx-auto px-8 py-6'>
                    <div className='flex items-center justify-between'>
                        <a href="/" className='text-2xl font-light tracking-wide text-gray-900'>
                        TELECONSULTAS <span className='font-medium'>IPS</span></a>

                        <div className='hidden md:flex items-center space-x-12'>
                            <a href="/" className='text-sm font-medium text-gray-900 border-b border-gray-900 pb-1 tracking-wide'>
                            CERRAR SESIÓN</a>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='pt-24 pb-20'>
                <div className='max-w-7xl mx-auto px-8 py-16'>
                    <div className='mb-12'>
                        <h2 className='text-3xl font-light text-gray-900 mb-2'>Bienvenido, {profile.nombre}</h2>
                        <p className='text-gray-500'>Gestiona tu información médica y citas</p>
                    </div>

                    <div className='border-b border-gray-200 mb-12'>
                        <div className='flex gap-12'>
                            {[
                                { key: 'perfil', label: 'Mi Perfil', icon: Edit3 },
                                { key: 'historial', label: 'Historial de consultas', icon: Edit3 },
                                { key: 'misCitas', label: 'Mis Citas', icon: Calendar },
                                { key: 'misEncuestas', label: 'Mis Encuestas', icon: Star },
                                { key: 'wallet', label: 'Billetera', icon: DollarSign }
                            ].map(({ key, label, icon: Icon}) => (
                                <button 
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`flex items-center gap-2 pb-4 font-light transition-colors ${activeTab === key ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
                                <Icon size={16}/>
                                {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        {activeTab === 'perfil' && <MyProfile/>}
                        {activeTab === 'misCitas' && <MyAppointments/>}
                        {activeTab === 'historial' && <MedicalHistory/>}
                        {activeTab === 'misEncuestas' && <PatientSurveys/>}
                        {activeTab === 'wallet' && <Wallet/>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientProfile;