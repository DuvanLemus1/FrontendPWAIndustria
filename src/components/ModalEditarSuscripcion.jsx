
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useParams, Link } from 'react-router-dom'
import Alerta from './Alerta'

import useDoctor from '../hooks/UseDoctor'
import useAuth from '../hooks/UseAuth'

//const {auth} = useAuth()
//console.log(auth.idDoctor)

const ModalEditarSuscripcion = () => {
 
    const {auth} = useAuth()
    console.log(auth.idDoctor)
    console.log(auth.fechaFinSuscripcion)
    
    const [fechaInicioNuevaSuscripcion, setFechaInicioNuevaSuscripcion] = useState('')
    const [fechaFinNuevaSuscripcion, setFechaFinNuevaSuscripcion] = useState('')
    const [costoNuevaSuscripcion, setCostoNuevaSuscripcion] = useState('')
    const [renovacionAutomatica, setRenovacionAutomatica] = useState('')
    const [opcionSeleccionada, setOpcionSeleccionada] = useState("");

    const {modalEditarDoctor, 
           handleModalEditarDoctor, 
           mostrarAlerta, 
           alerta, 
           submitEditarDoctor,
           doctor,
           handleModalEditarSuscripcion,
           modalEditarSuscripcion,
           setModalEditarSuscripcion,
           submitEditarSuscripcion   } = useDoctor();

    const handleClick = (e) => {
        const renovacionAutomatica = e.target.checked;
        setRenovacionAutomatica(!renovacionAutomatica);
          }
        
    const handleOptionChange = (e) => {
    const opcionSeleccionada = e.target.value;
    const fechaInicio = new Date(auth.fechaFinSuscripcion);
    const anio = fechaInicio.getFullYear()
    const mes  = (fechaInicio.getMonth()+1).toString().padStart(2, '0'); 
    const dia  = fechaInicio.getDate().toString().padStart(2, '0');
    const fechaFormateada = `${anio}-${mes}-${dia}`
    const fechaFormateadaOriginal = new Date(fechaFormateada);
          
    if (opcionSeleccionada === "1") {
        fechaFormateadaOriginal.setDate(fechaFormateadaOriginal.getDate() + 30);
        setCostoNuevaSuscripcion(100);
    } else if (opcionSeleccionada === "2") {
        fechaFormateadaOriginal.setDate(fechaFormateadaOriginal.getDate() + 90);
        setCostoNuevaSuscripcion(300);
    } else if (opcionSeleccionada === "3") {
        fechaFormateadaOriginal.setDate(fechaFormateadaOriginal.getDate() + 365);
        setCostoNuevaSuscripcion(1200);
    }
          
    const anio2 = fechaFormateadaOriginal.getFullYear()
    const mes2  = (fechaFormateadaOriginal.getMonth()+1).toString().padStart(2, '0'); 
    const dia2  = fechaFormateadaOriginal.getDate().toString().padStart(2, '0');
    const fechaFormateada2 = `${anio2}-${mes2}-${dia2}`;
          
    setOpcionSeleccionada(opcionSeleccionada);
    setFechaInicioNuevaSuscripcion(fechaFormateada);
    setFechaFinNuevaSuscripcion(fechaFormateada2);
    };  

    const handleSubmit = async e =>{
        e.preventDefault();

        
        await submitEditarSuscripcion({
            
            "fechaInicioNuevaSuscripcion":fechaInicioNuevaSuscripcion,
            "fechaFinNuevaSuscripcion": fechaFinNuevaSuscripcion,
            "costoNuevaSuscripcion": costoNuevaSuscripcion,
            "renovacionAutomatica": renovacionAutomatica});
        
        setFechaInicioNuevaSuscripcion('');
        setFechaFinNuevaSuscripcion('')
        setCostoNuevaSuscripcion('')
        setOpcionSeleccionada('')
        setRenovacionAutomatica('')
        
    }


    

    
    return (
        <Transition.Root show={ modalEditarSuscripcion } as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={ handleModalEditarSuscripcion}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={ handleModalEditarSuscripcion }
                                >
                                <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                        Actualizar Suscripcion
                                    </Dialog.Title>

                                    

                                    <form
                                        onSubmit={handleSubmit} 
                                        className='my-10'
                                    >
                                        <div className="border p-2 rounded-lg shadow-md mb-3">
                                        <div >
                                            <p className="flex justify-center mb-3 ">
                                            Elije tu tipo de suscripcion - LPS. 100.00 al mes</p>
                                            <div className='flex justify-center'>
                                                <label htmlFor="fechaInicioSuscripcion1" className="font-bold">
                                                <input
                                                type="radio"
                                                id="fechaInicioSuscripcion1"
                                                name="opciones"
                                                required
                                                value="1"
                                                onChange={handleOptionChange}
                                                className="border p-2 rounded-md mb-4 mx-3"
                                                />Mensual</label>

                                                <label htmlFor="fechaInicioSuscripcion2" className="font-bold">
                                                <input
                                                type="radio"
                                                id="fechaInicioSuscripcion2"
                                                name="opciones"
                                                required
                                                value="2"
                                                onChange={handleOptionChange}
                                                className="border p-2 rounded-md mb-4 mx-3 "
                                                />Trimestral</label>

                                                <label htmlFor="fechaInicioSuscripcion3" className="font-bold">
                                                <input
                                                type="radio"
                                                id="fechaInicioSuscripcion3"
                                                name="opciones"
                                                required
                                                value="3"
                                                onChange={handleOptionChange}
                                                className="border p-2 rounded-md mb-4 mx-3 "
                                                />Anual</label>
                                            </div>
                                        </div>
                                        <div className="flex justify-center">
                                            <label htmlFor="renovacionAutomatica">
                                            <input
                                                onClick={handleClick}
                                                className="mx-2" 
                                                type="checkbox" 
                                                id="renovacionAutomatica" 
                                                name="renovacionAutomatica" 
                                                value={renovacionAutomatica}
                                                onChange={(e) => setRenovacionAutomatica(e.target.checked)}/>
                                                Permitir renovacion automatica
                                            </label>
                                        </div>
                                        </div>

                                        <input
                                            type='submit'
                                            className='bg-sky-600 hover:bg-sky-700 w-full
                                                         p-3 text-white uppercase font-bold
                                                         cursor-pointer transition-colors
                                                         rounded-md'
                                            value='Guardar Cambios'
                                        />

                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalEditarSuscripcion