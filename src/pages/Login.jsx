import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import axios from "axios";

const Login = () => {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setcontrasena] = useState("");
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([contrasena, correoElectronico].includes('')){
      setAlerta({
        msg:'Todos los campos son requeridos',
        error: true
      })
    }

    try {
      const {data} = await axios.post("http://localhost:4000/api/doctores/login", {
        "correoElectronico":correoElectronico,
        "contrasena":contrasena,
      });

      setAlerta({})
      localStorage.setItem('token',data.token)

      console.log(data);
    } catch (error) {
      setAlerta({
        msg:error.response.data.msg,
        error:true
      })
    }
  };

  const {msg} = alerta;

  return (
    <>
      <div>
        <h1 className="text-sky-600 font-black text-5xl capitalize text-center">Inicia Sesión y administra tu clínica</h1>
        <br></br>
      </div>

      {msg && <Alerta alerta={alerta}/>}

      <form onSubmit={handleSubmit} className="flex flex-col p-5 items-center my-10 bg-white rounded-lg shadow">

        <div className="group relative m-4 flex justify-center">
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
        <span className="absolute transition-all my-2 top-10 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">📧 Ingresa tu dirección de correo asociada</span>
        </div>
        <label htmlFor="contrasena" className="sr-only">
          Contraseña
        </label>
        <input
          type="password"
          id="contrasena"
          name="contrasena"
          
          value={contrasena}
          onChange={(e) => setcontrasena(e.target.value)}
          placeholder="Contraseña"
          className="border p-2 rounded-md mb-4 w-64"
        />
        <div>
          <button
            type="submit"
            className="bg-sky-600 font-bold text-white px-4 py-2 rounded-md hover:bg-sky-800 transition-colors duration-300"
          >
            Iniciar sesión
          </button>
        </div>

        <nav className="lg:flex lg:justify-between">
          <Link to='registrar' className="block text-center my-5 text-slate-600 uppercase hover:text-sky-500 transition-colors duration-200 text-sm">
            ¿No tienes una cuenta? Regístrate
          </Link>
        </nav>

        <nav className="lg:flex lg:justify-between">
          <Link to='olvideContrasena' className="block text-center my-5 text-slate-600 hover:text-sky-500 transition-colors duration-200 uppercase text-sm">
            ¿Olvidaste tu contrasena? Reestablécela
          </Link>
        </nav>
    </form>


    </>
  );
}

export default Login
