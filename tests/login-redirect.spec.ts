
import { test, expect } from '@playwright/test';

test.describe('Login Redirect Flow', () => {
  const username = `redirect_test_${Date.now()}`;
  const password = 'password123';

  test.beforeAll(async ({ browser }) => {
    // Create user for testing
    const page = await browser.newPage();
    await page.goto('/signup');
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/');
    await page.close();
  });

  test('Should redirect to home page "/" after successful login', async ({ page }) => {
    // 1. Go to Login Page
    await page.goto('/login');
    
    // 2. Fill Credentials
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    
    // 3. Submit
    await page.click('button[type="submit"]');
    
    // 4. Verify Redirect
    // This expects the URL to exactly match the base URL + '/'
    await expect(page).toHaveURL('/');
    
    // 5. Verify Content on Home Page to ensure it's not just URL but actual page load
    await expect(page.getByText('BMITracker')).toBeVisible();
    await expect(page.getByText('Logout')).toBeVisible();
  });
});
