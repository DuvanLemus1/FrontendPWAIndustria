import {Link} from 'react-router-dom'

const PreviewProveedores = ({proveedor}) => {
  const {nombreProveedor, telefonoProveedor, idProveedor} = proveedor;

  return (
    <div className='border-b p-5 flex'>
        <p className='flex-1'>

            {nombreProveedor}

        </p>

        <p className='text-sm text-gray-500 flex-1'>
            {telefonoProveedor}</p>
        
        <Link
            to={`${idProveedor}`}
            className='text-gray-600 hover:text-gray-900 uppercase
                        text-sm font-bold '
        >Ver Detalle</Link>
      
    </div>
  )
}

export default PreviewProveedores;
