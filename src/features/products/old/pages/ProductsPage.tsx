import { useState } from 'react';
import { useProductsList } from '../hooks/useProductsList';
import { productFiltersSchema } from '../schemas';
import { ProductsTable } from '../components/ProductsTable';
import { ProductFilters } from '../components/ProductFilters';
import type { ProductFilters as ProductFiltersType } from '../types';

const defaultFilters: ProductFiltersType = {
	search: '',
	status: 'all',
	category: 'all',
	page: 1,
	pageSize: 20,
};

export const ProductsPage = () => {
	const [filters, setFilters] = useState<ProductFiltersType>(defaultFilters);
	const { data, isLoading, isError, refetch, isFetching } =
		useProductsList(filters);

	const handleFiltersChange = (next: ProductFiltersType) => {
		const parsed = productFiltersSchema.parse(next);
		setFilters(parsed);
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold">Products</h1>
				<button className="px-4 py-2 rounded bg-blue-600 text-white text-sm">
					Add product
				</button>
			</div>
			<ProductFilters
				filters={filters}
				onChange={handleFiltersChange}
				isFetching={isFetching}
			/>
			{isError && (
				<div className="p-3 rounded bg-red-100 text-red-800 text-sm flex justify-between">
					<span>Failed to load products.</span>
					<button onClick={() => refetch()} className="underline">
						Retry
					</button>
				</div>
			)}
			<ProductsTable
				data={data?.items ?? []}
				total={data?.total ?? 0}
				page={filters.page ?? 1}
				pageSize={filters.pageSize ?? 20}
				isLoading={isLoading}
				onPageChange={(page) => handleFiltersChange({ ...filters, page })}
			/>
		</div>
	);
};

export default ProductsPage;
