import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { readStoredConfigurations, writeStoredConfigurations } from '@services/storage/configurationsStorage';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { loadConfigurationsSucceeded } from '@store/slices/configurationsSlice';

export interface ConfigurationsPersistenceProps {
  children: ReactNode;
}

export function ConfigurationsPersistence({ children }: ConfigurationsPersistenceProps) {
  const dispatch = useAppDispatch();
  const configurations = useAppSelector((state) => state.configurations.items);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    dispatch(loadConfigurationsSucceeded(readStoredConfigurations()));
    setHydrated(true);
  }, [dispatch]);

  useEffect(() => {
    if (hydrated) {
      writeStoredConfigurations(configurations);
    }
  }, [configurations, hydrated]);

  return <>{children}</>;
}
