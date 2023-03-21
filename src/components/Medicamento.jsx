
import useProveedores from "../hooks/UseProveedor"

const Medicamento = ({medicamento}) => {

    const {handleModalEditarMedicamento, handleModalEliminarMedicamento} = useProveedores()

    
    const {serialMedicamento,
           nombreMedicamento,
           cantidadMedicamento,
           precioUnitario,
           idMedicamento } = medicamento
  return (

    <div >
        <div className={`border-b p-5 flex justify-between
                          items-center rounded-lg mt-2
                        ${cantidadMedicamento === 0 ? 'bg-red-200' 
                        :cantidadMedicamento >= 1 && cantidadMedicamento<=10  ? 'bg-yellow-200'
                        : 'bg-green-200'}`}>
            <div>
                <p >Serial: {serialMedicamento}</p>
                <p >Nombre: {nombreMedicamento}</p>
                <p >Existencias: {cantidadMedicamento}</p>
                <p className="font-bold">Precio Unitario: {precioUnitario}</p>

            </div>
            
            <div className="flex gap-3">
                <button
                    onClick={()=>handleModalEditarMedicamento(medicamento)}
                    className="bg-orange-300 hover:bg-orange-400 
                                px-4 py-3 text-black uppercase
                                text-sm rounded-lg transition-colors
                                font-bold border-2 shadow-md mx-3"
                >Editar</button>

                <button
                    onClick={ ()=>handleModalEliminarMedicamento(medicamento)}
                    className="bg-orange-300 hover:bg-orange-400 
                                px-4 py-3 text-black uppercase
                                text-sm rounded-lg transition-colors
                                font-bold border-2 shadow-md"
                >Eliminar</button>
            </div>
        
        </div>
    </div>    

  )
}

export default Medicamento
