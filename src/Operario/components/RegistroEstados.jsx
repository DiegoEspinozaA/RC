import React, { useState, useEffect } from 'react';
import Link from "../../Apiconf";
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from "@material-tailwind/react";
import { correcta, incorrecta } from "../../Toast/Notificaciones";
import { PiUserCircleFill } from 'react-icons/pi'
import { useAppContext } from '../../AppContext';

export default function RegistroEstados() {

    const { state, dispatch } = useAppContext();
    const registros = state.historialEstadoCamara;
    const [isLoading, setIsLoading] = useState(true);

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
          
                    {registros.map((registro) => (
                        <div key={registro.idCamara} className={`border-r border-l border-b border-gray-200 bg-white rounded-lg shadow-md px-4 py-2 pb-2 hover:shadow-lg transition-shadow duration-200'
                    }`}
                            style={{borderTopWidth: '4px' }} >
                            <div className="flex gap-1">

                                <PiUserCircleFill className="w-6 h-6 text-gray-500 translate-y-[-2px]"></PiUserCircleFill>
                                <span className="text-gray-900"> {registro.responsable || "Operario 1"} </span>
                                <span className="text-gray-800 ml-3">Creado el {formatearFecha(registro.FechaCambio)} </span>
                            </div>
                            <div className="text-sm mt-2 px-1">
                                <p className="py-[1px]"><strong>Camara:</strong> <span className="text-gray-600">{registro.idCamara}</span></p>
                                <p className="py-[1px]"><strong>Estado actual:</strong> <span className="text-gray-600">{registro.EstadoActual}</span></p>
                                <p className="py-[1px]"><strong>Estado anterior:</strong> <span className="text-gray-600">{registro.EstadoAnterior}</span></p>
                            </div>
                        </div>
                    ))}
        </div>
    );
}
