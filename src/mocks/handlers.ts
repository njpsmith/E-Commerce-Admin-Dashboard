import { http, HttpResponse } from 'msw';

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
];
