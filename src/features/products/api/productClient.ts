import type {
  ProductListItem,
  ProductDetail,
  ProductFilters,
  PaginatedResponse,
  CreateProductPayload,
  UpdateProductPayload,
} from '../types';

const baseUrl = '/api/products';

export const productClient = {
  async list(
    filters: ProductFilters,
  ): Promise<PaginatedResponse<ProductListItem>> {
    const params = new URLSearchParams();

    if (filters.search) params.set('search', filters.search);
    if (filters.status && filters.status !== 'all')
      params.set('status', filters.status);
    if (filters.category && filters.category !== 'all')
      params.set('category', filters.category);
    if (filters.minPrice != null)
      params.set('minPrice', String(filters.minPrice));
    if (filters.maxPrice != null)
      params.set('maxPrice', String(filters.maxPrice));
    params.set('page', String(filters.page ?? 1));
    params.set('pageSize', String(filters.pageSize ?? 20));

    const res = await fetch(`${baseUrl}?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async getById(id: string): Promise<ProductDetail> {
    const res = await fetch(`${baseUrl}/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
  },

  async create(payload: CreateProductPayload): Promise<ProductDetail> {
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create product');
    return res.json();
  },

  async update(payload: UpdateProductPayload): Promise<ProductDetail> {
    const res = await fetch(`${baseUrl}/${payload.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update product');
    return res.json();
  },
};
