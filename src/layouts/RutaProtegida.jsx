
import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/UseAuth"
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const RutaProtegida = () => {

    const {auth, cargando} = useAuth();
    
    if(cargando){
        return 'Cargando...'
    }

    
  return (
    <>
        {auth.idDoctor ?
        ( 
          <div className="bg-gray-100">
            <Header/>
            <div className="md:flex md:min-h-screen">
              <Sidebar/>

              <main className="p-10 flex-1">
                <Outlet/>  
              </main>
            </div>
          </div>
        ): <Navigate to='/' />}
    
    </>
  )
}

export default RutaProtegida
