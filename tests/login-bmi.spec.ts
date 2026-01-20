
import { test, expect } from '@playwright/test';

test.describe('UI Flow: Login and Weight Input', () => {
  const username = `ui_test_${Date.now()}`;
  const password = 'password123';

  test.beforeAll(async ({ browser }) => {
    // Create a user first so we can test login
    const page = await browser.newPage();
    await page.goto('/signup');
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/');
    
    // Logout to be ready for login test
    await page.click('button:has-text("Logout")');
    await expect(page).toHaveURL('/login');
    await page.close();
  });

  test('User can Login and Enter Weight for BMI Calculation', async ({ page }) => {
    // 1. Login
    await page.goto('/login');
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    
    // Verify login success
    await expect(page).toHaveURL('/');
    await expect(page.getByText('Logout')).toBeVisible();

    // 2. Enter Weight and Height (BMI Calculation)
    // Assuming the user specifically mentioned "entering weight", we focus on the input interaction
    const weight = '75';
    const height = '180';

    await page.fill('input[placeholder="e.g. 70"]', weight);
    await page.fill('input[placeholder="e.g. 175"]', height);
    
    // Click Calculate
    await page.click('button:has-text("Calculate & Save")');

    // 3. Verify Result
    // 75 / (1.8 * 1.8) = 23.148... -> 23.1
    await expect(page.getByText('23.1')).toBeVisible();
    await expect(page.getByText('Normal weight')).toBeVisible();

    // Verify input fields are cleared or keep values? 
    // Usually standard behavior is to show result.
    // Let's check if the result card appears.
    const resultCard = page.locator('div.bg-indigo-600');
    await expect(resultCard).toBeVisible();
  });
});
