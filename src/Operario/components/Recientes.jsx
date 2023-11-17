import { useEffect, useState } from 'react';
import Link from '../Apiconf';
import { motion } from 'framer-motion';
export default function Recientes() {
  const [registros, setRegistros] = useState([]);

  const [busqueda, setBusqueda] = useState('');
  const [minimo, setMinimo] = useState('');
  const [maximo, setMaximo] = useState('');
  const buscarActivado = !minimo && !maximo;
  const minMaxActivados = !busqueda;
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetch(Link + '/registros')
      .then(response => response.json())
      .then(data => {
        setRegistros(data);
        setIsLoading(false);
      })

      .catch(error => {
      });
  }, []);

  const handleDelete = (id) => {
    setRegistros(registros.filter((item) => item.id !== id));
    fetch(Link + '/eliminarRegistro/' + id, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Registro eliminado exitosamente.');
        } else {
          console.error('Error al eliminar el registro.');
        }
      })
      .catch((error) => {
        console.error('Error de red:', error);
      });
  };


  const [filaEditada, setFilaEditada] = useState(null);

  const handleEditar = (id) => {
    // Activa el modo de edición para la fila con el ID correspondiente
    setFilaEditada(id);
  };

  const handleGuardar = (id) => {
    // Guarda los cambios y desactiva el modo de edición
    // Puedes implementar esta lógica para actualizar tus datos
    setFilaEditada(null);
  };

  return (

    <div className='flex justify-center w-full'>

      <div className="text-sm mt-10 text-black flex flex-col justify-center w-[80%] bg-white p-6 shadow-lg rounded border border-gray-300">
        <div className='flex'>
          <div className="relative text-gray-600 focus-within:text-black rounded ">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
              <svg class="h-3.5 w-3.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </span>
            <input
              type="text"
              className={`py-2 pl-10 focus:ring-1  focus:outline-none border rounded border-gray-300 transition duration-200 ease-in ${!buscarActivado ? 'bg-red-200 transition duration-200 ease-in' : ''}`}
              placeholder='Buscar'
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              disabled={!buscarActivado}
            />
          </div>
        </div>
        <div className='border rounded-lg mt-5 shadow-sm'>
          {!isLoading &&
            <table className="w-full rounded shadow-lg text-gray-800 ">
              <thead className=''>
                <tr className="text-left">
                  <th className="px-4 py-2  border-b border-gray-300" style={{ width: '20%' }}>Fecha</th>
                  <th className="px-4 py-2 border-b border-gray-300" style={{ width: '20%' }}>Evento</th>
                  <th className="px-4 py-2 t border-b border-gray-300" style={{ width: '30%' }}>Descripcion</th>
                  <th className="text-center px-4 py-2 border-b border-gray-300" style={{ width: '10%' }} >¿Fue notificado?</th>
                  <th className="px-4 py-2 border-b border-gray-300" style={{ width: '10%' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {registros
                  .map((dato) => (
                    <tr
                      key={dato.id}
                      isSelectable
                      onSelect={() => alert(dato.id)}
                      className="hover:bg-gray-200 transition duration-100 ease-in"
                    >
                      <td className="px-4 py-2 border-b border-gray-300 truncate-cell" style={{ width: '20%' }}>
                        {new Date(dato.fecha).toLocaleString('es-ES', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-300 truncate-cell" style={{ width: '15%' }}>{dato.tipo}</td>
                      <td className="px-4 py-2 border-b border-gray-300 truncate-cell" style={{ width: '35%' }}>
                        {filaEditada === dato.id ? (
                          <input
                            key={dato.id}
                            type="text"
                            size={100}
                            value=""
                          />
                        ) : (
                          dato.descripcion
                        )}
                        
                        </td>

                      <td className="px-6 py-2 border-b border-gray-300 truncate-cell justify-center" style={{ width: '10%' }}>
                        <div className='flex w-full align-center justify-center'>
                          {dato.notificado ? <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l5 5l10 -10" />
                          </svg> : <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fd0061" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                          </svg>}
                        </div>

                      </td>
                      <td className="py-2 border-b border-gray-300" style={{ width: '10%' }}>
                        <div className='flex px-2'>
                          <button className='rounded-tl-lg rounded-bl-lg border-b border-l border-t border-gray-400 py-1 px-2 hover:bg-gray-300 transition duration-100 ease-in'>Ver</button>
                          {filaEditada === dato.id ? (
                            <button className='border border-gray-400 py-1 px-2 hover:bg-gray-300 transition duration-100 ease-in' onClick={() => handleGuardar(dato.id)}>Guardar</button>
                          ) : (
                            <button className='border border-gray-400 py-1 px-2 hover:bg-gray-300 transition duration-100 ease-in' onClick={() => handleEditar(dato.id)}>Editar</button>
                          )}
                          <button className='rounded-tr-lg rounded-br-lg bg-red-200 py-1 px-2 border-r border-t border-b border-gray-400 text-red-700 font-semibold hover:bg-red-400 transition duration-100 ease-in' onClick={() => handleDelete(dato.id)}>Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          }

        </div>
      </div>
    </div>
  );
}