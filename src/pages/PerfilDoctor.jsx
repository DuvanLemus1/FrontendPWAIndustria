
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"

import useDoctor from "../hooks/UseDoctor.jsx";
import useAuth from "../hooks/UseAuth.jsx";
import ModalEditarDoctor from "../components/ModalEditarDoctor.jsx";
import ModalEditarSuscripcion from "../components/ModalEditarSuscripcion.jsx";

const PerfilDoctor = () => {

  
  const {auth, cargando} = useAuth();

  const {obtenerDoctor, 
         doctor, 
         modalEditarDoctor, 
         handleModalEditarDoctor,
         modalEditarSuscripcion,
         handleModalEditarSuscripcion} = useDoctor();
  
  
  useEffect(()=>{
    obtenerDoctor(auth.idDoctor)
  }, []);

 
  const {nombreDoctor,
         telefono,
         correoElectronico,
         fechaFinSuscripcion,
         renovacionAutomatica,
         fechaInicioNuevaSuscripcion
        } = doctor 

  const fechaFormateada = new Date(fechaFinSuscripcion)      
  const opciones = { month: "long" };
  const mesInicial = fechaFormateada.toLocaleString("es-Es", opciones);

  const fechaFormateada2 = new Date(fechaInicioNuevaSuscripcion);
  const opciones2 = {month:"long"};
  const mesInicial2 = fechaFormateada2.toLocaleString("es-Es", opciones2)
        
  if(cargando) return 'Cargando...'
  return (
    <>
      <div className="flex justify-between">
        <div className="font-bold text-4xl text-sky-700 mb-5">
          Mi Perfil
        </div>
        <div>
          <button
            onClick={handleModalEditarDoctor}
            className="rounded-lg p-2 bg-sky-500 font-bold text-white"
          >Actualizar Datos Personales</button>
        </div>
      </div>
      <div className="bg-white rounded-md shadow-md p-3 mb-3">
        <p className="mb-3">Nombre: {nombreDoctor}</p>
        <p className="mb-3">Telefono: {telefono}</p>
        <p className="mb-3">Correo Electronico: {correoElectronico}</p>
      </div>

      <div className=" flex justify-between">
        <div className="font-bold text-3xl text-sky-700 mb-5">
          Datos de mi suscripción 
        </div>
        <div>
          <button
            onClick={handleModalEditarSuscripcion}
            className="rounded-lg p-2 bg-sky-500 font-bold text-white"
          >Administrar Suscripción</button>
        </div>
      </div>
      <div className="bg-white rounded-md shadow-md p-3 mb-3">
        <p className="mb-3">Fecha fin de Suscripción: <span className="font-bold">
          {fechaFormateada.getUTCDate()}-{mesInicial}-{fechaFormateada.getFullYear()} </span></p>
        <p className=" mb-2">Renovación automática: <span className="font-bold">{renovacionAutomatica?'Activa':'Desactivada'}</span></p>
        <hr className="border-black border rounded-lg my-3" />
        <div className="flex justify-between">
          <p className="mb-4">Próxima renovación:
            <span className="font-bold">{fechaFormateada2.getUTCDate()}-{mesInicial2}-{fechaFormateada2.getFullYear()}</span>
          </p>
          <button
            onClick={handleModalEditarSuscripcion}
            className="rounded-lg p-1.5 bg-sky-500 font-bold text-white"
          >Cancelar Próxima Suscripción</button>
        </div>
        <p className="font-bold my-2 mt-10">*Puedes cancelar la próxima renovación a tu suscripcion siempre y cuando no haya iniciado,
                                       esto también ocasionará que la renovación automática de tu suscripción sea desactivada para
                                       evitar recargos indeseados en tu tarjeta. Para reactivar tu renovación automática o expandir 
                                       tu plan de suscripción, haz click en el botón "Administrar Suscripción"</p>
      </div>

      <ModalEditarDoctor/>
      <ModalEditarSuscripcion/>

    </>
  )
}

export default PerfilDoctor
