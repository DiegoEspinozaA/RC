import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export const ProtectedRoute = ({ children, role }) => {
    const { user } = useAuth();

    console.log(user);
    if (!user || user.userRole !== role) {
        return <Navigate to="/login" />;
    }

    return children;
};
