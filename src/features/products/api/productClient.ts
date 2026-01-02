import type { ProductListItem, ProductFilters } from '../types';

export type ProductsResponse = {
	items: ProductListItem[];
	total: number;
	page: number;
	pageSize: number;
};

function buildProductsQuery(filters: ProductFilters): string {
	const params = new URLSearchParams();

	if (filters.search?.trim()) params.set('search', filters.search.trim());

	if (filters.status && filters.status !== 'all')
		params.set('status', filters.status);

	if (filters.category && filters.category !== 'all')
		params.set('category', filters.category);

	if (filters.minPrice != null)
		params.set('minPrice', String(filters.minPrice));
	if (filters.maxPrice != null)
		params.set('maxPrice', String(filters.maxPrice));

	// sensible defaults
	params.set('page', String(filters.page ?? 1));
	params.set('pageSize', String(filters.pageSize ?? 40));

	const qs = params.toString();
	return qs ? `?${qs}` : '';
}

export async function fetchProducts(
	filters: ProductFilters = {},
): Promise<ProductsResponse> {
	const res = await fetch(`/api/products${buildProductsQuery(filters)}`);

	if (!res.ok) {
		throw new Error(`Failed to fetch products (${res.status})`);
	}

	return res.json();
}
