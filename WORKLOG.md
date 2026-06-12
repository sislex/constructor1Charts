# Work Log

Все изменения по проекту должны фиксироваться в этом файле.

## 2026-06-12

### Save configuration hotfix

Status: completed

Что сделано:
- Исправлена кнопка `Save Configuration`: добавлен `onSaveConfiguration` callback.
- Добавлен reducer `configurationSaved` в `configurationsSlice`.
- Container формы теперь собирает `BotConfiguration`, сохраняет его в Redux и возвращает пользователя на Dashboard.
- Dashboard теперь отображает сохраненные конфигурации вместо empty state.
- Добавлены проверки сохранения в component/app/e2e tests.

Измененные файлы:
- `src/store/slices/configurationsSlice.ts`
- `src/components/dumb/forms/ConfigurationFormShell.tsx`
- `src/components/dumb/forms/ConfigurationFormShell.stories.tsx`
- `src/components/dumb/forms/ConfigurationFormShell.test.tsx`
- `src/containers/ConfigurationFormPageContainer.tsx`
- `src/components/dumb/dashboard/DashboardShell.tsx`
- `src/components/dumb/dashboard/DashboardShell.css`
- `src/components/dumb/dashboard/DashboardShell.stories.tsx`
- `src/containers/DashboardPageContainer.tsx`
- `src/app/App.test.tsx`
- `e2e/smoke.spec.ts`
- `WORKLOG.md`

Тесты и проверки:
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm test` - passed, 59 tests.
- `npm run build` - passed.
- `npm run test:e2e` - passed, 2 Playwright tests.

Риски:
- Save пока сохраняет конфигурацию только в Redux memory store. После перезагрузки страницы конфигурация пропадет, пока не будет реализовано backend/local persistence.

### Conditions builder foundation

Status: completed

Что сделано:
- Добавлен чистый `conditionsEngine` с supported metrics, operator evaluation и validation условий.
- Реализованы dumb-компоненты `ConditionsBuilder` и `ConditionCard`.
- Форма конфигурации получила секцию Conditions.
- Container формы хранит `conditions` и `conditionDraft`.
- `configurationBuilder` расширен полем `conditions`, JSON export теперь включает созданные условия.
- Добавлены Storybook stories для Conditions Builder.
- Добавлены unit tests для operators/validation и component tests для Conditions Builder.
- E2E flow расширен добавлением condition и проверкой conditions в JSON.

Измененные файлы:
- `src/utils/conditions/conditionsEngine.ts`
- `src/utils/conditions/conditionsEngine.test.ts`
- `src/utils/configuration/configurationBuilder.ts`
- `src/utils/configuration/configurationBuilder.test.ts`
- `src/components/dumb/conditions/ConditionCard.tsx`
- `src/components/dumb/conditions/ConditionsBuilder.tsx`
- `src/components/dumb/conditions/ConditionsBuilder.css`
- `src/components/dumb/conditions/ConditionsBuilder.stories.tsx`
- `src/components/dumb/conditions/ConditionsBuilder.test.tsx`
- `src/components/dumb/forms/ConfigurationFormShell.tsx`
- `src/components/dumb/forms/ConfigurationFormShell.stories.tsx`
- `src/components/dumb/forms/ConfigurationFormShell.test.tsx`
- `src/containers/ConfigurationFormPageContainer.tsx`
- `e2e/smoke.spec.ts`
- `WORKLOG.md`

Тесты и проверки:
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm test` - passed, 57 tests.
- `npm run build` - passed.
- `npm run test:e2e` - passed, 2 Playwright tests.

Риски:
- Conditions Builder пока поддерживает плоский список условий без groups, condition history и bot state UI.
- Operators `BETWEEN` пока реализован как диапазон `0..value`; полноценный lower/upper range потребует расширения `ConditionExpression`.
- Условия пока только экспортируются в JSON; runtime evaluation в replay/live saga еще не подключен.
- `test:storybook` still has not been run.

### Buy sell demo and advanced settings

Status: completed

Что сделано:
- Добавлены dumb-компоненты `BuySettingsPanel`, `SellSettingsPanel`, `DemoSettingsPanel`, `AdvancedSettingsPanel`.
- Форма конфигурации получила секции Buy / Sell Settings и Demo and Advanced Settings.
- Container формы хранит и обновляет `buySettings`, `sellSettings`, `demoSettings`, `advancedSettings`.
- `configurationBuilder` расширен так, чтобы использовать реальные настройки формы вместо hardcoded defaults.
- JSON export теперь включает настройки BUY, SELL, demo mode, slippage, fee, gas и auto-save.
- Добавлены Storybook stories для новых settings panels.
- Добавлены component tests для settings panels и form integration.
- E2E flow расширен проверкой BUY percent, partial SELL, auto-save и JSON output.

