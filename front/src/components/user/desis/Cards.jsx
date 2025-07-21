//! Realizar cambios de los campos
import { useState } from "react";
import Barral from "../desis/Barral";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const Cards = () => {
  const [trabajos, setTrabajos] = useState([]);
  const [nuevoTrabajo, setNuevoTrabajo] = useState({ trabajo: "", experiencia: "" });

  const [idiomas, setIdiomas] = useState([]);
  const [nuevoIdioma, setNuevoIdioma] = useState("");

  const [educacion, setEducacion] = useState("");
  const [habilidades, setHabilidades] = useState("");
  
  const [referenciasProfesionales, setReferenciasProfesionales] = useState([]);
  const [nuevaReferenciaProfesional, setNuevaReferenciaProfesional] = useState({ nombre: "", telefono: "", cargo: "" });
  
  const [referenciasPersonales, setReferenciasPersonales] = useState([]);
  const [nuevaReferenciaPersonal, setNuevaReferenciaPersonal] = useState({ nombre: "", telefono: "", relacion: "" });

  const [certificados, setCertificados] = useState([]);
  const [foto, setFoto] = useState(null);
  const [biografia, setBiografia] = useState("");

  const { token } = useAuth();

  // Información Personal
  const [informacionPersonal, setInformacionPersonal] = useState({
    nombreCompleto: "",
    tipoDocumento: "",
    numeroDocumento: "",
    fechaNacimiento: "",
    genero: "",
    direccion: "",
    telefono: "",
    ubicacion: "",
    eps: "",
  });

  // Información Profesional Médica
  const [informacionProfesional, setInformacionProfesional] = useState({
    especialidadMedica: "",
    precioACobrar: "",
    añoGraduacion: "",
  });

  // Documentos
  const [documentos, setDocumentos] = useState({
    scannerDocumento: null,
    tarjetaProfesional: null,
    tituloRefrendado: null,
    actaGrado: null,
    actaNacimiento: null,
    antecedentes: null,
    cvPdf: null,
    cartaRecomendacion: null,
  });

  const handleAddTrabajo = () => {
    if (nuevoTrabajo.trabajo && nuevoTrabajo.experiencia) {
      setTrabajos([...trabajos, nuevoTrabajo]);
      setNuevoTrabajo({ trabajo: "", experiencia: "" });
    }
  };

  const handleAddIdioma = () => {
    if (nuevoIdioma) {
      setIdiomas([...idiomas, nuevoIdioma]);
      setNuevoIdioma("");
    }
  };

  const handleAddReferenciaProfesional = () => {
    if (nuevaReferenciaProfesional.nombre && nuevaReferenciaProfesional.telefono && nuevaReferenciaProfesional.cargo) {
      setReferenciasProfesionales([...referenciasProfesionales, nuevaReferenciaProfesional]);
      setNuevaReferenciaProfesional({ nombre: "", telefono: "", cargo: "" });
    }
  };

  const handleAddReferenciaPersonal = () => {
    if (nuevaReferenciaPersonal.nombre && nuevaReferenciaPersonal.telefono && nuevaReferenciaPersonal.relacion) {
      setReferenciasPersonales([...referenciasPersonales, nuevaReferenciaPersonal]);
      setNuevaReferenciaPersonal({ nombre: "", telefono: "", relacion: "" });
    }
  };

  const handleAddCertificado = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCertificados([...certificados, file.name]);
    }
  };

  const handleChangeInfoPersonal = (e) => {
    const { name, value } = e.target;
    setInformacionPersonal({ ...informacionPersonal, [name]: value });
  };

  const handleChangeInfoProfesional = (e) => {
    const { name, value } = e.target;
    setInformacionProfesional({ ...informacionProfesional, [name]: value });
  };

  const handleDocumentChange = (e, docType) => {
    const file = e.target.files[0];
    if (file) {
      setDocumentos({ ...documentos, [docType]: file.name });
    }
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      // Preparar el objeto de datos según la estructura esperada por el endpoint
      const requestData = {
        biography: biografia,
        picture: foto, // Asumiendo que foto es la URL base64
        specialty: informacionProfesional.especialidadMedica,
        price: parseFloat(informacionProfesional.precioACobrar),
        graduationYear: parseInt(informacionProfesional.añoGraduacion),
        workExperience: trabajos.map(t => `${t.trabajo} - ${t.experiencia}`).join(", "),
        languages: idiomas,
        education: educacion ? [{
          institution: educacion.split(" - ")[0] || "",
          degree: educacion.split(" - ")[1] || educacion,
          year: parseInt(informacionProfesional.añoGraduacion)
        }] : [],
        skills: habilidades.split(",").map(s => s.trim()),
        references: referenciasProfesionales.map(ref => ({
          name: ref.nombre,
          contact: ref.telefono
        })),
        certificates: certificados.length > 0 ? "data:application/pdf;base64,..." : "", // Simplificado para prueba
        documentInfo: {
          dni: informacionPersonal.numeroDocumento,
          type: informacionPersonal.tipoDocumento
        },
        personalInfo: {
          address: informacionPersonal.direccion,
          phone: informacionPersonal.telefono
        },
        personalRefs: referenciasPersonales.map(ref => ({
          name: ref.nombre,
          relationship: ref.relacion,
          phone: ref.telefono
        }))
      };

      // Enviar la solicitud POST
      const response = await axios.post(
        "http://localhost:3000/specialist/specialistRequest",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      // Mostrar alerta de éxito
      alert("Solicitud enviada con éxito");
      console.log("Respuesta del servidor:", response.data);
      
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      alert("Error al enviar la solicitud");
    }
  };

  if (!token) {
    return <div>Cargando...</div>;
  }


  return (
    <div className="bg-gray-50 min-h-screen p-6 flex">
      <Barral />

      <div className="flex-1 mt-12 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Biografía */}
        <div className="col-span-1 lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Biografía (Sobre mí)</h2>
          <textarea
            className="w-full h-56 border border-gray-300 p-3 rounded-md resize-none"
            placeholder="Escribe una breve descripción sobre ti y tu experiencia profesional..."
            value={biografia}
            onChange={(e) => setBiografia(e.target.value)}
          ></textarea>
        </div>

        {/* Foto */}
        <div className="col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Foto</h2>
          <div
            className="w-full h-32 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden"
            style={{ width: "180px", height: "190px", margin: "0 auto" }}>
            {foto ? (
              <img src={foto} alt="Foto de perfil" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-500">Subir Foto</span>
            )}
          </div>
          <input
            type="file"
            onChange={handleFotoChange}
            className="hidden"
            id="fotoInput"
            accept="image/*"/>
          <button
            onClick={() => document.getElementById("fotoInput").click()}
            className="w-full mt-4 bg-[#00102D] text-white p-2 rounded-md">
            {foto ? "Cambiar Foto" : "Subir Foto"}
          </button>
        </div>

        {/* Información Profesional */}
        <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Información Profesional</h2>
          <div className="space-y-6">

            {/* Especialidad Médica */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Especialidad Médica</h3>
              <input
                type="text"
                name="especialidadMedica"
                placeholder="Ej: Cardiología, Pediatría, Medicina General"
                className="w-full p-2 border rounded"
                value={informacionProfesional.especialidadMedica}
                onChange={handleChangeInfoProfesional}
              />
            </div>

            {/* Precio a Cobrar */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Precio a Cobrar</h3>
              <input
                type="number"
                name="precioACobrar"
                placeholder="Precio por consulta"
                className="w-full p-2 border rounded"
                value={informacionProfesional.precioACobrar}
                onChange={handleChangeInfoProfesional}
              />
            </div>

            {/* Año de Graduación */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Año en que se Graduó</h3>
              <input
                type="number"
                name="añoGraduacion"
                placeholder="Año de graduación"
                className="w-full p-2 border rounded"
                min="1950"
                max="2024"
                value={informacionProfesional.añoGraduacion}
                onChange={handleChangeInfoProfesional}
              />
            </div>

            {/* Experiencia Laboral */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Experiencia Laboral</h3>
              <div className="flex gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Puesto/Institución"
                  className="w-1/2 p-2 border rounded"
                  value={nuevoTrabajo.trabajo}
                  onChange={(e) => setNuevoTrabajo({ ...nuevoTrabajo, trabajo: e.target.value })}/>
                <input
                  type="text"
                  placeholder="Experiencia (ej: 2 años)"
                  className="w-1/2 p-2 border rounded"
                  value={nuevoTrabajo.experiencia}
                  onChange={(e) => setNuevoTrabajo({ ...nuevoTrabajo, experiencia: e.target.value })}/>
                <button
                  onClick={handleAddTrabajo}
                  className="bg-green-500 text-white p-2 rounded">
                  +
                </button>
              </div>
              <ul className="text-sm text-gray-600">
                {trabajos.map((t, i) => <li key={i} className="mb-1">{t.trabajo} - {t.experiencia}</li>)}
              </ul>
            </div>

            {/* Idiomas */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Idiomas</h3>
              <div className="flex gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Idioma y nivel (ej: Inglés - Avanzado)"
                  className="w-full p-2 border rounded"
                  value={nuevoIdioma}
                  onChange={(e) => setNuevoIdioma(e.target.value)}/>
                <button onClick={handleAddIdioma} className="bg-green-500 text-white p-2 rounded">
                  +
                </button>
              </div>
              <ul className="text-sm text-gray-600">
                {idiomas.map((idioma, i) => <li key={i} className="mb-1">{idioma}</li>)}
              </ul>
            </div>

            {/* Educación */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Educación</h3>
              <input
                type="text"
                placeholder="Universidad y título obtenido"
                className="w-full p-2 border rounded"
                value={educacion}
                onChange={(e) => setEducacion(e.target.value)}/>
            </div>

            {/* Habilidades */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Habilidades Técnicas</h3>
              <input
                type="text"
                placeholder="Habilidades médicas específicas"
                className="w-full p-2 border rounded"
                value={habilidades}
                onChange={(e) => setHabilidades(e.target.value)}/>
            </div>

            {/* Referencias Profesionales */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Referencias Profesionales</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="p-2 border rounded"
                  value={nuevaReferenciaProfesional.nombre}
                  onChange={(e) => setNuevaReferenciaProfesional({ ...nuevaReferenciaProfesional, nombre: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Teléfono"
                  className="p-2 border rounded"
                  value={nuevaReferenciaProfesional.telefono}
                  onChange={(e) => setNuevaReferenciaProfesional({ ...nuevaReferenciaProfesional, telefono: e.target.value })}
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Cargo"
                    className="flex-1 p-2 border rounded"
                    value={nuevaReferenciaProfesional.cargo}
                    onChange={(e) => setNuevaReferenciaProfesional({ ...nuevaReferenciaProfesional, cargo: e.target.value })}
                  />
                  <button
                    onClick={handleAddReferenciaProfesional}
                    className="bg-green-500 text-white p-2 rounded">
                    +
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {referenciasProfesionales.map((ref, i) => (
                  <div key={i} className="mb-1">
                    {ref.nombre} - {ref.telefono} ({ref.cargo})
                  </div>
                ))}
              </div>
            </div>

            {/* Certificados */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Certificados Adicionales</h3>
              <input
                type="file"
                onChange={handleAddCertificado}
                className="w-full p-2 border rounded"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"/>
              <ul className="mt-2 text-sm text-gray-600">
                {certificados.map((c, i) => <li key={i} className="mb-1">{c}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* Información Personal */}
        <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Información Personal</h2>
          <div className="space-y-4">
            
            {/* Nombre Completo */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Nombre Completo</h3>
              <input
                type="text"
                name="nombreCompleto"
                placeholder="Nombres y apellidos completos"
                className="w-full p-2 border rounded"
                value={informacionPersonal.nombreCompleto}
                onChange={handleChangeInfoPersonal}
              />
            </div>

            {/* Tipo de Documento */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Tipo de Documento</h3>
              <select
                name="tipoDocumento"
                className="w-full p-2 border rounded"
                value={informacionPersonal.tipoDocumento}
                onChange={handleChangeInfoPersonal}
              >
                <option value="">Selecciona tipo de documento</option>
                <option value="cedula">Cédula de Ciudadanía</option>
                <option value="cedula_extranjeria">Cédula de Extranjería</option>
                <option value="pasaporte">Pasaporte</option>
                <option value="tarjeta_identidad">Tarjeta de Identidad</option>
              </select>
            </div>

            {/* Número de Documento */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Número de Documento</h3>
              <input
                type="text"
                name="numeroDocumento"
                placeholder="Número de documento"
                className="w-full p-2 border rounded"
                value={informacionPersonal.numeroDocumento}
                onChange={handleChangeInfoPersonal}
              />
            </div>

            {/* Fecha de Nacimiento */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Fecha de Nacimiento</h3>
              <input
                type="date"
                name="fechaNacimiento"
                className="w-full p-2 border rounded"
                value={informacionPersonal.fechaNacimiento}
                onChange={handleChangeInfoPersonal}
              />
            </div>

            {/* Género */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Género</h3>
              <select
                name="genero"
                className="w-full p-2 border rounded"
                value={informacionPersonal.genero}
                onChange={handleChangeInfoPersonal}
              >
                <option value="">Selecciona género</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
                <option value="prefiero_no_decir">Prefiero no decir</option>
              </select>
            </div>

            {/* Ubicación */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Ubicación</h3>
              <input
                type="text"
                name="ubicacion"
                placeholder="Ciudad, departamento, país"
                className="w-full p-2 border rounded"
                value={informacionPersonal.ubicacion}
                onChange={handleChangeInfoPersonal}
              />
            </div>

            {/* Dirección */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Dirección</h3>
              <input
                type="text"
                name="direccion"
                placeholder="Dirección completa"
                className="w-full p-2 border rounded"
                value={informacionPersonal.direccion}
                onChange={handleChangeInfoPersonal}
              />
            </div>

            {/* Teléfono */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Teléfono</h3>
              <input
                type="tel"
                name="telefono"
                placeholder="Número de teléfono"
                className="w-full p-2 border rounded"
                value={informacionPersonal.telefono}
                onChange={handleChangeInfoPersonal}
              />
            </div>

            {/* EPS */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">EPS</h3>
              <input
                type="text"
                name="eps"
                placeholder="Entidad Promotora de Salud"
                className="w-full p-2 border rounded"
                value={informacionPersonal.eps}
                onChange={handleChangeInfoPersonal}
              />
            </div>

            {/* Referencias Personales */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Referencias Personales</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="p-2 border rounded"
                  value={nuevaReferenciaPersonal.nombre}
                  onChange={(e) => setNuevaReferenciaPersonal({ ...nuevaReferenciaPersonal, nombre: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Teléfono"
                  className="p-2 border rounded"
                  value={nuevaReferenciaPersonal.telefono}
                  onChange={(e) => setNuevaReferenciaPersonal({ ...nuevaReferenciaPersonal, telefono: e.target.value })}
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Relación"
                    className="flex-1 p-2 border rounded"
                    value={nuevaReferenciaPersonal.relacion}
                    onChange={(e) => setNuevaReferenciaPersonal({ ...nuevaReferenciaPersonal, relacion: e.target.value })}
                  />
                  <button
                    onClick={handleAddReferenciaPersonal}
                    className="bg-green-500 text-white p-2 rounded">
                    +
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {referenciasPersonales.map((ref, i) => (
                  <div key={i} className="mb-1">
                    {ref.nombre} - {ref.telefono} ({ref.relacion})
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Documentos Médicos */}
        <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Documentos Médicos</h2>
          <div className="space-y-4">
            
            {/* Scanner de Documento */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Scanner de Documento de Identidad</h3>
              <input
                type="file"
                onChange={(e) => handleDocumentChange(e, 'scannerDocumento')}
                className="w-full p-2 border rounded"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              {documentos.scannerDocumento && (
                <p className="text-sm text-green-600 mt-1">Archivo cargado: {documentos.scannerDocumento}</p>
              )}
            </div>

            {/* Tarjeta Profesional */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Tarjeta Profesional</h3>
              <input
                type="file"
                onChange={(e) => handleDocumentChange(e, 'tarjetaProfesional')}
                className="w-full p-2 border rounded"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              {documentos.tarjetaProfesional && (
                <p className="text-sm text-green-600 mt-1">Archivo cargado: {documentos.tarjetaProfesional}</p>
              )}
            </div>

            {/* Título Refrendado */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Título Refrendado y Registrado</h3>
              <input
                type="file"
                onChange={(e) => handleDocumentChange(e, 'tituloRefrendado')}
                className="w-full p-2 border rounded"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              {documentos.tituloRefrendado && (
                <p className="text-sm text-green-600 mt-1">Archivo cargado: {documentos.tituloRefrendado}</p>
              )}
            </div>

            {/* Acta de Grado */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Acta de Grado</h3>
              <input
                type="file"
                onChange={(e) => handleDocumentChange(e, 'actaGrado')}
                className="w-full p-2 border rounded"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              {documentos.actaGrado && (
                <p className="text-sm text-green-600 mt-1">Archivo cargado: {documentos.actaGrado}</p>
              )}
            </div>
          </div>
        </div>

        {/* Documentos Personales */}
        <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Documentos Personales</h2>
          <div className="space-y-4">
            
            {/* Acta de Nacimiento */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Acta de Nacimiento</h3>
              <input
                type="file"
                onChange={(e) => handleDocumentChange(e, 'actaNacimiento')}
                className="w-full p-2 border rounded"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              {documentos.actaNacimiento && (
                <p className="text-sm text-green-600 mt-1">Archivo cargado: {documentos.actaNacimiento}</p>
              )}
            </div>

            {/* Antecedentes */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Antecedentes (Judiciales y Disciplinarios)</h3>
              <input
                type="file"
                onChange={(e) => handleDocumentChange(e, 'antecedentes')}
                className="w-full p-2 border rounded"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              {documentos.antecedentes && (
                <p className="text-sm text-green-600 mt-1">Archivo cargado: {documentos.antecedentes}</p>
              )}
            </div>

            {/* CV PDF (Opcional) */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">CV PDF</h3>
              <input
                type="file"
                onChange={(e) => handleDocumentChange(e, 'cvPdf')}
                className="w-full p-2 border rounded"
                accept=".pdf"
              />
              {documentos.cvPdf && (
                <p className="text-sm text-green-600 mt-1">Archivo cargado: {documentos.cvPdf}</p>
              )}
            </div>

            {/* Carta de Recomendación */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Carta de Recomendación (Opcional)</h3>
              <input
                type="file"
                onChange={(e) => handleDocumentChange(e, 'cartaRecomendacion')}
                className="w-full p-2 border rounded"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              {documentos.cartaRecomendacion && (
                <p className="text-sm text-green-600 mt-1">Archivo cargado: {documentos.cartaRecomendacion}</p>
              )}
            </div>
          </div>
        </div>

        {/* Botón de Guardar - modificado para usar handleSubmit */}
      <Link to="/pagusuario">
        <div className="mt-6 flex justify-start w-full">
          <button
            className="w-full mt-4 bg-[#00102D] text-white p-2 rounded-md hover:bg-[#001a4a] transition-colors"
            onClick={handleSubmit}>
            Enviar Solicitud y Volver
          </button>
        </div>
      </Link>
    </div>
  </div>
  );
};


export default Cards;