
import { useEffect, useState } from 'react';
import { registroEliminadoExitoso } from '../../Toast/Notificaciones';
import Link from '../../Apiconf';
import Nav from '../components/Navbar';
import TablaRegistro from '../components/TablaRegistro';
import { useParams } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { useAppContext } from '../../AppContext';
import Sidebar from '../../Operario/components/Sidebar';
import AgregarEvento from '../forms/AgregarEvento';

export default function Overlay() {
  const { id } = useParams();
  const [loading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [datos, setDatos] = useState([]);
  const { state, dispatch } = useAppContext();
  const [busqueda, setBusqueda] = useState('');
  const handleClickAgregar = () => {
    dispatch({ type: 'TOGGLE_FORM', form: 'showAgregar', payload: true });
    dispatch({ type: 'SET_SELECTED_CAMARA', payload: id });
  };

  useEffect(() => {
    fetch(Link + '/registrosCamara/' + id)
      .then(response => response.json())
      .then(data => {
        setDatos(data);
        setIsLoading(false);
      })
      .catch(error => {
      });
  }, []);

  const handleDelete = (id) => {
    setDatos(datos.filter((item) => item.id !== id));
    registroEliminadoExitoso();
    fetch(Link + '/eliminarRegistro/' + id, {
      method: 'DELETE',
    }).then(() => {
      fetch(Link + '/registrosCamara/' + id)
        .then(response => response.json())
        .then(data => {
          setDatos(data);


        })
        .catch(error => {
        });
    });
  }


  return (
    <>
       {state.showAgregar && <AgregarEvento />}
    <Sidebar></Sidebar>
      <div className='p-4  xl:ml-80  h-[calc(100vh-32px)]  max-w-screen rounded-xl transition-transform duration-300 xl:translate-x-0 '>
        <Nav></Nav>
        <div className="text-sm  text-black flex flex-col justify-center w-full bg-white p-6 shadow-lg rounded  mt-3">
          <p className='text-xl font-bold text-gray-700 font-base mb-5'>Registros camara {id}</p>
          <div className='flex'>
            <div className="flex text-gray-600 justify-between w-full">
              <div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6 "
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </span>
                  <input
                    type="text"
                    className="py-2 pl-10 pr-10 focus:ring-1 text-sm focus:outline-none border rounded border-gray-300 transition duration-200 w-[300px]"
                    placeholder='Buscar'
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />

                  <div className='absolute right-0 inset-y-0 flex items-center p-2'>
                    {busqueda.length > 0 && (
                      <Button
                        className=' bg-gray-300 right-0 inset-y-0 border border-gray-300 p-[2px] text-xs rounded-full  hover:bg-gray-400 hover:border hover:border-gray-600 transition-all duration-200 '
                        onClick={() => setBusqueda('')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M18 6l-12 12" />
                          <path d="M6 6l12 12" />
                        </svg>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <Button  className="gap-2 bg-gray-900 justify-center shadow-sm hover:shadow-xl text-gray-200 py-2 px-5 rounded flex items-center transition duration-200 ease-in border  "
                  onClick={() => handleClickAgregar()}>
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 5l0 14" />
                    <path d="M5 12l14 0" />
                  </svg>
                  <p>
                    Agregar Evento
                  </p>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-5 w-full rounded-lg shadow-md h-[calc(100vh-245px)] border border-gradient bg-gray-100">
            <div className="overflow-y-auto scrollbar-container  max-h-full mt-1 bg-transparent ">
              <TablaRegistro id={id} registros={datos} busqueda={searchTerm}></TablaRegistro>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}