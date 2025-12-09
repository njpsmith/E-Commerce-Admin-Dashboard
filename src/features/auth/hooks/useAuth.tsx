import {
	useState,
	useCallback,
	useEffect,
	createContext,
	useContext,
} from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// if (import.meta.env.DEV) {
		// 	// Spoof login in dev mode
		// 	const devUser = {
		// 		id: 1,
		// 		name: 'Dev Admin',
		// 		role: 'admin',
		// 		email: 'dev@example.com',
		// 	};
		// 	setUser(devUser);
		// 	setLoading(false);
		// 	return;
		// }
		const stored = localStorage.getItem('authUser');
		if (stored) setUser(JSON.parse(stored));
		setLoading(false);
	}, []);

	const login = useCallback(async (email, password) => {
		console.log('Logging in');
		const mockUser = {
			id: 1,
			name: 'Admin User',
			role: 'admin',
			email: 'dev@example.com',
		};
		setUser(mockUser);
		localStorage.setItem('authUser', JSON.stringify(mockUser));
	}, []);

	const logout = useCallback(() => {
		setUser(null);
		localStorage.removeItem('authUser');
	}, []);

	return (
		<AuthContext.Provider value={{ user, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within AuthProvider');
	return ctx;
};
