
import { test, expect } from '@playwright/test';

test.describe('Authentication Negative Scenarios', () => {
  const existingUser = `user_${Date.now()}`;
  const password = 'password123';

  test.beforeAll(async ({ browser }) => {
    // Create a user for testing
    const page = await browser.newPage();
    await page.goto('/signup');
    await page.fill('input[name="username"]', existingUser);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/');
    await page.close();
  });

  test('Signup with existing username', async ({ page }) => {
    await page.goto('/signup');
    await page.fill('input[name="username"]', existingUser);
    await page.fill('input[name="password"]', 'newpassword');
    await page.click('button[type="submit"]');
    
    // Expect error message
    await expect(page.getByText('Username already exists')).toBeVisible();
    // Should stay on signup page (URL check might be tricky if it's a server action re-render, 
    // but typically it stays on same URL or reloads same URL)
    // The key is the error message.
  });

  test('Login with non-existent username', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="username"]', `nonexistent_${Date.now()}`);
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Expect error message
    await expect(page.getByText('Invalid username or password')).toBeVisible();
  });

  test('Login with incorrect password', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="username"]', existingUser);
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Expect error message
    await expect(page.getByText('Invalid username or password')).toBeVisible();
  });

  test('Access home page without auth', async ({ page }) => {
    // Go to home page
    await page.goto('/');
    
    // Should see "Login" button, not "Logout"
    await expect(page.getByText('Login', { exact: true })).toBeVisible();
    await expect(page.getByText('Logout')).not.toBeVisible();
  });
});
