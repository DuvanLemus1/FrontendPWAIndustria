
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react';
import useAuth from "../hooks/UseAuth";
import useDoctor from "../hooks/UseDoctor.jsx";

const Header = () => {

    

    const {auth} = useAuth();
    const {obtenerDoctor, 
           doctor} = useDoctor();
 
 
    useEffect(()=>{
    obtenerDoctor(auth.idDoctor)
    }, []);

    const {rol} = doctor

    
    const navigate = useNavigate();
    const handleClick = ()=>{
        localStorage.removeItem('token')
        
        setTimeout(()=>{
            navigate('/');
        }, 500)
    }

    

  return (
    <>
    <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between ">
            <h2 className="text-4xl text-sky-600 font-black 
                           text-center">
                 Sistema de Pacientes 
            </h2>

        

            <div className="flex items-center gap-4">
                <Link
                    to="/pacientes"
                    className="font-bold uppercase
                                hover:text-sky-700 
                                transition-colors
                                p-5 "
                >Lista de Pacientes</Link>
                <Link
                    to="/proveedores"
                    className="font-bold uppercase
                                hover:text-sky-700 
                                transition-colors p-5"
                >Lista de Proveedores</Link>


                {rol==='administrador'?
                <Link 
                className="bg-sky-400 text-sm rounded-md p-2.5 mt-3 font-bold text-white uppercase"
                to={'/panelDeControl'}
                >Panel de Control</Link>:
                <Link></Link>}
                {rol==='administrador'?
                <Link 
                className="bg-sky-400 text-sm rounded-md p-2.5 mt-3 font-bold text-white uppercase"
                to={'/historicoSuscripciones'}
                >Historico</Link>:
                <Link></Link>}
          
        
                <button
                    type="button"
                    className="text-white text-sm bg-sky-600 rounded-md uppercase p-2.5  font-bold "
                    onClick={handleClick}
                >Cerrar Sesión</button>
            </div>
        </div>


    </header>
    </>
  )
}

export default Header
