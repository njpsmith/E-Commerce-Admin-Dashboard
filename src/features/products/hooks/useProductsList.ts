import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchProducts } from '../api/productClient';
import type { ProductFilters } from '../types';

export const productsKeys = {
	all: ['products'] as const,
	list: (filters: ProductFilters) =>
		[...productsKeys.all, 'list', filters] as const,
};

export function useProductsList(filters: ProductFilters) {
	return useQuery({
		queryKey: productsKeys.list(filters),
		queryFn: () => fetchProducts(filters),
		staleTime: 60_000,
		refetchOnWindowFocus: false,

		// ✅ prevents "data becomes empty" flicker when changing filters/pages
		placeholderData: keepPreviousData,
	});
}
