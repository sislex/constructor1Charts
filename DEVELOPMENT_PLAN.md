# ArbiDex Bot Configurator Development Plan

Этот документ разбивает ТЗ из `PROMPT.md` на независимые части разработки. Каждая часть должна поставляться отдельным инкрементом с собственными критериями приемки, тестами, Storybook-сценариями и записью в `WORKLOG.md`.

## Правила выполнения задач

- Перед началом любой задачи прочитать `AGENTS.md`, `PROMPT.md`, этот план и релевантные governance-файлы компонента, если они уже существуют.
- Любое изменение фиксировать в `WORKLOG.md`: дата, задача, измененные файлы, что сделано, какие тесты запущены, известные риски.
- Не смешивать независимые части в один pull request без причины.
- Dumb-компоненты не должны читать Redux, делать API/WebSocket-запросы или содержать бизнес-логику.
- Container-компоненты работают только с Redux selectors/actions и передают данные в dumb-компоненты.
- Асинхронные операции, replay/live timers, Socket.IO, демо-транзакции и вычисления условий проходят через Redux Saga или чистые domain utilities, вызываемые из Saga.
- Для каждой feature обновлять Storybook, тесты, `FEATURES.md`/`CHANGELOG.md` рядом с компонентом или модулем, если такие файлы уже существуют.
- Существующие тесты считаются контрактом. Их нельзя удалять, ослаблять или переписывать без явного подтверждения.

## Definition of Done для любой части

- Реализация соответствует TypeScript strict mode и не использует `any`.
- Добавлены или обновлены unit tests для бизнес-логики.
- Добавлены component tests для пользовательского поведения.
- Добавлены Storybook stories для dumb-компонентов.
- Для async flows добавлены saga tests.
- Для критичных пользовательских сценариев добавлены integration/e2e tests.
- Обновлен `WORKLOG.md`.
- Все затронутые acceptance criteria проверяемы.
- Все старые тесты остаются зелеными.
- Нет прямых API/WebSocket-вызовов в компонентах.

## Часть 0. Project Foundation

Цель: подготовить базовый React/TypeScript проект, структуру каталогов, tooling и правила разработки.

Независимость: базовая часть, от нее зависят остальные.

### 0.1. Инициализация приложения

Задачи:
- Создать React + TypeScript приложение.
- Настроить `strict` TypeScript.
- Добавить React Router.
- Добавить Redux Toolkit и Redux Saga.
- Добавить Socket.IO Client.
- Добавить тестовый стек: Vitest или Jest, React Testing Library, Redux Saga Test Plan, MSW, Playwright или Cypress.
- Добавить Storybook.
- Создать базовые npm scripts: `dev`, `build`, `test`, `test:watch`, `test:coverage`, `test:e2e`, `storybook`, `test:storybook`, `lint`, `typecheck`.

Acceptance Criteria:
- `npm run build` собирает приложение.
- `npm run typecheck` проходит без ошибок.
- `npm run test` запускает тесты.
- `npm run storybook` открывает Storybook.
- В проекте создана структура из `PROMPT.md`.

Unit Tests:
- Проверить базовый smoke-test приложения.
- Проверить root reducer создает initial state.

Component Tests:
- App рендерит shell без ошибок.

E2E:
- Открывается стартовый URL.
- Видна базовая страница Dashboard.

### 0.2. Архитектурная структура

Задачи:
- Создать директории `src/app`, `src/pages`, `src/components/dumb`, `src/containers`, `src/store`, `src/services`, `src/types`, `src/utils`, `src/hooks`, `src/stories`.
- Добавить path aliases.
- Создать root store, root saga, typed hooks `useAppDispatch`, `useAppSelector`.
- Создать пустые slices: `configurationsSlice`, `marketDataSlice`, `playerSlice`, `conditionsSlice`, `demoTradingSlice`, `settingsSlice`, `uiSlice`.

Acceptance Criteria:
- Все slices подключены к root reducer.
- Root saga запускается.
- Typed hooks используются вместо raw Redux hooks.

Unit Tests:
- Initial state каждого slice.
- Smoke-test root reducer.

### 0.3. Governance и logging

