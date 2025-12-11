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

	// Making this function async to mirror what a real login function (that sends a network request to a backend) would look like
	const login = async (email: string, password: string) => {
		console.log('Logging in');

		const res = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});

		console.log('res', res);
		if (!res.ok) {
			throw new Error('Invalid credentials');
		}

		const data = await res.json();

		// Save the user and token
		setUser(data.user);
		localStorage.setItem('authUser', JSON.stringify(data.user));
		localStorage.setItem('token', data.token);

		return data.user;

		// const mockUser = {
		// 	id: 1,
		// 	name: 'Admin User',
		// 	role: 'admin',
		// 	email: 'dev@example.com',
		// };
		// setUser(mockUser);
		// localStorage.setItem('authUser', JSON.stringify(mockUser));

		// return mockUser;
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem('authUser');
	};

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
