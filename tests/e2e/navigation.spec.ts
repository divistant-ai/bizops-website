import { expect, test } from '@playwright/test';

test.describe('Navigation Flow', () => {
  test('should navigate from homepage to platform page', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/BizOps/i);

    // Click Platform link
    await page.click('text=Platform');

    await expect(page).toHaveURL(/\/platform/);
    await expect(page).toHaveTitle(/Platform/i);
  });

  test('should open and close mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Open mobile menu
    const menuButton = page.locator('button[aria-label*="Menu"]').first();
    await menuButton.click();

    // Verify menu is open
    await expect(page.locator('text=Menu')).toBeVisible();

    // Close menu
    const closeButton = page.locator('button[aria-label*="Close"]').first();
    await closeButton.click();

    // Verify menu is closed
    await expect(page.locator('text=Menu')).toBeHidden();
  });

  test('should navigate through mega menu', async ({ page }) => {
    await page.goto('/');

    // Hover over Platform menu
    const platformLink = page.locator('text=Platform').first();
    await platformLink.hover();

    // Wait for mega menu to appear
    await expect(page.locator('text=Core Modules')).toBeVisible();

    // Click on a module
    await page.click('text=Human Capital');

    await expect(page).toHaveURL(/\/platform\/modules\/hr/);
  });
});
