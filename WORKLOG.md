# Work Log

Все изменения по проекту должны фиксироваться в этом файле.

## 2026-06-12

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
