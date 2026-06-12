import { expect, test } from '@playwright/test';

test('opens dashboard shell on desktop viewport', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Bot Configurations' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Toggle color theme' })).toBeVisible();
});

test('opens create configuration form and selects quote source', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'Create Configuration' }).click();
  await expect(page.getByRole('heading', { name: 'Create Configuration' })).toBeVisible();

  await page.getByLabel('Configuration Name').fill('ETH Arbitrage Bot');
  await page.getByRole('button', { name: /bybit.*ETH\/USDC.*askPrice/i }).click();
  await page.getByRole('combobox', { name: 'Trading Market' }).selectOption('bybit|ETH/USDC|askPrice');
  await page.getByLabel('Enable Weighted Average').check();
  await page.getByRole('button', { name: 'Export JSON' }).click();

  await expect(page.getByText('1 selected')).toBeVisible();
  await expect(page.getByLabel('Profit currency')).toContainText('USDC');
  await expect(page.getByLabel('Generated JSON')).toContainText('"name": "ETH Arbitrage Bot"');
  await expect(page.getByLabel('Generated JSON')).toContainText('"weightedAverage"');
  await expect(page.getByRole('button', { name: 'Save Configuration' })).toBeEnabled();
});
