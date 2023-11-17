import React, { useState, useEffect } from "react";
import Link from "../../Apiconf";
import { correcta, incorrecta } from "../../Toast/Notificaciones";
import { useAppContext } from '../../AppContext';
import { Button } from "@material-tailwind/react";
import { actualizarEstadoCamara } from "../../fetchApi";
export default function EstadoCamara() {
    const { state, dispatch } = useAppContext();
    const estado_actual = state.EstadoCamaraSelectedCamera;
    const estados = state.tiposEstados;

    const handleCloseModal = () => {
        dispatch({ type: 'TOGGLE_FORM', form: 'showEstadoCamaraForm', payload: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cambio =  estados.find(estado => parseInt(estadoSeleccionado) === estado.id).nombre;

        if(cambio === estado_actual.EstadoActual){
            incorrecta("El estado ya esta seleccionado.");
            return;
        }
        const idCamara = estado_actual.id;
        
        const datos = {
            idCamara: idCamara,
            nuevoEstadoId: estadoSeleccionado
        };
        const exito = await actualizarEstadoCamara(datos, dispatch);
        if (exito) {
            correcta("Registro actualizado exitosamente");

        } else {
            incorrecta("Error al actualizar el registro");
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                console.log()
                handleCloseModal();

            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const [estadoSeleccionado, setEstadoSeleccionado] = useState(estados[0].id+'');
    const [colorSeleccionado, setColorSeleccionado] = useState(estados[0].color);

    const handleChange = (event) => {
        const dato = estados.find((estado) => estado.id === parseInt(event.target.value, 10));
        setColorSeleccionado(dato.color);
        setEstadoSeleccionado(event.target.value);
    };

    return (
        <>
            <div className="bg-zinc-900/40 p-10 text-black fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
                <div className="text-blak relative w-full max-w-3xl">
                    <div className="relative bg-white rounded-lg">
                        <div className='absolute right-0 flex items-center p-2'>
                            <button
                                className=' bg-gray-300 right-0 inset-y-0 border border-gray-300 p-[2px] text-xs rounded-full  hover:bg-gray-400 hover:border hover:border-gray-600 transition-all duration-200 '
                                onClick={handleCloseModal}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M18 6l-12 12" />
                                    <path d="M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className='items-center justify-center px-6 py-6 lg:px-8'>
                            <h3 className="mb-4 text-xl font-medium">Actualizar estado camara 1</h3>
                            <div className='border border-gray-200 bg-gray-100 p-4 rounded-lg mt-2 w-full'>
                                <div className='flex items-center justify-around '>
                                    <div className='mr-4 flex flex-col items-center justify-center'>
                                        <p>Estado Actual</p>
                                        <div
                                            className="mt-2 focus:outline-none semibold text-lg mb-5 shadow-md flex bg-white items-center text-gray-800 justify-center w-16 h-16  rounded-xl  font-bold transition-all duration-200"
                                            style={{ borderTopColor: estado_actual.color ? estado_actual.color : 'gray', borderTopWidth: '8px' }}
                                        >
                                            {estado_actual.id}
                                        </div>
                                    </div>
                                    <div className='mr-4 ml-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-right" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M5 12l14 0" />
                                            <path d="M13 18l6 -6" />
                                            <path d="M13 6l6 6" />
                                        </svg>
                                    </div>
                                    <div className='mr-4 flex flex-col items-center justify-center'>
                                        <p>Estado futuro</p>
                                        <div
                                            className="mt-2 focus:outline-none semibold text-lg mb-5 shadow-md flex bg-white items-center text-gray-800 justify-center w-16 h-16  rounded-xl  font-bold transition-all duration-200"
                                            style={{ borderTopColor: colorSeleccionado ? colorSeleccionado : 'gray', borderTopWidth: '8px' }}
                                        >
                                            {estado_actual.id}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-4 flex gap-2'>

                                <select className='border border-gray-900 rounded-lg p-2 outline-none' onChange={handleChange} value={estadoSeleccionado}>
                                    {estados.map((estado) => (
                                        <option key={estado.id} value={estado.id}>{estado.nombre}</option>
                                    ))}

                                </select>

                                <Button className="gap-2 rounded-lg bg-gray-900 justify-center shadow-sm hover:shadow-xl text-gray-200 py-2 px-5  flex items-center transition duration-200 ease-in border w-full" onClick={handleSubmit}>
                                    Guardar
                                </Button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </>
    );
}