Задачи:
- Добавить `AGENTS.md`.
- Добавить `WORKLOG.md`.
- Определить шаблоны `REQUIREMENTS.md`, `FEATURES.md`, `RULES.md`, `CHANGELOG.md` для крупных компонентов.

Acceptance Criteria:
- В `AGENTS.md` описаны правила React-разработки.
- В `WORKLOG.md` есть запись о создании проектных документов.
- Новые задачи обязаны обновлять лог.

Tests:
- Тесты не требуются, это process artifact.

## Часть 1. Domain Types and Pure Utilities

Цель: создать типизированную доменную модель и чистые функции, которые не зависят от UI, Redux и API.

Независимость: можно делать после 0. Зависимость для всех бизнес-фич.

### 1.1. Domain interfaces

Задачи:
- Описать `Configuration`, `QuoteSource`, `Market`, `Condition`, `ConditionGroup`, `DemoPosition`, `Transaction`, `ActionHistoryItem`, `ChartEvent`, `PendingTransactionLine`, `PlayerState`, `WeightedAverageConfig`.
- Описать enums/unions: `SourceType`, `QuoteField`, `Operator`, `BotState`, `TransactionStatus`, `ChartEventType`, `ActionSource`.

Acceptance Criteria:
- Все интерфейсы экспортируются из `src/types`.
- Нет `any`.
- Типы покрывают JSON export format.

Unit Tests:
- Type-level smoke через compile/typecheck.

### 1.2. Quote key parser

Задачи:
- Реализовать `parseQuoteKey(raw: string): ParsedQuoteKey`.
- Поддержать CEX ключи.
- Поддержать DEX ключи `dex:<network>|<base>/<quote>|<field>`.
- Определять `sourceType`.
- Извлекать `network`, `source`, `pair`, `baseAsset`, `quoteAsset`, `field`.
- Возвращать typed error для невалидных ключей или использовать `Result`-подобный тип.

Acceptance Criteria:
- CEX отображается как `[CEX][Bybit] ETH/USDC askPrice`.
- DEX отображается как `[DEX][Arbitrum] USDC/WETH bidPrice` после token resolution.
- Исходный `raw` ключ не меняется.
- Parser не падает на malformed input.

Unit Tests:
- CEX `bybit|ETH/USDC|askPrice`.
- DEX `dex:arbitrum|address/address|bidPrice`.
- Все поля `bidPrice`, `askPrice`, `bidPool`, `askPool`.
- Неверное количество частей.
- Неизвестное поле.
- Пустая строка.
- `sourceType` для `dex:` и обычного source.
- `baseAsset`/`quoteAsset` extraction.

### 1.3. Token metadata resolver

Задачи:
- Реализовать resolver адресов токенов в символы.
- Поддержать локальный map metadata.
- Реализовать fallback на shortened address.
- Не менять raw key.

Acceptance Criteria:
- Известные адреса отображаются как символы.
- Неизвестные адреса отображаются сокращенно.
- CEX пары не изменяются.

Unit Tests:
- Known USDC/WETH addresses.
- Unknown address fallback.
- Case-insensitive matching.
- No mutation of parsed key.

### 1.4. Profit currency

Задачи:
- Реализовать `getProfitCurrency(parsedKey)`.
- Для `ETH/USDC` возвращать `USDC`.
- Для `USDC/WETH` возвращать `WETH`.

Acceptance Criteria:
- Profit currency вычисляется автоматически из trading market.
- Пользователь не вводит profit currency вручную.

Unit Tests:
- CEX pair.
- DEX pair after token resolution.
- Invalid/empty pair handling.

### 1.5. Weighted average utilities

Задачи:
- Реализовать `calculateWeightedAverage(prices, weights)`.
- Реализовать `normalizeWeights`.
- Реализовать validation суммы весов.
- Поддержать missing price behavior.

Acceptance Criteria:
- Формула `sum(price * weight)` корректна.
- Сумма весов должна быть `1.0` или `100%`.
- Ошибки validation понятны UI.

Unit Tests:
- Basic weighted average.
- Decimal weights.
- Percent weights normalization.
- Sum less than 1.
- Sum greater than 1.
- Missing price.
- Negative weight.
- Empty sources.

### 1.6. Financial calculations

Задачи:
- Реализовать PnL.
- Реализовать slippage.
- Реализовать fees.
- Реализовать gas fee.
- Реализовать profit after fees.

