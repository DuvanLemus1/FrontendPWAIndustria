
import usePacientes from "../hooks/UsePacientes"
import PreviewPacientes from "../components/PreviewPacientes";
import { useState } from "react";

const Pacientes = () => {

  const {pacientes} = usePacientes();

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPacientes = pacientes.filter((paciente) =>
  (paciente.nombrePaciente && paciente.nombrePaciente.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (paciente.DNI && paciente.DNI.toLowerCase().includes(searchTerm.toLowerCase()))
  );

/*
  {pacientes.length?
    pacientes.map(paciente => (
      <PreviewPacientes
        key={paciente.idPaciente}
        paciente={paciente}
      />
 ))
:<p className="mt-5 text-center text-gray-600 uppercase">No hay ningún paciente</p>}
*/

  return (
    <>
    
      <h1 className="text-4xl font-black">Pacientes</h1>
      <div>
        <input 
          type="search"
          placeholder="Buscar paciente por nombre o DNI"
          className="rounded-lg  lg:w-96  block p-2 border mt-2"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <div className="mt-10 justify-center p-5 bg-white  shadow rounded-xl  ">
      <div className="font-bold text-center" >
        <p>Nombres y DNI, para más información haga click en 
          <span className="text-gray-600"> VER DETALLE</span></p>
        
      </div>

      {filteredPacientes.length ?
      filteredPacientes.map((paciente) => (
        <PreviewPacientes key={paciente.idPaciente} paciente={paciente} />
      )) :
      <p className="mt-5 text-center text-gray-600 uppercase">No hay ningún paciente</p>
      }
      </div>

    </>
  )
}

export default Pacientes
