
import usePacientes from "../hooks/UsePacientes"
import PreviewPacientes from "../components/PreviewPacientes";

const Pacientes = () => {

  const {pacientes} = usePacientes();

  
  return (
    <>
    
      <h1 className="text-4xl font-black">Pacientes</h1>

      
      <div className="mt-10 justify-center p-5 bg-white shadow rounded-xl">
      <div className="font-bold text-center" >
        <p>Nombres y DNI, para más información haga click en 
          <span className="text-sky-500"> VER DETALLE</span></p>
        
      </div>

        {pacientes.length?
            pacientes.map(paciente => (
              <PreviewPacientes
                key={paciente.idPaciente}
                paciente={paciente}
              />
         ))
        :<p className="mt-5 text-center text-gray-600 uppercase">No hay ningún paciente</p>}
      </div>

    </>
  )
}

export default Pacientes
