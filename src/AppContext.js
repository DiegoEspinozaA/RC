import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  registros: [],
  idCamaraSeleccionada: null,
  registrosCamaraSeleccionada: [],
  showAgregar: false,
  showAgregarInformacionForm: false,
  showVerMasForm: false,
  showEstadoCamaraForm: false,
  EstadoCamaraSelectedCamera: [],
  selectedRegistro: null,
  tiposEventos: [],
  tiposEstados: [],
  selectedCamara: null,
  camaras: [],
  activeTab: 'cuadricula',
  recientesActiveTab: 'eventos',
  agregarCamarasForm: false,
  historialEstadoCamara: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_FORM':
      return { ...state, [action.form]: action.payload };
    case 'SET_SELECTED_REGISTRO':
      return { ...state, selectedRegistro: action.payload };
    case 'TOGGLE_EVENTOS':
      return { ...state, tiposEventos: action.payload };

    case 'SET_REGISTROS':
      return { ...state, registros: action.payload };

    case 'SET_REGISTROS_CAMARA_SELECCIONADA':
      return { ...state, registrosCamaraSeleccionada: action.payload };
    case 'SET_ID_CAMARA_SELECCIONADA':
      return { ...state, idCamaraSeleccionada: action.payload };

    case 'SET_SELECTED_CAMARA':
      return { ...state, selectedCamara: action.payload };

    case 'SET_ESTADO_CAMARA_SELECCIONADA':
      return { ...state, EstadoCamaraSelectedCamera: action.payload };

    case 'SET_TIPOS_ESTADOS':
      return { ...state, tiposEstados: action.payload };

    case 'SET_CAMARAS':
      return { ...state, camaras: action.payload };

    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
   
      case 'SET_RECIENTES_ACTIVE_TAB':
        return { ...state, recientesActiveTab: action.payload };
      case 'SET_historialEstadoCamara':
        return { ...state, historialEstadoCamara: action.payload };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
