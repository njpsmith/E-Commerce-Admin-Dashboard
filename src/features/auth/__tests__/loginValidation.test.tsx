import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider } from '../hooks/useAuth';
import { BrowserRouter } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';

function renderWithProviders(ui: React.ReactNode) {
	return render(
		<AuthProvider>
			<BrowserRouter>{ui}</BrowserRouter>
		</AuthProvider>,
	);
}

it('shows validation errors', async () => {
	renderWithProviders(<LoginPage />);

	fireEvent.submit(screen.getByRole('button', { name: /submit/i })); // /submit/i is case insensitive

	expect(
		await screen.findByText('Email address is required'),
	).toBeInTheDocument();
	expect(await screen.findByText('Password is required')).toBeInTheDocument();
});
