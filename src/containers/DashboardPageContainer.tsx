import { useState } from 'react';
import { DashboardShell } from '@components/dumb/dashboard/DashboardShell';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { configurationDeleted, configurationDuplicated } from '@store/slices/configurationsSlice';
import { setTheme } from '@store/slices/settingsSlice';
import { serializeBotConfiguration } from '@utils/configuration/configurationBuilder';

export function DashboardPageContainer() {
  const dispatch = useAppDispatch();
  const [exportedJson, setExportedJson] = useState('');
  const theme = useAppSelector((state) => state.settings.theme);
  const configurations = useAppSelector((state) => state.configurations.items);
  const configurationCount = useAppSelector((state) => state.configurations.items.length);
  const quoteSourceCount = useAppSelector((state) => state.marketData.quoteKeys.length);

  return (
    <DashboardShell
      configurationCount={configurationCount}
      configurations={configurations}
      exportedJson={exportedJson}
      quoteSourceCount={quoteSourceCount}
      theme={theme}
      onDeleteConfiguration={(id) => {
        dispatch(configurationDeleted(id));
        setExportedJson('');
      }}
      onDuplicateConfiguration={(id) =>
        dispatch(
          configurationDuplicated({
            id,
            newId: `configuration-${Date.now()}`,
            createdAt: new Date().toISOString()
          })
        )
      }
      onExportConfiguration={(id) => {
        const configuration = configurations.find((item) => item.id === id);

        if (configuration) {
          setExportedJson(serializeBotConfiguration(configuration));
        }
      }}
      onThemeToggle={() => dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'))}
    />
  );
}
