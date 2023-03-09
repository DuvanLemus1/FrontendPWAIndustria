
import { Link } from "react-router-dom";
import useAuth from '../hooks/UseAuth.jsx'

const Sidebar = () => {

    const {auth} = useAuth();

    return (
    
        <aside className="md:w-80 lg:w-96 px-5 py-10">

            <p className="text-xl font-bold"> Hola, {auth.nombreDoctor}. </p>
            
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

        </aside>
    
    

  )
}

export default Sidebar;