Acceptance Criteria:
- Расчеты используются demo trading и conditions engine.
- Все функции чистые.

Unit Tests:
- Long position PnL.
- Realized/unrealized PnL.
- Slippage percent.
- Trading fee.
- Gas fee impact.
- Profit after fees.
- Edge cases: zero amount, zero price.

## Часть 2. Theme System and Design Tokens

Цель: поддержать dark и light theme для всего приложения.

Независимость: можно делать после 0, UI-части должны использовать эту систему.

### 2.1. Theme tokens

Задачи:
- Создать theme tokens для dark и light.
- Использовать CSS variables.
- Описать semantic tokens: background, surface, border, primary, success, error, warning, text, muted, chart colors.
- Добавить `ThemeProvider` или эквивалент.

Acceptance Criteria:
- Есть две темы: dark и light.
- Все цвета UI идут через tokens.
- Chart palette имеет варианты для dark/light.

Unit Tests:
- Theme reducer initial state.
- Toggle theme action.
- Persisted theme hydration.

Component Tests:
- ThemeProvider применяет data attribute/class.
- Toggle меняет тему.

Storybook:
- Global theme toolbar.
- Stories проверяются в dark и light.

### 2.2. Theme persistence

Задачи:
- Сохранять тему в localStorage.
- Загружать тему при старте.
- Поддержать fallback на dark theme.

Acceptance Criteria:
- Выбранная тема сохраняется между сессиями.
- Некорректное значение игнорируется.

Unit Tests:
- Read persisted value.
- Invalid persisted value.
- Write on change.

E2E:
- Переключить тему, перезагрузить страницу, тема сохранилась.

## Часть 3. API and Market Data Integration

Цель: интеграция с REST и Socket.IO через services и sagas.

Независимость: UI может разрабатываться с mock data параллельно.

### 3.1. REST quote keys service

Задачи:
- Создать API client для `GET /store/keys?detail=true&memory=true`.
- Типизировать response.
- Подключить MSW mocks.

Acceptance Criteria:
- Компоненты не вызывают API напрямую.
- Ошибки API нормализуются.
- Loading/error состояния попадают в Redux.

Unit Tests:
- Response mapper.
- Error mapper.

Saga Tests:
- `loadQuoteKeysRequested` success.
- `loadQuoteKeysRequested` failure.

Component Tests:
- Quote selector получает loading/error через props.

### 3.2. Socket.IO service

Задачи:
- Создать socket service wrapper.
- Реализовать connect/disconnect.
- Реализовать subscribe/unsubscribe.
- Обработать `dataChange`.

Acceptance Criteria:
- WebSocket работает только в service/saga layer.
- Saga dispatch `marketDataChanged`.
- Отписка очищает listener.

Unit Tests:
- Payload mapper для `DataChangeEvent`.
- Numeric parsing of `point.v`.

Saga Tests:
- Successful subscription.
- dataChange creates action.
- Stop live unsubscribes.
- Socket error creates error state.

E2E:
- Live mode с mocked WebSocket обновляет график.

## Часть 4. Configuration Dashboard

Цель: список конфигураций, поиск, фильтрация, сортировка, действия.

Независимость: может использовать mock storage до backend.

### 4.1. Dashboard UI dumb components

Задачи:
- `DashboardPage` container.
- Dumb-компоненты: `ConfigurationTable`, `ConfigurationToolbar`, `ConfigurationStatusBadge`, `ConfigurationActionsMenu`, `SearchInput`, `FilterControl`, `SortControl`, `EmptyState`, `ErrorState`.

Acceptance Criteria:
- Таблица показывает все поля из ТЗ.
- Есть states: loading, empty, error.
- Actions доступны на строке.
- Keyboard navigation и aria labels.

Component Tests:
- Рендер списка.
- Empty state.
- Error state.
- Search input вызывает callback.
- Sort control вызывает callback.
- Actions menu открывается с keyboard.

Storybook:
- Default, Loading, Empty, Error, Selected.
- Большой список.
- Light/dark theme.

### 4.2. Dashboard state and persistence

Задачи:
- `configurationsSlice`.
- Actions: load, create draft, duplicate, delete, export.
- Selectors для filtered/sorted list.

