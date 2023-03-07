
import { useState, createContext, useEffect } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PacientesContext = createContext();

const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([]);
    const [alerta, setAlerta] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        const obtenerPacientes = async()=>{
            try {
            const token =  localStorage.getItem('token');
            
            if(!token) return;
            
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await axios('http://localhost:4000/api/pacientes', config);
              
            setPacientes(data)
            
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes();
    },[]);

    const mostrarAlerta = alerta => {
        setAlerta(alerta);

        setTimeout(()=>{
            setAlerta({})
        }, 5000)
    }

    
    const submitPaciente = async paciente =>{
        
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

            const {data} = await axios.post('http://localhost:4000/api/pacientes', paciente, config)
            setPacientes([...pacientes, data])

            setAlerta({
                msg:'Paciente registrado exitosamente',
                error:false
            })

            setTimeout(()=>{
                setAlerta({})
                navigate('/pacientes');
            }, 3000)
            
        } catch (error) {
            console.log(error)
        }
        console.log(paciente)
    }

    return(
        <PacientesContext.Provider
            value={{
                pacientes,
                mostrarAlerta,
                alerta,
                submitPaciente
            }}
        >{children}
        </PacientesContext.Provider>
    )
}

export {PacientesProvider};

export default PacientesContext;
