import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../components/Navbar';
import { Accordion, AccordionItem } from "@nextui-org/react";
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Sidebar from '../components/Sidebar';
export default function HistorialCamara() {
    const { id_camara } = useParams();
    const [historial, setHistorial] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:3001/historialEstadoCamara/${id_camara}`)
            .then(res => res.json())
            .then(data => {
                setHistorial(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener el historial:', error);
                setIsLoading(false);
            });
    }, [id_camara]);

    const historialPorFecha = historial.reduce((acc, item) => {
        const fecha = new Date(item.FechaCambio);
        const fechaClave = new Date(fecha);
        const dia = fechaClave.getDate();
        const mes = fechaClave.toLocaleString('es-ES', { month: 'long' });
        const año = fechaClave.getFullYear();
        const fechaFormateada = `${dia} de ${mes} de ${año}`;
        if (!acc[fechaFormateada]) {
            acc[fechaFormateada] = [];
        }
        acc[fechaFormateada].push(item);
        return acc;
    }, {});

    const [selectedCambio, setSelectedCambio] = useState(null);


    const toggleCambio = (fecha) => {
        if (selectedCambio === fecha) {
            setSelectedCambio(null);
        } else {
            setSelectedCambio(fecha);
        }
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

    return (
        <>
        <Sidebar></Sidebar>
            <div className='xl:ml-80 h-[calc(100vh-32px)] my-4 px-4  max-w-screen rounded-xl transition-transform duration-300 xl:translate-x-0'>
                <Nav></Nav>
                <div className="text-sm  text-black flex flex-col justify-center w-full bg-white p-6 shadow-lg rounded-xl mt-3">
                    <p className='text-xl font-bold text-gray-700 font-base mb-5'>Historial de Estados para la Cámara {id_camara}</p>
                    <div className="mt-5 w-full rounded-lg shadow-md border border-gray-200">

                        <div className=" overflow-y-auto scrollbar-container bg-white h-[calc(100vh-209px)]  px-6 justify-center ">
                            <div className=" w-full ">
                                {!isLoading && (
                                    <>
                                        {Object.entries(historialPorFecha).map(([fecha, registros, index]) => (
                                            <div key={index} >
                                                <div class="TimelineItem pt-5 pb-5">
                                                    <div className=" w-[2rem] flex text-center items-center h-[1rem] ml-[-0.45rem] bg-white z-20">
                                                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="fill-gray-500">
                                                            <path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"></path>
                                                        </svg>
                                                    </div>
                                                    <div class="mt-[-0.20rem] w-full">
                                                        <h2 class="text-md px-2">Cambios registrados el {fecha}</h2>
                                                        {registros.map((cambio) => (
                                                            <div className='w-full mt-3 shadow-md outline-none rounded-lg  hover:shadow-md transition-all duration-200 mb-3 hover:bg-gray-300 text-base bg-gray-200 border border-gray-300 px-3 py-2 '>

                                                                <div className='flex w-full px-1 py-1 items-center '>
                                                                    <div className="flex items-center">

                                                                        <div className="flex gap-2 items-center align-bottom ">
                                                                            <p className="font-bold text-[14px] text-gray-600">Operario 1</p>
                                                                            <p className="text-xs ali">Cambio realizado a las {new Date(cambio.FechaCambio).toLocaleDateString('es-CL', {
                                                                                hour: "numeric",
                                                                                minute: "numeric",
                                                                            }).split(' ')[1]} hrs</p>
                                                                            <div className='flex gap-2 ml-5  items-center'>

                                                                                <p>{cambio.EstadoAnterior}</p>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-right" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                                    <path d="M5 12l14 0" />
                                                                                    <path d="M13 18l6 -6" />
                                                                                    <path d="M13 6l6 6" />
                                                                                </svg>
                                                                                <p>{cambio.EstadoActual}</p>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                            </div>
                                        ))}
                                    </>
                                )}
                                {historial.length !== 0 && (
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
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
