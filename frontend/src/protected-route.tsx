import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const accessToken = localStorage.getItem('access_token');
    // If accessToken is empty, redirect to login page
    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    // If accessToken exists, render the child components
    return <>{children}</>;
};

export default ProtectedRoute;
