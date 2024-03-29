import { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import useAuth from '../hooks/UseAuth.jsx'

const HistoricoSuscripciones = () => {
    const {auth} = useAuth();
    const [historicoSuscripciones, setHistoricoSuscripciones] = useState([]);
    console.log(historicoSuscripciones)
    useEffect(() => {
        
        const token =  localStorage.getItem('token');
        
        if(!token) return;
        
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        const obtenerHistorico = async () => {
          if(auth.rol==='administrador'){
            try {
              const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/doctores/obtenerHistorico`, config);
              setHistoricoSuscripciones(data);
              
            } catch (error) {
              console.log(error);
            }
          }
        };

        obtenerHistorico();
        
      }, []);

      return (
        <div className="container mx-auto p-4 ">
            
          <h2 className="text-2xl font-bold mb-4">Historico de Suscripciones</h2>
            <p className='mb-5'><span className='p-2 bg-amber-300 rounded-md font-bold'>Total:
            {' '}{historicoSuscripciones.reduce((total, historicoSuscripcion) => total + parseInt(historicoSuscripcion.costoSuscripcion), 0)}{'.00'}
            </span></p>
          
          <div className='flex justify-center '>
            
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Fecha Inicio</th>
                <th className="px-4 py-2 text-left">Fecha Fin</th>
                <th className="px-4 py-2 text-left">Costo</th>
                <th className="px-4 py-2 text-left">ID Doctor</th>
                <th className='px-4 py-2 text-left'>Doctor</th>
              </tr>
            </thead>
            <tbody className='divide-y-4'>
              {historicoSuscripciones.map((historicoSuscripciones) => (
                <tr key={historicoSuscripciones.idSuscripcion}>
                  <td className="px-4 py-2 text-left">{historicoSuscripciones.idSuscripcion}</td>
                  <td className="px-4 py-2 text-left">{historicoSuscripciones.fechaInicioSuscripcion}</td>
                  <td className="px-4 py-2 text-left">{historicoSuscripciones.fechaFinSuscripcion}</td>
                  <td className="px-4 py-2 text-left">{historicoSuscripciones.costoSuscripcion}</td>
                  <td className="px-4 py-2 text-left">{historicoSuscripciones.idDoctor}</td>
                  <td className='px-4 py-2 text-left'>{historicoSuscripciones.doctore.nombreDoctor} 
                                                       {' '}{historicoSuscripciones.doctore.apellidoDoctor}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="2"></td>
                <td className="px-4 py-2 text-left font-bold bg-green-300 ">Total:</td>
                <td className="px-4 py-2 text-left font-bold bg-green-300 ">
                {historicoSuscripciones.reduce((total, historicoSuscripcion) => total + parseInt(historicoSuscripcion.costoSuscripcion), 0)}{'.00'}
                </td>
                <td colSpan="2"></td>
              </tr>
              
            </tbody>
            
          </table>
          
          </div>
        </div>
      );
    }


export default HistoricoSuscripciones