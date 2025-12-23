import { useQuery } from '@tanstack/react-query';
import { productClient } from '../api/productClient';
import type { ProductFilters } from '../types';

export const productsKeys = {
	all: ['products'] as const,
	list: (filters: ProductFilters) =>
		[...productsKeys.all, 'list', filters] as const,
};

export const useProductsList = (filters: ProductFilters) => {
	return useQuery({
		queryKey: productsKeys.list(filters),
		queryFn: () => productClient.list(filters),
		keepPreviousData: true,
	});
};
