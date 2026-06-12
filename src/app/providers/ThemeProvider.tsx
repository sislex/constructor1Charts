import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setTheme } from '@store/slices/settingsSlice';
import { selectTheme } from '@store/selectors/settingsSelectors';
import { readStoredTheme, writeStoredTheme } from '@services/storage/themeStorage';

export interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    const storedTheme = readStoredTheme();

    if (storedTheme) {
      dispatch(setTheme(storedTheme));
    }
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    writeStoredTheme(theme);
  }, [theme]);

  return <>{children}</>;
}