Измененные файлы:
- `src/components/dumb/forms/BuySettingsPanel.tsx`
- `src/components/dumb/forms/BuySettingsPanel.stories.tsx`
- `src/components/dumb/forms/SellSettingsPanel.tsx`
- `src/components/dumb/forms/SellSettingsPanel.stories.tsx`
- `src/components/dumb/forms/DemoSettingsPanel.tsx`
- `src/components/dumb/forms/DemoSettingsPanel.stories.tsx`
- `src/components/dumb/forms/AdvancedSettingsPanel.tsx`
- `src/components/dumb/forms/AdvancedSettingsPanel.stories.tsx`
- `src/components/dumb/forms/SettingsPanels.css`
- `src/components/dumb/forms/SettingsPanels.test.tsx`
- `src/components/dumb/forms/ConfigurationFormShell.tsx`
- `src/components/dumb/forms/ConfigurationFormShell.stories.tsx`
- `src/components/dumb/forms/ConfigurationFormShell.test.tsx`
- `src/containers/ConfigurationFormPageContainer.tsx`
- `src/utils/configuration/configurationBuilder.ts`
- `src/utils/configuration/configurationBuilder.test.ts`
- `e2e/smoke.spec.ts`
- `WORKLOG.md`

Тесты и проверки:
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm test` - passed, 49 tests.
- `npm run build` - passed.
- `npm run test:e2e` - passed, 2 Playwright tests.

Риски:
- Numeric validation is displayed in panels but does not yet block JSON export globally.
- Settings are form-local state only; backend save/persistence is still not implemented.
- `test:storybook` still has not been run.

### Weighted average and JSON export flow

Status: completed

Что сделано:
- Добавлены dumb-компоненты `WeightedAveragePanel` и `WeightedAverageSourceRow`.
- Форма конфигурации получила секцию Weighted Average с enable toggle, редактированием весов, расчетом total weight и preview weighted price.
- Добавлен чистый `configurationBuilder` для сборки минимального `BotConfiguration`.
- Добавлен JSON preview/export action в `ConfigurationFormShell`.
- Container формы хранит `weightedAverage` state и генерирует serialized JSON.
- Добавлены Storybook stories для `WeightedAveragePanel`.
- Добавлены unit/component/e2e tests для weighted average и JSON export flow.

Измененные файлы:
- `src/components/dumb/forms/WeightedAveragePanel.tsx`
- `src/components/dumb/forms/WeightedAveragePanel.css`
- `src/components/dumb/forms/WeightedAveragePanel.stories.tsx`
- `src/components/dumb/forms/WeightedAveragePanel.test.tsx`
- `src/components/dumb/forms/WeightedAverageSourceRow.tsx`
- `src/components/dumb/forms/WeightedAverageSourceRow.css`
- `src/components/dumb/forms/ConfigurationFormShell.tsx`
- `src/components/dumb/forms/ConfigurationFormShell.css`
- `src/components/dumb/forms/ConfigurationFormShell.stories.tsx`
- `src/components/dumb/forms/ConfigurationFormShell.test.tsx`
- `src/containers/ConfigurationFormPageContainer.tsx`
- `src/utils/configuration/configurationBuilder.ts`
- `src/utils/configuration/configurationBuilder.test.ts`
- `e2e/smoke.spec.ts`
- `WORKLOG.md`

Тесты и проверки:
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm test` - passed, 44 tests.
- `npm run build` - passed.
- `npm run test:e2e` - passed, 2 Playwright tests.

Риски:
- JSON export пока отображается как preview в форме, без скачивания файла и без backend save.
- Валидация weighted average есть на UI уровне, но пока не блокирует Export JSON отдельно от базовых required fields.
- `test:storybook` все еще не запускался.

### Configuration source and market flow

Status: completed

