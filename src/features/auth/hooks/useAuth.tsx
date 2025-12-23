import {
	useState,
	useEffect,
	createContext,
	useContext,
	ReactNode,
} from 'react';

interface AuthContextType {
	user: any;
	token: string | null;
	loading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState<string | null>(true);

	// For storing the JWT in memory
	const [token, setToken] = useState<string | null>(null);

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
		const storedUser = localStorage.getItem('authUser');
		if (storedUser) setUser(JSON.parse(storedUser));
		setLoading(false);
	}, []);

	// Making this function async to mirror what a real login function (that sends a network request to a backend) would look like
	const login = async (email: string, password: string) => {
		const res = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});

		if (!res.ok) {
			throw new Error('Invalid credentials');
		}

		const data = await res.json();

		// Save the user and token
		setUser(data.user);
		setToken(data.token);

		// Persist user (not token)
		localStorage.setItem('authUser', JSON.stringify(data.user));

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
		setToken(null);
		localStorage.removeItem('authUser');
	};

	return (
		<AuthContext.Provider value={{ user, token, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within AuthProvider');
	return ctx;
};
