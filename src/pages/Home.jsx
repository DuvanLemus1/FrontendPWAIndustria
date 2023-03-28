import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1
        className='font-bold text-4xl
                 text-sky-600 text-center'
      >Bienvenido al sistema</h1>
      <div className='grid-cols-2 flex justify-between '>
            <Link
                to="/pacientes"
                className="bg-sky-600 w-full p-3 text-white 
                          uppercase font-bold block mt-5 text-center 
                          rounded-lg hover:bg-sky-700 transition-colors mx-3"
            >Pacientes</Link>


            <Link
                to="/proveedores"
                className="bg-sky-600 w-full p-3 text-white 
                          uppercase font-bold block mt-5 text-center 
                          rounded-lg hover:bg-sky-700 transition-colors mx-3"
            >Proveedores</Link>

            <Link
                to="/perfilDoctor"
                className="bg-sky-600 w-full p-3 text-white 
                          uppercase font-bold block mt-5 text-center 
                          rounded-lg hover:bg-sky-700 transition-colors mx-3"
            >Mi Perfil</Link>
      </div>

    </div>
  )
}

export default Home
