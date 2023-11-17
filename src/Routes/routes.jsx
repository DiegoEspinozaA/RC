import React from 'react';
import Registros from '../Operario/components/Registros';
import Admin from '../Admin/components/Admin';
import Load from '../Operario/Load';
import Recientes from '../Operario/pages/Recientes';
import Estados from '../Operario/pages/Estados';
import Historial from '../Operario/pages/Historial';
import HistorialCamara from '../Operario/pages/HistorialCamara';
import Registro from '../Operario/pages/Registro';
export const rutas_operario = [
    {
        path: '/operario',
        element: <Load />,
    },
    {
        path: '/operario/registros',
        element: <Recientes />,
    },

    {
        path: '/operario/camaras',
        element: <Estados />,
    },
    {
        path: '/operario/camaras/camara/:id_camara/historial/:id_registro',
        element: <Historial />,
    },
    {
        path: '/operario/camaras/historialCamara/:id_camara',
        element: <HistorialCamara />,
    },
    {
        path: '/operario/registros/historial/:id_registro',
        element: <Historial />,
    }
    ,{
        path: '/operario/camaras/camara/:id',
        element: <Registro />,
    }
];

export const rutas_admin = [
    {
        path: '/admin',
        element: <Admin />,
    }
]