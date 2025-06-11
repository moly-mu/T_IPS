import { useState } from "react";
import Barral from "./Barral";
import { Link } from "react-router-dom";

const Cards = () => {
  const [trabajos, setTrabajos] = useState([]);
  const [nuevoTrabajo, setNuevoTrabajo] = useState({ trabajo: "", experiencia: "" });

  const [idiomas, setIdiomas] = useState([]);
  const [nuevoIdioma, setNuevoIdioma] = useState("");

  const [educacion, setEducacion] = useState("");
  const [habilidades, setHabilidades] = useState("");
  const [referencias, setReferencias] = useState("");

  const [certificados, setCertificados] = useState([]);
  const [foto, setFoto] = useState(null);

  const [informacionPersonal, setInformacionPersonal] = useState({
    nombre: "",
    apellidos: "",
    edad: "",
    sexo: "",
    direccion: "",
    fechaNacimiento: "",
    telefono: "",
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

  const handleAddCertificado = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCertificados([...certificados, file.name]);
    }
  };

  // funcion para manejar los cambios en la información personal
  const handleChangeInfoPersonal = (e) => {
    const { name, value } = e.target;
    setInformacionPersonal({ ...informacionPersonal, [name]: value });
  };

  //la carga de la foto
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result); // guardamos la foto en base64
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 flex">
      <Barral />

      {/* contenedor principal con un margen izquierdo suficiente para el sidebar */}
      <div className="flex-1 mt-12 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="col-span-1 lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Sobre mí</h2>
          <textarea
            className="w-full h-56 border border-gray-300 p-3 rounded-md resize-none"
            placeholder="Escribe una breve descripción sobre ti..."
          ></textarea>
        </div>

        {/* foto */}
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
            id="fotoInput"/>
          <button
            onClick={() => document.getElementById("fotoInput").click()}
            className="w-full mt-4 bg-[#00102D] text-white p-2 rounded-md">
            {foto ? "Cambiar Foto" : "Subir Foto"}
          </button>
        </div>

        {/* infprmacio profesional */}
        <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Información Profesional</h2>
          <div className="space-y-6">

            {/* trabajos previos */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Trabajos Previos</h3>
              <div className="flex gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Trabajo"
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
              <ul>{trabajos.map((t, i) => <li key={i}>{t.trabajo} - {t.experiencia}</li>)}</ul>
            </div>

            {/* idiomas */}
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
              <ul>{idiomas.map((idioma, i) => <li key={i}>{idioma}</li>)}</ul>
            </div>

            {/* educacion */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Educación</h3>
              <input
                type="text"
                placeholder="Nivel Educativo"
                className="w-full p-2 border rounded"
                value={educacion}
                onChange={(e) => setEducacion(e.target.value)}/>
            </div>

            {/* habilidades */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Habilidades Técnicas</h3>
              <input
                type="text"
                placeholder="Habilidad"
                className="w-full p-2 border rounded"
                value={habilidades}
                onChange={(e) => setHabilidades(e.target.value)}/>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Referencias</h3>
              <input
                type="text"
                placeholder="Referencia"
                className="w-full p-2 border rounded"
                value={referencias}
                onChange={(e) => setReferencias(e.target.value)}
              />
            </div>

            {/* certificados */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Certificados</h3>
              <input
                type="file"
                onChange={handleAddCertificado}
                className="w-full p-2 border rounded"/>
              <ul className="mt-2">{certificados.map((c, i) => <li key={i}>{c}</li>)}</ul>
            </div>
          </div>
        </div>

        {/* información Personal */}
        <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Información Personal</h2>
          <div className="space-y-4">
            {/* Nombre */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Nombre</h3>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                className="w-full p-2 border rounded"
                value={informacionPersonal.nombre}
                onChange={handleChangeInfoPersonal}
              />
            </div>

            {/* apellidos */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Apellidos</h3>
              <input
                type="text"
                name="apellidos"
                placeholder="Apellidos"
                className="w-full p-2 border rounded"
                value={informacionPersonal.apellidos}
                onChange={handleChangeInfoPersonal}
              />
            </div>

            {/* edad */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Edad</h3>
              <input
                type="number"
                name="edad"
                placeholder="Edad"
                className="w-full p-2 border rounded"
                value={informacionPersonal.edad}
                onChange={handleChangeInfoPersonal}
              />
            </div>

            {/* sexo */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Sexo</h3>
              <select
                name="sexo"
                className="w-full p-2 border rounded"
                value={informacionPersonal.sexo}
                onChange={handleChangeInfoPersonal}
              >
                <option value="">Selecciona un sexo</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Dirección</h3>
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                className="w-full p-2 border rounded"
                value={informacionPersonal.direccion}
                onChange={handleChangeInfoPersonal}
              />
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Teléfono</h3>
              <input
                type="text"
                name="telefono"
                placeholder="Número de teléfono"
                className="w-full p-2 border rounded"
                value={informacionPersonal.telefono}
                onChange={handleChangeInfoPersonal}
              />
            </div>
          </div>
        </div>

        {/* boton de guardar cambios */}
        <Link to="/pagusuario">
        <div className="mt-6 flex justify-start w-full">
          <button
            className="w-full mt-4 bg-[#00102D] text-white p-2 rounded-md"
            onClick={() => alert("Cambios guardados con éxito")}>
            Guardar Cambios y Volver
          </button>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Cards;