Acceptance Criteria:
- Search/filter/sort работают через selectors.
- Delete требует подтверждения UI.
- Duplicate создает новый id/name.

Unit Tests:
- Reducers.
- Selectors.
- Duplicate logic.
- Delete logic.

E2E:
- Dashboard показывает список.
- Поиск фильтрует список.
- Duplicate добавляет конфигурацию.
- Delete удаляет после confirmation.

## Часть 5. Configuration Form

Цель: создание и редактирование конфигурации.

Независимость: зависит от domain utilities и quote keys.

### 5.1. General section

Задачи:
- `ConfigurationForm`.
- `ConfigurationHeader`.
- `ConfigurationFooter`.
- General fields: name, description, tags, enabled.

Acceptance Criteria:
- Name обязателен.
- Tags добавляются/удаляются.
- Save disabled при ошибках.

Unit Tests:
- Form validation: missing name.
- Tags normalization.

Component Tests:
- Ввод name.
- Добавление tag.
- Disabled save.

Storybook:
- Default, Loading, Empty, Error, Disabled.

### 5.2. Sources selector

Задачи:
- `QuoteSourceCard`.
- `QuoteSourceSelector`.
- Filters: network, source, CEX/DEX, pair, field, text.
- Multi-select.

Acceptance Criteria:
- Источники отображаются user-friendly.
- DEX адреса заменяются символами при наличии metadata.
- `selectedSources` содержит raw keys.

Unit Tests:
- Filter selectors.
- Selected raw keys.
- Display label builder.

Component Tests:
- Выбор нескольких источников.
- Снятие выбора.
- Фильтрация по field/source/type.

Storybook:
- Default, Loading, Empty, Error, Selected.

### 5.3. Trading market and profit currency

Задачи:
- `TradingMarketSelector`.
- `ProfitCurrencyField`.
- Market settings preview.

Acceptance Criteria:
- Trading market выбирается только из selected sources.
- Profit currency вычисляется автоматически.
- При удалении selected source trading market сбрасывается или валидируется.

Unit Tests:
- Profit currency.
- Market validation.

Component Tests:
- Select trading market.
- Profit currency updates.
- Removed source invalidates market.

### 5.4. Buy/Sell settings

Задачи:
- `BuySettingsPanel`.
- `SellSettingsPanel`.
- Fixed/percent buy amount.
- Full/partial sell mode.

Acceptance Criteria:
- BUY supports fixed and percent.
- SELL supports full position and partial percent.
- Invalid values show validation.

Unit Tests:
- Buy amount validation.
- Sell percent validation.

Component Tests:
- Toggle buy amount type.
- Toggle sell mode.
- Validation messages.

### 5.5. Weighted average panel

Задачи:
- `WeightedAveragePanel`.
- `WeightedAverageSourceRow`.
- Enable/disable.
- Weight editing.
- Validation or normalization.

Acceptance Criteria:
- Сумма весов валидируется.
- Итоговая цена показывается при наличии prices.
- Disabled mode не участвует в расчетах.

Unit Tests:
- Weight validation.
- Normalization.
- Calculated display value.

Component Tests:
- Enable weighted average.
- Edit weights.
- Show validation error.

Storybook:
- Default, Loading, Empty, Error, Disabled, Selected.

### 5.6. Demo and advanced settings

Задачи:
- `DemoSettingsPanel`.
- `AdvancedSettingsPanel`.
- Fields: demo mode, transaction delay, slippage, fees, gas fee, auto save.

Acceptance Criteria:
- Numeric fields validate min/max.
- Defaults match ТЗ.
- Settings are included in exported JSON.

Unit Tests:
- Defaults.
- Numeric validation.

Component Tests:
- Toggle demo.
- Edit delay.
- Invalid slippage.

### 5.7. Save and export configuration JSON

Задачи:
- Build final `BotConfiguration`.
- Validate full form.
- Save via saga.
- Export JSON.

Acceptance Criteria:
- JSON matches interface.
- Save only after valid form.
- Export file/string contains raw source keys.

Unit Tests:
- JSON builder.
- Full form validation.

Saga Tests:
- Save success.
- Save failure.
- Auto-save flow.

E2E:
- Create Configuration Flow полностью.
- Export JSON содержит expected fields.

