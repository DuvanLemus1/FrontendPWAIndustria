

const Cita = ({cita}) => {

    
    const {precio,
           fechaCita,
           horaCita,
           estadoCita,
           descripcion,
           idCita } = cita
  return (

    <div >
        <div className={`border-b p-5 flex justify-between
                          items-center rounded-lg mt-2
                        ${estadoCita === 'Pendiente' ?
                         'bg-red-300' : 'bg-green-400'}`}>
            <div>
                <p >Fecha: {fechaCita}</p>
                <p >Hora: {horaCita}</p>
                <p >Descripcion: {descripcion}</p>
                <p className="font-bold">Estado Cita: {estadoCita}</p>
                <p >precio: {precio}</p>

            </div>
            
            <div className="flex gap-3">
                <button
                    className="bg-orange-300 hover:bg-orange-400 
                                px-4 py-3 text-black uppercase
                                text-sm rounded-lg transition-colors
                                font-bold border-2 shadow-md mx-3"
                >Editar</button>

                <button
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

export default Cita
