import { test, expect } from '@playwright/test';

test.describe('BMI Tracker E2E', () => {
  const username = `testuser_${Date.now()}`;
  const password = 'password123';

  test('Case 1: User Signup', async ({ page }) => {
    await page.goto('/signup');
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    
    // Expect redirect to home
    await expect(page).toHaveURL('/');
    // Check if "BMI Tracker" is visible in header
    await expect(page.getByText('BMITracker')).toBeVisible();
    // Check if Logout button is visible (implies logged in)
    await expect(page.getByText('Logout')).toBeVisible();
  });

  test('Case 2: Login Flow', async ({ page }) => {
    const loginUser = `login_${Date.now()}`;
    
    // Create user first
    await page.goto('/signup');
    await page.fill('input[name="username"]', loginUser);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/');
    
    // Logout
    await page.click('button:has-text("Logout")');
    // Wait for logout to complete (redirect to login)
    await expect(page).toHaveURL('/login');

    // Login
    await page.fill('input[name="username"]', loginUser);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/');
    await expect(page.getByText('Logout')).toBeVisible();
  });

  test('Case 3: Validation Errors', async ({ page }) => {
    await page.goto('/signup');
    // Short username
    await page.fill('input[name="username"]', 'ab');
    await page.fill('input[name="password"]', '123456');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Username must be at least 3 characters')).toBeVisible();
    
    // Short password
    await page.fill('input[name="username"]', 'validuser');
    await page.fill('input[name="password"]', '12345');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Password must be at least 6 characters')).toBeVisible();
  });

  test('Case 4: BMI Calculation', async ({ page }) => {
    await page.goto('/');
    
    // Fill BMI form
    await page.fill('input[placeholder="e.g. 70"]', '70');
    await page.fill('input[placeholder="e.g. 175"]', '175');
    await page.click('button:has-text("Calculate & Save")');
    
    // Expect result (70 / 1.75^2 = 22.86)
    // The component displays 22.9
    await expect(page.getByText('22.9')).toBeVisible();
    await expect(page.getByText('Normal weight')).toBeVisible();
  });

  test('Case 5: Navigation Guard', async ({ page }) => {
    // Verify we can go to /login when not logged in (since we start fresh)
    await page.goto('/login');
    await expect(page).toHaveURL('/login');
    
    // Verify signup page is accessible
    await page.goto('/signup');
    await expect(page).toHaveURL('/signup');
  });
});
