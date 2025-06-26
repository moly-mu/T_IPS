import { useState } from "react";
import { Link } from "react-router-dom"; 
import React from "react";
import axios from "axios"

const inputs = [
  {id: 0, label: "Primer Nombre", name:"primerNombre", placeholder: "Introduce tu primer nombre", value: "priemerNombre", type: "text"},
  {id: 1, label: "Segundo Nombre (Opcional)", name:"segundoNombre", placeholder: "Introduce tu segundo nombre", value: "segundoNombre", type: "text"},
  {id: 2, label: "Primer Apellido", name:"primerApellido", placeholder: "Introduce tu primer apellido", value: "primerApellido", type:"text"},
  {id: 3, label: "Segundo Apellido (Opcional)", name:"segundoApellido", placeholder: "Introduce tu segundo apellido", value: "segundoApellido", type:"text"},
  {id: 4, label: "Número de Documento", name:"numeroDocumento", placeholder: "Introduce tu número de documento", value: "numeroDocumento", type:"text"},
  {id: 5, label: "Correo electrónico", name:"correo", placeholder: "Introduce tu correo electrónico", value: "correo", type:"email"},
  {id: 6, label: "Contraseña", name:"contraseña", placeholder: "Introduce tu contraseña", value: "contraseña", type:"password"},
]

const Sregistro = () => {
  const [result, setResult] = useState()
  const [formData, setFormData] = useState({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    tipoDocumento: "",
    numeroDocumento: "",
    correo:  "",
    contraseña: "",
  })

  const handleInputChange = (e) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("✔ Enviando formulario...");

    try {
      console.log("esto tambien se envio")
      const result = await axios.post("http://localhost:3000/api/saveUser", formData);


      setResult(result)
    } catch (err) {
      console.log(err);
    }
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
              <a href="/Pins" className="text-sm font-light text-gray-600 hover:text-gray-900 transition-colors tracking-wide">
                MÉDICO
              </a>
              <a href="/Sins" className="text-sm font-medium text-gray-900 border-b border-gray-900 pb-1 tracking-wide">
                INICIAR SESIÓN
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  };


    return (
      <div>
        <Navbar/>
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
          <div className="w-full max-w-4xl shadow-lg rounded-md bg-[#00102D] p-8">
            {/* formulario registro */}
            <form onSubmit={handleSubmit}>
              <div className="mb-6 text-center">
                <h3 className="text-white text-3xl font-extrabold">Registrarse</h3>
                <p className="text-sm mt-4 text-gray-300">
                  ¿Ya tienes cuenta?{" "}
                  <Link
                    to="/Sins"
                    className="text-[#FFCB00] font-semibold hover:underline ml-1">
                    Iniciar sesión aquí
                  </Link>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inputs.map((input) => (
                  <React.Fragment key={input.id}>
                    {input.id === 4 && (
                      <div>
                        <label className="text-gray-300 text-sm block mb-2">
                          Tipo de Documento
                        </label>
                        <select
                          name="tipoDocumento"
                          required
                          className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#FFCB00] focus:bg-transparent px-6 py-3 outline-none rounded-md"
                          value={formData.tipoDocumento}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled>
                            Selecciona un tipo de documento
                          </option>
                          <option value="cc" className="text-black bg-white">
                            Cédula de Ciudadanía
                          </option>
                          <option value="ti" className="text-black bg-white">
                            Tarjeta de Identidad
                          </option>
                          <option value="ce" className="text-black bg-white">
                            Cédula de Extranjería
                          </option>
                          <option value="pasaporte" className="text-black bg-white">
                            Pasaporte
                          </option>
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="text-gray-300 text-sm block mb-2">
                        {input.label}
                      </label>
                      <input
                        name={input.name}
                        type={input.type}
                        required
                        className="w-full text-gray-200 text-sm bg-gray-700 border-b border-gray-500 focus:border-[#FFCB00] focus:bg-transparent px-6 py-3 outline-none rounded-md"
                        placeholder={input.placeholder}
                        value={formData[input.name]}
                        onChange={handleInputChange}
                      />
                    </div>
                  </React.Fragment>
                  
                ))}
              </div>

              {
                result && <p className={`w-full h-auto text-center ${result.data.color} text-white mb-2 rounded-xl`}>{result.data.message}</p>
              }
  
              {/* botones de accion */}
              <div className="mt-8 flex gap-4">
                <Link to="/">
                <button
                  type="button"
                  className="flex-1 shadow-md py-3 px-5 text-base tracking-wide rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none">
                  Cancelar
                </button>
                </Link>

                {/* <Link to="/"> */}
                <button
                  type="submit"
                  className="flex-1 shadow-md py-3 px-5 text-base tracking-wide rounded-md text-[#00102D] bg-[#FFCB00] hover:bg-[#FFC107] focus:outline-none"
                  >
                  Registrarme
                </button>
                {/* </Link> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default Sregistro;
  