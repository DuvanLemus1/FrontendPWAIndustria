
import { Link } from "react-router-dom";
import useAuth from '../hooks/UseAuth.jsx'
import { useState, useEffect } from "react";
import useDoctor from "../hooks/UseDoctor.jsx";

const Sidebar = () => {

    const {auth} = useAuth();
    const [open, setOpen] = useState(true);
    const Menus = [
        { title: "Paciente", src: "paciente2-64", ir:"/pacientes/crearPaciente"},
        { title: "Proveedor", src: "proveedor64", ir:"/proveedores/crearProveedor"},
        { title: "Mi Perfil", src: "miperfil64", ir:"/perfilDoctor"}
      ];

      const {obtenerDoctor, 
        doctor} = useDoctor();


    useEffect(()=>{
    obtenerDoctor(auth.idDoctor)
    }, []);

    const {nombreDoctor,
           apellidoDoctor} = doctor

    return (
       
        <aside className="md:w-80 lg:w-96 px-5 py-3">
         <img
            src = "../../src/assets/icons/control64_up.png"
            className={`absolute top-15 right-7 w-7 border-dark-purple
            border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
            /> 
        <p className="text-xl font-bold"> Hola, {nombreDoctor} {apellidoDoctor}. </p>
            
        <ul className="pt-2 md:pt-6 grid justify-items-center md:justify-items-start ">
            <div
                className={` ${
                open ? "h-70" : "h-0 "
                }  relative duration-300 `}
            >
              {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-sky-600 font-bold text-lg gap-x-4
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <span className={`${!open && "hidden"} origin-top duration-500`}>
              <Link to={`${Menu.ir}`}><img src={`../src/assets/icons/${Menu.src}.png`} /></Link>
              </span >
              <span className={`${!open && "hidden" } origin-top duration-500`}>
              <Link to={`${Menu.ir}`}>{Menu.title}</Link>
              </span >
            </li>
          ))}
          </div>
        </ul>
        
    </aside>
    
    
   
  )
}

export default Sidebar;