Что сделано:
- Добавлен typed REST layer для `GET /store/keys?detail=true&memory=true`: API config, fetch client, response mapper и нормализация ошибок.
- Подключена `marketDataSaga` к root saga.
- `marketDataSlice` расширен `quoteSources`, сохранив `quoteKeys` для совместимости.
- Добавлены mock quote sources для локального UI и тестов.
- Реализованы dumb-компоненты `QuoteSourceCard`, `QuoteSourceSelector`, `TradingMarketSelector`, `ProfitCurrencyField`, `ConfigurationFormShell`.
- Добавлен container `/configurations/new` с локальным state для name, selected sources, trading market и вычисляемой profit currency.
- Dashboard получил переход `Create Configuration`.
- Добавлены Storybook stories для новых dumb-компонентов.
- Добавлены unit, saga, component и e2e tests для нового flow.

Измененные файлы:
- `src/services/api/**`
- `src/store/sagas/marketDataSaga.ts`
- `src/store/slices/marketDataSlice.ts`
- `src/store/selectors/marketDataSelectors.ts`
- `src/mocks/quoteSources.ts`
- `src/components/dumb/sources/**`
- `src/components/dumb/forms/**`
- `src/containers/ConfigurationFormPageContainer.tsx`
- `src/app/App.tsx`
- `src/app/App.test.tsx`
- `e2e/smoke.spec.ts`
- `WORKLOG.md`

Тесты и проверки:
- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm test` - passed, 39 tests.
- `npm run build` - passed.
- `npm run test:e2e` - passed, 2 Playwright tests.

Риски:
- UI формы пока использует mock quote sources. Реальный REST client и saga покрыты тестами, но переключение UI на backend/mock mode нужно сделать отдельной задачей.
- `test:storybook` все еще не запускался.
- React Router продолжает выводить future flag warnings в тестах.

### Foundation implementation

Status: completed

Что сделано:
- Создан Vite React/TypeScript scaffold без реализации бизнес-экранов приложения.
- Настроены `package.json`, TypeScript strict config, Vite, Vitest, Playwright, ESLint и Storybook config.
- Добавлена структура `src` для app, components, containers, services, store, types, utils.
- Добавлены domain interfaces для конфигураций, котировок, player, conditions, demo trading, transactions и chart events.
- Реализованы чистые utilities: quote key parser, token metadata resolver, profit currency, weighted average, financial calculations.
- Добавлен Redux Toolkit store с slices из ТЗ и root saga.
- Добавлен dark/light theme layer на CSS variables, theme persistence и dashboard theme toggle.
- Добавлен первый desktop Dashboard shell как dumb component и container.
- Добавлены Storybook stories для `Button` и `DashboardShell`.
- Добавлены unit/component/e2e smoke tests.
- Добавлен `.gitignore`.

Измененные файлы:
- `package.json`
- `package-lock.json`
- `index.html`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `vite.config.ts`
- `vitest.config.ts`
- `vitest.setup.ts`
- `playwright.config.ts`
- `.storybook/main.ts`
- `.storybook/preview.tsx`
- `eslint.config.js`
- `.gitignore`
- `src/**`
- `e2e/smoke.spec.ts`
- `WORKLOG.md`

Тесты и проверки:
- `npm run typecheck` - passed.
- `npm run lint` - passed.
- `npm test` - passed, 26 tests.
- `npm run build` - passed.
- `npm run test:e2e` - passed, 1 Playwright smoke test.

Риски:
- `npm install` сообщает 9 vulnerabilities в dependency tree. `npm audit fix --force` не запускался, потому что может внести breaking changes.
- React Router выводит future flag warnings для v7 в тестах; поведение не ломается, можно включить future flags отдельной задачей.
- Storybook stories добавлены, но `test:storybook` пока не запускался.

### Planning artifacts

Status: completed

Что сделано:
- Прочитан `PROMPT.md`.
- Добавлено требование поддержки dark и light theme в `PROMPT.md`.
- Создан подробный `DEVELOPMENT_PLAN.md` с независимыми частями, подзадачами, acceptance criteria и тестами.
- Добавлен `AGENTS.md`, адаптированный из Angular governance rules под React/TypeScript/Redux Saga/Storybook.
- Создан этот `WORKLOG.md` как обязательный журнал разработки.

Измененные файлы:
- `PROMPT.md`
- `DEVELOPMENT_PLAN.md`
- `AGENTS.md`
- `WORKLOG.md`

Тесты:
- Не запускались. Изменения затрагивают только документацию и планирование.

Риски:
- План нужно будет уточнять после выбора конкретного scaffold/tooling и фактических библиотек графиков.
