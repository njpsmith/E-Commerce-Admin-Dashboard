// Playwright end-to-end tests
// login, login errors when wrong details, logout, redirect when not authenticated, role restrictions (nav items not rendered depending on user role)

// Tests to write:
// - Role restrictions (nav items not rendered depending on user role)
// - Test field validation (missing email/password)

import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
	// ---------------------------------------------------------------------------
	// 1. Successful login
	// ---------------------------------------------------------------------------
	test('logs in successfully and redirects to home', async ({ page }) => {
		await page.goto('/login');

		await page.getByLabel('Email Address').fill('admin@example.com');
		await page.getByLabel('Password').fill('password123');
		await page.getByRole('button', { name: /submit/i }).click();

		// Expect redirect → "/"
		await expect(page).toHaveURL('/');

		// Assert some signed-in UI appears
		await expect(page.getByText('E-Commerce Admin')).toBeVisible();
	});

	// ---------------------------------------------------------------------------
	// 2. Failed login
	// ---------------------------------------------------------------------------
	test('fails login with incorrect password', async ({ page }) => {
		await page.goto('/login');

		await page.getByLabel('Email Address').fill('admin@example.com');
		await page.getByLabel('Password').fill('wrongpassword');
		await page.getByRole('button', { name: /submit/i }).click();

		// Should remain on /login
		await expect(page).toHaveURL('/login');

		// Assert error is shown
		await expect(page.getByText(/invalid/i)).toBeVisible();
	});

	// ---------------------------------------------------------------------------
	// 3. Protected route redirect
	// ---------------------------------------------------------------------------
	test('redirects unauthenticated user from dashboard to login', async ({
		page,
	}) => {
		await page.goto('/dashboard');

		// Expect redirect → "/login"
		await expect(page).toHaveURL('/login');
	});
});

test.describe('Logout Flow', () => {
	test('clicking logout redirects to login and ends session', async ({
		page,
	}) => {
		// --- Login first ---
		await page.goto('/login');
		await page.getByLabel('Email Address').fill('admin@example.com');
		await page.getByLabel('Password').fill('password123');
		await page.getByRole('button', { name: /submit/i }).click();

		// --- Start at dashboard ---
		await page.goto('/dashboard');

		// --- Click logout ---
		await page.getByRole('button', { name: /logout/i }).click();

		// --- Expect redirect to /login ---
		await expect(page).toHaveURL('/login');

		// --- Confirm logout actually worked ---
		// Try accessing dashboard again — must redirect to login
		await page.goto('/dashboard');
		await expect(page).toHaveURL('/login');
	});
});
