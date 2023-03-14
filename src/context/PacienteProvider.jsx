
import { useState, createContext, useEffect } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PacientesContext = createContext();

const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([]);
    const [alerta, setAlerta] = useState({});

    const [paciente, setPaciente] = useState({});
    const [citas, setCitas] =useState([])
    const [cargando, setCargando] = useState(false);
    const [modalFormularioCita, setModalFormularioCita] = useState(false)


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
         
        const editarPaciente = async paciente =>{
            try {
                const token =  localStorage.getItem('token');
                
                if(!token) return;
                
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await axios.put(`http://localhost:4000/api/pacientes/${paciente.id}`,paciente, config);
                
                //Sincronizar el state
                const pacientesActualizados = 
                pacientes.map(pacienteState => 
                    pacienteState.idPaciente === data.idPaciente ?
                    data:
                    pacienteState);
                    setPacientes(pacientesActualizados);

                    setAlerta({
                        msg:'Paciente actualizado exitosamente',
                        error:false
                    })
        
                    setTimeout(()=>{
                        setAlerta({})
                        navigate('/pacientes');
                    }, 3000)


                
            } catch (error) {
                console.log(error)
            }
        }

        const nuevoPaciente= async paciente =>{
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
            
            }

            if(paciente.id){
            await editarPaciente(paciente)
            }else{
                await nuevoPaciente(paciente)
            }
    }


    const obtenerPaciente= async (idPaciente) => {
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

            const {data} = await axios(`http://localhost:4000/api/pacientes/${idPaciente}`,config)
            const {paciente,citas}=data;
            setPaciente(paciente);
            setCitas(citas)
        } catch (error) {
            console.log(error)
        } finally{
            setCargando(false);
        }
    }

    const eliminarPaciente = async idPaciente =>{
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

            const {data} = await axios.delete(`http://localhost:4000/api/pacientes/${idPaciente}`, config)
            
            const pacientesActualizados = pacientes.filter(pacienteState=>pacienteState.idPaciente!==idPaciente)
            setPacientes(pacientesActualizados);

            setAlerta({
                msg:data.msg,
                error:false
            })

            setTimeout(()=>{
                setAlerta({})
                navigate('/pacientes');
            }, 3000)

        } catch (error) {
            console.log(error)
        }
    }

    const handleModalCita = ()=>{
    setModalFormularioCita(!modalFormularioCita);
    }

    const submitCita = async cita=>{
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

            const {data} = await axios.post(`http://localhost:4000/api/citas/`, cita, config);
            console.log(data);
            setCitas([...citas, data])
            setAlerta({})
            setModalFormularioCita(false)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <PacientesContext.Provider
            value={{
                pacientes,
                mostrarAlerta,
                alerta,
                submitPaciente,
                obtenerPaciente,
                paciente,
                citas,
                cargando,
                eliminarPaciente,
                modalFormularioCita,
                handleModalCita,
                submitCita
                
            }}
        >{children}
        </PacientesContext.Provider>
    )
}

export {PacientesProvider};

export default PacientesContext;
