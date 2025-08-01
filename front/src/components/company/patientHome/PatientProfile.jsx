import { useState, useEffect } from 'react';
import { DollarSign, Edit3, Calendar, Star } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useUserData } from '../../../context/UserDataContext';
import { useUserProfileService } from '../../../services/userProfileService';
import MyProfile from './MyProfile';
import PatientSurveys from './PatientSurveys';
import MyAppointments from './MyAppointments';
import Wallet from './Wallet';
import MedicalHistory from './MedicalHistory';

const PatientProfile = () => {
    const [activeTab, setActiveTab] = useState('perfil');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { token, logout } = useAuth();
    const { userData, setUserData } = useUserData();
    const { getUserProfile, updateUserProfile } = useUserProfileService();

    const [profile, setProfile] = useState({
      nombre: '',
      email: '',
      telefono: '',
      fechaNacimiento: '',
      direccion: '',
      tipoSangre: '',
      alergias: '',
      contactoEmergencia: '',
      // Datos adicionales del backend
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      genero: '',
      sexo: '',
      lenguaje: '',
      numeroDocumento: '',
      tipoDocumento: '',
      eps: '',
      profesion: '',
      grupoEtnico: ''
    });

    // Cargar datos del perfil al montar el componente
    useEffect(() => {
        const loadUserProfile = async () => {
            if (!token) {
                setError('No hay sesión activa');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await getUserProfile();
                const user = response.user;
                
                // Mapear los datos del backend al formato del frontend
                const mappedProfile = {
                    nombre: `${user.firstname} ${user.lastname}`,
                    primerNombre: user.firstname || '',
                    segundoNombre: user.second_firstname || '',
                    primerApellido: user.lastname || '',
                    segundoApellido: user.second_lastname || '',
                    email: user.credential_users?.email || '',
                    telefono: user.phone || '',
                    fechaNacimiento: user.birthdate ? new Date(user.birthdate).toISOString().split('T')[0] : '',
                    genero: user.gender || '',
                    sexo: user.sex || '',
                    lenguaje: user.language || '',
                    numeroDocumento: user.credential_users?.document || '',
                    tipoDocumento: user.document_type || '',
                    direccion: user.Paciente?.pac_data?.Direction || '',
                    tipoSangre: user.Paciente?.pac_data?.bloodType || '',
                    alergias: user.Paciente?.pac_data?.allergies || '',
                    contactoEmergencia: user.Paciente?.pac_data?.emergency_contact || '',
                    eps: user.Paciente?.pac_data?.eps_type || '',
                    profesion: user.Paciente?.pac_data?.profession || '',
                    grupoEtnico: user.Paciente?.pac_data?.ethnicgroup || ''
                };
                
                setProfile(mappedProfile);
                
                // Actualizar el contexto de userData si es necesario
                if (!userData || userData.name !== mappedProfile.nombre) {
                    setUserData({
                        id: user.id || userData?.id,
                        name: mappedProfile.nombre,
                        email: mappedProfile.email,
                        role: user.rol || userData?.role
                    });
                }
                
                setError(null);
            } catch (err) {
                console.error('Error al cargar el perfil:', err);
                setError('Error al cargar el perfil del usuario');
                
                if (err.message.includes('Sesión expirada')) {
                    logout();
                }
            } finally {
                setLoading(false);
            }
        };

        loadUserProfile();
    }, [token, getUserProfile, updateUserProfile, userData, setUserData, logout]);

    const handleProfileUpdate = async (updatedProfile) => {
        try {
            setLoading(true);
            
            // Mapear los datos del frontend al formato que espera el backend
            const backendData = {
                firstname: updatedProfile.primerNombre,
                second_firstname: updatedProfile.segundoNombre,
                lastname: updatedProfile.primerApellido,
                second_lastname: updatedProfile.segundoApellido,
                birthdate: updatedProfile.fechaNacimiento,
                gender: updatedProfile.genero,
                sex: updatedProfile.sexo,
                language: updatedProfile.lenguaje,
                document_type: updatedProfile.tipoDocumento,
                phone: updatedProfile.telefono,
                // Datos del paciente
                Direction: updatedProfile.direccion,
                bloodType: updatedProfile.tipoSangre,
                allergies: updatedProfile.alergias,
                emergency_contact: updatedProfile.contactoEmergencia,
                eps_type: updatedProfile.eps,
                profession: updatedProfile.profesion,
                ethnic_group: updatedProfile.grupoEtnico
            };

            console.log('Enviando datos al backend:', backendData);
            
            const response = await updateUserProfile(backendData);
            
            console.log('Respuesta del backend:', response);
            
            // Actualizar el perfil local con los datos actualizados
            setProfile(updatedProfile);
            
            // Actualizar también el contexto de userData
            setUserData({
                ...userData,
                name: `${updatedProfile.primerNombre} ${updatedProfile.primerApellido}`,
                email: updatedProfile.email
            });
            
            return response;
            
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = '/';
    };
    
    if (error) {
        return (
            <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button 
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Ir al inicio de sesión
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            <nav className='fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100'>
                <div className='max-w-7xl mx-auto px-8 py-6'>
                    <div className='flex items-center justify-between'>
                        <a href="/" className='text-2xl font-light tracking-wide text-gray-900'>
                        TELECONSULTAS <span className='font-medium'>IPS</span></a>

                        <div className='hidden md:flex items-center space-x-12'>
                            <button 
                                onClick={handleLogout}
                                className='text-sm font-medium text-gray-900 border-b border-gray-900 pb-1 tracking-wide hover:text-red-600 cursor-pointer'
                            >
                                CERRAR SESIÓN
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='pt-24 pb-20'>
                <div className='max-w-7xl mx-auto px-8 py-16'>
                    <div className='mb-12'>
                        <h2 className='text-3xl font-light text-gray-900 mb-2'>
                            Bienvenido, {profile.nombre || 'Usuario'}
                        </h2>
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
                        {activeTab === 'perfil' && <MyProfile profile={profile} onProfileUpdate={handleProfileUpdate} />}
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