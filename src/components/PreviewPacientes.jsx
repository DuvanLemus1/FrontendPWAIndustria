import {Link} from 'react-router-dom'

const PreviewPacientes = ({paciente}) => {
  const {nombrePaciente, idPaciente, DNI} = paciente;

  return (
    <>
      
      <div className='border-b p-5 flex'>
          <p className='flex-1'>

              {nombrePaciente}

          </p>

          <p className='text-sm text-gray-500 flex-1'>
              {DNI}</p>
          
          <Link
              to={`${idPaciente}`}
              className=' text-sky-500 hover:text-gray-900 uppercase
                          text-sm font-bold '
          >Ver Detalle</Link>
        
      </div>
    </>
  )
}

export default PreviewPacientes
