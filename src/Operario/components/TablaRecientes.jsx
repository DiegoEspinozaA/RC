import React, { useState, useEffect } from 'react';
import Link from "../../Apiconf";
import { Link as ReactLink } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from "@material-tailwind/react";
import { correcta, incorrecta } from "../../Toast/Notificaciones";
import { PiUserCircleFill } from 'react-icons/pi'
import { useAppContext } from '../../AppContext';
import { useAuth } from '../../AuthContext';

export default function Tabla(props) {
    const { user } = useAuth();
    const { busqueda, fechaInicio, fechaFin } = props;

    const fechaInicioObj = fechaInicio;
    const fechaFinObj = fechaFin;
    
    const { state, dispatch } = useAppContext();
    const registros = state.registros;

    function resaltarCoincidencias(texto, busqueda) {
        if (!busqueda || typeof texto !== 'string') return texto;
        const partes = texto.split(new RegExp(`(${busqueda})`, 'gi'));
        return partes.map((parte, index) =>
            parte.toLowerCase() === busqueda.toLowerCase() ?
                <span key={index} style={{ backgroundColor: 'yellow' }}>{parte}</span> :
                parte
        );
    }


    function convertirFecha(fecha) {
        const partes = fecha.split("-");
        return new Date(partes[2], partes[1] - 1, partes[0]);
      }

    const coincideBusqueda = (registro) => {
        if (!busqueda) return true;
        const normalizar = texto => texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const busquedaNormalizada = normalizar(busqueda);
        return [registro.responsable, formatearFecha(registro.fecha_creacion), formatearFecha(registro.fecha), registro.tipo, registro.descripcion, registro.id_camara.toString()]
        .some(campo => {
            if (typeof campo === 'string' || typeof campo === 'number') {
                return normalizar(String(campo)).includes(busquedaNormalizada);
            }
            return false;
        });
    };

    const registrosFiltrados = registros.filter(registro => {
        const fechaRegistro = (formatearFecha(registro.fecha).split(" ")[0]);
        const dentroRangoFecha = (!(fechaInicioObj) || convertirFecha(fechaRegistro) >= convertirFecha(fechaInicioObj)) &&
            (!(fechaFinObj) || convertirFecha(fechaRegistro) <= convertirFecha(fechaFinObj));
        return dentroRangoFecha && coincideBusqueda(registro);
    });

    const handleDelete = (id) => {
        fetch(Link + '/eliminarRegistro/' + id, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.status === 200) {
                    correcta("Registro eliminado exitosamente.");
                    dispatch({ type: 'SET_REGISTROS', payload: state.registros.filter((item) => item.id !== id) });

                } else {
                    incorrecta("Error al eliminar el registro.");
                }
            })
            .catch((error) => {
                incorrecta("Error en el servidor: " + error);
            });
    };


    const handleVerMasClick = (registro) => {
        dispatch({ type: 'SET_SELECTED_REGISTRO', payload: registro });
        dispatch({ type: 'TOGGLE_FORM', form: 'showVerMasForm', payload: true });
    };


    const handleAgregarInformacionClick = (registro) => {
        dispatch({ type: 'SET_SELECTED_REGISTRO', payload: registro });
        dispatch({ type: 'TOGGLE_FORM', form: 'showAgregarInformacionForm', payload: true });
    }

    function formatearFecha(fechaISO) {
        const fecha = new Date(fechaISO);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getFullYear();
        const horas = fecha.getHours().toString().padStart(2, '0');
        const minutos = fecha.getMinutes().toString().padStart(2, '0');
        return `${dia}-${mes}-${anio} ${horas}:${minutos}`;
    }

    return (
        <div className="grid grid-cols-1 gap-4 px-5 py-3">
            {registrosFiltrados.map((registro, index) => (
                <div key={index} className={`border-r border-l border-b border-gray-200 bg-white rounded-lg shadow-md px-4 py-2 pb-2 hover:shadow-lg transition-shadow duration-200'
                    }`}
                    style={{ borderTopColor: registro.color, borderTopWidth: '4px' }} >
                    <div className="flex gap-1">

                        <PiUserCircleFill className="w-6 h-6 text-gray-500 translate-y-[-2px]"></PiUserCircleFill>
                        <span className="text-gray-900"> {registro.responsable} </span>
                        <span className="text-gray-800 ml-3">Creado el {formatearFecha(registro.fecha_creacion)} </span>
                    </div>
                    <div className="text-sm mt-2 px-1">
                        <p className="py-[1px]"><strong>Camara:</strong> <span className="text-gray-600">{resaltarCoincidencias(registro.id_camara.toString(), busqueda)}</span></p>
                        <p className="py-[1px]"><strong>Fecha:</strong> <span className="text-gray-600">{resaltarCoincidencias(formatearFecha(registro.fecha), busqueda)}</span></p>
                        <p className="py-[1px]"><strong>Evento:</strong> <span className="text-gray-600">{resaltarCoincidencias(registro.tipo, busqueda)}</span></p>
                        <p className="overflow-hidden text-ellipsis whitespace-nowrap"><strong>Descripción:</strong> <span className="text-gray-600">{resaltarCoincidencias(registro.descripcion, busqueda)}</span></p>
                    </div>

                    <div className="flex justify-end space-x-2 mt-3">
                        <button
                            className="text-blue-400 py-1 px-2 rounded font-semibold text-xs hover:bg-blue-100 transition-all duration-200 relative "
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

                        <ReactLink to={`/registros/historial/${registro.id}`}>
                            <button className='text-blue-400  py-1 px-2 rounded font-semibold text-xs hover:bg-blue-100 transition-all duration-200 relative '>
                                <div className="flex gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-history" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#3b82f6" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 8l0 4l2 2" />
                                        <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
                                    </svg>
                                    <p>Historial</p>
                                </div>

                            </button>
                        </ReactLink>

                        {user && user.rol === 'Administrador' && (
                            <button className='text-red-400  py-1 px-2 rounded font-semibold text-xs hover:bg-red-200 transition-all duration-200 relative '
                                onClick={() => handleAgregarInformacionClick(registro)}>

                                <div className="flex gap-1">

                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash-x" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M4 7h16" />
                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                        <path d="M10 12l4 4m0 -4l-4 4" />
                                    </svg>
                                    <p>Eliminar</p>
                                </div>

                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
