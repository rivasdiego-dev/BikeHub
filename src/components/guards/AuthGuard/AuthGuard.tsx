import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth.store';


const AdminGuard = () => {
    const { currentUser, isAuthenticated } = useAuthStore();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirigir a login y guardar la ubicación intentada
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!currentUser?.is_admin) {
        // Redirigir a home si no es admin
        return <Navigate to="/" replace />;
    }

    // Usar Outlet en lugar de children
    return <Outlet />;
};

export default AdminGuard;