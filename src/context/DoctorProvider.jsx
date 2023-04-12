
import { useState, createContext, useEffect } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/UseAuth";

const DoctorContext = createContext();

const DoctorProvider = ({children}) => {

    const [doctor, setDoctor] = useState({});
    const [cargando, setCargando] = useState(false);
    const [modalEditarDoctor, setModalEditarDoctor] = useState(false)
    const [modalEditarSuscripcion, setModalEditarSuscripcion]=useState(false)
    const [modalCancelarSuscripcion, setModalCancelarSuscripcion]=useState(false)

    const obtenerDoctor  = async(idDoctor)=>{
        try {
        const token =  localStorage.getItem('token');
        
        if(!token) return;
        
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const {data} = await axios(`http://localhost:4000/api/doctores/obtenerDoctor/${idDoctor}`, config);
          
        setDoctor(data)
        
        } catch (error) {
            console.log(error)
        }
    }

    const {auth} = useAuth();
    const idDoctor = auth.idDoctor

    const submitEditarDoctor = async (doctor) => {
        try {
            
            const token =  localStorage.getItem('token');
            
            if(!token) return;
            
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await axios.put(`http://localhost:4000/api/doctores/actualizarDoctor/${idDoctor}`, doctor, config);
            
            setModalEditarDoctor(false)

        } catch (error) {
            console.log(error)
        }
    }
    
    const handleModalEditarDoctor = ()=>{
        setModalEditarDoctor(!modalEditarDoctor);
        //setDoctor({});
        }
    
    //-----------------------------------Suscripcion-----------------
    const submitEditarSuscripcion = async (doctor) => {
        try {
            
            const token =  localStorage.getItem('token');
            
            if(!token) return;
            
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await axios.put(`http://localhost:4000/api/doctores/actualizarSuscripcionDoctor/${idDoctor}`, doctor, config);
            
            setModalEditarSuscripcion(false)

        } catch (error) {
            console.log(error)
        }
    }
    
    const handleModalEditarSuscripcion = ()=>{
        setModalEditarSuscripcion(!modalEditarSuscripcion);
        }
    
    //----------------Cancelar Suscripcion------------------
    const submitCancelarSuscripcion = async (idDoctor) => {
        try {
            const token =  localStorage.getItem('token');
            
            if(!token) return;
            
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await axios.put(`http://localhost:4000/api/doctores/cancelarSuscripcion/${idDoctor}`, doctor, config);
            setModalCancelarSuscripcion(false)

        } catch (error) {
            console.log(error)
        }

    }

    const handleModalCancelarSuscripcion = ()=>{
        setModalCancelarSuscripcion(!modalCancelarSuscripcion);
        }

  return (
    <DoctorContext.Provider
            value={{
                setDoctor,
                doctor,
                obtenerDoctor,
                cargando,
                setCargando,
                modalEditarDoctor,
                setModalEditarDoctor,
                handleModalEditarDoctor,
                submitEditarDoctor,
                handleModalEditarSuscripcion,
                submitEditarSuscripcion,
                modalEditarSuscripcion,
                setModalEditarSuscripcion,
                submitCancelarSuscripcion,
                handleModalCancelarSuscripcion,
                modalCancelarSuscripcion,
                setModalCancelarSuscripcion    
            }}
        >{children}
        </DoctorContext.Provider>
  )
}

export {DoctorProvider, DoctorContext};

//export default DoctorContext;
