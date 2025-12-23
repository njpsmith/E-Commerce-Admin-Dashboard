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

    return HttpResponse.json(fakeProducts);
  }),

  // http.get('/api/products', ({ request }) => {
  //   const url = new URL(request.url);
  //   const page = Number(url.searchParams.get('page') ?? '1');
  //   const pageSize = Number(url.searchParams.get('pageSize') ?? '20');

  //   return HttpResponse.json({ items: [...], total: 1, page, pageSize });
  // })
];
