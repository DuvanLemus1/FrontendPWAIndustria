import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1
        className='font-bold text-4xl
                 text-sky-600 text-center'
      >Bienvenido al sistema</h1>

            <Link
                to="/pacientes"
                className="bg-sky-600 w-full p-3 text-white 
                          uppercase font-bold block mt-5 text-center 
                          rounded-lg"
            >Pacientes</Link>


            <Link
                to="/proveedores"
                className="bg-sky-600 w-full p-3 text-white 
                          uppercase font-bold block mt-5 text-center 
                          rounded-lg"
            >Proveedores</Link>

            <Link
                to="/perfilDoctor"
                className="bg-sky-600 w-full p-3 text-white 
                          uppercase font-bold block mt-5 text-center 
                          rounded-lg"
            >Mi Perfil</Link>


    </div>
  )
}

export default Home
