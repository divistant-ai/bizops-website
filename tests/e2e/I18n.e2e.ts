import { expect, test } from '@playwright/test';

test.describe('I18n', () => {
  test.describe('Language Switching', () => {
    test('should switch language from Indonesian to English using dropdown and verify text on the homepage', async ({ page }) => {
      await page.goto('/');

      await expect(
        page.getByRole('heading', { name: 'Satu Sistem Kendali untuk' }),
      ).toBeVisible();

      await page.getByLabel('lang-switcher').selectOption('en');

      await expect(
        page.getByRole('heading', { name: 'One Control System for' }),
      ).toBeVisible();
    });

    test('should switch language from Indonesian to English using URL and verify text on the sign-in page', async ({ page }) => {
      await page.goto('/sign-in');

      await expect(page.getByText('Email address')).toBeVisible();

      await page.goto('/en/sign-in');

      await expect(page.getByText('Email address')).toBeVisible();
    });
  });
});
