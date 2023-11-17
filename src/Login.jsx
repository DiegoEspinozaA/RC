import { Button } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [values, setValues] = useState({ username: '', password: '' });

    const navigate = useNavigate();
    const handleInput = (event) => { setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] })) }

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
                if (data.valid) {
                    navigate('/');
                } else {
                    navigate('/login');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }, [navigate])

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3001/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(response => response.json())
            .then(data => {
                if (data.Login) {
                    navigate('/');
                } else {
                    navigate('/login');
                }
            })
            .catch(error => {
            });
    }

    return (
        <div className='w-screen bg-gray-400 h-screen flex items-center justify-center'>
            <div className="bg-white p-5 shadow-xl rounded-xl">
                <h1 className="font-bold text-gray-700">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label >Nombre de usuario</label>
                        <input
                            className="w-full border bg-gray-200  border-gray-200 rounded px-2 py-1 focus:ouline-none outline-none focus:border-gray-400 transition-all duration-300"
                            type="text"
                            id="username"
                            name="username"
                            value={values.username}
                            onChange={handleInput}
                        />
                    </div>
                    <div>
                        <label>Contraseña</label>
                        <input
                            className="w-full border bg-gray-200 border-gray-200 rounded px-2 py-1 focus:ouline-none outline-none focus:border-gray-400 transition-all duration-300"
                            type="password"
                            id="password"
                            name="password"
                            value={values.password}
                            onChange={handleInput}
                        />
                    </div>
                    <Button type="submit"
                        className="w-full mt-5 text-gray-200 px-2 py-1 rounded-lg"
                    >Iniciar sesion</Button>
                </form>
            </div>

        </div>
    );
}