import React from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from "react-router-dom";
import { useAppContext } from '../../AppContext';
import { PiUserCircleFill } from 'react-icons/pi'
export default function TablaRegistros(props) {
    const { id } = props;
    const { state, dispatch } = useAppContext();
    const registros = state.registros.filter(registro => registro.id_camara === parseInt(id, 10));

    const handleAgregarInformacionClick = (registro) => {
        dispatch({ type: 'SET_SELECTED_REGISTRO', payload: registro });
        dispatch({ type: 'TOGGLE_FORM', form: 'showAgregarInformacionForm', payload: true });
    }

    const handleVerMasClick = (registro) => {
        dispatch({ type: 'SET_SELECTED_REGISTRO', payload: registro });
        dispatch({ type: 'TOGGLE_FORM', form: 'showVerMasForm', payload: true });
    };

    function formatearFecha(fechaISO) {
        const fecha = new Date(fechaISO);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getFullYear();
        const horas = fecha.getHours().toString().padStart(2, '0');
        const minutos = fecha.getMinutes().toString().padStart(2, '0');

        return `${dia}-${mes}-${anio} ${horas}:${minutos}`;
    }

    const handleChangeRegistroSelected = (registro) => {
        dispatch({ type: 'SET_SELECTED_REGISTRO', payload: registro });
    }

    return (
        <div className="grid grid-cols-1 gap-4 px-5 py-3 ">
            {registros.map((registro, index) => (
                <div key={index} className={`border-r border-l border-b border-gray-200 bg-white rounded-lg shadow-md px-4 py-2 pb-2 hover:shadow-lg transition-shadow duration-200'
                    }`}
                    style={{ borderTopColor: registro.color, borderTopWidth: '4px' }} s>
                    <div className="flex gap-1">

                        <PiUserCircleFill className="w-6 h-6 text-gray-500 translate-y-[-2px]"></PiUserCircleFill>
                        <span className="text-gray-900"> {registro.responsable} </span>
                        <span className="text-gray-800 ml-3">Creado el {formatearFecha(registro.fecha_creacion)} </span>
                    </div>
                    <div className="text-sm mt-2 px-1">
                        <p className="py-[1px]"><strong>Fecha:</strong> <span className="text-gray-600">{formatearFecha(registro.fecha)}</span></p>
                        <p className="py-[1px]"><strong>Evento:</strong> <span className="text-gray-600">{registro.tipo}</span></p>
                        <p className="flex items-center py-[1px]"><strong>Notificado:</strong> <span className={registro.notificado ? 'text-green-500' : 'text-red-500' + " translate-y-[1px]"}>{registro.notificado ? <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l5 5l10 -10" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                        </svg>}</span></p>
                        <p className="overflow-hidden text-ellipsis whitespace-nowrap"><strong>Descripción:</strong> <span className="text-gray-600">{registro.descripcion}</span></p>
                    </div>

                    <div className="flex justify-end space-x-2 mt-3">
                        <button
                            className="text-blue-400 py-1 px-2 rounded font-semibold text-xs hover:bg-blue-100 transition-all duration-200 relative"
                            onClick={() => handleVerMasClick(registro)}
                        >
                            <div className="flex gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#3b82f6" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                    <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                </svg>
                                <p>Ver más</p>
                            </div>
                        </button>

                        <button className='text-blue-400  py-1 px-2 rounded font-semibold text-xs hover:bg-blue-100 transition-all duration-200 relative '
                            onClick={() => handleAgregarInformacionClick(registro)}>

                            <div className="flex gap-1">

                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-rotate-2" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#3b82f6" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M15 4.55a8 8 0 0 0 -6 14.9m0 -4.45v5h-5" />
                                    <path d="M18.37 7.16l0 .01" />
                                    <path d="M13 19.94l0 .01" />
                                    <path d="M16.84 18.37l0 .01" />
                                    <path d="M19.37 15.1l0 .01" />
                                    <path d="M19.94 11l0 .01" />
                                </svg>
                                <p>Actualizar información</p>
                            </div>

                        </button>

                        <Link to={`/camaras/camara/${id}/historial/${registro.id}`}>
                            <button className='text-blue-400  py-1 px-2 rounded font-semibold text-xs hover:bg-blue-100 transition-all duration-200 relative '
                            onClick={() => handleChangeRegistroSelected(registro)}>
                                <div className="flex gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-history" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#3b82f6" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 8l0 4l2 2" />
                                        <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
                                    </svg>
                                    <p>Historial</p>
                                </div>

                            </button>
                        </Link>

                    </div>
                </div>
            ))}
        </div>
    );
}
