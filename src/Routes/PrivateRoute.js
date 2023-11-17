// En PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { rol } = useAuth();
    return allowedRoles.includes(rol) ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
