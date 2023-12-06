import React from 'react';
import { useState, useEffect } from 'react';
import Link from '../../Apiconf';
import { Link as ReactLink } from 'react-router-dom';
import { Accordion, AccordionItem } from "@nextui-org/react";
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button } from '@material-tailwind/react';
import { Dropdown, DropdownItem, DropdownTrigger, DropdownMenu } from '@nextui-org/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

export default function Registros({ busqueda }) {
  const { state, dispatch } = useAppContext();
  const [locaciones, setLocaciones] = useState([]);
  const camaras = state.camaras;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(Link + '/locaciones')
      .then(res => res.json())
      .then(data => {
        setLocaciones(data);
        setIsLoading(false)
      })
      .catch(error => {
      });
  }, [])


  const camerasPorLocacion = {};

  camaras.forEach(camera => {
    const locacion = camera.locacion;
    if (!camerasPorLocacion[locacion]) {
      camerasPorLocacion[locacion] = [];
    }
    camerasPorLocacion[locacion].push(camera);
  });


  const removerDiacriticos = (texto) => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const filtrado = locaciones.filter(locacion =>
    removerDiacriticos(locacion.locacion.toLowerCase()).includes(removerDiacriticos(busqueda.toLowerCase()))
  );




  const [openLocation, setOpenLocation] = useState(null);
  const toggleLocation = (locacion) => {
    if (openLocation === locacion) {
      setOpenLocation(null);
    } else {
      setOpenLocation(locacion);
    }
  };

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

  return (
    <>
      <Accordion hideIndicator className='px-6'>
        {filtrado.map((ubicacion) => (
          <AccordionItem
            key={ubicacion.locacion}
            aria-label={ubicacion.locacion}
            title={
              <div className='flex w-full items-center px-4 gap-2'>
                {openLocation === ubicacion.locacion ? (
                    <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
                ) : (
                    <KeyboardArrowDownIcon ></KeyboardArrowDownIcon>
                )}
                <h1>{ubicacion.locacion}</h1>
              </div>
            }
            onPress={() => toggleLocation(ubicacion.locacion)}
            className='w-full rounded-lg hover:shadow-md transition-all duration-200 mb-3  text-base bg-white border border-gray-300 shadow-sm'
          >
            <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-1 mb-3 pr-6">

              {camerasPorLocacion[ubicacion.locacion]?.map((camera) => (
                <div key={camera.id} className="relative flex justify-end items-center gap-2 ">
                  <Dropdown className='bg-gray-500 rounded-xl outline-none border-none shadow-md text-gray-100'
                    onClose={handleDropdownClose}
                    isOpen={activeDropdown === camera.id}
                  >
                    <DropdownTrigger >
                      <Button
                        className="focus:outline-none semibold outline-none text-lg mb-5 shadow-md flex  bg-white text-gray-900  items-center justify-center hover:shadow-lg w-16 h-16  rounded-xl font-bold transition-all duration-200 border border-gray-300"
                        style={{ borderTopColor: camera.color ? camera.color : 'gray', borderTopWidth: '8px' }}
                        onClick={() => {
                          handleDropdownToggle(camera.id);
                        }}
                      >
                        {camera.id}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        className='bg-gray-500 hover:bg-gray-400 rounded-lg transition-all duration-150'
                        onClick={() => {
                          handleEstadoCamaraClick(camera);
                        }}
                      >

                        Actualizar estado
                      </DropdownItem>
                      <DropdownItem

                        className='bg-gray-500 hover:bg-gray-400 rounded-lg transition-all duration-150'

                      >
                        <RouterLink to={`/camaras/camara/${camera.id}`} key={camera.id} className='w-full bg-red-100'>

                          <p>Registros</p>
                        </RouterLink>

                      </DropdownItem>

                      <DropdownItem
                        className='bg-gray-500 hover:bg-gray-400 rounded-lg transition-all duration-150'
                      >
                        <RouterLink to={"/camaras/historialCamara/" + camera.id} className='w-full bg-red-100'>

                          <p>Historial</p>
                        </RouterLink>

                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              ))}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}