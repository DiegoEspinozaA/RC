import React from "react";
import Bread from "./Bread";
import {
    Button
} from "@material-tailwind/react";
export default function Nav() {

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
           window.location.reload();
        })
        .catch(error => {
        });
    }

    return (
        <nav className=" block w-full max-w-full shadow-none rounded-xl transition-all px-0 relative top-0 left-0 ">
            <div className="flex justify-between gap-6 md:flex-row md:items-center ">
                <Bread></Bread>
                <div className="flex items-center">
                    <Button
                        variant="text"
                        className="hidden items-center gap-1 px-4 xl:flex text-gray-500 hover:bg-gray-200 transition-all duration-200"
                        onClick={handleLogout}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 ">
                            <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd"></path>
                        </svg>
                        Cerrar sesion
                    </Button>
                </div>
            </div>
        </nav>
    );
}