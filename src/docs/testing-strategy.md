# Testing Strategy

To run Jest (Vitest) tests:

`npm run test`

To run Playwright tests:

Run all tests:

`npm run test:e2e`

Run with UI mode (live inspector):

`npm run test:e2e:ui`

Debug mode:

`npm run test:e2e:debug`

## What to test with React Testing Library (unit/integration)

RTL is used for isolated component behavior, not full flows.

### 1. Login form validation (Zod + React Hook Form)

Tests:

- Empty email/password shows validation messages
- Invalid email format errors show
- Submit button shows loading state
- Form does NOT call login() when validation fails

E.g.

```
it("shows validation errors", async () => {
  render(<LoginPage />);

  fireEvent.submit(screen.getByRole("button", { name: /login/i }));

  expect(await screen.findByText("Email is required")).toBeInTheDocument();
  expect(await screen.findByText("Password is required")).toBeInTheDocument();
});
```

### 2. Successful login calls useAuth().login() with correct arguments

### 3. Login error displays an error message

### 4. ProtectedRoute behavior (unit level)

Test:

- If user = null then redirect to /login
- If user exists then render children

### 5. Navigation items hidden based on user role

---

## What to test with Playwright (E2E)

Playwright tests user journeys, timing, DOM, redirects — things unit tests can’t do. I will use it to prove the full flow works correctly.

1. Successful login flow
2. Invalid credentials entered displays error message
3. Cannot access protected page when logged out
4. Role-based UI (If admin, if staff)
5. Refresh behavior
   1. Log in
   2. Refresh page
   3. User stays authenticated because localStorage has user

---

## What to test with Jest (Vitest) only (logic/unit tests)

### useAuth() hook

- login() sets user
- logout() clears user
- restoring user from localStorage works

### token injection function

- add Authorization header
- skips header when no token

### MSW handlers

- check 401 status is returned when hitting /api/products end point
