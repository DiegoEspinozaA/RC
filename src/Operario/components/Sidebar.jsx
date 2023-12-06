import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import CameraIcon from '@mui/icons-material/Camera';
import {
  Button,
  Typography,
} from "@material-tailwind/react";

import { useAppContext } from '../../AppContext';
import { useAuth } from '../../AuthContext';

export default function Sidebar() {

  const { user } = useAuth();
  const { state, dispatch } = useAppContext();
  const handleClickAgregarCamara = () => {
    dispatch({ type: 'TOGGLE_FORM', form: 'agregarCamarasForm', payload: true });
  };


  const location = useLocation();

  return (
    <aside className="bg-gradient-to-br from-blue-gray-800 to-blue-gray-900 -translate-x-80 fixed inset-0 z-40 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
      <div className="relative border-b border-white/20">
        {/* <a className="flex items-center gap-4 py-6 px-8 text-white" href="#/">
          <CameraIcon></CameraIcon> */}
        {/* <img src="/material-tailwind-dashboard-react/img/logo-ct.png" className="inline-block relative object-cover object-center w-9 h-9 rounded-md" alt="Logo" /> */}
        {/* <div className='flex '>
            <h6 className="block antialiased tracking-normal  text-base font-bold leading-relaxed ">REG</h6>
            <h6 className="block antialiased tracking-normal  text-base font-bold leading-relaxed text-red-500 ml-[2px]">CAM</h6>
          </div>
        </a> */}
        <button className="middle none  font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden" type="button">
          <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true" className="h-5 w-5 text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </span>
        </button>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-2 ">
          <li >
            <Link to="/operario/registros"
              className='w-full'>
              <Button
                className={"w-full h-12 flex items-center gap-4 px-4 border-none " + (location.pathname.includes('/operario/registros') ? "bg-azul shadow-md hover:shadow-lg hover:shadow-blue-300/40 " : " hover:bg-white/10 active:bg-white/30 bg-transparent shadow-none hover:shadow-none")}
              >
                <EventIcon></EventIcon>
                <Typography
                  color="inherit"
                  className="semibold  text-[15px] capitalize"
                >
                  Registros
                </Typography>
              </Button>
            </Link>
          </li>
          <li >
            <Link to="/operario/camaras"
              className='w-full'>
              <Button
                className={"w-full h-12 flex items-center gap-4 px-4 border-none " + (location.pathname.includes('/operario/camaras') ? "bg-azul shadow-md hover:shadow-lg hover:shadow-blue-300/40 " : " hover:bg-white/10 active:bg-white/30 bg-transparent shadow-none hover:shadow-none")}
              >
                <CameraAltIcon></CameraAltIcon>
                <Typography
                  color="inherit"
                  className="semibold text-[15px] capitalize"
                >
                  Camaras
                </Typography>
              </Button>
            </Link>
          </li>
        </ul>
        {user === "admin" && (
          <ul className="mb-4 flex flex-col gap-2">
            <li class="mx-3.5 mt-4 mb-2"><p class="block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75">Admin</p></li>
            <li >
              <Link to="/operario/sectores">
                <Button
                  className={"w-full h-12 flex items-center gap-4 px-4 border-none " + (location.pathname.includes('/operario/sectores') ? "bg-azul shadow-md hover:shadow-lg hover:shadow-blue-300/40 " : " hover:bg-white/10 active:bg-white/30 bg-transparent shadow-none hover:shadow-none")}

                >
                  <Typography
                    color="inherit"
                    className="semibold text-[15px] capitalize"
                  >
                    Sectores
                  </Typography>
                </Button>
              </Link>
            </li>
            <li >
              <Link to="/operario/eventos">
                <Button
                  className={"w-full h-12 flex items-center gap-4 px-4 border-none " + (location.pathname.includes('/operario/eventos') ? "bg-azul shadow-md hover:shadow-lg hover:shadow-blue-300/40 " : " hover:bg-white/10 active:bg-white/30 bg-transparent shadow-none hover:shadow-none")}
                >
                  <Typography
                    color="inherit"
                    className="semibold text-[15px] capitalize"
                  >
                    Eventos
                  </Typography>
                </Button>
              </Link>
            </li>
          </ul>
        )}

      </div>
    </aside>
  );
}


