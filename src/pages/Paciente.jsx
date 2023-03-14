
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"

import usePacientes from "../hooks/UsePacientes.jsx";
import ModalFormularioCita from "../components/ModalFormularioCita.jsx";
import Cita from "../components/Cita.jsx";

const Paciente = () => {

  const params =useParams();

  const {obtenerPaciente, 
         paciente, 
         citas, 
         cargando,
         handleModalCita} = usePacientes();
  
  //const [modal, setModal] = useState(false)
  
  useEffect(()=>{
    obtenerPaciente(params.idPaciente)
  }, []);

 
  const {nombrePaciente,
         DNI,
         telefonoPaciente,
         direccionPaciente, 
         correoElectronicoPaciente,
        } = paciente 

  if(cargando) return 'Cargando...'

  return (
    <>
    <div className="flex justify-between">
      <h1 className="font-black text-4xl">{nombrePaciente}</h1>

      <div className="flex items-center gap-2 text-gray-500 hover:text-black">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
        <Link
          to={`/pacientes/editar/${params.idPaciente}`}
          className='uppercase font-bold'
        >Editar</Link>
        <button
        onClick={handleModalCita}
        type="button"
        className="text-sm px-5 py-3 w-full md:w-auto rounded-md
                   uppercase font-bold bg-sky-400 text-white
                   text-center flex gap-2 items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Programar Cita
        
        </button>
        <ModalFormularioCita
        
        />

      </div>
      
    </div>
    <div className="my-7 bg-white p-2 shadow rounded-lg " >
      <p className="mt-3 mx-2">DNI: {DNI}</p>
      <p className="mt-3 mx-2">Telefono: {telefonoPaciente}</p>
      <p className="mt-3 mx-2">correo Electronico: {correoElectronicoPaciente}</p>
      <p className="mt-3 mx-2">direccion Paciente: {direccionPaciente}</p>
    </div>

    <h3 className="text-2xl text-sky-700 font-bold mb-3">Citas de este paciente</h3>

    <div className="bg-white shadow mt-7 rounded-lg">
      {citas?.length ? 
      citas.map(cita =>(
        <Cita
          key={cita.idCita}
          cita={cita}
        />
      )):
      <p className="text-center my-5 p-10">Este paciente no tiene citas</p>}

        
    </div >
    
      

    
    </>
  )
}

export default Paciente
