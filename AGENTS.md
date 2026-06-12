# AI Development Rules for ArbiDex Bot Configurator

Этот файл адаптирует правила component governance под React, TypeScript, Redux Toolkit, Redux Saga и Storybook.

## Component Governance System

Каждый React-компонент, feature-модуль, slice, saga и domain utility рассматривается как отдельный mini-project со своими требованиями, контрактами и историей изменений.

Перед любыми изменениями AI обязан найти и прочитать governance-файлы рядом с затрагиваемым модулем, если они существуют:

- `REQUIREMENTS.md`
- `FEATURES.md`
- `RULES.md`
- `CHANGELOG.md`

AI обязан:

1. Найти эти файлы.
2. Прочитать их полностью.
3. Следовать всем правилам внутри.
4. Учитывать существующие features.
5. Учитывать backward compatibility.
6. Обновить governance-файлы после изменения feature.

## Mandatory Workflow

Перед изменением компонента или модуля AI обязан:

1. Найти компонент, container, slice, saga, service или utility.
2. Найти рядом governance files.
3. Прочитать `REQUIREMENTS.md`, `FEATURES.md`, `RULES.md`, `CHANGELOG.md`, если они есть.
4. Прочитать существующие tests.
5. Прочитать Storybook stories, если компонент dumb/presentational.
6. Определить public API.
7. Определить locked features.
8. Проверить конфликт с новым требованием.
9. Только после этого изменять код.
10. После изменений обновить `WORKLOG.md`.

## Work Log Rule

Любая разработка должна сопровождаться записью в `WORKLOG.md`.

Запись должна включать:

- дату и время;
- ID или название задачи;
- краткое описание сделанного;
- список измененных файлов;
- какие тесты были добавлены или обновлены;
- какие проверки были запущены;
- известные риски или ограничения.

Если задача не завершена, нужно явно указать статус и оставшиеся шаги.

## Requirement Conflict Detection

Перед реализацией любой новой feature или изменения AI обязан проверить:

- `PROMPT.md`
- `DEVELOPMENT_PLAN.md`
- `REQUIREMENTS.md`
- `FEATURES.md`
- `RULES.md`
- существующие tests
- Storybook stories
- public API компонента или модуля

на наличие конфликтов с новым требованием пользователя.

## If Conflict Detected

AI не должен автоматически:

- переписывать tests;
- удалять features;
- делать destructive refactor;
- менять existing behavior;
- ломать backward compatibility;
- менять public API.

Вместо этого AI обязан:

1. Остановить реализацию.
2. Явно подсветить конфликт.
3. Перечислить конфликтующие требования.
4. Перечислить конфликтующие tests.
5. Перечислить затронутые features.
6. Объяснить, какие части public API изменятся.
7. Предложить варианты решения.
8. Запросить подтверждение пользователя.

## Conflict Report Format

При обнаружении конфликта AI должен выводить:

```md
## Requirement Conflict Detected

### New Requirement
- описание нового требования

### Conflicting Requirements
- PROMPT.md: ...
- DEVELOPMENT_PLAN.md: ...
- REQUIREMENTS.md: ...
- FEATURES.md: ...
- existing behavior: ...
- Storybook behavior: ...

### Conflicting Tests
- component.test.tsx -> "should ..."
- slice.test.ts -> "should ..."

### Potential Breaking Changes
- component props
- exported types
- Redux state shape
- selectors/actions
- saga behavior
- DOM API
- CSS API
- data-testid
- visual behavior
- event contract

### Suggested Solutions
1. ...
2. ...
3. ...

Waiting for user confirmation before implementation.
```

## Critical Conflict Rule

Если существует хотя бы один conflict:

- implementation запрещен;
- tests менять запрещено;
- existing features менять запрещено;
- public API менять запрещено;

пока пользователь явно не подтвердит desired behavior.

## Backward Compatibility Priority

Приоритеты:

1. Existing tests.
2. Locked features.
3. `PROMPT.md`.
4. `DEVELOPMENT_PLAN.md`.
5. `REQUIREMENTS.md`.
6. Existing public API.
7. New requirement.

Новые требования не должны автоматически ломать существующий контракт.

## Tests Are Contract

Существующие тесты являются контрактом.

Запрещено:

- удалять тесты;
- переписывать тесты под новую реализацию;
- ослаблять assertions;
- удалять existing features;
- ломать backward compatibility;
- менять public API без разрешения пользователя.

Если тест падает:

1. Сначала исправляй implementation.
2. Не переписывай тест автоматически.

Изменять тесты можно только если пользователь явно написал:

- "можно изменить тест";
- "update tests";
- "rewrite tests";
- "обнови тесты под новое поведение".

## Test Conflict Rule

Если новая реализация требует изменения существующего теста, AI обязан:

1. Объяснить почему тест конфликтует.
2. Объяснить какое поведение изменится.
3. Спросить разрешение.

Запрещено silently rewriting, weakening assertions или deleting test coverage без явного разрешения пользователя.

## Locked Features

Features со статусом `locked` считаются защищенными.

AI не имеет права без явного разрешения:

- удалять их;
- изменять их поведение;
- менять component props;
- менять Redux state shape;
- менять selectors/actions;
- менять saga contract;
- менять DOM API;
- менять CSS API;
- менять event contract.

