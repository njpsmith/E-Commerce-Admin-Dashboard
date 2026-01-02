import type { ProductListItem } from '../types';

type ProductsResponse = {
	items: ProductListItem[];
};

export async function fetchProducts(): Promise<ProductsResponse> {
	const res = await fetch('/api/products');

	if (!res.ok) {
		throw new Error('Failed to fetch products');
	}

	return res.json();
}
