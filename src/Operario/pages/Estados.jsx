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
import AgregarEvento from '../forms/AgregarEvento';
import EditarRegistro from '../forms/EditarRegistro';
import VerMas from '../forms/VerMas';
import EstadoCamara from '../forms/EstadoCamara';
export default function Estados() {
    const { state, dispatch } = useAppContext();
    const camaras = state.camaras;

    const [busqueda, setBusqueda] = useState('');
    const [minimo, setMinimo] = useState('');
    const [maximo, setMaximo] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const [min, setMin] = useState('');
    const [max, setMax] = useState('');


    const setFilters = () => {
        setBusqueda('');
        setMinimo('');
        setMaximo('');
    }

    const buscarActivado = !minimo && !maximo;
    const minMaxActivados = !busqueda;

    const elementosFiltrados = camaras.filter(elemento => {
        if (minMaxActivados) {
            const numeroElemento = parseInt(elemento.id, 10);
            const min = minimo !== '' ? parseInt(minimo, 10) : -Infinity;
            const max = maximo !== '' ? parseInt(maximo, 10) : Infinity;
            return numeroElemento >= min && numeroElemento <= max;
        }
        return elemento.id.toString().toLowerCase().includes(busqueda.toLowerCase());

    });

    useEffect(() => {
        if (camaras && camaras.length > 0) {
            const ids = camaras.map(c => c.id);
            setMin(Math.min(...ids));
            setMax(Math.max(...ids));
            setIsLoading(false);
        }
    }, [camaras]);


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

    return (
        <>
            {state.showVerMasForm && <VerMas />}
            {state.showAgregarInformacionForm && <EditarRegistro />}
         
            {state.showEstadoCamaraForm && <EstadoCamara />}
            <Sidebar></Sidebar>
            <div className='xl:ml-80 h-[calc(100vh-32px)] my-4 px-4  max-w-screen rounded-xl transition-transform duration-300 xl:translate-x-0'>
                <Nav></Nav>
                <div className="text-sm  text-black flex flex-col justify-center w-full bg-white p-6 shadow-lg rounded-xl mt-3">
                    <div className='flex justify-between'>
                        <p className='text-xl font-bold text-gray-700 font-base mb-5'>{active === 'cuadricula' ? 'Camaras' : 'Sectores'} </p>
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
                    </div>


                    <div className='flex'>
                        <div className="relative text-gray-600 focus-within:text-black rounded">
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
                                        className={`py-2 pl-10 focus:ring-1  focus:outline-none border rounded border-gray-300 transition duration-200 ease-in ${!buscarActivado ? 'bg-red-200 transition duration-200 ease-in' : ''}`}
                                        placeholder='Buscar'
                                        value={busqueda}
                                        min={min}
                                        onKeyDown={(e) => {
                                            if (e.key === '-' || e.key === 'e' || e.key === '.' || e.key === ',') {
                                                e.preventDefault();
                                            }
                                        }}
                                        onChange={(e) => setBusqueda(e.target.value)}
                                        disabled={!buscarActivado}
                                    />
                                </>
                            )}

                            {active === 'sector' && (
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
                                        type="text"
                                        className={`py-2 pl-10 focus:ring-1  focus:outline-none border rounded border-gray-300 transition duration-200 ease-in ${!buscarActivado ? 'bg-red-200 transition duration-200 ease-in' : ''}`}
                                        placeholder='Buscar'
                                        value={busqueda}
                                        style={{ width: '400px' }}
                                        onChange={(e) => setBusqueda(e.target.value)}
                                    />
                                </>
                            )}
                        </div>
                        <div className='flex ml-7 w-full'>
                            <div className="flex items-center relative text-gray-600 focus-within:text-black rounded">
                                {(!isLoading && active === 'cuadricula') && (
                                    <>
                                        <p className='font-bold mr-2 '>Minimo</p>
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
                                            className={`py-2 pl-4 pr-2 focus:ring-1 focus:outline-none border rounded border-gray-300 transition duration-200 ease-in ${!minMaxActivados ? 'bg-red-200 transition duration-200 ease-in' : ''}`}
                                            placeholder={min}
                                            value={minimo}
                                            onChange={(e) => setMinimo(e.target.value)}
                                            disabled={!minMaxActivados}
                                        />
                                    </>
                                )}

                                {(!isLoading && active === 'cuadricula') && (
                                    <>
                                        <p className='font-bold mr-2 ml-4'>Maximo</p>
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
                                            className={`py-2  pl-4 pr-2 focus:ring-1 focus:outline-none border rounded border-gray-300 transition duration-200 ease-in ${!minMaxActivados ? 'bg-red-200 transition duration-200 ease-in' : ''}`}
                                            value={maximo}
                                            onChange={(e) => setMaximo(e.target.value)}
                                            disabled={!minMaxActivados}
                                        /></>
                                )}

                            </div>
                            {(busqueda.length > 0 || minimo.length > 0 || maximo.length > 0) && (
                                <Button variant="outlined" className="bg-transparent border rounded-full border-gray-600 text-gray-900  font-bold py-2 px-5 ml-4"
                                    onClick={() => setFilters()}
                                >
                                    <span className="ml-1">Reniciar</span>
                                </Button>

                            )}
                        </div>
                    </div>
                    <div className="mt-5 w-full rounded-lg shadow-lg  bg-gray-100 h-[calc(100vh-245px)] border border-gray-200 py-6">
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
                                                    <Dropdown className='bg-gray-500 rounded-xl outline-none border-none shadow-md text-gray-100'
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
                                                                className='bg-gray-500 hover:bg-gray-400 rounded-lg transition-all duration-150'
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