## Часть 6. Chart Architecture

Цель: единый `QuotesChart` и chart engines.

Независимость: может использовать mock data.

### 6.1. Shared chart contracts

Задачи:
- Описать `ChartEngine`, `QuotesChartProps`, `QuoteChartPoint`.
- Создать shared fixtures.
- Создать chart event mapping.

Acceptance Criteria:
- Все chart engines принимают одинаковые props.
- Нет Redux/API/WebSocket внутри chart components.

Unit Tests:
- Chart data mapper.
- Marker mapper.
- Pending line mapper.

### 6.2. QuotesChart dispatcher

Задачи:
- `QuotesChart` выбирает engine.
- Default engine `tradingview-lightweight`.
- Loading/empty/error states.

Acceptance Criteria:
- Правильный engine рендерится по prop.
- Unknown engine fallback.

Component Tests:
- Engine selection.
- Loading state.
- Empty state.
- Error state.

Storybook:
- TradingViewEngine, EChartsEngine, HighchartsEngine, AgChartsEngine, D3Engine.
- Controls для engine.

### 6.3. Individual chart engines

Задачи:
- `D3QuotesChart`.
- `AgChartsQuotesChart`.
- `HighchartsQuotesChart`.
- `TradingViewLightweightQuotesChart`.
- `EChartsQuotesChart`.

Acceptance Criteria:
- Multiple sources отображаются.
- Weighted average line отображается отдельной линией.
- BUY/SELL markers отображаются.
- Pending transaction line отображается.
- Success/failed markers отображаются.

Component Tests:
- Props-only rendering.
- Weighted average line visible.
- BUY marker.
- SELL marker.
- Pending line.
- SUCCESS/FAILED marker.

Storybook:
- Default, Loading, Empty, Error.
- Multiple Sources.
- Replay Mode.
- Live Mode.
- Weighted Average.
- With BUY marker.
- With SELL marker.
- Pending BUY transaction.
- Pending SELL transaction.
- Successful transaction line.
- Failed transaction line.

E2E:
- Player page renders selected chart engine.
- Switching engine preserves current step.

## Часть 7. Player Replay Mode

Цель: воспроизведение исторических шагов.

Независимость: зависит от chart contracts и player slice.

### 7.1. Player controls

Задачи:
- `PlayerControls`.
- `TimelineSlider`.
- `PlaybackSpeedSelector`.
- `StepInfo`.
- Play, pause, step forward, step backward.

Acceptance Criteria:
- Slider меняет current step.
- Step не выходит за границы.
- Playback speed применяется.

Unit Tests:
- Player reducer.
- Boundary conditions.
- Speed validation.

Component Tests:
- Play/Pause click.
- Step forward/backward.
- Slider change.
- Speed change.

Storybook:
- Default, Loading, Empty, Error, Disabled, Active, Replay.

### 7.2. Replay saga

Задачи:
- `startReplayRequested`.
- `pauseReplayRequested`.
- Replay timer.
- Step updates.

Acceptance Criteria:
- Play двигает currentStep.
- Pause останавливает timer.
- При достижении totalSteps playback останавливается.

Saga Tests:
- Start replay creates timer.
- Pause cancels timer.
- Step forward/backward.
- End of replay.

E2E:
- Player Replay Flow полностью.

### 7.3. Replay data processing

Задачи:
- Map replay steps to chart data.
- Calculate weighted average history.
- Generate condition events during replay.

Acceptance Criteria:
- Chart shows data up to current step.
- Weighted average пересчитывается по шагам.
- Conditions проверяются на каждом шаге.

Unit Tests:
- Replay mapper.
- Current step slice.
- Weighted average per step.

Integration Tests:
- Replay steps update chart and history.

## Часть 8. Live Mode

Цель: работа с real-time данными через Socket.IO.

Независимость: зависит от socket service и player/chart.

### 8.1. Live state

Задачи:
- Actions: `startLiveRequested`, `stopLiveRequested`, `subscribeToMarketDataRequested`, `marketDataChanged`.
- Live paused indicator при ручном уходе назад.

Acceptance Criteria:
- Live mode подписывается на selected sources.
- Новые events создают steps.
- Timeline переходит на последний step, если пользователь не ушел назад.

