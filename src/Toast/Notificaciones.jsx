import toast from 'react-hot-toast';

export const correcta = (mensaje) => toast.success(mensaje, {
    duration: 3000,
    position: 'bottom-right',
  });

export const incorrecta = (mensaje) => toast.error( mensaje ,{
    duration: 3000,
    position: 'bottom-right',
});

export const registroEliminadoExitoso = () => toast.success('Registro eliminado', {
    duration: 3000,
    position: 'bottom-right',
  });