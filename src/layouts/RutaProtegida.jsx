
import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/UseAuth"

const RutaProtegida = () => {

    const {auth, cargando} = useAuth();
    
    if(cargando){
        return 'Cargando...'
    }

  return (
    <>
        {auth.idDoctor ? <Outlet />:<Navigate to='/' />}
    
    </>
  )
}

export default RutaProtegida
