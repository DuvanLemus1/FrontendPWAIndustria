import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Alerta from "../components/Alerta.jsx";
import axios from "axios";

const NuevaContrasena = () => {

  const [tokenValido, setTokenValido] =useState(false);
  const [contrasenaModificada, setContrasenaModificada] =useState(false);
  const [alerta, setAlerta] = useState({});
  const [contrasena, setContrasena] = useState("");
  const params = useParams();
  const {token} = params;



  useEffect(()=>{
      const comprobarToken = async()=>{
        try {
            await axios(`${import.meta.env.VITE_BACKEND_URL}/api/doctores/olvideContrasena/${token}`)
            setTokenValido(true);

        } catch (error) {
            setAlerta({
              msg:error.response.data.msg,
              error:true
            })
        }
      }
      comprobarToken();
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(contrasena === '' || contrasena.length<2){
      setAlerta({
        msg:"Ingresa una contraseña más segura",
        error:true
      });
      return;
    }



    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/doctores/olvideContrasena/${token}`, {
        "contrasena":contrasena
      });
      setAlerta({
        msg:data.msg,
        error:false
      })
      setContrasenaModificada(true);

    } catch (error) {
      setAlerta({
        msg:error.response.data.msg,
        error:true
      })
    }
  };

  const{msg} = alerta;

  return (
    <>
      <div>
        <h1 className="text-sky-600 font-black text-5xl capitalize text-center">Recupera el acceso a tu cuenta</h1>
        <br></br>
      </div>

      {msg && <Alerta alerta={alerta}/>}

      {tokenValido &&(<form onSubmit={handleSubmit} className="flex flex-col p-5 items-center my-10 bg-white rounded-lg shadow">

        <label htmlFor="contrasena" className="sr-only">
          Nueva Contrasena
        </label>
        <input
          type="password"
          id="contrasena"
          name="contrasena"
          required
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          placeholder="Nueva contraseña"
          className="border p-2 rounded-md mb-4 w-64"
        />

        {msg && <Alerta alerta={alerta}/>}

        <button
          type="submit"
          className="bg-sky-600 font-bold text-white px-4 py-2 rounded-md hover:bg-sky-800 transition-colors duration-300"
        >
          Guardar nueva contraseña
        </button>

        {contrasenaModificada && (
          <Link to='/' className="block text-center mt-10 text-slate-600 hover:text-slate-800 transition-colors duration-300 uppercase text-sm">
          Inicia Sesión
        </Link>
        )}
        

        </form>)}

        
        

    </>
  );

}

export default NuevaContrasena;
