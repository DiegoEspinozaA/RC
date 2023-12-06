import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Nav from '../components/Navbar';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { Dropdown, DropdownItem, DropdownTrigger, DropdownMenu } from '@nextui-org/react';
import { useAppContext } from '../../AppContext';
import TabsDefault from '../components/TabsDefault';
import Registros from './Registros';
import { CgLayoutGridSmall } from 'react-icons/cg';
import { CiLocationOn } from 'react-icons/ci';
import Sidebar from '../components/Sidebar';
import EditarRegistro from '../forms/EditarRegistro';
import VerMas from '../forms/VerMas';
import EstadoCamara from '../forms/EstadoCamara';
import { useAuth } from '../../AuthContext';
import AgregarCamara from '../forms/AgregarCamara';
export default function Estados() {
    const { state, dispatch } = useAppContext();
    const camaras = state.camaras;
    const { rol } = useAuth();

    const [busqueda, setBusqueda] = useState('');
    const [busquedaCamara, setBusquedaCamara] = useState('');
    const [minimo, setMinimo] = useState('');
    const [maximo, setMaximo] = useState('');
    const [isLoading, setIsLoading] = useState(true);



   

    const ids = camaras.map(camara => parseInt(camara.id, 10));
    const min = ids.length ? Math.min(...ids) : 0;
    const max = ids.length ? Math.max(...ids) : 0;
    const [selectedTipo, setSelectedTipo] = useState("Todos");
  
    const setFilters = () => {
        setBusqueda('');
        setBusquedaCamara('');
        setMinimo('');
        setMaximo('');
        setSelectedTipo("Todos");
    }


    const buscarActivado = !minimo && !maximo;
    const minMaxActivados = !busquedaCamara;

    const elementosFiltrados = camaras.filter(elemento => {
        const coincideTipo = selectedTipo === "Todos" || elemento.EstadoActual === selectedTipo;
        if (minMaxActivados) {
            const numeroElemento = parseInt(elemento.id, 10);
            const min = minimo !== '' ? parseInt(minimo, 10) : -Infinity;
            const max = maximo !== '' ? parseInt(maximo, 10) : Infinity;
            return numeroElemento >= min && numeroElemento <= max && coincideTipo;
        }

        const coincideBusqueda = elemento.id.toString().toLowerCase().includes(busquedaCamara.toLowerCase());
        return coincideBusqueda && coincideTipo;
    });


    let conteoDeTipos = {};

    elementosFiltrados.forEach(elemento => {
        const tipoActual = elemento.EstadoActual;
        const colorEvento = elemento.color;

        if (conteoDeTipos[tipoActual]) {
            conteoDeTipos[tipoActual].conteo++;
        } else {
            conteoDeTipos[tipoActual] = { conteo: 1, color: colorEvento };
        }
    });



    const [activeDropdown, setActiveDropdown] = useState(null);
    const handleDropdownToggle = (index) => {
        if (activeDropdown === index) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(index);

        }
    };
    const handleDropdownClose = () => {
        setActiveDropdown(null);
    };

    const handleEstadoCamaraClick = (registro) => {
        dispatch({ type: 'SET_ESTADO_CAMARA_SELECCIONADA', payload: registro });
        dispatch({ type: 'TOGGLE_FORM', form: 'showEstadoCamaraForm', payload: true });
    };



    const active = state.activeTab;

    const handleTabClick = (value) => {
        dispatch({ type: 'SET_ACTIVE_TAB', payload: value })
    }


    const handleChangeSelectTipo = (event) => {
        setSelectedTipo(event.target.value);
    };

    const handleEliminarCamaraClick = (id) => {

    }
    console.log(busquedaCamara.length);
    console.log(minimo.length)
    console.log(maximo.length)
    console.log(selectedTipo);
    console.log(active);



    return (
        <>
            {state.showVerMasForm && <VerMas />}
            {state.showAgregarInformacionForm && <EditarRegistro />}
            {state.showEstadoCamaraForm && <EstadoCamara />}
            {state.agregarCamarasForm && <AgregarCamara />}
            <Sidebar></Sidebar>
            <div className='xl:ml-80 h-[calc(100vh-32px)] my-4 px-4  max-w-screen rounded-xl transition-transform duration-300 xl:translate-x-0'>
                <Nav></Nav>
                <div className="text-sm  text-black flex flex-col justify-center w-full bg-white p-6 shadow-lg rounded-xl mt-3">
                    <div className='flex justify-between'>
                        <p className='text-xl font-bold text-gray-700 font-base mb-5'>Registros de camaras</p>
                        <TabsDefault
                            activeTab={state.activeTab}
                            data={[
                                {
                                    label: "Camaras",
                                    value: "cuadricula",
                                    icon: CgLayoutGridSmall,
                                },
                                {
                                    label: "Sectores",
                                    value: "sector",
                                    icon: CiLocationOn,
                                },
                            ]}
                            onTabClick={handleTabClick} ></TabsDefault>
                        <p className='text-xl font-bold text-white font-base mb-5'>Registros de camaras</p>
                    </div>


                    <div className='flex gap-4 w-full items-center'>

                        <div className='flex'>

                            {active === 'cuadricula' && (
                                <select
                                    name="tipo"
                                    id="tipo"
                                    className='py-2 px-3 focus:ring-1 text-sm focus:outline-none rounded-tl rounded-bl ease-in transition duration-200 border-l-gray-300 border-t-gray-300 border-b-gray-300 border-r-transparent h-[38px]'
                                    required
                                    value={selectedTipo}
                                    onChange={handleChangeSelectTipo}
                                >
                                    <option value="Todos" key="todos">Todos</option>
                                    {state.tiposEstados.map((estado) => (
                                        <option value={estado.nombre} key={estado.id}>{estado.nombre}</option>
                                    ))}
                                </select>

                            )}

                            <div className="relative text-gray-600 focus-within:text-black rounded ">
                                {active === 'cuadricula' && (
                                    <>

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
                                            type="number"
                                            className={`py-2 pl-10 pr-3 focus:ring-1 text-sm focus:outline-none border rounded-tr rounded-br border-gray-300 transition duration-200 w-[300px] ${!buscarActivado ? 'bg-red-200 transition duration-200 ease-in' : ''}`}
                                            placeholder='Buscar'
                                            value={busquedaCamara}
                                            min={min}
                                            onKeyDown={(e) => {
                                                if (e.key === '-' || e.key === 'e' || e.key === '.' || e.key === ',') {
                                                    e.preventDefault();
                                                }
                                            }}
                                            onChange={(e) => setBusquedaCamara(e.target.value)}
                                            disabled={!buscarActivado}
                                        />
                                    </>
                                )}
                            </div>
                            <div className="relative text-gray-600 focus-within:text-black rounded ">
                                {active === 'sector' && (
                                    <>
                                        <div className="relative text-gray-600 focus-within:text-black rounded "></div>
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
                                            className={`py-2 pl-10 pr-10 focus:ring-1 text-sm focus:outline-none border rounded border-gray-300 transition duration-200  ${!buscarActivado ? 'bg-red-200 transition duration-200 ease-in' : ''}`}
                                            placeholder='Buscar'
                                            value={busqueda}
                                            style={{ width: '500px' }}
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
                                    </>

                                )}
                            </div>
                        </div>
                        {(active === 'cuadricula') && (
                            <>
                                <p className='semibold ml-4 '>Minimo</p>
                                <input
                                    type="number"
                                    id="lower"
                                    min={min}
                                    max={max}
                                    onKeyDown={(e) => {
                                        if (e.key === '-' || e.key === 'e' || e.key === '.' || e.key === ',') {
                                            e.preventDefault();
                                        }
                                    }}
                                    className={`py-2 pl-4 pr-2 focus:ring-1 focus:outline-none border rounded border-gray-300 transition duration-200 ease-in  h-[38px] ${!minMaxActivados ? 'bg-red-200 transition duration-200 ease-in' : ''}`}
                                    placeholder={min}
                                    value={minimo}
                                    onChange={(e) => setMinimo(e.target.value)}
                                    disabled={!minMaxActivados}
                                />
                                <p className='semibold ml-4'>Maximo</p>
                                <input
                                    type="number"
                                    id="upper"
                                    min={min}
                                    max={max}
                                    onKeyDown={(e) => {
                                        if (e.key === '-' || e.key === 'e' || e.key === '.' || e.key === ',') {
                                            e.preventDefault();
                                        }
                                    }}
                                    placeholder={max}
                                    className={`py-2  pl-4 pr-2 focus:ring-1 focus:outline-none border rounded border-gray-300 transition duration-200 ease-in h-[38px]  ${!minMaxActivados ? 'bg-red-200 transition duration-200 ease-in' : ''}`}
                                    value={maximo}
                                    onChange={(e) => setMaximo(e.target.value)}
                                    disabled={!minMaxActivados}
                                />
                            </>
                        )}
                        {( (busquedaCamara.length > 0 || minimo.length > 0 || maximo.length > 0 || selectedTipo !== 'Todos') && active === 'cuadricula') && (
                            <div>
                                <Button
                                    variant='outlined'
                                    className={(busquedaCamara.length > 0 || minMaxActivados) ? "bg-gray-100 hover:bg-gray-300  border rounded-full border-gray-400 transition-all duration-200 text-gray-900 py-1 px-4 ml-4 hover:border-gray-950" : " hidden"}
                                    onClick={() => setFilters()}
                                >
                                    Reiniciar
                                </Button>
                            </div>
                        )}
                        {rol === 'Admin' && (
                            <div className='flex gap-4 w-full justify-end'>
                                {active !== 'cuadricula' && (
                                       <Button className="gap-2 bg-gray-900 justify-center shadow-sm hover:shadow-xl text-gray-200 py-2 px-5 rounded-lg flex items-center transition duration-200 ease-in border "
                                   
                                       >
                                           <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                               <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                               <path d="M12 5l0 14" />
                                               <path d="M5 12l14 0" />
                                           </svg>
                                           <p>
                                               Agregar sector
                                           </p>
                                       </Button>
                                )}
                                
                                <Button className="gap-2 bg-gray-900 justify-center shadow-sm hover:shadow-xl text-gray-200 py-2 px-5 rounded-lg flex items-center transition duration-200 ease-in border "
                                    onClick={() => {
                                        dispatch({ type: 'TOGGLE_FORM', form: 'agregarCamarasForm', payload: true });
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 5l0 14" />
                                        <path d="M5 12l14 0" />
                                    </svg>
                                    <p>
                                        Agregar camara
                                    </p>
                                </Button>
                            </div>
                        )}

                    </div>

                    <ul className='flex w-full items-center justify-end mt-2 gap-3 text-white text-xs px-1 '>
                        {Object.entries(conteoDeTipos).length > 0 ? (
                            Object.entries(conteoDeTipos).map(([nombre, estado]) => (
                                <li key={nombre} className='rounded-xl border py-1 px-3 translate-y-[13px] flex gap-1'
                                    style={{ backgroundColor: estado.color ? estado.color : 'gray' }}
                                >
                                    <p>{nombre} </p>
                                    <p className='font-bold'>{estado.conteo}</p>
                                </li>
                            ))
                        ) : (
                            <li className='rounded-xl border py-1 px-3 translate-y-[15px] invisible'>
                                Sin elementos
                            </li>
                        )}
                    </ul>


                    <div className="mt-5 w-full rounded-lg shadow-lg  bg-gray-100 h-[calc(100vh-279px)] border border-gray-200 py-6">
                        <div className="overflow-y-auto scrollbar-container bg-gray-100 max-h-full">
                            {active === 'cuadricula' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className='grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-1  pr-8'>
                                        <>
                                            {elementosFiltrados.map((index) => (
                                                <div key={index.id} className="relative flex justify-end items-center gap-2">
                                                    <Dropdown className='bg-gray-500 rounded-xl outline-none border-none shadow-md text-gray-100 text-sm py-2'
                                                        onClose={handleDropdownClose}
                                                        isOpen={activeDropdown === index.id}
                                                    >
                                                        <DropdownTrigger >
                                                            <Button
                                                                className="focus:outline-none semibold outline-none text-lg mb-5 shadow-md flex  bg-white text-gray-900 border border-gray-300 items-center justify-center hover:shadow-lg w-16 h-16  rounded-xl font-bold transition-all duration-200"
                                                                style={{ borderTopColor: index.color ? index.color : 'gray', borderTopWidth: '8px' }}
                                                                onClick={() => {
                                                                    handleDropdownToggle(index.id);
                                                                }}
                                                            >
                                                                {index.id}
                                                            </Button>
                                                        </DropdownTrigger>
                                                        <DropdownMenu>
                                                            <DropdownItem
                                                                className='bg-gray-500  hover:bg-gray-400 rounded-lg transition-all duration-150'
                                                                onClick={() => {
                                                                    handleEstadoCamaraClick(index);
                                                                }}
                                                            >

                                                                Actualizar estado
                                                            </DropdownItem>
                                                            <DropdownItem

                                                                className='bg-gray-500 hover:bg-gray-400 rounded-lg transition-all duration-150'

                                                            >
                                                                <RouterLink to={`/operario/camaras/camara/${index.id}`} key={index.id} className='w-full bg-red-100'>

                                                                    <p>Registros</p>
                                                                </RouterLink>

                                                            </DropdownItem>

                                                            <DropdownItem
                                                                className='bg-gray-500 hover:bg-gray-400 rounded-lg transition-all duration-150'
                                                            >
                                                                <RouterLink to={"/operario/camaras/historialCamara/" + index.id} className='w-full bg-red-100'>

                                                                    <p>Historial</p>
                                                                </RouterLink>

                                                            </DropdownItem>
                                                            {rol === 'Admin' && (
                                                                <DropdownItem
                                                                    className='bg-gray-500 hover:bg-gray-400 rounded-lg transition-all duration-150'
                                                                    onClick={() => {
                                                                        handleEliminarCamaraClick(index.id);
                                                                    }}
                                                                >
                                                                    <p className='text-red-400'>Eliminar</p>

                                                                </DropdownItem>
                                                            )}

                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </div>
                                            ))}
                                        </>
                                    </div>
                                </motion.div>
                            )}
                            {active !== 'cuadricula' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Registros busqueda={busqueda} />
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

