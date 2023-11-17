// VerMas.jsx
import React, {useEffect} from "react";
import { useAppContext } from '../../AppContext';

export default function VerMas() {
    const { state, dispatch } = useAppContext();
    const selectedRegistro = state.selectedRegistro;
    const handleClose = () => {
        dispatch({ type: 'TOGGLE_FORM', form: 'showVerMasForm', payload: false });
        dispatch({ type: 'SET_SELECTED_REGISTRO', payload: null });
    };

    
    useEffect(() => {
      const handleKeyDown = (event) => {
          if (event.key === 'Escape') {
              console.log()
              handleClose();
          
          }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
          document.removeEventListener('keydown', handleKeyDown);
      };
  }, []);


    return (
        <div className="bg-zinc-900/40 p-10 text-black fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
        <div className="text-blak relative w-full max-w-3xl">
          <div className="relative bg-white rounded-lg">
            <button
              type="button"
              className="absolute top-3 right-1 bg-transparent rounded-lg text-sm px-2 font-bold py-1 ml-auto inline-flex justify-center items-center text-red-600 hover:bg-red-200 transition-all duration-200"
              onClick={handleClose}
            >
              Cerrar
            </button>
            <form className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium">Información del Registro</h3>
              <div className="mb-4 bg-blue-100 rounded-lg p-3">
                <p className="mb-2">
                  <span className="font-semibold">ID de Registro:</span> {selectedRegistro.id}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Fecha:</span> {new Date(selectedRegistro.fecha).toLocaleString('es-ES', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Tipo de Evento:</span> {selectedRegistro.tipo}
                </p>
                <p className="font-semibold mb-2">Descripción:</p>
                <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-2">
                  <p>{selectedRegistro.descripcion}</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}
