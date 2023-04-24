import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta.jsx";
import axios from "axios";


const OlvideContrasena = () => {

  const [correoElectronico, setCorreoElectronico] = useState("");
  const [alerta, setAlerta] = useState({});
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(correoElectronico === '' || correoElectronico.length<2){
      setAlerta({
        msg:"El correo es obligatorio",
        error:true
      });
      return;
    }



    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/doctores/olvideContrasena`, {
        "correoElectronico":correoElectronico
      });
      setAlerta({
        msg:data.msg,
        error:false
      })
    } catch (error) {
      setAlerta({
        msg:error.response.data.msg,
        error:true
      })
    }
  };

  const{msg}=alerta;

  return (
    <>
      <div>
        <h1 className="text-sky-600 font-black text-5xl capitalize text-center">Recupera el acceso a tu cuenta</h1>
        <br></br>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col p-5 items-center my-10 bg-white rounded-lg shadow">

        <label htmlFor="correoElectronico" className="sr-only">
          Correo electrónico
        </label>
        <input
          type="email"
          id="correoElectronico"
          name="correoElectronico"
          required
          value={correoElectronico}
          onChange={(e) => setCorreoElectronico(e.target.value)}
          placeholder="Correo electrónico"
          className="border p-2 rounded-md mb-4 w-64"
        />

        {msg && <Alerta alerta={alerta}/>}

        <button
          type="submit"
          className="bg-sky-600 font-bold text-white px-4 py-2 rounded-md hover:bg-sky-800 transition-colors duration-300"
        >
          Enviar correo
        </button>

        <nav className="lg:flex lg:justify-between">
          <Link to='/registrar' className="block text-center my-5 text-slate-600 uppercase hover:text-slate-800 transition-colors duration-300 text-sm">
            No tienes cuenta? Regístrate
          </Link>
        </nav>

    </form>

    </>
  );

  
}

export default OlvideContrasena
