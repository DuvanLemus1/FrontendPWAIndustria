
import usePacientes from "../hooks/useProyectos"
import PreviewPacientes from "../components/PreviewPacientes";

const Pacientes = () => {

  const {pacientes} = usePacientes();

  
  return (
    <>
    
      <h1 className="text-4xl font-black">Pacientes</h1>

      <div className="mt-10 justify-center p-5 bg-white shadow rounded-xl">

        {pacientes.length?
            pacientes.map(paciente => (
              <PreviewPacientes
                key={paciente.idPaciente}
                paciente={paciente}
              />
         ))
        :<p className="mt-5 text-center text-gray-600 uppercase">No hay ningun paciente</p>}
      </div>

    </>
  )
}

export default Pacientes
