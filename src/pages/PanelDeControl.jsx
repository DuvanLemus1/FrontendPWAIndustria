import { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

const PanelDeControl = () => {
    const [doctores, setDoctores] = useState([]);

    //td className="px-4 py-2 text-left text-gray-600 hover:text-gray-800
    //transition-colors"><a href={`${doctor.idDoctor}`}>Accion</a></td>
    useEffect(() => {
        const token =  localStorage.getItem('token');
        
        if(!token) return;
        
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const obtenerDoctores = async () => {
          try {
            const {data} = await axios('http://localhost:4000/api/doctores/obtenerDoctores', config);
            setDoctores(data);
          } catch (error) {
            console.log(error);
          }
        };
    
        obtenerDoctores();
      }, []);

      const eliminarDoctor = async (idDoctor) =>{
        const token =  localStorage.getItem('token');
        
        if(!token) return;
        
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
          const {data} = await axios.delete(`http://localhost:4000/api/doctores/eliminarDoctor/${idDoctor}`, config)

        } catch (error) {
          console.log(error)
        }
      }

      const handleClick = (idDoctor)=>{
        if(confirm("¿Deseas eliminar este doctor?")){
            eliminarDoctor(idDoctor)
            
        }else{
            console.log('No se elimino el doctor')
        }

    }

      return (
        <div className="container mx-auto p-4 ">
            
          <h2 className="text-2xl font-bold mb-4">Panel de Control</h2>
          <h3 className='text-xl my-2 font-semibold text-center '>Doctores Registrados en la Plataforma</h3>
          <div className='flex justify-center '>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Teléfono</th>
                <th className="px-4 py-2 text-left">Correo Electrónico</th>
                <th className="px-4 py-2 text-left font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className='divide-y-4'>
              {doctores.map((doctor) => (
                <tr key={doctor.idDoctor} 
                className={`border-b  
                ${doctor.confirmado ? 'bg-green-200' : 'bg-red-200'}
                rounded-lg`}>
                  <td className="px-4 py-2 text-left">{doctor.idDoctor}</td>
                  <td className="px-4 py-2 text-left">{doctor.nombreDoctor}</td>
                  <td className="px-4 py-2 text-left">{doctor.telefono}</td>
                  <td className="px-4 py-2 text-left">{doctor.correoElectronico}</td>
                  <td className="px-4 py-2 text-left text-gray-600 hover:text-gray-800
                                transition-colors">
                                <button className='p-2 bg-sky-500 font-bold text-white rounded-md shadow-md
                                                   hover:bg-sky-600 transition-colors'
                                        onClick={()=>handleClick(doctor.idDoctor)}
                                        >Eliminar</button></td>
                </tr>
              ))}
              
            </tbody>
            
          </table>
          
          </div>
        </div>
      );
    }


export default PanelDeControl