import { expect, test } from '@playwright/test';

test('opens dashboard shell on desktop viewport', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  await expect(page.getByRole('heading', { name: 'Bot Configurations' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Toggle color theme' })).toBeVisible();
});

test('opens create configuration form and selects quote source', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  await page.getByRole('link', { name: 'Create Configuration' }).click();
  await expect(page.getByRole('heading', { name: 'Create Configuration' })).toBeVisible();

  await page.getByLabel('Configuration Name').fill('ETH Arbitrage Bot');
  await page.getByRole('button', { name: /bybit.*ETH\/USDC.*askPrice/i }).click();
  await page.getByRole('combobox', { name: 'Trading Market' }).selectOption('bybit|ETH/USDC|askPrice');
  await page.getByLabel('Enable Weighted Average').check();
  await page.getByLabel('Amount Type').selectOption('PERCENT');
  await page.getByLabel('SELL Mode').selectOption('PARTIAL');
  await page.getByLabel('SELL Percent').fill('50');
  await page.getByRole('checkbox', { name: 'Auto Save' }).check();
  await page.getByRole('button', { name: 'Add Condition' }).click();
  await page.getByRole('button', { name: 'Export JSON' }).click();

  await expect(page.getByText('1 selected')).toBeVisible();
  await expect(page.getByLabel('Profit currency')).toContainText('USDC');
  await expect(page.getByLabel('Generated JSON')).toContainText('"name": "ETH Arbitrage Bot"');
  await expect(page.getByLabel('Generated JSON')).toContainText('"weightedAverage"');
  await expect(page.getByLabel('Generated JSON')).toContainText('"buyAmountType": "PERCENT"');
  await expect(page.getByLabel('Generated JSON')).toContainText('"sellMode": "PARTIAL"');
  await expect(page.getByLabel('Generated JSON')).toContainText('"autoSaveEnabled": true');
  await expect(page.getByLabel('Generated JSON')).toContainText('"conditions"');
  await expect(page.getByLabel('Generated JSON')).toContainText('"Take Profit"');
  await expect(page.getByRole('button', { name: 'Save Configuration' })).toBeEnabled();

  await page.getByRole('button', { name: 'Save Configuration' }).click();

  await expect(page.getByRole('heading', { name: 'Bot Configurations' })).toBeVisible();
  await expect(page.getByText('ETH Arbitrage Bot')).toBeVisible();

  await page.reload();
  await expect(page.getByText('ETH Arbitrage Bot')).toBeVisible();

  await page.getByRole('button', { name: 'Export JSON' }).click();
  await expect(page.getByLabel('Dashboard exported JSON')).toContainText('"name": "ETH Arbitrage Bot"');

  await page.getByRole('button', { name: 'Duplicate' }).click();
  await expect(page.getByText('ETH Arbitrage Bot Copy')).toBeVisible();

  await page.getByRole('button', { name: 'Delete' }).first().click();
  await expect(page.getByText('ETH Arbitrage Bot Copy')).toBeVisible();
});
