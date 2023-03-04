
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {

  const [alerta, setAlerta]=useState({});
  const [cuentaConfirmada, setCuentaConfirmada]=useState(false);
  const params = useParams();
  const {token} = params;

  useEffect(()=>{
    const confirmarCuenta = async () => {
      try {
        const url = `http://localhost:4000/api/doctores/confirmarCuenta/${token}`
        const {data} = await axios(url);
        console.log(data)
        
        setAlerta({
          msg: data.msg,
          error: false
        })
        
        setCuentaConfirmada(true);
        console.log(cuentaConfirmada)
        
      } catch (error) {
        setAlerta({
          msg:error.response.data.msg,
          error:true
        })
      }
    }
    confirmarCuenta();
  }, []);

  const {msg}=alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl capitalize text-center">
          Cuenta Confirmada</h1>

      <div>
        {msg && <Alerta alerta={alerta}/>}

        {cuentaConfirmada && (
          <Link to='/' className="block text-center mt-10 text-slate-600 hover:text-slate-800 transition-colors duration-300 uppercase text-sm">
          Inicia Sesión
        </Link>
        )}
        <Link to='/' className="block text-center mt-10 text-slate-600 hover:text-slate-800 transition-colors duration-300 uppercase text-sm">
          Inicia Sesión
        </Link>

      </div>
    </>
  )
}

export default ConfirmarCuenta
