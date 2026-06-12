import { DashboardShell } from '@components/dumb/dashboard/DashboardShell';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setTheme } from '@store/slices/settingsSlice';

export function DashboardPageContainer() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.settings.theme);
  const configurationCount = useAppSelector((state) => state.configurations.items.length);
  const quoteSourceCount = useAppSelector((state) => state.marketData.quoteKeys.length);

  return (
    <DashboardShell
      configurationCount={configurationCount}
      quoteSourceCount={quoteSourceCount}
      theme={theme}
      onThemeToggle={() => dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'))}
    />
  );
}
