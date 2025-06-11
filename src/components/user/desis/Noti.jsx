import { useState } from 'react';
import NavbarI from './NavbarI'; 
import Barral from './Barral';

const membersPrincipal = [
    {
        name: 'Loom Inc.',
        status: 'Aceptado',
        project: { description: 'Data analysis' },
        document: { name: 'loom-inc.pdf', size: '2.3 MB' },
        date: '2024-12-01'
    },
    {
        name: 'Slack Technologies',
        status: 'Rechazado',
        project: { description: 'Team management' },
        document: { name: 'slack-tech.pdf', size: '1.2 MB' },
        date: '2024-12-02'
    }
];

const membersSugerencias = [
    {
        name: 'Operador de Montacargas Certificado',
        description: '¿Eres un experto en el manejo de montacargas y estás buscando una oportunidad laboral que te ofrezca estabilidad y un ambiente amigable? ¡Tenemos el trabajo perfecto para ti! Nos encontramos en la búsqueda de un Operador de Montacargas certificado para manejar montacargas de combustión estándar de 2 toneladas. Ofrecemos un horario cómodo de lunes a sábado, con un salario competitivo y la oportunidad de trabajar con un equipo dinámico y profesional.'
    },
    {
      name: 'Auxiliar de Logística',
      description: 'Buscamos un Auxiliar de Logística para apoyar en la gestión de inventarios, control de envíos y recepción de mercancías. Requerimos experiencia previa en almacenes o centros de distribución, conocimientos básicos de sistemas ERP y habilidades para el trabajo en equipo. Ofrecemos estabilidad laboral y capacitaciones continuas.'
    },
    {
      name: 'Supervisor de Almacén',
      description: 'Únete a nuestro equipo como Supervisor de Almacén. Serás responsable de coordinar las operaciones diarias, supervisar al personal y garantizar la correcta organización de productos. Buscamos experiencia previa en roles similares y habilidades de liderazgo. Ofrecemos crecimiento profesional y bonos por desempeño.'
    },
    {
      name: 'Conductor de Vehículo Pesado',
      description: 'Si tienes licencia tipo C o superior y experiencia en transporte de mercancías, este trabajo es para ti. Estamos buscando conductores para realizar rutas locales y foráneas con productos delicados. Se requiere disponibilidad para viajar y conocimientos básicos de mecánica automotriz. Ofrecemos prestaciones superiores a la ley y viáticos.'
    },
];

function Noti() {
    const [isOpen, setIsOpen] = useState(false); // Manejo del estado para el sidebar
    const [activeTab, setActiveTab] = useState('Principal'); // Manejo del estado para las pestañas

    const sidebarChange = (open) => {
        setIsOpen(open); // Cambio de estado para sidebar
    };

    const renderPrincipalTable = (data) => (
        <table className="min-w-full max-w-5xl bg-white shadow-md rounded-lg border">
            <thead className="bg-gray-800 text-white">
                <tr>
                    <th className="px-6 py-3 text-left">Nombre Empresa</th>
                    <th className="px-6 py-3 text-left">Estado</th>
                    <th className="px-6 py-3 text-left">Descripción Oferta</th>
                    <th className="px-6 py-3 text-left">Documento</th>
                    <th className="px-6 py-3 text-left">Fecha</th>
                </tr>
            </thead>
            <tbody>
                {data.map((member, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4">
                            <p className="text-gray-800 font-medium">{member.name}</p>
                        </td>
                        <td className="px-6 py-4">
                            <span
                                className={`text-sm font-medium ${
                                    member.status === 'Aceptado'
                                        ? 'text-emerald-500'
                                        : 'text-red-500'
                                }`}>
                                {member.status}
                            </span>
                        </td>
                        <td className="px-6 py-4">
                            <p className="text-gray-700">{member.project.description}</p>
                        </td>
                        <td className="px-6 py-4">
                            <p className="text-gray-800">{member.document.name}</p>
                            <p className="text-xs text-gray-500">{member.document.size}</p>
                        </td>
                        <td className="px-6 py-4">
                            <p className="text-gray-700">{member.date}</p>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const renderSugerenciasTable = (data) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
            {data.map((suggestion, index) => (
                <div key={index} className="p-6 bg-white shadow-lg rounded-lg border">
                    <h3 className="text-2xl font-bold text-gray-800">{suggestion.name}</h3>
                    <p className="text-gray-700 mt-4 leading-relaxed">{suggestion.description}</p>
                </div>
            ))}
        </div>
    );

    return (
        <div className="pl-80 pr-12">
            <NavbarI isOpen={isOpen} sidebarChange={sidebarChange} />

            <div className="pt-16 p-6 bg-gray-0">
                <h1 className="text-3xl font-bold">Notificaciones</h1>
                <p>Revisa el estado de tus postulaciones a las ofertas y tus sugerencias a trbajos relacionados a tus areas de especialidad.</p>
            </div>

            <div className="flex justify-center mt-4 space-x-4">
                <p
                    className={`cursor-pointer text-lg font-semibold ${
                        activeTab === 'Principal'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-800'
                    }`}
                    onClick={() => setActiveTab('Principal')}>
                    Principal
                </p>

                <p
                    className={`cursor-pointer text-lg font-semibold ${
                        activeTab === 'Sugerencias'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-800'
                    }`}
                    onClick={() => setActiveTab('Sugerencias')}>
                    Sugerencias
                </p>
            </div>

            <div className="flex justify-center mt-8">
                {activeTab === 'Principal' && renderPrincipalTable(membersPrincipal)}
                {activeTab === 'Sugerencias' && renderSugerenciasTable(membersSugerencias)}
            </div>
            <Barral />
        </div>
        
    );
}

export default Noti;
