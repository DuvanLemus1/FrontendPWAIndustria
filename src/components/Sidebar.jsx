
import { Link } from "react-router-dom";
import useAuth from '../hooks/UseAuth.jsx'
import { useState, useEffect } from "react";
const Sidebar = () => {

    const {auth} =  useAuth();

    const [authState, setAuthState] = useState(auth);

            useEffect(() => {
            setAuthState(auth);
            }, [auth]);


    return (
    
        <aside className="md:w-80 lg:w-96 px-5 py-10">

            <p className="text-xl font-bold"> Hola, {authState.nombreDoctor}. </p>
            <p className="text-sm font-bold">Tu suscripcion termina en: { authState && authState.fechaFinSuscripcion && authState.fechaFinSuscripcion.toString()}</p>
            
            <Link
                to="/pacientes/crearPaciente"
                className="bg-sky-600 w-full p-3 text-white 
                          uppercase font-bold block mt-5 text-center 
                          rounded-lg"
            >Nuevo Paciente</Link>


            <Link
                to="/proveedores/crearProveedor"
                className="bg-sky-600 w-full p-3 text-white 
                          uppercase font-bold block mt-5 text-center 
                          rounded-lg"
            >Nuevo Proveedor</Link>

            <Link
                to="/perfilDoctor"
                className="bg-sky-600 w-full p-3 text-white 
                          uppercase font-bold block mt-5 text-center 
                          rounded-lg"
            >Ver Perfil</Link>

        </aside>
    
    

  )
}

export default Sidebar;
