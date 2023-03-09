
import { Link, useNavigate } from "react-router-dom"




const Header = () => {
    const navigate = useNavigate();
    

    const handleClick = ()=>{
        localStorage.removeItem('token')
        
        setTimeout(()=>{
            navigate('/');
        }, 1000)
    }

  return (
    <>
    <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between ">
            <h2 className="text-4xl text-sky-600 font-black 
                           text-center">
                 Sistema de Pacientes 
            </h2>

            <input 
                type="search"
                placeholder="Buscar Paciente"
                className="rounded-lg lg:w-96 block p-2 border"
                >
            
            </input>

            <div className="flex items-center gap-4">
                <Link
                    to="/pacientes"
                    className="font-bold uppercase
                                hover:text-sky-700 
                                transition-colors"
                >Lista de Pacientes</Link>
                <Link
                    to="/proveedores"
                    className="font-bold uppercase
                                hover:text-sky-700 
                                transition-colors"
                >Lista de Proveedores</Link>
                <button
                    type="button"
                    className="text-white text-sm bg-sky-600 rounded-md uppercase p-2.5  font-bold"
                    onClick={handleClick}
                >Cerrar Sesión</button>
            </div>
        </div>


    </header>
    </>
  )
}

export default Header
