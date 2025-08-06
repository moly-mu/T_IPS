import { useState } from 'react';

const PhysicalAndFindings = () => {
    const [ formData, setFormData] = useState({
        consultReason: '', 

        // Diagnóstico
        cie10Code: '',
        symptoms: '',
        duration: '',
        evolution: '',
        diagnosisDate: '',

        //signos vitales 
        heartRate: '',
        respiratoryRate: '',
        systolicBP: '',
        diastolicBP: '',
        meanBP: '',
        oxygenSaturation: '',
        temperature: '',
        weight: '',
        height: '',
        bmi: '',
        bodySurface: '',

        // Hallazgos
        findings: '',
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return(
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6'>
            {/*
            <div className='bg-white rounded-lg shadow-sm mb-6 p-6'>
                <div className='items-center mb-4'>
                    <h1 className='text-xl font-bold text-gray-800'>Anamnesis</h1>
                </div>
            </div>
            */}
        <div className='max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen'>
            <div className='space-y-4'>
                <div>
                    <label className='block text-sm font-medium mb-2'>Fecuencia Cardíaca (lpm)</label>
                    <input
                    type='number' 
                    className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D]'
                    value={formData.heartRate}
                    onChange={(e) => handleInputChange('heartRate', e.target.value)}/>
                </div>

                <div>
                    <label className=''></label>
                </div>
            </div>
        </div>

        <div className='max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen'>
            <div className='space-y-6'>
                <div>
                    <label className='block text-sm font-medium mb-2'>Código CIE-10</label>
                    <input 
                    type="text"
                    className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D]'
                    value={formData.cie10Code}
                    onChange={(e) => handleInputChange('cie10Code', e.target.value)}
                    placeholder='Ej: K35.9'/>
                </div>

                <div>
                    <label className='block text-sm font-medium mb-2'>Fecha de Diagnóstico</label>
                    <input 
                    type="date"
                    className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D]'
                    value={formData.diagnosisDate}
                    onChange={(e) => handleInputChange('diagnosisDate', e.target.value)}/>
                </div>

                <div>
                    <label className='block text-sm font-medium mb-2'>Descripción de Síntomas</label>
                    <textarea 
                    className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D]'
                    rows='3'
                    value={formData.symptoms}
                    onChange={(e) => handleInputChange('symptoms', e.target.value)}
                    placeholder='Describa los síntomas presentados...'></textarea>
                </div>

                <div>
                    <label className='block text-sm font-medium mb-2'>Duración</label>
                    <input 
                    type="text"
                    className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D]'
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    placeholder='Ej: 3 días'/>
                </div>

                <div>
                    <label className='block text-sm font-medium mb-2'>Evolución</label>
                    <input 
                    type="text"
                    className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F079D]'
                    value={formData.evolution}
                    onChange={(e) => handleInputChange('evolution', e.target.value)}
                    placeholder='Ej: Favorable'/>
                </div>
            </div>
        </div>
    </div>
    );
};

export default PhysicalAndFindings;
