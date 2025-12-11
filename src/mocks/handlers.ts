import { http, HttpResponse } from 'msw';
// import { fakeProducts } from './fakeProducts';
const fakeProducts = {}; // Change this to an import when using actual data

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
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return HttpResponse.json(fakeProducts);
  }),
];
