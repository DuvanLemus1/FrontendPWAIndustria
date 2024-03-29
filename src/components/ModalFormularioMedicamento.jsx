
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useParams } from 'react-router-dom'
import Alerta from './Alerta'

import useProveedores from '../hooks/UseProveedor.jsx'

const ModalFormularioMedicamento = () => {
 
    const [id, setId] = useState('')
    const [serialMedicamento, setSerialMedicamento] = useState('')
    const [nombreMedicamento, setNombreMedicamento] = useState('')
    const [cantidadMedicamento, setCantidadMedicamento] = useState('')
    const [precioUnitario, setPrecioUnitario] = useState('')

    const params = useParams()

    const {modalFormularioMedicamento, 
           handleModalMedicamento, 
           mostrarAlerta, 
           alerta, 
           submitMedicamento,
           medicamento } = useProveedores();

    useEffect(()=>{
        if(medicamento?.idMedicamento){
            setId(medicamento.idMedicamento)
            setSerialMedicamento(medicamento.serialMedicamento);
            setNombreMedicamento(medicamento.nombreMedicamento);
            setCantidadMedicamento(medicamento.cantidadMedicamento);
            setPrecioUnitario(medicamento.precioUnitario);
            return;
        }
        setId('');
        setSerialMedicamento('');
        setNombreMedicamento('');
        setCantidadMedicamento('');
        setPrecioUnitario('');

    },[medicamento])

    const handleSubmit = async e =>{
        e.preventDefault();

        if([serialMedicamento, nombreMedicamento, cantidadMedicamento, precioUnitario].includes('')){
            mostrarAlerta({
                msg:'Todos los campos son obligatorios',
                error:true
            })
            return;
        }
        await submitMedicamento({
            "id":id,
            "serialMedicamento":serialMedicamento,
            "nombreMedicamento": nombreMedicamento,
            "cantidadMedicamento": cantidadMedicamento,
            "precioUnitario": precioUnitario,
            "idProveedor": params.idProveedor});
        
        setId('')
        setSerialMedicamento('');
        setNombreMedicamento('');
        setCantidadMedicamento('')
        setPrecioUnitario('')
        
    }

    const {msg} = alerta

    
    return (
        <Transition.Root show={ modalFormularioMedicamento } as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={ handleModalMedicamento}>
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
                                    onClick={ handleModalMedicamento }
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
                                        {id ? 'Editar Medicamento':'Ingresar nuevo Medicamento'}
                                    </Dialog.Title>

                                    {msg && <Alerta alerta ={alerta}/>}

                                    <form
                                        onSubmit={handleSubmit} 
                                        className='my-10'
                                    >
                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm'
                                                htmlFor='serialMedicamento'
                                            >
                                                Serial de Medicamento
                                            </label>
                                            <input
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 
                                                           rounded-md'
                                                type="text"
                                                id="serialMedicamento"
                                                placeholder='Serial del Medicamento'
                                                value={serialMedicamento}
                                                onChange={e => setSerialMedicamento(e.target.value)}
                                            />
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm'
                                                htmlFor='nombreMedicamento'
                                            >
                                                Nombre del Medicamento
                                            </label>
                                            <input
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 
                                                           rounded-md'
                                                type="text"
                                                id="nombreMedicamento"
                                                placeholder='Nombre del Medicamento'
                                                value={nombreMedicamento}
                                                onChange={e => setNombreMedicamento(e.target.value)}
                                            />
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm'
                                                htmlFor='cantidadMedicamento'
                                            >
                                                Cantidad de medicamento ingresado
                                            </label>
                                            <input
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 
                                                           rounded-md'
                                                type="text"
                                                id="cantidadMedicamento"
                                                placeholder='Cantidad de medicamento ingresado'
                                                value={cantidadMedicamento}
                                                onChange={e => setCantidadMedicamento(e.target.value)}
                                            />
                                        </div>

                                        <div className='mb-5'>
                                            <label
                                                className='text-gray-700 uppercase font-bold text-sm'
                                                htmlFor='precioUnitario'
                                            >
                                                Precio Unitario de Venta al consumidor final
                                            </label>
                                            <input
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 
                                                           rounded-md'
                                                type="text"
                                                id="precioUnitario"
                                                placeholder='Precio Unitario de Venta al consumidor final'
                                                value={precioUnitario}
                                                onChange={e => setPrecioUnitario(e.target.value)}
                                            />
                                        </div>

                                        <input
                                            type='submit'
                                            className='bg-sky-600 hover:bg-sky-700 w-full
                                                         p-3 text-white uppercase font-bold
                                                         cursor-pointer transition-colors
                                                         rounded-md'
                                            value={id ? 'Guardar Cambios':'Ingresar Medicamento'}  
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

export default ModalFormularioMedicamento