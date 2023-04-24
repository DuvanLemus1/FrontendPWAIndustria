import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import Alerta from "../components/Alerta.jsx";
import dotenv from 'dotenv';

const Registrar = () => {

  const [nombreDoctor, setNombreDoctor] = useState("");
  const [segundoNombreDoctor, setSegundoNombreDoctor] = useState("");
  const [apellidoDoctor, setApellidoDoctor] = useState("");
  const [segundoApellidoDoctor, setSegundoApellidoDoctor] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setcontrasena] = useState("");
  const [repetirContrasena, setRepetirContrasena] = useState("");
  const [telefono, setTelefono] = useState("");
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
  const [tipoSuscripcion, setTipoSuscripcion] = useState("");
  const [fechaInicioSuscripcion, setFechaInicioSuscripcion]= useState("");
  const [fechaFinSuscripcion, setFechaFinSuscripcion]= useState("");
  const [costoSuscripcion, setCostoSuscripcion] = useState("")
  const [fechaInicioNuevaSuscripcion, setFechaIncioNuevaSuscripcion]= useState("");
  const [fechaFinNuevaSuscripcion, setFechaFinNuevaSuscripcion]= useState("");
  const [costoNuevaSuscripcion, setCostoNuevaSuscripcion] = useState("")
  const [renovacionAutomatica, setRenovacionAutomatica] = useState(false)

  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regexNumeros=/\d/;

    if(regexNumeros.test(nombreDoctor)         ||
       regexNumeros.test(segundoNombreDoctor)  ||
       regexNumeros.test(apellidoDoctor)       ||
       regexNumeros.test(segundoApellidoDoctor)){
      setAlerta({
        msg:'Los campos que conforman tu nombre no pueden contener números',
        error:true
      })
      return;
    }

    const regexLetras=/^\d+$/;
    if(!regexLetras.test(telefono)){
      setAlerta({
        msg:'Tu número de teléfono no puede contener letras',
        error:true
      })
      return;
    }
    
    const regexContrasena = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/\\])(?!.*\s).{8,15}$/;
    if(!regexContrasena.test(contrasena)){
      setAlerta({
        msg:'Sigue las especificaciones de contrasena para potenciar la seguridad de tu cuenta',
        error:true
      })
      return;
    }

    if(contrasena!==repetirContrasena){
      setAlerta({
        msg:'Las contrasenas no son iguales',
        error:true
      })
      return;
    }

    try {
      const {data} = await axios.post(`${process.env.BACKEND_URL}/doctores`, {
        "nombreDoctor":nombreDoctor,
        "segundoNombreDoctor":segundoNombreDoctor,
        "apellidoDoctor":apellidoDoctor,
        "segundoApellidoDoctor":segundoApellidoDoctor,
        "correoElectronico":correoElectronico,
        "contrasena":contrasena,
        "telefono":telefono,
        "tipoSuscripcion":tipoSuscripcion,
        "fechaInicioSuscripcion":fechaInicioSuscripcion,
        "fechaFinSuscripcion":fechaFinSuscripcion,
        "costoSuscripcion":costoSuscripcion,
        "renovacionAutomatica":renovacionAutomatica
      });
      setAlerta({
        msg:data.msg,
        error:false
      })
      
    } catch (error) {
      setAlerta({
        msg:error.response.data.msg,
        error:true
      });
    }
  };

  const {msg}=alerta;

  const handleClick = (e) => {
    const renovacionAutomatica = e.target.checked;
    setRenovacionAutomatica(!renovacionAutomatica);
  }

  const handleOptionChange = (e) => {
    const opcionSeleccionada = e.target.value;
    const fechaInicio = new Date();
    const anio = fechaInicio.getFullYear()
    const mes  = (fechaInicio.getMonth()+1).toString().padStart(2, '0'); 
    const dia  = fechaInicio.getDate().toString().padStart(2, '0');
    const fechaFormateada = `${anio}-${mes}-${dia}`
    const fechaFormateadaOriginal = new Date(fechaFormateada);
  
    if (opcionSeleccionada === "1") {
      fechaFormateadaOriginal.setDate(fechaFormateadaOriginal.getDate() + 30);
      setTipoSuscripcion(1);
      setCostoSuscripcion(100);
    } else if (opcionSeleccionada === "2") {
      fechaFormateadaOriginal.setDate(fechaFormateadaOriginal.getDate() + 90);
      setTipoSuscripcion(2);
      setCostoSuscripcion(300);
    } else if (opcionSeleccionada === "3") {
      fechaFormateadaOriginal.setDate(fechaFormateadaOriginal.getDate() + 365);
      setTipoSuscripcion(3);
      setCostoSuscripcion(1200);
    }
  
    const anio2 = fechaFormateadaOriginal.getFullYear()
    const mes2  = (fechaFormateadaOriginal.getMonth()+1).toString().padStart(2, '0'); 
    const dia2  = fechaFormateadaOriginal.getDate().toString().padStart(2, '0');
    const fechaFormateada2 = `${anio2}-${mes2}-${dia2}`;
  
    setOpcionSeleccionada(opcionSeleccionada);
    setFechaInicioSuscripcion(fechaFormateada);
    setFechaFinSuscripcion(fechaFormateada2);
  };

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
          className="border p-2 rounded-md mb-4 sm:w-80 "
        />
        <label htmlFor="segundoNombreDoctor" className="sr-only">
          Segundo Nombre
        </label>
        <input
          type="text"
          id="segundoNombreDoctor"
          name="segundoNombreDoctor"
          
          value={segundoNombreDoctor}
          onChange={(e) => setSegundoNombreDoctor(e.target.value)}
          placeholder="Segundo Nombre"
          className="border p-2 rounded-md mb-4 sm:w-80"
        />
        <label htmlFor="apellidoDoctor" className="sr-only">
          Apellido
        </label>
        <input
          type="text"
          id="apellidoDoctor"
          name="apellidoDoctor"
          required
          value={apellidoDoctor}
          onChange={(e) => setApellidoDoctor(e.target.value)}
          placeholder="Apellido"
          className="border p-2 rounded-md mb-4 sm:w-80"
        />
        <label htmlFor="segundoApellidoDoctor" className="sr-only">
          Segundo Apellido
        </label>
        <input
          type="text"
          id="segundoApellidoDoctor"
          name="segundoApellidoDoctor"
          
          value={segundoApellidoDoctor}
          onChange={(e) => setSegundoApellidoDoctor(e.target.value)}
          placeholder="Segundo Apellido"
          className="border p-2 rounded-md mb-4 sm:w-80"
        />
        
        <label htmlFor="correoElectronico" className="sr-only">
          Correo electrónico
        </label>
        <input
          type="email"
          id="correoElectronico"
          name="correcoElectronico"
          required
          value={correoElectronico}
          onChange={(e) => setCorreoElectronico(e.target.value)}
          placeholder="Correo electrónico"
          className="border p-2 rounded-md mb-4 sm:w-80"
        />

        <div className="group relative m-1 flex justify-center">
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
          className="border p-2 rounded-md mb-4 sm:w-80 "
        />
        <span className="absolute transition-all my-2 top-10 scale-0 rounded
                       bg-gray-800 p-2 text-sm text-white group-hover:scale-100">
                        🔒 Tu contraseña debe cumplir los siguientes requisitos:
                        <br/> ⦁ Entre 8 y 15 caracteres
                        <br/> ⦁ Al menos un número
                        <br/> ⦁ Una letra minúscula
                        <br/> ⦁ Una letra mayúscula 
                        <br/> ⦁ Un caracter especial ()</span>
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
          className="border p-2 rounded-md mb-4 sm:w-80 "
        />

        <label htmlFor="telefono" className="sr-only">
          Teléfono
        </label>
        <input
          type="text"
          id="telefono"
          name="telefono"
          required
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Número de telefono"
          className="border p-2 rounded-md mb-4 sm:w-80 "
        />

        <div className="border p-2 rounded-lg shadow-md mb-3 ">
          <div >
            <p className="flex justify-center mb-3 ">
              Elije tu tipo de suscripción - LPS. 100.00 al mes</p>

            <li className =" sm:flex list-none" >
            <ul className =" px-20 sm:px-0"><label htmlFor="fechaInicioSuscripcion1" className="font-bold ">
            <input
              type="radio"
              id="fechaInicioSuscripcion1"
              name="opciones"
              required
              value="1"
              onChange={handleOptionChange}
              className="border p-2 rounded-md mb-4 mx-3 "
            />Mensual</label> </ul> 

            <ul className =" px-20 sm:px-0"><label htmlFor="fechaInicioSuscripcion2" className="font-bold ">
            <input
              type="radio"
              id="fechaInicioSuscripcion2"
              name="opciones"
              required
              value="2"
              onChange={handleOptionChange}
              className="border p-2 rounded-md mb-4 mx-3 "
            />Trimestral</label> </ul>

            <ul className ="px-20 sm:px-0" ><label htmlFor="fechaInicioSuscripcion3" className="font-bold ">
            <input
              type="radio"
              id="fechaInicioSuscripcion3"
              name="opciones"
              required
              value="3"
              onChange={handleOptionChange}
              className="border p-2 rounded-md mb-4 mx-3 "
            />Anual</label></ul>
            </li>
          </div>
          <div className="flex justify-center">
            <label htmlFor="renovacionAutomatica">
              <input
                onClick={handleClick}
                className="mx-2" 
                type="checkbox" 
                id="renovacionAutomatica" 
                name="renovacionAutomatica" 
                value={renovacionAutomatica}
                onChange={(e) => setRenovacionAutomatica(e.target.checked)}/>
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
