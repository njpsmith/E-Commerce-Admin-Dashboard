import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';

export const AdminRoute = () => {
	const { user } = useAuth();

	if (user?.role !== 'admin') {
		return <Navigate to="/dashboard" replace />;
	}

	return <Outlet />;
};
