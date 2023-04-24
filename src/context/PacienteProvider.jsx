
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
    const [cita, setCita] = useState({});
    const [modalEliminarCita, setModalEliminarCita] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        const obtenerPacientes = async()=>{
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
            const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/pacientes`, config);
              
            setPacientes(data)
            
            } catch (error) {
                console.log(error)
            }finally{
                setCargando(false)
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

                const {data} = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/pacientes/${paciente.id}`,paciente, config);
                
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

                const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/pacientes`, paciente, config)
                
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

            const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/pacientes/${idPaciente}`,config)
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

            const {data} = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/pacientes/${idPaciente}`, config)
            
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
    setCita({});
    }

    const submitCita = async cita=>{

        if(cita.id){
            await editarCita(cita)
        }else{
            await crearCita(cita)
        }
        
    }

    const crearCita = async cita =>{
        try {
            const token =  localStorage.getItem('token');
            
            if(!token) return;
            
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/citas/`, cita, config);
            console.log(data);
            setCitas([...citas, data])
            setAlerta({})
            setModalFormularioCita(false)
        } catch (error) {
            console.log(error)
        }
    }

    const editarCita = async cita => {
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

            const {data} = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/citas/${cita.id}`, cita, config);
            console.log(data);
            
            setAlerta({})
            setModalFormularioCita(false)


        } catch (error) {
            console.log(error)
        }
    }

    const eliminarCita = async () =>{
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

            const {data} = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/citas/${cita.idCita}`, config);
            setAlerta({
                msg:data.msg,
                error:false
            })

            setModalEliminarCita(false)
            setCita({})


        } catch (error) {
            console.log(error)
        }

    }

    const handleModalEditarCita = cita =>{
        setCita(cita);
        setModalFormularioCita(true);
    }

    const handleModalEliminarCita = cita =>{
        setCita(cita);
        setModalEliminarCita(!modalEliminarCita)
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
                submitCita,
                handleModalEditarCita,
                cita,
                modalEliminarCita,
                handleModalEliminarCita,
                eliminarCita
                
            }}
        >{children}
        </PacientesContext.Provider>
    )
}

export {PacientesProvider};

export default PacientesContext;
