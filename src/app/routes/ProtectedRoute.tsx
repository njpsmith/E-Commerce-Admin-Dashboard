import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';

// This checks if the user is logged in.
// Outlet renders child routes
// If user is missing → redirect to /login
export const ProtectedRoute = () => {
	const { user, loading } = useAuth();
	// console.log('user', user);
	// console.log('loading', loading);

	if (loading) {
		// You can show a spinner, skeleton, or nothing
		return <div>Loading...</div>;
	}

	if (!user) {
		// console.log('redirecting');
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};
