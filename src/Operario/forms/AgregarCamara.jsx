import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../AppContext';
import { Button } from '@material-tailwind/react';
import Link from '../../Apiconf';
import { crearCamaras } from '../../fetchApi';
import { correcta, incorrecta } from '../../Toast/Notificaciones';

export default function CrearCamara() {
    const { state, dispatch } = useAppContext();
    const [camaras, setCamaras] = useState(Array.from({ length: 5 }, () => ({ id: '', locacion: '', estado: '' })));
    const [locaciones, setLocaciones] = useState([]);
    const [estados, setEstados] = useState([]);
    const [loading, setLoading] = useState(true);


    const handleCloseModal = () => {
        dispatch({ type: 'TOGGLE_FORM', form: 'agregarCamarasForm', payload: false });
    };

    useEffect(() => {
        Promise.all([
            fetch(Link + '/locaciones').then(res => res.json()),
            fetch(Link + '/estados').then(res => res.json())
        ])
            .then(([dataLocaciones, dataEstados]) => {
                setLocaciones(dataLocaciones);
                setEstados(dataEstados);
            })
            .catch(error => {
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);



    const handleIdChange = (index, e) => {
        const nuevasCamaras = camaras.map((camara, i) => {
            if (i === index) {
                return { ...camara, id: e.target.value };
            }
            return camara;
        });

        setCamaras(nuevasCamaras);
    };

    const handleLocacionChange = (index, e) => {
        const nuevasCamaras = camaras.map((camara, i) => {
            if (i === index) {
                return { ...camara, locacion: e.target.value };
            }
            return camara;
        });

        setCamaras(nuevasCamaras);
    };

    const handleEstadoChange = (index, e) => {
        const nuevasCamaras = camaras.map((camara, i) => {
            if (i === index) {
                return { ...camara, estado: e.target.value };
            }
            return camara;
        });

        setCamaras(nuevasCamaras);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        let camarasParaEnviar = camaras.filter(camara =>
            camara.id  && camara.locacion !== "Seleccionar"  && camara.estado !== "Seleccionar" 
        );
        camarasParaEnviar = camarasParaEnviar.map(camara => {
            return ({
                id: parseInt(camara.id),
                locacion: camara.locacion,
                estado: estados.find((estado) => estado.nombre === camara.estado, 10).id,
            })
        })

        let existeCamara = camarasParaEnviar.some(camaraParaEnviar => 
            state.camaras.some(camara => camara.id === camaraParaEnviar.id)
        );

        if(existeCamara){
            incorrecta('La camara ya existe');
            return;
        }

        if (camarasParaEnviar.length > 0) {
            const datosParaEnviar = camarasParaEnviar.map(({ id, locacion, estado }) => ({
                id, locacion, estado
            }));

            const exito = await crearCamaras(datosParaEnviar, dispatch);
            if (exito) {
                correcta('Camaras agregadas exitosamente');
            }

        } else {
            incorrecta('No hay camaras para agregar');
        }

    };

    return (
        <div className="overflow-y-auto scrollbar-container bg-gray-100 max-h-full">
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
                            <h3 className="mb-4 text-xl font-medium">Agregar camaras</h3>
                            {!loading && (
                                <form onSubmit={handleSubmit}>
                                    <table className="min-w-full">
                                        <thead className=''>
                                            <tr className="bg-gray-100">
                                                <th className="text-center px-4 py-2 w-[150px]">ID</th>
                                                <th className="text-center px-4 py-2">Locación</th>
                                                <th className="text-center px-4 py-2">Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {camaras.map((camara, index) => (
                                                <tr key={index} className="">

                                                    <td className="px-4 py-2">
                                                        <input
                                                            type="text"
                                                            className="shadow-md p-2.5 w-[150px] focus:ring-1 focus:outline-none border rounded text-sm border-gray-300 transition duration-200 ease-in"
                                                            value={camara.id}
                                                            placeholder='ID Camara'
                                                            onChange={(e) => handleIdChange(index, e)}
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <select
                                                            className="shadow-md p-2.5 focus:ring-1 focus:outline-none border rounded text-sm border-gray-300 transition duration-200 ease-in w-full text-gray-900"
                                                            value={camara.locacion}
                                                            onChange={(e) => handleLocacionChange(index, e)}
                                                        >
                                                              <option key="Seleccionar" value="Seleccionar">
                                                                Seleccionar
                                                            </option>
                                                            {locaciones.map(locacion => (
                                                                <option key={locacion.locacion} value={locacion.locacion}>
                                                                    {locacion.locacion}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <select
                                                            className="shadow-md p-2.5 focus:ring-1 focus:outline-none border rounded text-sm border-gray-300 transition duration-200 ease-in w-full text-gray-900"
                                                            value={camara.estado}
                                                            onChange={(e) => handleEstadoChange(index, e)}
                                                        >
                                                            <option key="Seleccionar" value="Seleccionar">
                                                                Seleccionar
                                                            </option>
                                                            {estados.map(estado => (
                                                                <option key={estado.id} value={estado.nombre}>
                                                                    {estado.nombre}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className='mt-4 flex gap-2'>
                                        <Button className="gap-2 bg-gray-900 justify-center shadow-sm hover:shadow-xl text-gray-200 py-2 px-5 rounded flex items-center transition duration-200 ease-in border w-full" onClick={handleSubmit}>
                                            <span className="ml-1">Agregar</span>
                                        </Button>
                                        <Button variant="outlined" className="bg-transparent border border-gray-600 text-gray-900  font-bold py-2 px-5 w-40 rounded"
                                        >
                                            <span className="ml-1">Reniciar</span>
                                        </Button>
                                    </div>
                                </form>
                            )}


                        </div>


                    </div>
                </div>
            </div>
        </div>


    );
}
