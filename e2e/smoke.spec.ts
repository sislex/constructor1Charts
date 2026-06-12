import { expect, test } from '@playwright/test';

test('opens dashboard shell on desktop viewport', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Bot Configurations' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Toggle color theme' })).toBeVisible();
});