Unit Tests:
- Live reducer.
- Live paused logic.
- Append step logic.

Saga Tests:
- Start live subscribes.
- Stop live unsubscribes.
- dataChange creates new step.

E2E:
- Live Mode Flow с mocked WebSocket.

### 8.2. Live calculations

Задачи:
- Recalculate weighted average on each update.
- Check conditions.
- Create chart events.

Acceptance Criteria:
- Live update обновляет chart.
- Weighted average line растет.
- Condition events появляются на графике.

Unit Tests:
- Live step builder.
- Weighted average with partial updates.
- Condition checking trigger.

Integration Tests:
- Mock dataChange -> chart point + event + history.

## Часть 9. Conditions Builder and Engine

Цель: создание условий и выполнение торговой логики.

Независимость: engine можно делать до UI.

### 9.1. Operators engine

Задачи:
- Реализовать operators: greater, less, equal, percent above/below, between.
- Поддержать base metric.

Acceptance Criteria:
- Все operators работают с typed context.
- Ошибки missing metric возвращаются как validation/evaluation result.

Unit Tests:
- Каждый operator.
- Percent above/below.
- Between inclusive/exclusive decision documented.
- Missing metric.
- NaN/invalid value.

### 9.2. Condition validation

Задачи:
- Validate metric/operator/value/base.
- Validate action allowed by bot state.
- Validate group references.

Acceptance Criteria:
- Invalid conditions не запускают trading action.
- UI получает понятные ошибки.

Unit Tests:
- Missing metric.
- Unsupported operator.
- Invalid value.
- Invalid group condition id.
- BUY not allowed in BOUGHT.
- SELL not allowed in IDLE.

### 9.3. Bot state machine

Задачи:
- Реализовать transitions: IDLE -> BUY_PENDING -> BOUGHT -> SELL_PENDING -> SOLD -> IDLE.
- Error transition from any state.

Acceptance Criteria:
- Невалидные переходы запрещены.
- State machine используется demo trading.

Unit Tests:
- Valid transitions.
- Invalid transitions.
- Error transition.
- Recovery behavior documented and tested.

### 9.4. Conditions UI

Задачи:
- `ConditionsBuilder`.
- `ConditionCard`.
- `ConditionEditor`.
- `ConditionGroupEditor`.
- `ConditionHistory`.
- `BotStateIndicator`.

Acceptance Criteria:
- Можно добавить BUY/SELL condition.
- Можно включить/выключить condition.
- Можно создать group AND/OR.
- Triggered/skipped/failed/passed history visible.

Component Tests:
- Add condition.
- Edit condition.
- Disable condition.
- Create group.
- Show triggered condition.

Storybook:
- Default, Loading, Empty, Error, Active, Disabled, Triggered, Pending.

E2E:
- ConditionsBuilder добавляет condition.
- Automatic BUY по condition.
- Automatic SELL по condition.

## Часть 10. Demo Trading and Transactions

Цель: полноценный demo mode с transaction lock и pending visualization.

Независимость: зависит от calculations, bot state, chart events.

### 10.1. Demo position model

Задачи:
- `demoTradingSlice`.
- Open/close position actions.
- Calculate realized/unrealized PnL.

Acceptance Criteria:
- Position statuses: NO_POSITION, OPENED, CLOSED.
- PnL обновляется по current price.
- Currency/amount сохраняются.

Unit Tests:
- Open position.
- Update current price.
- Close position.
- Realized/unrealized PnL.

### 10.2. Manual trading panel

Задачи:
- `ManualTradingPanel`.
- Manual Buy.
- Manual Sell.
- Close Position.

Acceptance Criteria:
- Manual actions disabled when demo mode off.
- Manual actions disabled during active transaction.
- Actions dispatch requested events only.

Component Tests:
- Buttons enabled/disabled.
- Manual buy click.
- Manual sell click.
- Close position click.

Storybook:
- Default, Disabled, Pending, Active.

### 10.3. Transaction lifecycle saga

Задачи:
- Create transaction.
- Set pending.
- Set `activeTransactionId`.
- Wait `demoTransactionDelayMs`.
- Complete success/failure.
- Release lock.

