import React, { useEffect, useState } from "react";
import { Colorful } from "@uiw/react-color";

export default function Admin() {
    const handleLogout = () => {
        fetch('http://localhost:3001/logout', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                window.location.reload();
            })
            .catch(error => {
            });
    }

    const [eventos, setEventos] = useState([]);
    const [locaciones, setLocaciones] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/tiposEventos', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setEventos(data);
            })
            .catch(error => {
            });

    })

    const handleColorChange = (eventoId, newColor) => {
        // Actualizar el color en su estado aquí
        // Esto dependerá de cómo esté estructurado su estado
    };

    const [editId, setEditId] = useState(null);
    const [draft, setDraft] = useState({});

    const handleEdit = (evento) => {
        setEditId(evento.id);
        setDraft({ ...evento });
    };

    const handleSave = (id) => {
        const updatedEventos = eventos.map(evento => {
            if (evento.id === id) return { ...evento, ...draft };
            return evento;
        });
        setEventos(updatedEventos);
        setEditId(null);
    };

    const handleCancel = () => {
        setEditId(null);
    };

    const handleChange = (e, field) => {
        setDraft({ ...draft, [field]: e.target.value });
    };

    return (
        <div className="p-10">
            <nav className="w-full flex justify-between border-b border-gray-300">
                <ul className="flex gap-10">
                    <li className="border-b-2 border-blue-500">
                        <button>Tipos de eventos</button>
                    </li>
                    <li>
                        <button>Sectores</button>
                    </li>
                    <li>
                        <button>Camaras</button>
                    </li>
                </ul>
                <button onClick={handleLogout}>Cerrar sesión</button>
            </nav>
            <main>

                <div className="mt-10">
                    <div className="overflow-hidden rounded-lg ">
                        <div className="max-h-96 overflow-y-auto">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th className="py-3 text-left text-xl font-semibold bg-transparent uppercase w-[200px] ">
                                            Tipos de eventos
                                        </th>
                                        <th className="px-5 py-3 text-center text-xs font-semibold bg-transparent uppercase tracking-wider">
                                            Tipo
                                        </th>
                                        <th className="px-5 py-3 text-center  text-xs font-semibold bg-transparent uppercase tracking-wider">
                                            Color
                                        </th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eventos.map(evento => (
                                        <tr key={evento.id}>
                                            <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                                <input
                                                    type="text"
                                                    value={editId === evento.id ? draft.id : evento.id}
                                                    onChange={e => handleChange(e, 'id')}
                                                    className={`bg-transparent border-none focus:outline-none focus:ring-0 ${editId !== evento.id && 'pointer-events-none'}`}
                                                />
                                            </td>
                                            <td className="px-5 py-3 text-center border-b border-gray-200 bg-white text-sm">
                                                <input
                                                    type="text"
                                                    value={editId === evento.id ? draft.tipo : evento.tipo}
                                                    onChange={e => handleChange(e, 'tipo')}
                                                    className={`bg-transparent border-none focus:outline-none text-center ${editId !== evento.id && 'pointer-events-none'}`}
                                                />
                                            </td>
                                            <td className="px-5 py-3 text-center border-b border-gray-200 bg-white text-sm">
                                                {editId === evento.id ? (
                                                    <input
                                                        type="color"
                                                        value={draft.color}
                                                        onChange={e => handleChange(e, 'color')}
                                                        className="h-10 w-10 rounded border-none"
                                                        style={{ border: 'none', backgroundColor: draft.color, appearance: 'none' }}
                                                    />
                                                ) : (
                                                    <input
                                                        className="h-10 w-10 rounded border-none focus:outline-none bg-transparent "
                                                        style={{ backgroundColor: evento.color }}
                                                        disabled
                                                        value=''
                                                    >
                                                    </input>
                                                )}
                                            </td>
                                            <td className="px-5 py-3 text-center border-b border-gray-200 bg-white text-sm">
                                                <>
                                                    <button  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded ${editId !== evento.id ? 'invisible' : ''}`} onClick={() => handleSave(evento.id)}>Guardar</button>
                                                    <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded ${editId === evento.id ? 'invisible' : ''}`} onClick={() => handleEdit(evento)}>Editar</button>
                                                    <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded ${editId !== evento.id ? 'invisible' : ''}`} onClick={handleCancel}>Cancelar</button>
                                                </>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </main>
        </div>
    )
}