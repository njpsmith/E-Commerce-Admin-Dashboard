import { Link } from 'react-router-dom';

export const Sidebar = () => {
	return (
		<div className="w-64 min-h-screen bg-gray-900 text-white p-4">
			<h2 className="text-xl font-bold mb-6">Admin Panel</h2>
			<ul className="space-y-3">
				<li>
					<Link to="/dashboard">Dashboard</Link>
				</li>
				<li>
					<Link to="/products">Products</Link>
				</li>
				<li>
					<Link to="/customers">Customers</Link>
				</li>
				<li>
					<Link to="/orders">Orders</Link>
				</li>
				<li>
					<Link to="/admin/users">Admin Users</Link>
				</li>
			</ul>
		</div>
	);
};
