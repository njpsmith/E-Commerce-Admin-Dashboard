import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/productClient';
import type { ProductFilters } from '../types';

// export const PRODUCTS_QUERY_KEY = ['products'] as const;

export const productsKeys = {
	all: ['products'] as const,
	list: (filters: ProductFilters) =>
		[...productsKeys.all, 'list', filters] as const,
};

// export function useProductsList() {
// 	return useQuery({
// 		queryKey: PRODUCTS_QUERY_KEY,
// 		queryFn: fetchProducts,
// 		staleTime: 60_000,
// 		refetchOnWindowFocus: false,
// 	});
// }

export function useProductsList(filters: ProductFilters) {
	return useQuery({
		queryKey: productsKeys.list(filters),
		queryFn: () => fetchProducts(filters),
		staleTime: 60_000,
		refetchOnWindowFocus: false,
		keepPreviousData: true, // keeps old data while new page/filter loads
	});
}
