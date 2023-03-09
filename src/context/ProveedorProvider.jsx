import { useState, createContext, useEffect } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProveedoresContext = createContext();

const ProveedoresProvider = ({children}) => {

    const [proveedores, setProveedores] = useState([]);
    const [alerta, setAlerta] = useState({});

    const [proveedor, setProveedor] = useState('');
    const [cargando, setCargando] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        const obtenerProveedores = async()=>{
            try {
            const token =  localStorage.getItem('token');
            
            if(!token) return;
            
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await axios('http://localhost:4000/api/proveedores', config);
              
            setProveedores(data)
            
            } catch (error) {
                console.log(error)
            }
        }
        obtenerProveedores();
    },[]);

    const mostrarAlerta = alerta => {
        setAlerta(alerta);

        setTimeout(()=>{
            setAlerta({})
        }, 5000)
    }

    
    const submitProveedor = async proveedor =>{
        
        
        
    const editarProveedor = async proveedor =>{
        try {
            const token =  localStorage.getItem('token');
            
            if(!token) return;
            
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await axios.put(`http://localhost:4000/api/proveedores/${proveedor.id}`,proveedor, config);
            
            //Sincronizar el state
            const proveedoresActualizados = 
            proveedores.map(proveedorState => 
                proveedorState.idProveedor === data.idProveedor ?
                data:
                proveedorState);
                setProveedores(proveedoresActualizados);

                setAlerta({
                    msg:'Proveedor actualizado exitosamente',
                    error:false
                })
    
                setTimeout(()=>{
                    setAlerta({})
                    navigate('/proveedores');
                }, 3000)


            
        } catch (error) {
            console.log(error)
        }
    }

    const nuevoProveedor= async proveedor =>{
        try {
            
            const token =  localStorage.getItem('token');
            console.log(token);
            if(!token) return;
            
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await axios.post('http://localhost:4000/api/proveedores', proveedor, config)
            
            setProveedores([...proveedores, data])

            setAlerta({
                msg:'Proveedor registrado exitosamente',
                error:false
            })

            setTimeout(()=>{
                setAlerta({})
                navigate('/proveedores');
            }, 3000)
            
        } catch (error) {
            console.log(error)
        }
        
        }

        if(proveedor.id){
           await editarProveedor(proveedor)
        }else{
            await nuevoProveedor(proveedor)
        }
    }



    const obtenerProveedor= async (idProveedor) => {
        setCargando(true);
        try {

            const token =  localStorage.getItem('token');
            
            if(!token) return;
            
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await axios(`http://localhost:4000/api/proveedores/${idProveedor}`,config)
            setProveedor(data)
        } catch (error) {
            console.log(error)
        } finally{
            setCargando(false);
        }
    }

    const eliminarProveedor = async idProveedor =>{
        try {
            const token =  localStorage.getItem('token');
            console.log(token);
            if(!token) return;
            
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await axios.delete(`http://localhost:4000/api/proveedores/${idProveedor}`, config)
            
            const proveedoresActualizados = proveedores.filter(proveedorState=>proveedorState.idProveedor!==idProveedor)
            setProveedores(proveedoresActualizados);

            setAlerta({
                msg:data.msg,
                error:false
            })

            setTimeout(()=>{
                setAlerta({})
                navigate('/proveedores');
            }, 3000)

        } catch (error) {
            console.log(error)
        }
    }

    return(
        <ProveedoresContext.Provider
            value={{
                proveedores,
                mostrarAlerta,
                alerta,
                submitProveedor,
                obtenerProveedor,
                proveedor,
                cargando,
                eliminarProveedor
            }}
        >{children}
        </ProveedoresContext.Provider>
    )
}

export {ProveedoresProvider};

export default ProveedoresContext;