## Additive Development Only

Компоненты и модули должны развиваться через:

- additive changes;
- extension;
- backward compatibility;
- typed configuration;
- explicit migration.

Избегать:

- rewrite;
- destructive refactor;
- breaking changes;
- mutation-heavy patterns;
- hidden side effects.

## React Architecture Rules

Предпочитать:

- function components;
- TypeScript strict types;
- typed component props;
- presentational/container separation;
- pure utilities for business logic;
- memoization for heavy repeated UI;
- accessible semantic HTML;
- controlled form components;
- Storybook-first dumb components.

Избегать:

- business logic inside JSX;
- direct DOM manipulation;
- API calls in components;
- WebSocket calls in components;
- implicit global state;
- untyped props;
- `any`;
- side effects inside render.

## Dumb Components

Dumb components:

- receive all data through props;
- expose callbacks through props;
- may use local UI state only;
- do not use Redux;
- do not dispatch actions;
- do not perform HTTP requests;
- do not work with WebSocket;
- do not contain business logic;
- do not import services;
- must have Storybook stories.

AI must not add API calls, data access, global state logic or saga knowledge to dumb components.

## Container Components

Container components:

- read data from Redux through typed selectors;
- dispatch Redux actions;
- pass data and callbacks to dumb components;
- may use React Router hooks for navigation;
- must not perform API requests directly;
- must not work with WebSocket directly;
- must not contain async business flows.

All async operations must go through Redux Saga.

## Redux Toolkit Rules

Slices must:

- have typed state;
- expose typed actions;
- keep reducers synchronous;
- avoid hidden side effects;
- keep derived data in selectors where possible.

Reducers must not:

- call APIs;
- access localStorage directly;
- open sockets;
- start timers;
- generate non-deterministic data unless payload provides it.

## Redux Saga Rules

Sagas are responsible for:

- REST API calls;
- Socket.IO subscriptions;
- replay timers;
- live data flow;
- demo transaction lifecycle;
- condition evaluation orchestration;
- weighted average recalculation orchestration;
- action history updates;
- chart event creation.

Saga tests are required for async behavior and transaction flows.

## Services Rules

Services are allowed to interact with external systems:

- REST API client;
- Socket.IO client;
- localStorage adapter;
- export/download adapter.

Services must be typed and tested through mappers or integration mocks. UI components must not import services directly.

## Storybook Rules

If a component is dumb/presentational:

- it must have Storybook stories;
- stories must use props and fixtures, not Redux store;
- new features must add stories;
- existing stories must not break;
- visual states must be preserved.

Required states where applicable:

- Default;
- Loading;
- Empty;
- Error;
- Disabled;
- Selected;
- Active;
- Pending;
- Replay;
- Live;
- Triggered.

Storybook must support dark and light theme.

## Public API Protection

Public API includes:

- component props;
- exported TypeScript types;
- Redux actions;
- Redux selectors;
- Redux state shape;
- saga action contracts;
- service interfaces;
- DOM structure;
- CSS classes;
- CSS variables;
- `data-testid`;
- Storybook contracts;
- JSON export format.

Changing public API is a breaking change and requires explicit confirmation unless the task explicitly asks for it.

## Theme Rules

The app must support dark and light theme.

Rules:

- Use theme tokens/CSS variables.
- Do not hardcode semantic colors in components.
- Chart colors must come from theme-aware palette.
- Theme choice must persist between sessions.
- Storybook must expose theme switching.
- Components must be visually checked in both themes.

## Regression Prevention

Before finishing changes, AI must check:

- old tests remain green;
- old features still work;
- DOM structure remains compatible;
- CSS selectors remain compatible;
- Storybook stories work;
- component props are backward compatible;
- Redux actions/selectors are backward compatible;
- async behavior is not regressed;
- accessibility states still work.

## Regression Risks

AI обязан анализировать:

- conditional rendering;
- loading states;
- empty states;
- error states;
- disabled states;
- selected/active/pending states;
- CSS regressions;
- dark/light theme regressions;
- chart rendering regressions;
- Storybook regressions;
- event propagation;
- async behavior;
- transaction lock behavior;
- accessibility regressions.

Если существует риск регрессии, AI обязан сообщить об этом пользователю до implementation.

## Feature Development Rules

Каждая новая feature должна:

- иметь tests;
- иметь Storybook story, если затронут dumb-компонент;
- обновлять `FEATURES.md`, если файл существует;
- обновлять `CHANGELOG.md`, если файл существует;
- обновлять `WORKLOG.md`;
- сохранять backward compatibility.

## Governance File Updates

После добавления новой feature AI обязан:

1. Обновить `FEATURES.md`, если файл существует.
2. Обновить `CHANGELOG.md`, если файл существует.
3. Добавить regression risks, если появились.
4. Обновить public API documentation, если API изменился.
5. Отметить новые locked features, если feature стабилизирована.
6. Добавить запись в `WORKLOG.md`.

## Critical Rule

Если AI не уверен:

- можно ли менять feature;
- можно ли менять тест;
- можно ли менять API;
- является ли изменение breaking change;
- затрагивает ли изменение locked feature;

AI обязан спросить пользователя.

Никогда не делать risky assumptions автоматически.
