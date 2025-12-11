import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from '../schemas/loginSchema';
import { useAuth } from '../hooks/useAuth'; // adjust path
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
	const { login } = useAuth();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormValues) => {
		try {
			await login(data.email, data.password); // Your useAuth login function
			navigate('/'); // redirect to dashboard
		} catch (err) {
			console.error(err);
			alert('Invalid credentials'); // replace later with nicer UI feedback
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen w-full bg-gray-900 ">
			<div className="w-full max-w-md p-8 bg-white shadow-md rounded m-4">
				<h1 className="text-2xl font-semibold mb-6 text-center text-gray-900">
					Login
				</h1>

				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<div className="mb-4">
						<label className="block mb-1 text-sm font-medium text-gray-700">
							Email Address
						</label>
						<input
							type="email"
							className="w-full p-2 bg-gray-200 rounded border"
							{...register('email')}
						/>

						{errors.email && (
							<p className="text-red-500 text-sm mt-1">
								{errors.email.message}
							</p>
						)}
					</div>

					<div className="mb-4">
						<label className="block mb-1 text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							className="w-full p-2 bg-gray-200 rounded border"
							{...register('password')}
						/>

						{errors.password && (
							<p className="text-red-500 text-sm mt-1">
								{errors.password.message}
							</p>
						)}
					</div>

					<div className="text-center">
						<button
							type="submit"
							disabled={isSubmitting}
							className="p-2 text-white bg-blue-600 hover:bg-blue-700 rounded border transition disabled:opacity-50"
						>
							{isSubmitting ? 'Logging in...' : 'Submit'}
						</button>
					</div>
				</form>

				<div className="text-right">
					<br />
					<br />
					<small>
						<p>Test credentials:</p>
						<p>Email: admin@example.com</p>
						<p>Password: password123</p>
					</small>
				</div>
			</div>
		</div>
	);
};

// --- Dummy login page to bypass inputs ---
// import { useEffect } from 'react';
// import { useAuth } from '../hooks/useAuth';
// import { Navigate, Outlet } from 'react-router-dom';

// export const LoginPage = () => {
// 	const { login, logout, user } = useAuth();

// 	if (user) {
// 		return <Navigate to="/dashboard" replace />;
// 	}

// 	return (
// 		<div className="text-3xl font-bold underline">
// 			Login Page
// 			<button onClick={login}>Login as admin user</button>
// 			<button onClick={logout}>Logout</button>
// 		</div>
// 	);
// };

export default LoginPage;
