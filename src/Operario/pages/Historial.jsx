import Nav from "../components/Navbar"
import React, { useEffect, useState } from "react";
import Link from "../../Apiconf";
import { Accordion, AccordionItem } from "@nextui-org/react";
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useParams } from "react-router-dom";
import { PiUserCircleFill } from 'react-icons/pi'
import { useAppContext } from "../../AppContext";
import Sidebar from '../components/Sidebar'

export default function Historial() {
    const { id_registro } = useParams();
    const [historial, setHistorial] = useState([]);
    const { state, dispatch } = useAppContext();
    const [registro, setRegistro] = useState({});
    const [registroActual, setRegistroActual] = useState({});


    useEffect(() => {
        fetch(Link + '/registro/' + id_registro)
            .then(response => response.json())
            .then(data => {
                setRegistroActual(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        fetch(Link + '/historial/' + id_registro)
            .then(response => response.json())
            .then(data => {
                setHistorial(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [])


    const registrosPorFecha = {};
    historial.forEach(registro => {
        const fechaModificacion = new Date(registro["fecha_modificacion"]);
        const fechaClave = new Date(fechaModificacion);
        const dia = fechaClave.getDate();
        const mes = fechaClave.toLocaleString('es-ES', { month: 'long' });
        const año = fechaClave.getFullYear();
        const fechaFormateada = `${dia} de ${mes} de ${año}`;
        if (registrosPorFecha[fechaFormateada]) {
            registrosPorFecha[fechaFormateada].push(registro);
        } else {
            registrosPorFecha[fechaFormateada] = [registro];
        }
    });

    function formatearFecha(fechaISO) {
        const fecha = new Date(fechaISO);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getFullYear();
        const horas = fecha.getHours().toString().padStart(2, '0');
        const minutos = fecha.getMinutes().toString().padStart(2, '0');

        return `${dia}-${mes}-${anio} ${horas}:${minutos}`;
    }

    const [selectedCambio, setSelectedCambio] = useState(null);


    const toggleCambio = (fecha) => {
        if (selectedCambio === fecha) {
            setSelectedCambio(null);
        } else {
            setSelectedCambio(fecha);
        }
    };



    return (
        <>
        <Sidebar></Sidebar>
            <div className='xl:ml-80 h-[calc(100vh-32px)] my-4 px-4 max-w-screen rounded-xl transition-transform duration-300 xl:translate-x-0 '>
                <Nav></Nav>
                <div className='text-sm  text-gray-800 flex flex-col justify-center w-full bg-white p-6 shadow-lg rounded-xl  mt-3 '>
                    <p className='text-xl font-bold text-gray-700 font-base mb-5'>Registro {id_registro}</p>
                    <p className='text-lg font-bold text-gray-600 font-base ml-1 mb-1'>Estado actual </p>
                    <div className={`border-r border-l border-b border-gray-200 rounded-lg shadow-md px-4 py-2 pb-2 transition-shadow duration-200'
                    }`}
                        style={{ borderTopColor: registroActual.color, borderTopWidth: '4px' }} >
                        <div className="flex gap-1">

                            <PiUserCircleFill className="w-6 h-6 text-gray-500 translate-y-[-2px]"></PiUserCircleFill>
                            <span className="text-gray-900"> {registroActual.responsable} </span>
                            <span className="text-gray-800 ml-3">Creado el {formatearFecha(registroActual.fecha_creacion)} </span>
                        </div>
                        <div className="text-sm mt-2 px-1">
                            <p className="py-[1px]"><strong>Camara:</strong> <span className="text-gray-600">{registroActual.id_camara}</span></p>
                            <p className="py-[1px]"><strong>Fecha:</strong> <span className="text-gray-600">{formatearFecha(registroActual.fecha)}</span></p>
                            <p className="py-[1px]"><strong>Evento:</strong> <span className="text-gray-600">{registroActual.tipo}</span></p>
                            <p className="flex items-center py-[1px] gap-[1px] "><strong>Notificado:</strong> <span className={registroActual.notificado ? 'text-green-500' : 'text-red-500' + " translate-y-[1px]"}>
                                {registroActual.notificado ?
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M5 12l5 5l10 -10" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M18 6l-12 12" />
                                        <path d="M6 6l12 12" />
                                    </svg>}</span></p>
                            <p className="overflow-hidden text-ellipsis whitespace-nowrap"><strong>Descripción:</strong> <span className="text-gray-600">{registroActual.descripcion}</span></p>
                        </div>
                    </div>

                    <p className='text-lg font-bold text-gray-600 font-base mt-5 ml-1'>{historial.length !== 0 ? 'Historial' : 'No hay cambios anteriores'}</p>
                    {historial.length !== 0 && (
                        <div className="mt-5 w-full rounded-lg shadow-md border border-gray-200">

                            <div className=" overflow-y-auto scrollbar-container bg-white h-[calc(100vh-245px)]  px-6 justify-center ">

                                <div className=" w-full ">
                                    {Object.entries(registrosPorFecha).map(([fecha, registros]) => (
                                        <div key={fecha} >
                                            <div class="TimelineItem pt-5 pb-5">
                                                <div className=" w-[2rem] flex text-center items-center h-[1rem] ml-[-0.45rem] bg-white z-20">
                                                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="fill-gray-500">
                                                        <path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"></path>
                                                    </svg>
                                                </div>
                                                <div class="mt-[-0.20rem] w-full">
                                                    <h2 class="text-md px-2">Cambios registrados el {fecha}</h2>
                                                    <Accordion hideIndicator >
                                                        {registros.map((cambio) => (
                                                            <AccordionItem
                                                                key={cambio.ID}
                                                                aria-label={cambio.ID}
                                                                title={
                                                                    <div className='flex w-full px-1 py-1 items-center '>
                                                                        <div className="flex items-center">
                                                                            {selectedCambio === fecha ? (
                                                                                <IconButton
                                                                                >
                                                                                    <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
                                                                                </IconButton>


                                                                            ) : (
                                                                                <IconButton>
                                                                                    <KeyboardArrowDownIcon ></KeyboardArrowDownIcon>
                                                                                </IconButton>
                                                                            )}
                                                                            <div className="flex gap-1 items-center align-bottom ">
                                                                                <p className="font-bold text-[14px] text-gray-600">Diego Espinoza</p>
                                                                                <p className="text-xs ali">Cambio realizado a las {new Date(cambio.fecha_modificacion).toLocaleDateString('es-CL', {
                                                                                    hour: "numeric",
                                                                                    minute: "numeric",
                                                                                }).split(' ')[1]} hrs</p>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                }
                                                                onPress={() => toggleCambio(fecha)}
                                                                className='w-full mt-3 shadow-md outline-none rounded-lg  hover:shadow-md transition-all duration-200 mb-3 hover:bg-gray-300 text-base bg-gray-200 border border-gray-300 '
                                                            >
                                                                <div className="px-11">
                                                                    <div className="flex gap-1 mb-1">
                                                                        <label className="font-bold text-[14px] text-gray-700">Camara:</label>
                                                                        <p>{cambio.id_camara}</p>
                                                                    </div>


                                                                    <div className="flex gap-1 mb-1">
                                                                        <label className="font-bold text-[14px] text-gray-700">Fecha:</label>
                                                                        <p >{new Date(cambio.fecha).toLocaleString('es-ES', {
                                                                            year: 'numeric',
                                                                            month: 'numeric',
                                                                            day: 'numeric',
                                                                            hour: '2-digit',
                                                                            minute: '2-digit',
                                                                        })}</p>
                                                                    </div>

                                                                    <div className="flex gap-1 mb-1">

                                                                        <label className="font-bold text-[14px] text-gray-700">Evento:</label>
                                                                        <p>{cambio.tipo}</p>
                                                                    </div>
                                                                    <div className="flex gap-1 mb-1">

                                                                        <label className="font-bold text-[14px] text-gray-700">Notificado:</label>
                                                                        <p>No</p>
                                                                    </div>

                                                                    <div className="flex gap-1 mb-1">

                                                                        <label className="font-bold text-[14px] text-gray-700">Descripcion</label>
                                                                        <p>{cambio.descripcion}</p>
                                                                    </div>

                                                                </div>

                                                            </AccordionItem>
                                                        ))}
                                                    </Accordion>
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                    <div class="TimelineItem pt-2 pb-2 ">
                                        <div className=" w-[2rem] flex text-center items-center h-[1rem] ml-[-0.45rem] bg-white z-20 mb-2">
                                            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="fill-gray-500">
                                                <path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"></path>
                                            </svg>
                                        </div>
                                        <div class="TimelineItem-body mt-[-0.20rem]">
                                            <h2 class="px-3">Fin de los cambios</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}


                </div>
            </div>
        </>
    )
}