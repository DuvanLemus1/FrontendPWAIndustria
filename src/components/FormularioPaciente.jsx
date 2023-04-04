
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import usePacientes from "../hooks/UsePacientes";
import Alerta from "./Alerta"; 

const FormularioPaciente = () => {
    const [id, setId] = useState(null); //variable condicional
    const [nombrePaciente, setNombrePaciente] = useState('');
    const [DNI, setDNI] = useState('');
    const [telefonoPaciente, setTelefonoPaciente] = useState('');
    const [correoElectronicoPaciente, setCorreoElectronicoPaciente] = useState('');
    const [direccionPaciente, setDireccionPaciente] = useState('');

    const params=useParams();
    

    const {mostrarAlerta,
           alerta, 
           submitPaciente,
           paciente } = usePacientes();

    useEffect(()=>{
        if(params.idPaciente){
            setId(paciente.idPaciente)
            setNombrePaciente(paciente.nombrePaciente);
            setDNI(paciente.DNI);
            setTelefonoPaciente(paciente.telefonoPaciente);
            setCorreoElectronicoPaciente(paciente.correoElectronicoPaciente);
            setDireccionPaciente(paciente.direccionPaciente);
        }
        
    },[params])
    
    const handleSubmit = async e =>{
        e.preventDefault();

        if([nombrePaciente,
            DNI,
            telefono, 
            correoElectronicoPaciente,
            direccionPaciente].includes('')){
                mostrarAlerta({
                    msg: 'Todos los campos son obligatorios',
                    error: true
                })
                return;
            }

        //Pasar los datos hacia la api a traves del Provider
        await submitPaciente({
            "id":id,
            "DNI":DNI,
            "nombrePaciente":nombrePaciente, 
            "telefonoPaciente":telefonoPaciente,
            "correoElectronicoPaciente":correoElectronicoPaciente,
            "direccionPaciente":direccionPaciente,
        });

        setId(null)
        setNombrePaciente('');
        setDNI('');
        setTelefonoPaciente('');
        setCorreoElectronicoPaciente('');
        setDireccionPaciente('');
    }

    const {msg} = alerta;

  return (
    
    <form 
        className="bg-white py-10 px-5 md:w-5/6 rounded-lg shadow"
        onSubmit={handleSubmit}
        >

            {msg&& <Alerta alerta={alerta}/>}

            <div className="mb-5">
                <label 
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="nombrePaciente"
                >Nombre del Paciente</label>

                <input
                    id="nombrePaciente"
                    type='text'
                    className="border-2 w-full p-2 mt-2
                            placeholder-gray-400 rounded-md "
                    placeholder="Nombre del Paciente"
                    value={nombrePaciente}
                    onChange={e => setNombrePaciente(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label 
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="DNIPaciente"
                >DNI</label>

                <input
                    id="DNIPaciente"
                    type='text'
                    className="border-2 w-full p-2 mt-2
                            placeholder-gray-400 rounded-md "
                    placeholder="DNI"
                    value={DNI}
                    onChange={e => setDNI(e.target.value)}
                />
            </div>
            
            <div className="mb-5">
                <label 
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="telefono"
                >Numero de Telefono</label>

                <input
                    id="telefono"
                    type='text'
                    className="border-2 w-full p-2 mt-2
                            placeholder-gray-400 rounded-md "
                    placeholder="Telefono del Paciente"
                    value={telefonoPaciente}
                    onChange={e => setTelefonoPaciente(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label 
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="correoElectronicoPaciente"
                >Correo Electronico</label>

                <input
                    id="correoElectronicoPaciente"
                    type='email'
                    className="border-2 w-full p-2 mt-2
                            placeholder-gray-400 rounded-md "
                    placeholder="Correo Electronico"
                    value={correoElectronicoPaciente}
                    onChange={e => setCorreoElectronicoPaciente(e.target.value)}
                />
            </div>
            
            <div className="mb-5">
                <label 
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="direccionPaciente"
                >Direccion</label>

                <input
                    id="direccionPaciente"
                    type='text'
                    className="border-2 w-full p-2 mt-2
                            placeholder-gray-400 rounded-md "
                    placeholder="Direccion"
                    value={direccionPaciente}
                    onChange={e => setDireccionPaciente(e.target.value)}
                />
            </div>    
            <input
                type='submit'
                value={id?'Actualizar Datos de Paciente':'Registrar Paciente'}
                className="bg-sky-600 w-full p-3 uppercase
                             font-bold text-white rounded-md
                             cursor-pointer hover:bg-sky-700
                             transition-colors"
            />
    </form>    
  )
}

export default FormularioPaciente
