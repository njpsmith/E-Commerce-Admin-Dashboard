import { useAuth } from '../features/auth/hooks/useAuth';

export const useApi = () => {
	const { token } = useAuth();

	const request = (url: string, options: RequestInit = {}) => {
		const headers = {
			...(options.headers || {}),
			Authorization: token ? `Bearer ${token}` : '',
		};

		return fetch(url, { ...options, headers });
	};

	return { request };
};

// How to use - In any component or React Query hook:

// const { request } = useApi();
// const res = await request("/api/products");
//
// if (res.status === 401) {
//   // Handle not authenticated
//   console.log('Not authorized');
// }
