import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminRoute } from './AdminRoute';
import { RootLayout } from '../layout/RootLayout';

import ProductsPage from '../../features/products/pages/ProductsPage';

// Lazy-loaded pages
const LoginPage = lazy(() => import('../../features/auth/pages/LoginPage'));
const DashboardPage = lazy(
	() => import('../../features/dashboard/pages/DashboardPage'),
);
// const ProductsPage = lazy(
// 	() => import('../../features/products/pages/ProductsPage'),
// );
const ProductDetailPage = lazy(
	() => import('../../features/products/pages/ProductDetailPage'),
);
const CustomersPage = lazy(
	() => import('../../features/customers/pages/CustomersPage'),
);
const OrdersPage = lazy(() => import('../../features/orders/pages/OrdersPage'));
const AdminUsersPage = lazy(
	() => import('../../features/admin/pages/AdminUsersPage'),
);

export const router = createBrowserRouter([
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		element: <ProtectedRoute />, // applies to all children inside
		children: [
			{
				element: <RootLayout />, // shared nav, sidebar, etc.
				children: [
					{ path: '/', element: <DashboardPage /> },
					{ path: '/dashboard', element: <DashboardPage /> },
					{ path: '/products', element: <ProductsPage /> },
					{ path: '/products/:id', element: <ProductDetailPage /> },
					{ path: '/customers', element: <CustomersPage /> },
					{ path: '/orders', element: <OrdersPage /> },
					{
						element: <AdminRoute />, // only admin can access children
						children: [{ path: '/admin/users', element: <AdminUsersPage /> }],
					},
				],
			},
		],
	},
]);
