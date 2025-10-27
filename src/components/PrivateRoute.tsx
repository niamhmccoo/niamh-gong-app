import type { FC } from 'react';
import type { PrivateRouteProps } from '../types';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

export default PrivateRoute;