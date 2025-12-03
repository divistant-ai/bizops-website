import { expect, test } from '@playwright/test';

test.describe('Tools Functionality', () => {
  test('ROI Calculator should work end-to-end', async ({ page }) => {
    await page.goto('/tools/roi-calculator');

    await expect(page).toHaveTitle(/ROI Calculator/i);

    // Fill calculator form
    await page.fill('input[name*="revenue"]', '1000000000');
    await page.fill('input[name*="efficiency"]', '15');
    await page.fill('input[name*="overtime"]', '50000000');

    // Calculate
    await page.click('button:has-text("Calculate")');

    // Verify results
    await expect(page.locator('text=/ROI/i')).toBeVisible();
    await expect(page.locator('text=/Payback Period/i')).toBeVisible();
  });

  test('PPh 21 Calculator should calculate correctly', async ({ page }) => {
    await page.goto('/tools/pajak-pph21');

    await expect(page).toHaveTitle(/PPh 21/i);

    // Fill form
    await page.fill('input[name*="gaji"]', '10000000');
    await page.selectOption('select[name*="status"]', 'TK/0');

    // Calculate
    await page.click('button:has-text("Hitung")');

    // Verify result
    await expect(page.locator('text=/PPh 21/i')).toBeVisible();
  });
});
