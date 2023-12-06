import React from 'react';
import { useAppContext } from '../AppContext';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Link from '../Apiconf';

export default function  Load() {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const registrosResponse = await fetch(Link + '/registros');
        const registrosData = await registrosResponse.json();

        const tiposEventosResponse = await fetch(Link + '/tiposEventos');
        const tiposEventosData = await tiposEventosResponse.json();
        
        const tiposEstadosResponse = await fetch(Link + '/estados');
        const tiposEstadosData = await tiposEstadosResponse.json();

        const camarasResponse = await fetch(Link + '/camaras');
        const camarasData = await camarasResponse.json();
        
        const response = await fetch(Link + '/historialEstadoCamara');
        const data = await response.json();

        dispatch({ type: 'SET_CAMARAS', payload: camarasData });
        dispatch({ type: 'SET_TIPOS_ESTADOS', payload: tiposEstadosData });
        dispatch({ type: 'SET_REGISTROS', payload: registrosData });
        dispatch({ type: 'TOGGLE_EVENTOS', payload: tiposEventosData });
        dispatch({ type: 'SET_historialEstadoCamara', payload: data });
        navigate('/operario/registros');

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch]);

 return null;
}