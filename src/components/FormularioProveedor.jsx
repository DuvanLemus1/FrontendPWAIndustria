
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import useProveedores from "../hooks/UseProveedor";
import Alerta from "./Alerta"; 

const FormularioProveedor = () => {
    const [id, setId] = useState(null); //variable condicional
    const [nombreProveedor, setNombreProveedor] = useState('');
    const [telefonoProveedor, setTelefonoProveedor] = useState('');
    const [correoElectronicoProveedor, setCorreoElectronicoProveedor] = useState('');
    const [direccionProveedor, setDireccionProveedor] = useState('');

    const params=useParams();
    

    const {mostrarAlerta,
           alerta, 
           submitProveedor,
           proveedor } = useProveedores();

    useEffect(()=>{
        if(params.idProveedor){
            setId(proveedor.idProveedor)
            setNombreProveedor(proveedor.nombreProveedor);
            setTelefonoProveedor(proveedor.telefonoProveedor);
            setCorreoElectronicoProveedor(proveedor.correoElectronicoProveedor);
            setDireccionProveedor(proveedor.direccionProveedor);
        }
        
    },[params])
    
    const handleSubmit = async e =>{
        e.preventDefault();

        if([nombreProveedor,
            telefonoProveedor, 
            correoElectronicoProveedor,
            direccionProveedor].includes('')){
                mostrarAlerta({
                    msg: 'Todos los campos son obligatorios',
                    error: true
                })
                return;
            }

        //Pasar los datos hacia la api a traves del Provider
        await submitProveedor({
            "id":id,
            "nombreProveedor":nombreProveedor, 
            "telefonoProveedor":telefonoProveedor,
            "correoElectronicoProveedor":correoElectronicoProveedor,
            "direccionProveedor":direccionProveedor,
        });

        setId(null)
        setNombreProveedor('');
        setTelefonoProveedor('');
        setCorreoElectronicoProveedor('');
        setDireccionProveedor('');
    }

    const {msg} = alerta;

  return (
    
    <form 
        className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
        onSubmit={handleSubmit}
        >

            {msg&& <Alerta alerta={alerta}/>}

            <div className="mb-5">
                <label 
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="nombreProveedor"
                >Nombre del Proveedor</label>

                <input
                    id="nombreProveedor"
                    type='text'
                    className="border-2 w-full p-2 mt-2
                            placeholder-gray-400 rounded-md "
                    placeholder="Nombre del Proveedor"
                    value={nombreProveedor}
                    onChange={e => setNombreProveedor(e.target.value)}
                />
            </div>
            
            <div className="mb-5">
                <label 
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="telefonoProveedor"
                >Numero de Telefono</label>

                <input
                    id="telefonoProveedor"
                    type='text'
                    className="border-2 w-full p-2 mt-2
                            placeholder-gray-400 rounded-md "
                    placeholder="Telefono del Proveedor"
                    value={telefonoProveedor}
                    onChange={e => setTelefonoProveedor(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label 
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="correoElectronicoProveedor"
                >Correo Electronico Proveedor</label>

                <input
                    id="correoElectronicoProveedor"
                    type='email'
                    className="border-2 w-full p-2 mt-2
                            placeholder-gray-400 rounded-md "
                    placeholder="Correo Electronico del Proveedor"
                    value={correoElectronicoProveedor}
                    onChange={e => setCorreoElectronicoProveedor(e.target.value)}
                />
            </div>
            
            <div className="mb-5">
                <label 
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="direccionProveedor"
                >Direccion</label>

                <input
                    id="direccionProveedor"
                    type='text'
                    className="border-2 w-full p-2 mt-2
                            placeholder-gray-400 rounded-md "
                    placeholder="Direccion"
                    value={direccionProveedor}
                    onChange={e => setDireccionProveedor(e.target.value)}
                />
            </div>    
            <input
                type='submit'
                value={id ? 'Actualizar Datos de Proveedor':'Registrar Proveedor'}
                className="bg-sky-600 w-full p-3 uppercase
                             font-bold text-white rounded-md
                             cursor-pointer hover:bg-sky-700
                             transition-colors"
            />
    </form>    
  )
}

export default FormularioProveedor
