import { http, HttpResponse } from 'msw';
import { fakeProducts } from './fixtures/fakeProducts';

export const handlers = [
  // LOGIN ENDPOINT
  http.post('/api/login', async ({ request }) => {
    const { email, password } = await request.json();

    // Basic fake validation
    if (email === 'admin@example.com' && password === 'password123') {
      return HttpResponse.json(
        {
          token: 'fake-jwt-token-123456',
          user: {
            id: 1,
            name: 'Admin User',
            role: 'admin',
            email,
          },
        },
        { status: 200 },
      );
    }

    return HttpResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 },
    );
  }),

  http.get('/api/products', ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    // No token? Reject the request
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    // }

    const url = new URL(request.url);

    const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();
    const status = url.searchParams.get('status'); // "active" | "draft" | "archived" | null
    const category = url.searchParams.get('category');
    const minPrice = url.searchParams.get('minPrice');
    const maxPrice = url.searchParams.get('maxPrice');

    const page = Number(url.searchParams.get('page') ?? '1');
    const pageSize = Number(url.searchParams.get('pageSize') ?? '20');

    let items = [...fakeProducts];

    // SEARCH: match name OR sku (adjust as you like)
    if (search) {
      items = items.filter((p) => {
        const name = (p.name ?? '').toLowerCase();
        const sku = (p.sku ?? '').toLowerCase();
        return name.includes(search) || sku.includes(search);
      });
    }

    // STATUS
    if (status && status !== 'all') {
      items = items.filter((p) => p.status === status);
    }

    // CATEGORY
    if (category && category !== 'all') {
      const categorySearchText = category.toLowerCase();

      items = items.filter((p) =>
        p.category.toLowerCase().includes(categorySearchText),
      );
    }

    // PRICE RANGE
    if (minPrice != null && minPrice !== '') {
      const min = Number(minPrice);
      if (!Number.isNaN(min)) items = items.filter((p) => p.price >= min);
    }

    if (maxPrice != null && maxPrice !== '') {
      const max = Number(maxPrice);
      if (!Number.isNaN(max)) items = items.filter((p) => p.price <= max);
    }

    // PAGINATION (apply after filtering)
    const total = items.length;
    const start = (page - 1) * pageSize;
    // E.g. for page 1, get items 0-19
    const paged = items.slice(start, start + pageSize);

    return HttpResponse.json({
      items: paged,
      total,
      page,
      pageSize,
    });
  }),
];
