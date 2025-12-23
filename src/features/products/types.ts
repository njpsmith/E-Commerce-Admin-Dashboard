export type ProductStatus = 'draft' | 'active' | 'archived';

// lighter version for table rows
export interface ProductListItem {
	id: string;
	name: string;
	sku: string;
	price: number;
	status: ProductStatus;
	stock: number;
	category: string | null;
}

// full version
export interface ProductDetail extends ProductListItem {
	description: string;
	images: string[];
	lastUpdated: string;
}

export interface ProductFilters {
	search?: string;
	status?: ProductStatus | 'all';
	category?: string | 'all';
	minPrice?: number;
	maxPrice?: number;
	page?: number;
	pageSize?: number;
}

export interface PaginatedResponse<T> {
	items: T[];
	total: number;
	page: number;
	pageSize: number;
}

export interface CreateProductPayload {
	name: string;
	sku: string;
	price: number;
	stock: number;
	status: ProductStatus;
	category?: string | null;
	description?: string | null;
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {
	id: string;
}
