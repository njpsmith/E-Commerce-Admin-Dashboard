import { React, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './features/auth/hooks/useAuth';
import App from './App.tsx';
import './styles/index.css';

// Only start MSW in development - This makes the app pretend it has a backend while in dev mode.
if (import.meta.env.DEV) {
	const { worker } = await import('/src/mocks/browser');
	// console.log('worker', worker);
	worker.start();
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<App />
			</AuthProvider>{' '}
		</QueryClientProvider>
	</StrictMode>,
);
