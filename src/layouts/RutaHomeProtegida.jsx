import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/UseAuth"
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const RutaHomeProtegida = () => {

    const {auth, cargando} = useAuth();
    
    if(cargando){
        return 'Cargando...'
    }

  return (
    <>
        {auth.idDoctor ?
        ( 
           <div className="bg-gray-100">
            
              <main className="p-10 flex-1">
                <Outlet/>  
              </main>
              
           </div>
        ): <Navigate to='/' />}
    
    </>
  )
}

export default RutaHomeProtegida