import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';
export default function Home() {
    const {setRol } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:3001/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': '*', 
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.valid){
                setRol(data.rol);
                if(data.rol === "Operario") {
                    navigate('/operario');
                } else if(data.rol === "Admin") {
                    navigate('/admin');
                }
            } else {
                navigate('/login');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
     
    }, [navigate, setRol]);
    return null;
}