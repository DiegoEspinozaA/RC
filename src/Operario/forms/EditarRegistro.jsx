import React, { useState, useEffect } from "react";
import { correcta, incorrecta } from "../../Toast/Notificaciones";
import { useAppContext } from '../../AppContext';
import { Button } from "@material-tailwind/react";
import { actualizarYSetearRegistros } from "../../fetchApi"; 

export default function EditarRegistro() {
    const { state, dispatch } = useAppContext();
    const registro = state.selectedRegistro;
    const tiposEventos = state.tiposEventos;


    const blankState = {
        id: registro.id,
        id_camara: '',
        fecha: '',
        tipo: '',
        descripcion: '',
        color: '',
    }

    const registroState = {
        id: registro.id,
        id_camara: registro.id_camara,
        fecha: registro.fecha,
        tipo: registro.tipo,
        descripcion: registro.descripcion,
        color: tiposEventos.find((evento) => evento.tipo === registro.tipo).color,
    }


    const handleCloseModal = () => {
        dispatch({ type: 'TOGGLE_FORM', form: 'showAgregarInformacionForm', payload: false });
        dispatch({ type: 'SET_SELECTED_REGISTRO', payload: null });
    };

    const [formData, setFormData] = useState(registroState);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleVaciar = () => {
        setFormData(blankState);
    }

    const handleAutocompletar = () => {
        setFormData(registroState);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
     
        const exito = await actualizarYSetearRegistros(formData, dispatch);
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
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium">Actualizar información</h3>
                            <div className="mb-4 bg-blue-100 rounded-lg p-3">
                                <h4 className="text-lg font-medium mb-2">Estado Actual del Registro</h4>
                                <p className="mb-2 text-sm">
                                    <span className="font-semibold ">ID de Registro:</span> {registro.id}
                                </p>
                                <p className="mb-2 text-sm">
                                    <span className="font-semibold">ID de Cámara:</span> {registro.id_camara}
                                </p>
                                <p className="mb-2 text-sm">
                                    <span className="font-semibold">Fecha:</span> {registro.fecha}
                                </p>
                                <p className="mb-2 text-sm">
                                    <span className="font-semibold">Tipo de Evento:</span> {registro.tipo}
                                </p>
                                <p className="font-semibold mb-2 text-sm">Descripción:</p>

                                <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-2 text-sm">
                                    <p>{registro.descripcion}</p>
                                </div>

                            </div>
                            <form className="space-y-6" >
                                <div>
                                    <label
                                        for="id"
                                        className="block mb-1 text-sm font-medium text-gray-900"
                                    >
                                        Cámara
                                    </label>
                                    <input
                                        type="text"
                                        name="id_camara"
                                        id="id_camara"
                                        className="shadow-md p-2.5 w-full focus:ring-1 focus:outline-none border rounded text-sm border-gray-300 transition duration-200 ease-in"
                                        placeholder="Ingrese el ID de la cámara"
                                        required
                                        value={formData.id_camara}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <label
                                        for="id"
                                        className="block text-sm mb-1 font-medium text-gray-900"
                                    >
                                        Fecha
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="fecha"
                                        id="fecha"
                                        className="shadow-md p-2.5 w-full focus:ring-1 focus:outline-none border rounded text-sm border-gray-300 transition duration-200 ease-in"
                                        placeholder="Fecha"
                                        required
                                        value={formData.fecha}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label
                                        for="tipo"
                                        className="block mb-1 text-sm font-medium text-gray-900"
                                    >
                                        Tipo de evento
                                    </label>
                                    <select
                                        name="tipo"
                                        id="tipo"
                                        className="shadow-md border focus:ring-1 focus:outline-none border-gray-300 transition duration-200 ease-in text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                        value={formData.tipo}
                                        onChange={handleInputChange}
                                    >
                                        {tiposEventos.map((evento) => (
                                            <option value={evento.tipo} key={evento.id}>
                                                {evento.tipo}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label
                                        for="descripcion"
                                        className="block mb-1 text-sm font-medium text-gray-900"
                                    >
                                        Descripción del evento
                                    </label>
                                    <textarea
                                        type="text"
                                        name="descripcion"
                                        id="descripcion"
                                        className="focus:ring-1 transition duration-200 ease-in focus:outline-none border shadow-md border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                        placeholder="Ingrese la descripción del evento captado"
                                        required
                                        value={formData.descripcion}
                                        onChange={handleInputChange}
                                        style={{ maxHeight: "400px", minHeight: "130px" }}
                                    ></textarea>
                                </div>
                                <div className="flex justify-between gap-5">
                                    <Button className="bg-blue-500 hover:bg-blue-700 text-gray-200 w-full justify-center font-bold py-2 px-5 rounded inline-flex items-center transition duration-100 ease-in"
                                        onClick={handleAutocompletar}>
                                        Autocompletar
                                    </Button>
                                    <Button className="bg-blue-500 hover:bg-blue-700 text-gray-200 w-full justify-center font-bold py-2 px-5 rounded inline-flex items-center transition duration-100 ease-in"
                                        onClick={handleVaciar}>
                                        Vaciar
                                    </Button>
                                </div>

                                <Button className="bg-blue-500 hover:bg-blue-700 text-gray-200 w-full justify-center font-bold py-2 px-5 rounded inline-flex items-center transition duration-100 ease-in"
                                    onClick={handleSubmit}>
                                    <span className="ml-1">Guardar</span>
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
