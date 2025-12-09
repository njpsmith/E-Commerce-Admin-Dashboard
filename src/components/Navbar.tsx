import { useAuth } from '../features/auth/hooks/useAuth';

export const Navbar = () => {
	const { user, logout } = useAuth();

	return (
		<nav className="w-full p-4 flex justify-between items-center border-b-4 border-white">
			<h1 className="font-semibold text-lg">E-Commerce Admin</h1>
			<div className="flex items-center gap-4">
				<span>Username: {user?.name}</span>
				<button
					onClick={logout}
					className="text-sm bg-red-500 text-white px-3 py-1 rounded"
				>
					Logout
				</button>
			</div>
		</nav>
	);
};
