
import { Link } from "react-router-dom"

const Header = () => {
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
                    className="font-bold uppercase"
                >Pacientes</Link>
                <button
                    type="button"
                    className="text-white text-sm bg-sky-600 rounded-md uppercase p-2.5  font-bold"
                >Cerrar Sesión</button>
            </div>
        </div>


    </header>
    </>
  )
}

export default Header
