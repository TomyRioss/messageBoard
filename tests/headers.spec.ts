import { test, expect } from '@playwright/test';

// HOMEPAGE H1 RENDERED CORRECTLY?
test('homepage has headers', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText(/The Message Board/i);
});

// HOMEPAGE H2 RENDERED CORRECTLY?
test('homepage has subheaders', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h2')).toHaveText(/Click on messages to start.../i);
});

// HOMEPAGE NAVBAR RENDERED CORRECTLY?
test('homepage has navbar', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav')).toBeVisible();
});
