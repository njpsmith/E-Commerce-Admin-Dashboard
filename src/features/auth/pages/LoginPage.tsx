import { useEffect } from 'react';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export const LoginPage = () => {
	const { login, logout, user } = useAuth();

	if (user) {
		return <Navigate to="/dashboard" replace />;
	}

	return (
		<div className="text-3xl font-bold underline">
			Login Page
			<button onClick={login}>Login as admin user</button>
			<button onClick={logout}>Logout</button>
		</div>
	);
};

export default LoginPage;
