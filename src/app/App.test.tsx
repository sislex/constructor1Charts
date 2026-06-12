import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from '@app/providers/ThemeProvider';
import { store, type AppStore } from '@store/store';
import { App } from './App';

describe('App', () => {
  it('renders dashboard shell', () => {
    renderApp();

    expect(screen.getByRole('heading', { name: 'Bot Configurations' })).toBeInTheDocument();
    expect(screen.getByText('No configurations yet')).toBeInTheDocument();
  });

  it('toggles theme from dashboard', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('button', { name: 'Toggle color theme' }));

    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('opens create configuration form from dashboard', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('link', { name: 'Create Configuration' }));

    expect(screen.getByRole('heading', { name: 'Create Configuration' })).toBeInTheDocument();
    expect(screen.getByText('Sources')).toBeInTheDocument();
  });

  it('saves configuration and returns to dashboard', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('link', { name: 'Create Configuration' }));
    await user.type(screen.getByLabelText('Configuration Name'), 'ETH Arbitrage Bot');
    await user.click(screen.getByRole('button', { name: /bybit.*ETH\/USDC.*askPrice/i }));
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Trading Market' }),
      'bybit|ETH/USDC|askPrice'
    );
    await user.click(screen.getByRole('button', { name: 'Save Configuration' }));

    expect(screen.getByRole('heading', { name: 'Bot Configurations' })).toBeInTheDocument();
    expect(screen.getByText('ETH Arbitrage Bot')).toBeInTheDocument();
  });
});

function renderApp(appStore: AppStore = store) {
  return render(
    <Provider store={appStore}>
      <MemoryRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MemoryRouter>
    </Provider>
  );
}