Acceptance Criteria:
- While transaction pending, new BUY/SELL are blocked.
- Skipped actions are recorded with `Transaction lock active`.
- Success updates position/history/events.
- Failure creates error marker and does not change position.

Unit Tests:
- Transaction lock pure logic.
- Transaction result mapper.

Saga Tests:
- Manual BUY creates pending.
- Automatic BUY creates pending.
- SELL blocked during BUY pending.
- SKIPPED action created.
- Delay respected.
- Success flow.
- Failure flow.
- Lock released.

E2E:
- Demo Transaction Flow полностью.
- Transaction Lock Flow полностью.

### 10.4. Action history

Задачи:
- `ActionHistoryPanel`.
- Filters: BUY, SELL, SUCCESS, FAILED, MANUAL, AUTOMATIC.

Acceptance Criteria:
- All actions are stored.
- Filters work.
- History includes skipped actions.

Unit Tests:
- History reducer.
- Filters selectors.

Component Tests:
- Render history.
- Filter by status/type/source.

Storybook:
- Default, Empty, Pending, Failed, Filtered.

## Часть 11. Configuration Player Page

Цель: объединить chart, player, conditions, demo position, action history.

Независимость: интеграционная часть.

### 11.1. Player layout

Задачи:
- `ConfigurationPlayerPage`.
- `PlayerLayout`.
- `PlayerHeader`.
- `ModeSwitcher`.
- `DemoModeToggle`.
- `SourcesPanel`.
- `DemoPositionPanel`.
- `ActionHistoryPanel`.
- `ChartEngineSelector`.

Acceptance Criteria:
- Layout соответствует desktop terminal.
- Header содержит title, status, replay/live, demo toggle, edit, export.
- Правая панель содержит conditions/history/position.

Component Tests:
- Header props.
- Mode switch.
- Demo toggle.
- Chart engine select.

Storybook:
- Default, Loading, Empty, Error, Replay, Live, Active.

### 11.2. Player integration

Задачи:
- Connect Redux selectors/actions.
- Load configuration.
- Feed chart props.
- Handle edit/export navigation.

Acceptance Criteria:
- Container не содержит бизнес-логики.
- Все async actions идут через Saga.
- Selected configuration drives player state.

Integration Tests:
- Open Player from Dashboard.
- Player renders configuration.
- Export JSON from Player.

E2E:
- Открытие Player.
- Replay playback.
- Live mode.
- Manual BUY/SELL.
- Pending line and markers.

## Часть 12. Settings, Chart Engine, and UX Polish

Цель: настройки приложения, доступность, производительность и production polish.

Независимость: поверх базовых UI частей.

### 12.1. Settings slice and UI

Задачи:
- Store chart engine.
- Store theme.
- Store UI preferences.
- `ChartEngineSelector`.

Acceptance Criteria:
- Chart engine сохраняется.
- Theme сохраняется.
- Settings не ломают replay/live state.

Unit Tests:
- Settings reducer.
- Persisted settings.

Component Tests:
- Select chart engine.
- Select theme.

### 12.2. Accessibility

Задачи:
- Keyboard navigation.
- Focus states.
- Aria labels.
- Semantic buttons/inputs.

Acceptance Criteria:
- Основные workflows доступны с keyboard.
- Interactive icons имеют labels/tooltips.
- Focus visible.

Component Tests:
- Keyboard interaction for menus.
- Form labels.
- Aria labels on icon buttons.

E2E:
- Keyboard-only create configuration happy path.

### 12.3. Performance

Задачи:
- React.memo for dumb repeated components.
- useMemo/useCallback for heavy props.
- Virtualization for quote sources and history.
- Avoid chart full re-render where possible.

Acceptance Criteria:
- Десятки тысяч точек не блокируют UI.
- Десятки источников отображаются без заметных лагов.
- Large lists virtualized.

Unit Tests:
- Virtual list item range helper if custom.

Performance Tests:
- Render 10k chart points fixture.
- Render 1k quote sources list.

## Часть 13. Storybook Coverage

Цель: все dumb-компоненты доступны независимо.

Независимость: накапливается по мере реализации компонентов.

### 13.1. Component stories

Задачи:
- Для каждого dumb-компонента добавить required states: Default, Loading, Empty, Error, Disabled, Selected, Active, Pending где применимо.
- Добавить dark/light theme controls.

