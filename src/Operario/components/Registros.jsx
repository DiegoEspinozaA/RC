import React from 'react';
import { useAppContext } from '../../AppContext';
export default function Registros() {
    const {state, dispatch} = useAppContext();

    console.log(state.showVerMasForm);
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
            console.log(data);
           window.location.reload();
        })
        .catch(error => {
        });
    }
    return (
        <div>
        <button onClick={handleLogout}>Cerrar sesión</button>

            <h1>Registros para el operario</h1>
        </div>
    )
}