import {Link} from 'react-router-dom'

const PreviewPacientes = ({paciente}) => {
  const {nombrePaciente, idPaciente, telefonoPaciente} = paciente;

  return (
    <div className='border-b p-5 flex'>
      
        <p className='flex-1'>
            {nombrePaciente}

            <span className='text-sm text-gray-500 uppercase'>
                {' '}{telefonoPaciente}
            </span>
        </p>
        
        <Link
            to={`${idPaciente}`}
            className='text-gray-600 hover:text-gray-900 uppercase
                        text-sm font-bold '
        >Ver Detalle</Link>
      
    </div>
  )
}

export default PreviewPacientes