Acceptance Criteria:
- Storybook открывается без runtime errors.
- Stories не используют Redux store напрямую.
- Props задаются через fixtures.

Storybook Tests:
- Existence of stories for each dumb component.
- Required states present.
- Storybook Test Runner passes.

### 13.2. Visual scenarios for charts and transactions

Задачи:
- Stories for pending BUY/SELL.
- Success/failure line.
- BUY/SELL markers.
- Weighted average.

Acceptance Criteria:
- Все chart states визуально проверяемы.

Storybook Tests:
- Chart stories load.
- Controls work.

## Часть 14. Test Infrastructure and Coverage Gates

Цель: автоматизировать проверку acceptance criteria.

Независимость: базовая настройка в 0, расширение по мере развития.

### 14.1. Unit and coverage thresholds

Задачи:
- Настроить coverage.
- Общие пороги: statements 80%, branches 75%, functions 80%, lines 80%.
- Critical thresholds: parser 95%, weighted average 95%, conditions engine 90%, demo trading 90%, transaction lock 95%.

Acceptance Criteria:
- `test:coverage` падает ниже порога.
- Critical modules имеют отдельные thresholds или отчет.

### 14.2. Integration tests

Задачи:
- Create Configuration Flow.
- Player Replay Flow.
- Live Mode Flow.
- Demo Transaction Flow.
- Transaction Lock Flow.

Acceptance Criteria:
- Каждый flow из `PROMPT.md` покрыт.
- MSW/mock socket используются вместо реального backend.

### 14.3. E2E tests

Задачи:
- Создание конфигурации.
- Редактирование.
- Export JSON.
- Open Player.
- Replay playback.
- Live mocked WebSocket.
- Manual BUY/SELL.
- Automatic BUY/SELL.
- Pending line.
- Success/failure markers.
- Action History.
- Conditions Builder.

Acceptance Criteria:
- E2E happy path проходит локально.
- Тесты стабильны и не зависят от реального `89.125.68.35`.

## Часть 15. Backend Integration Hardening

Цель: подготовить production-ready работу с реальным arbiDexMarketData.

Независимость: после mock-based функциональности.

### 15.1. API configuration

Задачи:
- Environment variables for API base URL and Socket.IO URL.
- Timeout/retry policy.
- Error classification.

Acceptance Criteria:
- URLs не захардкожены в UI.
- Ошибки показываются пользователю.
- Mocks легко переключаются.

Unit Tests:
- Config resolver.
- Error mapper.

### 15.2. Real data compatibility

Задачи:
- Проверить реальные quote key formats.
- Добавить parser fixtures.
- Добавить graceful handling unknown fields.

Acceptance Criteria:
- Реальные ключи парсятся.
- Неизвестные keys не ломают приложение.

Integration Tests:
- Recorded fixture from REST response.
- Recorded dataChange fixture.

## Release Milestones

### Milestone A. Foundation

Состав:
- Часть 0.
- Часть 1.
- Часть 2.
- Базовые тесты и Storybook.

Acceptance:
- Проект запускается.
- Types/utilities готовы.
- Dark/light theme работает.

### Milestone B. Configuration Authoring

Состав:
- Часть 3 REST.
- Часть 4.
- Часть 5.

Acceptance:
- Пользователь создает конфигурацию.
- Выбирает sources и trading market.
- Profit currency и weighted average работают.
- Export JSON работает.

### Milestone C. Player and Charts

Состав:
- Часть 6.
- Часть 7.
- Часть 8.
- Часть 11 layout.

Acceptance:
- Replay и Live mode обновляют chart.
- Multiple chart engines доступны.
- Weighted average line отображается.

### Milestone D. Trading Logic

Состав:
- Часть 9.
- Часть 10.
- Часть 11 integration.

Acceptance:
- Conditions Builder работает.
- Demo trading работает.
- Transaction lock и pending line работают.
- History записывает все действия.

### Milestone E. Production Readiness

Состав:
- Часть 12.
- Часть 13.
- Часть 14.
- Часть 15.

Acceptance:
- Coverage gates проходят.
- E2E happy paths проходят.
- Storybook покрывает dumb-компоненты.
- Приложение готово к production-hardening.
