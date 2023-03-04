import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import Alerta from "../components/Alerta.jsx";


const Registrar = () => {

  const [nombreDoctor, setNombreDoctor] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setcontrasena] = useState("");
  const [repetirContrasena, setRepetirContrasena] = useState("");
  const [telefono, setTelefono] = useState("");
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([nombreDoctor, correoElectronico, contrasena, repetirContrasena, telefono].includes('')){
      setAlerta({
        msg:'Todos los campos son obligatorios',
        error:true
      })
      return;
    }

    try {
      const {data} = await axios.post("http://localhost:4000/api/doctores", {
        "nombreDoctor":nombreDoctor,
        "correoElectronico":correoElectronico,
        "contrasena":contrasena,
        "telefono":telefono
      });
      setAlerta({
        msg:data.msg,
        error:false
      })
      console.log(data);
    } catch (error) {
      setAlerta({
        msg:error.response.data.msg,
        error:true
      });
    }
  };

  const {msg}=alerta;

  return (
    <>
      <div>
        <h1 className="text-sky-600 font-black text-5xl capitalize text-center">
          Registra tu cuenta para comenzar</h1>
        <br></br>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col p-5 items-center my-10 bg-white rounded-lg shadow">
      <label htmlFor="nombreDoctor" className="sr-only">
          Nombre
        </label>
        <input
          type="text"
          id="nombreDoctor"
          name="nombreDoctor"
          required
          value={nombreDoctor}
          onChange={(e) => setNombreDoctor(e.target.value)}
          placeholder="Nombre"
          className="border p-2 rounded-md mb-4 w-64"
        />
        
        <label htmlFor="correoElectronico" className="sr-only">
          Correo electrónico
        </label>
        <input
          type="email"
          id="correoElectronico"
          name="correcoElectronico"
          
          value={correoElectronico}
          onChange={(e) => setCorreoElectronico(e.target.value)}
          placeholder="Correo electrónico"
          className="border p-2 rounded-md mb-4 w-64"
        />

        <label htmlFor="contraseña" className="sr-only">
          Contraseña
        </label>
        <input
          type="password"
          id="contrasena"
          name="contrasena"
          required
          value={contrasena}
          onChange={(e) => setcontrasena(e.target.value)}
          placeholder="Contraseña"
          className="border p-2 rounded-md mb-4 w-64"
        />

        <label htmlFor="repetirContrasena" className="sr-only">
          Repetir Contraseña
        </label>
        <input
          type="password"
          id="repetirContrasena"
          name="repetirContrasena"
          required
          value={repetirContrasena}
          onChange={(e) => setRepetirContrasena(e.target.value)}
          placeholder="Repite tu contraseña"
          className="border p-2 rounded-md mb-4 w-64"
        />

        <label htmlFor="telefono" className="sr-only">
          Telefono
        </label>
        <input
          type="text"
          id="telefono"
          name="telefono"
          required
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Número de telefono"
          className="border p-2 rounded-md mb-4 w-64"
        />
        <button
          type="submit"
          className="bg-sky-600 font-bold text-white px-4 py-2 rounded-md hover:bg-sky-800 transition-colors duration-300"
        >
          Crear Cuenta
        </button>

        {msg && <Alerta alerta={alerta}/>}

        <nav className="lg:flex lg:justify-between">
          <Link to='/olvideContrasena' className="block text-center mt-10 text-slate-600 hover:text-slate-800 transition-colors duration-300 uppercase text-sm">
            ¿Olvidaste tu contraseña? Reestablécela
          </Link>
        </nav>

        <nav className="lg:flex lg:justify-between">
          <Link to='/' className="block text-center mt-10 text-slate-600 hover:text-slate-800 transition-colors duration-300 uppercase text-sm">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
        </nav>
    </form>

    </>
  )
}

export default Registrar
