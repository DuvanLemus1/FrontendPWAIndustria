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
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
  const [fechaInicioSuscripcion, setFechaInicioSuscripcion]= useState("");
  const [fechaFinSuscripcion, setFechaFinSuscripcion]= useState("");
  const [costoSuscripcion, setCostoSuscripcion] = useState("")
  const [fechaInicioNuevaSuscripcion, setFechaIncioNuevaSuscripcion]= useState("");
  const [fechaFinNuevaSuscripcion, setFechaFinNuevaSuscripcion]= useState("");
  const [costoNuevaSuscripcion, setCostoNuevaSuscripcion] = useState("")
  const [renovacionAutomatica, setRenovacionAutomatica] = useState("")

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

    if (opcionSeleccionada === "1") {
      const fechaInicio = new Date();
      const anio = fechaInicio.getFullYear()
      const mes  = (fechaInicio.getMonth()+1).toString().padStart(2, '0'); 
      const dia  = fechaInicio.getDate().toString().padStart(2, '0');
      const fechaFormateada = `${anio}-${mes}-${dia}`
      setFechaInicioSuscripcion(fechaFormateada);

      const fechaFormateadaOriginal = new Date(fechaFormateada);
      fechaFormateadaOriginal.setDate(fechaFormateadaOriginal.getDate() + 30);
      const anio2 = fechaFormateadaOriginal.getFullYear()
      const mes2  = (fechaFormateadaOriginal.getMonth()+1).toString().padStart(2, '0'); 
      const dia2  = fechaFormateadaOriginal.getDate().toString().padStart(2, '0');
      const fechaFormateada2 = `${anio2}-${mes2}-${dia2}`
      setFechaFinSuscripcion(fechaFormateada2);

      console.log(fechaInicioSuscripcion);
      console.log(fechaFinSuscripcion);
      
      setCostoSuscripcion(100);
    } else if(opcionSeleccionada === "2"){
      const fechaInicio = new Date();
      setFechaInicioSuscripcion(fechaInicio.toISOString().slice(0, 10));
      const fechaFin = new Date(fechaInicio);
      fechaFin.setDate(fechaInicio.getDate() + 90);
      setFechaFinSuscripcion(fechaFin.toISOString().slice(0, 10));
      setCostoSuscripcion(300);
    } else{
      const fechaInicio = new Date();
      setFechaInicioSuscripcion(fechaInicio.toISOString().slice(0, 10));
      const fechaFin = new Date(fechaInicio);
      fechaFin.setDate(fechaInicio.getDate() + 365);
      setFechaFinSuscripcion(fechaFin.toISOString().slice(0, 10));
      setCostoSuscripcion(1200);
    }

    if(renovacionAutomatica === "1"){
      renovacionAutomatica === 1
    }

    try {
      const {data} = await axios.post("http://localhost:4000/api/doctores", {
        "nombreDoctor":nombreDoctor,
        "correoElectronico":correoElectronico,
        "contrasena":contrasena,
        "telefono":telefono,
        "fechaInicioSuscripcion":fechaInicioSuscripcion,
        "fechaFinSuscripcion":fechaFinSuscripcion,
        "costoSuscripcion":costoSuscripcion,
        "renovacionAutomatica":renovacionAutomatica
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

        <div className="group relative m-1 flex justify-center">
        <label htmlFor="contraseña" className="sr-only">
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
        <span className="absolute transition-all my-2 top-10 scale-0 rounded
                       bg-gray-800 p-2 text-sm text-white group-hover:scale-100">
                        🔒 Tu contraseña debe cumplir los siguientes requisitos:
                        <br/> ⦁ Entre 8 y 12 caracteres
                        <br/> ⦁ Al menos un número
                        <br/> ⦁ Una letra minúscula
                        <br/> ⦁ Una letra mayúscula 
                        <br/> ⦁ Un caracter especial</span>
        </div>
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

        <div className="border p-2 rounded-lg shadow-md mb-3">
          <div >
            <p className="flex justify-center mb-3 ">
              Elije tu tipo de suscripcion - LPS. 100.00 al mes</p>
            <label htmlFor="fechaInicioSuscripcion1" className="font-bold">
            <input
              type="radio"
              id="fechaInicioSuscripcion1"
              name="opciones"
              required
              value="1"
              onChange={(e) => setOpcionSeleccionada(e.target.value)}
              className="border p-2 rounded-md mb-4 mx-3"
            />Mensual</label>
            <label htmlFor="fechaInicioSuscripcion2" className="font-bold">
            <input
              type="radio"
              id="fechaInicioSuscripcion2"
              name="opciones"
              required
              value="2"
              onChange={(e) => setOpcionSeleccionada(e.target.value)}
              className="border p-2 rounded-md mb-4 mx-3 "
            />Trimestral</label>
            <label htmlFor="fechaInicioSuscripcion3" className="font-bold">
            <input
              type="radio"
              id="fechaInicioSuscripcion3"
              name="opciones"
              required
              value="3"
              onChange={(e) => setOpcionSeleccionada(e.target.value)}
              className="border p-2 rounded-md mb-4 mx-3 "
            />Anual</label>
          </div>
          <div className="flex justify-center">
            <label htmlFor="renovacionAutomatica">
              <input
                className="mx-2" 
                type="checkbox" 
                id="renovacionAutomatica" 
                name="renovacionAutomatica" 
                value="1"
                onChange={(e) => setRenovacionAutomatica(e.target.value)}/>
                Permitir renovacion automatica
            </label>
          </div>
        </div>

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
