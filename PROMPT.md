PROMPT.md

ArbiDex Bot Configurator

Создай полноценное desktop-only React приложение для проекта ArbiDex Bot Configurator.

Приложение предназначено для создания конфигураций торговых ботов, анализа стратегий, просмотра котировок и тестирования логики ботов в режиме воспроизведения и реального времени.

Проект является частью экосистемы ArbiDex.

⸻

Экосистема ArbiDex

arbiDex

Проект хранит конфигурации:

* сетей;
* DEX и CEX бирж;
* источников котировок;
* параметров ботов.

⸻

arbiDexServerBots

Запускает ботов по конфигурациям.

Функции:

* получение котировок;
* выполнение торговых операций;
* отправка данных в arbiDexMarketData.

⸻

arbiDexMarketData

Централизованное хранилище рыночных данных.

Функции:

* хранение котировок;
* хранение истории цен;
* WebSocket подписки;
* уведомление подписчиков об изменении данных.

⸻

Основная цель приложения

Предоставить пользователю возможность:

* создавать конфигурации ботов;
* настраивать правила торговли;
* просматривать исторические данные;
* запускать demo торговлю;
* тестировать стратегии;
* анализировать события на графике;
* формировать JSON-конфигурацию бота.

⸻

Технологический стек

Использовать:

* React
* TypeScript
* Redux Toolkit
* Redux Saga
* React Router
* Storybook
* Socket.IO Client

⸻

Архитектурные требования

Использовать строгий компонентный подход.

⸻

Типы компонентов

Dumb Components

Presentational компоненты:

* получают данные только через props;
* не используют Redux;
* не содержат бизнес-логику;
* не делают API запросы;
* не работают с WebSocket;
* не используют глобальный state;
* могут использовать только локальный UI state.

Примеры:

* Button
* Table
* Chart
* Player
* Form Controls

⸻

Container Components

Container компоненты:

* читают данные из Redux Store;
* dispatch Redux actions;
* передают данные в dumb-компоненты через props.

Container-компоненты НЕ должны:

* выполнять API запросы;
* работать напрямую с WebSocket;
* содержать бизнес-логику асинхронных операций.

⸻

Redux архитектура

Все асинхронные операции выполняются через Redux Saga.

⸻

Redux Saga отвечает за:

* загрузку списка котировок;
* загрузку конфигураций;
* сохранение конфигураций;
* подписку на WebSocket;
* обработку dataChange;
* запуск demo транзакций;
* обработку завершения транзакций;
* работу плеера;
* расчет средневзвешенной цены;
* вычисление условий бота;
* генерацию BUY/SELL событий;
* сохранение истории действий.

⸻

State Management

Использовать Redux Toolkit slices.

Пример:

configurationsSlice
marketDataSlice
playerSlice
conditionsSlice
demoTradingSlice
settingsSlice
uiSlice

⸻

Storybook

Для каждого dumb-компонента создать Storybook stories.

Компоненты должны запускаться независимо от приложения.

Обязательные stories:

* Default
* Loading
* Empty
* Error

Дополнительные stories создавать по необходимости.

⸻

Desktop Only

Приложение создается только для desktop.

Не создавать мобильную версию.

Основные разрешения:

* 1440px
* 1920px
* ultrawide мониторы

⸻

UI Style

Создать современный интерфейс профессионального trading terminal.

Вдохновение:

* Binance
* TradingView
* профессиональные крипто-терминалы

⸻

Визуальный стиль

Использовать:

* темную тему;
* светлую тему;
* переключение темы Dark / Light через настройки приложения;
* сохранение выбранной темы между сессиями;
* theme tokens / CSS variables для цветов, borders, shadows, chart palette и semantic states;
* cards;
* muted colors;
* cyan / blue accent color;
* hover states;
* selected states;
* loading states;
* error states.

Интерфейс должен выглядеть как production-ready приложение.

⸻

Интеграция с arbiDexMarketData

⸻

REST API

Получение списка доступных ключей:

GET http://89.125.68.35:3002/store/keys?detail=true&memory=true

⸻

WebSocket

Использовать Socket.IO.

Server:

http://89.125.68.35:3002/store

⸻

Подписка

socket.emit('subscribe', {
keys: [
'bybit|ETH/USDC|askPrice'
]
});

⸻

Получение обновлений

socket.on('dataChange', payload => {
console.log(payload);
});

⸻

Формат события

interface DataChangeEvent {
key: string;
point: {
t?: number;
v: number | string;
};
}

⸻

Формат ключей

Ключ состоит из трех частей:

<source>|<pair>|<field>

Примеры:

bybit|ETH/USDC|askPrice
bybit|ETH/USDC|bidPrice
dex:arbitrum|0xaf88d065e77c8cc2239327c5edb3a432268e5831/0x82af49447d8a07e3bd95bd0d56f35241523fbab1|bidPrice

⸻

Source Types

Поддерживать два типа источников:

type SourceType =
| 'CEX'
| 'DEX';

Определение:

source.startsWith('dex:')
? 'DEX'
: 'CEX';

⸻

Поддерживаемые поля

type QuoteField =
| 'bidPrice'
| 'askPrice'
| 'bidPool'
| 'askPool';

⸻

Token Metadata Resolution

Для DEX пар отображать символы токенов вместо адресов.

Пример:

0xaf88.../0x82af...

отображается как:

USDC/WETH

При этом исходный ключ не изменяется.

⸻

ParsedQuoteKey

Создать универсальный parser:

interface ParsedQuoteKey {
raw: string;
source: string;
sourceType: 'DEX' | 'CEX';
network?: string;
pair: string;
baseAsset: string;
quoteAsset: string;
field:
| 'bidPrice'
| 'askPrice'
| 'bidPool'
| 'askPool';
}

⸻

UI отображение источников

Пользователь должен видеть:

[CEX][Bybit] ETH/USDC askPrice
[DEX][Arbitrum] USDC/WETH bidPrice

Пользователь не должен видеть длинные адреса токенов, если доступна metadata токенов.

⸻

Структура приложения

Приложение состоит из трех основных страниц.

⸻

1. Dashboard Configurations

Назначение:

* отображение списка конфигураций;
* создание конфигурации;
* открытие конфигурации;
* редактирование конфигурации.

⸻

2. Configuration Form

Назначение:

* создание конфигурации;
* изменение конфигурации;
* настройка источников;
* настройка условий.

⸻

3. Configuration Player

Назначение:

* анализ стратегии;
* просмотр графиков;
* запуск demo режима;
* просмотр истории действий;
* анализ событий на графике.

⸻

Навигация

Dashboard
├── Create Configuration
│       └── Configuration Form
│
└── Open Configuration
├── Edit
│      └── Configuration Form
│
└── Open Player
└── Configuration Player

⸻

Основные сущности домена

Configuration
QuoteSource
Market
Condition
DemoPosition
Transaction
ActionHistory
ChartMarker
PlayerState
WeightedAverage

⸻

Общие требования

Все бизнес-сущности должны быть типизированы через TypeScript interfaces.

Не использовать any.

Использовать strict mode TypeScript.

Весь код должен быть готов для production использования.


PROMPT.md

Часть 2/5 — Configuration Form, Dashboard, Sources, Weighted Average

Dashboard Configurations

Страница отображает список конфигураций торговых ботов.

⸻

Элементы страницы

Верхняя панель:

* заголовок Bot Configurations;
* поиск по конфигурациям;
* фильтр;
* сортировка;
* кнопка Create Configuration.

⸻

Таблица конфигураций

Для каждой конфигурации отображать:

* название;
* количество источников котировок;
* торговый рынок;
* валюта прибыли;
* количество условий;
* дата создания;
* дата изменения;
* статус;
* режим Demo;
* последняя активность.

⸻

Действия

Для каждой конфигурации доступны действия:

* Open Player;
* Edit;
* Duplicate;
* Export JSON;
* Delete.

⸻

Export JSON

Пользователь может экспортировать итоговую конфигурацию бота в JSON.

Полученный JSON используется внешними ботами arbiDexServerBots.

⸻

Configuration Form

Страница создания и редактирования конфигурации.

⸻

Общая структура формы

Разделы:

1. General
2. Sources
3. Trading Market
4. Weighted Average
5. Conditions
6. Demo Settings
7. Advanced Settings

⸻

1. General

Поля:

Configuration Name

name: string;

Пример:

ETH Arbitrage Bot

⸻

Description

description?: string;

⸻

Tags

tags: string[];

⸻

Enabled

enabled: boolean;

⸻

2. Sources

Пользователь выбирает источники котировок.

Источники загружаются через:

GET /store/keys?detail=true&memory=true

⸻

Формат источника

Примеры:

bybit|ETH/USDC|askPrice
binance|ETH/USDT|bidPrice
dex:arbitrum|0xaf88.../0x82af...|bidPrice

⸻

Источник отображается как карточка

Карточка содержит:

* иконку биржи;
* тип CEX/DEX;
* сеть;
* торговую пару;
* тип цены;
* размер памяти;
* количество точек;
* кнопку добавления.

⸻

Поиск и фильтрация

Поддерживать фильтры:

* network;
* source;
* CEX/DEX;
* pair;
* field;
* text search.

⸻

Выбор источников

Пользователь может выбрать несколько источников.

selectedSources: string[];

⸻

Trading Market

Выбирается один источник из списка выбранных.

tradingMarket: string;

Пример:

bybit|ETH/USDC|askPrice

⸻

Profit Currency

Пользователь не выбирает валюту вручную.

Она вычисляется автоматически из пары рынка.

Примеры:

ETH/USDC -> USDC
BTC/USDT -> USDT
USDC/WETH -> WETH

⸻

profitCurrency: string;

⸻

Market Settings

Для выбранного рынка отображать:

* источник;
* сеть;
* торговую пару;
* bidPrice;
* askPrice;
* spread;
* последнюю цену.

⸻

Buy / Sell Settings

Не использовать Trading Side.

Используется один рынок торговли.

⸻

BUY Settings

Пользователь может раскрыть настройки BUY.

Поля:

buyAmount: number;
buyCurrency: string;
comment?: string;

⸻

Поддерживать:

* фиксированную сумму;
* процент от баланса.

⸻

buyAmountType:
| 'FIXED'
| 'PERCENT';

⸻

SELL Settings

Пользователь может раскрыть настройки SELL.

Поля:

sellAmount: number;
sellCurrency: string;

⸻

Поддерживать:

sellMode:
| 'FULL_POSITION'
| 'PARTIAL';

⸻

Если выбран PARTIAL:

sellPercent: number;

⸻

Weighted Average

Добавить блок формирования средневзвешенной цены.

⸻

Назначение

Позволяет объединять несколько источников котировок в одну расчетную цену.

⸻

UI

Элементы:

* Enable Weighted Average;
* список источников;
* вес каждого источника;
* итоговая цена.

⸻

Пример:

weightedAverage.enabled = true;

⸻

Источники:

weightedAverage.sources = [
{
key: 'binance|ETH/USDT|bidPrice',
weight: 0.5,
},
{
key: 'bybit|ETH/USDT|bidPrice',
weight: 0.3,
},
{
key: 'mexc|ETH/USDT|bidPrice',
weight: 0.2,
},
];

⸻

Правила весов

Сумма весов должна быть равна:

1.0

или

100%

При изменении веса остальных источников приложение может:

* автоматически нормализовать веса;
* либо показывать validation error.

⸻

Итоговая формула

WeightedPrice =
Σ(price × weight)

⸻

Отображение на графике

Средневзвешенная цена отображается отдельной линией.

Линия должна иметь отдельный цвет и легенду.

⸻

История Weighted Price

Вся история средневзвешенной цены должна рассчитываться для:

* Replay Mode;
* Live Mode.

⸻

Advanced Settings

⸻

Demo Mode

demoMode.enabled: boolean;

⸻

Demo Transaction Delay

Имитация выполнения транзакции.

demoTransactionDelayMs: number;

Пример:

5000 ms

⸻

Default Slippage

defaultSlippagePercent: number;

⸻

Fees

tradingFeePercent: number;

⸻

Gas Fee

gasFee: number;

⸻

Auto Save

autoSaveEnabled: boolean;

⸻

Auto Save Interval

autoSaveIntervalMs: number;

⸻

Validation

Форма должна валидировать:

* название конфигурации;
* наличие торгового рынка;
* наличие хотя бы одного источника;
* корректность весов;
* корректность условий.

⸻

Save Configuration

По сохранению формируется JSON конфигурации.

Конфигурация сохраняется в backend.

⸻

Основные dumb-компоненты страницы

Создать Storybook для:

ConfigurationForm
ConfigurationHeader
ConfigurationFooter
QuoteSourceCard
QuoteSourceSelector
TradingMarketSelector
ProfitCurrencyField
BuySettingsPanel
SellSettingsPanel
WeightedAveragePanel
WeightedAverageSourceRow
DemoSettingsPanel
AdvancedSettingsPanel
ValidationSummary

⸻

Stories

Для каждого компонента создать:

* Default;
* Loading;
* Empty;
* Error;
* Disabled;
* Selected.

Все компоненты должны работать только через props.

PROMPT.md

Часть 3/5 — Configuration Player, Replay/Live Mode, Graph Architecture, Storybook

Configuration Player

Страница предназначена для анализа выбранной конфигурации.

На этой странице пользователь должен видеть:

* график котировок;
* плеер воспроизведения;
* выбранные источники котировок;
* weighted average line;
* события BUY / SELL;
* demo position;
* history действий;
* блок конструктора условий справа от графика.

⸻

Layout страницы

Верхняя панель

Содержит:

* название конфигурации;
* статус конфигурации;
* режим Replay / Live;
* переключатель Demo Mode;
* кнопку Edit Configuration;
* кнопку Export JSON.

⸻

Центральная область

Состоит из двух частей:

Левая часть

* большой график котировок;
* под графиком — плеер.

Правая часть

* Conditions Builder;
* список сработавших условий;
* текущая demo position;
* action history.

⸻

Плеер

Плеер должен быть похож на YouTube timeline.

Содержит:

* Play;
* Pause;
* Step Backward;
* Step Forward;
* Timeline Slider;
* Current Step;
* Total Steps;
* Playback Speed;
* Current Timestamp.

⸻

Player State

interface PlayerState {
mode: 'replay' | 'live';
isPlaying: boolean;
currentStep: number;
totalSteps: number;
playbackSpeed: number;
currentTimestamp?: number;
}

⸻

Replay Mode

Replay Mode используется, когда данные приходят заранее массивом на много шагов.

Поведение

* плеер устанавливается на первый шаг;
* график показывает состояние первого шага;
* пользователь может нажать Play;
* плеер начинает идти по шагам;
* график перестраивается на каждом шаге;
* пользователь может поставить паузу;
* пользователь может двигать timeline slider;
* пользователь может использовать Step Forward;
* пользователь может использовать Step Backward.

⸻

Replay Data

interface ReplayStep {
step: number;
timestamp: number;
prices: Record<string, number>;
weightedAveragePrice?: number;
events?: ChartEvent[];
}

⸻

Live Mode

Live Mode используется, когда данные приходят через WebSocket.

Поведение

* saga подписывается на выбранные ключи;
* каждое событие dataChange добавляется в Redux state;
* создается новый step;
* пересчитывается weighted average;
* проверяются conditions;
* график обновляется;
* timeline slider автоматически переходит на последний шаг;
* если пользователь вручную переместил timeline назад, можно показывать индикатор Live paused.

⸻

Live DataChange

interface DataChangeEvent {
key: string;
point: {
t?: number;
v: number | string;
};
}

⸻

Graph Architecture

График должен быть реализован через один общий компонент.

<QuotesChart
engine="tradingview-lightweight"
data={chartData}
sources={selectedSources}
currentStep={currentStep}
mode="replay"
events={chartEvents}
pendingTransactions={pendingTransactionLines}
/>

⸻

Chart Engine

type ChartEngine =
| 'd3'
| 'ag-charts'
| 'highcharts'
| 'tradingview-lightweight'
| 'echarts';

⸻

QuotesChart Props

interface QuotesChartProps {
engine: ChartEngine;
data: QuoteChartPoint[];
sources: QuoteSource[];
currentStep: number;
mode: 'replay' | 'live';
events?: ChartEvent[];
pendingTransactions?: PendingTransactionLine[];
height?: number;
loading?: boolean;
error?: string | null;
}

⸻

QuoteChartPoint

interface QuoteChartPoint {
step: number;
timestamp: number;
values: Record<string, number>;
weightedAveragePrice?: number;
}

⸻

Отдельные компоненты графиков

Для каждой библиотеки создать отдельный dumb-компонент:

D3QuotesChart
AgChartsQuotesChart
HighchartsQuotesChart
TradingViewLightweightQuotesChart
EChartsQuotesChart

⸻

Требования к chart-компонентам

Каждый chart-компонент:

* принимает данные только через props;
* не читает Redux state;
* не делает API запросы;
* не работает с WebSocket;
* не содержит бизнес-логику;
* отвечает только за визуализацию.

⸻

Общий компонент QuotesChart

QuotesChart выбирает конкретную реализацию по параметру engine.

switch (engine) {
case 'd3':
return <D3QuotesChart {...chartProps} />;
case 'ag-charts':
return <AgChartsQuotesChart {...chartProps} />;
case 'highcharts':
return <HighchartsQuotesChart {...chartProps} />;
case 'tradingview-lightweight':
return <TradingViewLightweightQuotesChart {...chartProps} />;
case 'echarts':
return <EChartsQuotesChart {...chartProps} />;
default:
return <TradingViewLightweightQuotesChart {...chartProps} />;
}

⸻

Состояния графика

График должен поддерживать:

* Loading;
* Empty;
* Error;
* Replay Mode;
* Live Mode;
* Multiple Sources;
* Weighted Average;
* Events;
* Pending Transactions.

⸻

Chart Events

На графике должны отображаться маркеры событий.

interface ChartEvent {
id: string;
step: number;
timestamp: number;
type:
| 'BUY'
| 'SELL'
| 'CONDITION_TRIGGERED'
| 'CONDITION_SKIPPED'
| 'TRANSACTION_PENDING'
| 'TRANSACTION_SUCCESS'
| 'TRANSACTION_FAILED'
| 'SLIPPAGE'
| 'ERROR';
status:
| 'PENDING'
| 'SUCCESS'
| 'FAILED'
| 'SKIPPED'
| 'INFO';
price?: number;
message?: string;
conditionId?: string;
transactionId?: string;
}

⸻

Pending Transaction Line

Когда транзакция выполняется, на графике должна отображаться толстая горизонтальная линия.

interface PendingTransactionLine {
transactionId: string;
actionType: 'BUY' | 'SELL';
status: 'PENDING' | 'SUCCESS' | 'FAILED';
startStep: number;
startTimestamp: number;
startPrice: number;
endStep?: number;
endTimestamp?: number;
endPrice?: number;
message?: string;
}

⸻

Pending линия на графике

Линия должна:

* начинаться в step, где началась транзакция;
* идти по горизонтали на уровне цены начала транзакции;
* продолжаться до момента SUCCESS или FAILED;
* быть визуально толще обычных линий графика;
* иметь подпись BUY pending или SELL pending;
* заканчиваться marker-ом результата.

⸻

Chart Engine Selector

В настройках приложения добавить выбор chart engine.

<ChartEngineSelector
value={engine}
onChange={setEngine}
/>

⸻

Поддерживаемые engines

* D3.js
* AG Charts
* Highcharts
* TradingView Lightweight Charts
* Apache ECharts

⸻

Storybook для графиков

Создать stories для каждого графика:

D3QuotesChart.stories.tsx
AgChartsQuotesChart.stories.tsx
HighchartsQuotesChart.stories.tsx
TradingViewLightweightQuotesChart.stories.tsx
EChartsQuotesChart.stories.tsx

⸻

Stories для каждого графика

Обязательные stories:

* Default;
* Loading;
* Empty;
* Error;
* Multiple Sources;
* Replay Mode;
* Live Mode;
* Weighted Average;
* With BUY marker;
* With SELL marker;
* Pending BUY transaction;
* Pending SELL transaction;
* Successful transaction line;
* Failed transaction line.

⸻

Storybook для общего QuotesChart

Создать файл:

QuotesChart.stories.tsx

⸻

Stories общего компонента

* TradingViewEngine;
* EChartsEngine;
* HighchartsEngine;
* AgChartsEngine;
* D3Engine;
* Loading;
* Empty;
* Error;
* WithEvents;
* WithPendingTransaction.

⸻

Storybook Controls

Для QuotesChart добавить controls:

engine: {
control: 'select',
options: [
'd3',
'ag-charts',
'highcharts',
'tradingview-lightweight',
'echarts'
]
}

⸻

Основные dumb-компоненты Player страницы

Создать компоненты:

ConfigurationPlayerPage
PlayerLayout
PlayerHeader
PlayerControls
TimelineSlider
PlaybackSpeedSelector
StepInfo
ModeSwitcher
DemoModeToggle
SourcesPanel
DemoPositionPanel
ActionHistoryPanel
ChartEngineSelector
QuotesChart

⸻

Storybook для Player компонентов

Для каждого dumb-компонента создать stories:

* Default;
* Loading;
* Empty;
* Error;
* Disabled;
* Active;
* Replay;
* Live.

⸻

Redux / Saga для Player

Container-компоненты не должны напрямую управлять WebSocket.

Все действия должны идти через Redux actions.

Примеры actions:

loadConfigurationRequested
loadConfigurationSucceeded
loadConfigurationFailed
startReplayRequested
pauseReplayRequested
stepForwardRequested
stepBackwardRequested
setCurrentStepRequested
startLiveRequested
stopLiveRequested
subscribeToMarketDataRequested
marketDataChanged
setChartEngineRequested

⸻

Saga responsibilities

Saga должна:

* управлять replay timer;
* управлять live WebSocket подпиской;
* создавать новые steps;
* пересчитывать weighted average;
* проверять conditions;
* создавать chart events;
* запускать demo transactions;
* обновлять action history.

PROMPT.md

Часть 4/5 — Conditions Builder, Demo Trading, JSON Configuration

Conditions Builder

Справа от графика должен располагаться блок Conditions Builder.

Назначение:

* создавать торговые условия;
* управлять последовательностью условий;
* отображать активные условия;
* показывать сработавшие условия;
* формировать JSON конфигурации бота.

⸻

Layout Conditions Builder

Блок состоит из:

1. Список условий
2. Создание нового условия
3. Группы условий
4. История срабатывания условий
5. Текущее состояние бота

⸻

Состояние бота

Бот работает как state machine.

type BotState =
| 'IDLE'
| 'BUY_PENDING'
| 'BOUGHT'
| 'SELL_PENDING'
| 'SOLD'
| 'ERROR';

⸻

Правила переходов

IDLE
↓ BUY
BUY_PENDING
↓ SUCCESS
BOUGHT
↓ SELL
SELL_PENDING
↓ SUCCESS
SOLD
↓ BUY
IDLE

При ошибке:

ANY_STATE
↓ ERROR
ERROR

⸻

Ограничения

Когда бот находится в состоянии:

IDLE

разрешено только:

BUY

Когда бот находится в состоянии:

BOUGHT

разрешено только:

SELL

⸻

Condition

interface Condition {
id: string;
name: string;
enabled: boolean;
action: 'BUY' | 'SELL';
priority: number;
groupId?: string;
when: ConditionExpression;
}

⸻

ConditionExpression

interface ConditionExpression {
metric: string;
operator: Operator;
value: number;
base?: string;
}

⸻

Operators

type Operator =
| 'GREATER_THAN'
| 'LESS_THAN'
| 'GREATER_OR_EQUAL'
| 'LESS_OR_EQUAL'
| 'EQUAL'
| 'PERCENT_ABOVE'
| 'PERCENT_BELOW'
| 'BETWEEN';

⸻

Поддерживаемые метрики

weightedAveragePrice
marketPrice
positionProfitPercent
profitAfterFeesPercent
slippagePercent
spreadPercent
positionAgeMs
quoteAgeMs
liquidityUsd
timeAfterLastTradeMs
gasFee

⸻

Примеры условий

BUY

Если средневзвешенная цена выше на 0.02%:

{
"id": "buy-1",
"action": "BUY",
"enabled": true,
"when": {
"metric": "weightedAveragePrice",
"operator": "PERCENT_ABOVE",
"base": "selectedMarketBuyPrice",
"value": 0.02
}
}

⸻

SELL

Если средневзвешенная цена ниже на 0.15%:

{
"id": "sell-1",
"action": "SELL",
"enabled": true,
"when": {
"metric": "weightedAveragePrice",
"operator": "PERCENT_BELOW",
"base": "selectedMarketSellPrice",
"value": 0.15
}
}

⸻

Take Profit

{
"action": "SELL",
"when": {
"metric": "positionProfitPercent",
"operator": "GREATER_OR_EQUAL",
"value": 0.5
}
}

⸻

Stop Loss

{
"action": "SELL",
"when": {
"metric": "positionProfitPercent",
"operator": "LESS_OR_EQUAL",
"value": -0.3
}
}

⸻

Дополнительные условия

Поддерживать:

* Max Slippage;
* Max Spread;
* Max Hold Time;
* Cooldown After Trade;
* Price Timeout;
* Min Liquidity;
* Profit After Fees;
* Max Gas Fee.

⸻

Группы условий

Условия могут объединяться в группы.

interface ConditionGroup {
id: string;
name: string;
operator: 'AND' | 'OR';
conditions: string[];
}

⸻

Пример:

BUY если:
Condition A AND Condition B

или

SELL если:
Condition A OR Condition B

⸻

Приоритет условий

Поддерживать приоритет.

Сначала проверяются условия с меньшим номером.

priority: number;

⸻

История условий

Отображать:

* время;
* шаг;
* условие;
* результат проверки.

Статусы:

TRIGGERED
SKIPPED
FAILED
PASSED

⸻

Demo Trading

Добавить полноценный demo режим.

⸻

Demo Mode

demoMode.enabled: boolean;

⸻

Manual и Automatic Actions

Действия бывают двух типов:

type ActionSource =
| 'manual'
| 'automatic';

⸻

Manual Actions

Пользователь может:

* Manual Buy;
* Manual Sell;
* Close Position.

⸻

Automatic Actions

Система выполняет:

* BUY;
* SELL;
* Stop Loss;
* Take Profit.

⸻

Demo Position

interface DemoPosition {
status:
| 'NO_POSITION'
| 'OPENED'
| 'CLOSED';
entryPrice: number;
currentPrice: number;
amount: number;
currency: string;
realizedPnL: number;
unrealizedPnL: number;
openedStep: number;
openedTimestamp: number;
}

⸻

Action History

Все действия должны сохраняться.

interface ActionHistoryItem {
id: string;
timestamp: number;
step: number;
actionType: 'BUY' | 'SELL';
actionSource:
| 'manual'
| 'automatic';
status:
| 'PENDING'
| 'SUCCESS'
| 'FAILED'
| 'SKIPPED';
market: string;
price: number;
amount: number;
currency: string;
slippagePercent?: number;
message?: string;
}

⸻

Demo Execution

Demo транзакции не отправляются в блокчейн.

Система должна:

* рассчитывать цену исполнения;
* учитывать slippage;
* учитывать комиссии;
* учитывать gas fee;
* обновлять demo position;
* создавать chart events;
* записывать action history.

⸻

Demo Transaction Delay

Транзакция должна имитировать реальное выполнение.

Настройка:

demoTransactionDelayMs: number;

Пример:

5000 ms

⸻

Transaction Lock

Во время выполнения транзакции новые транзакции запрещены.

interface TradingState {
activeTransactionId:
| string
| null;
}

⸻

Пока есть активная транзакция:

* BUY запрещен;
* SELL запрещен;
* Manual actions запрещены;
* Automatic actions запрещены.

Условия могут продолжать вычисляться.

Но запускать новую транзакцию нельзя.

⸻

SKIPPED Actions

Если сигнал появился во время активной транзакции:

создать событие:

status: 'SKIPPED';

с причиной:

Transaction lock active

⸻

JSON Configuration

В результате пользователь должен получить JSON конфигурацию.

Пример структуры:

interface BotConfiguration {
id: string;
name: string;
selectedSources: string[];
tradingMarket: string;
profitCurrency: string;
weightedAverage: WeightedAverageConfig;
conditions: Condition[];
demoSettings: DemoSettings;
advancedSettings: AdvancedSettings;
}

⸻

Export JSON

Пользователь может экспортировать конфигурацию.

Формат:

{
"name": "ETH Arbitrage",
"selectedSources": [],
"tradingMarket": "",
"profitCurrency": "USDT",
"conditions": []
}

⸻

UI Components

Создать компоненты:

ConditionsBuilder
ConditionCard
ConditionEditor
ConditionGroupEditor
ConditionHistory
BotStateIndicator
DemoPositionPanel
ActionHistoryPanel
ManualTradingPanel

⸻

Storybook

Для всех компонентов создать stories:

* Default;
* Loading;
* Empty;
* Error;
* Active;
* Disabled;
* Triggered;
* Pending.

PROMPT.md

Часть 5/5 — Pending Transactions, Graph Events, UI/UX, Project Structure, Acceptance Criteria

Pending Transactions

Demo режим должен максимально точно имитировать реальные blockchain транзакции.

⸻

Transaction Lifecycle

Каждая транзакция проходит следующие состояния:

type TransactionStatus =
| 'CREATED'
| 'PENDING'
| 'SUCCESS'
| 'FAILED'
| 'CANCELLED';

⸻

Transaction Flow

Signal Triggered
↓
Transaction Created
↓
Transaction Pending
↓
Success / Failed

⸻

Demo Transaction Delay

В настройках приложения должна быть возможность задать задержку исполнения транзакции.

Пример:

demoTransactionDelayMs: number;

Значение по умолчанию:

5000;

⸻

Поведение транзакции

При запуске BUY или SELL:

1. Создается транзакция.
2. Фиксируется цена начала транзакции.
3. Запоминается step.
4. Запоминается timestamp.
5. Транзакция переходит в состояние PENDING.
6. Устанавливается transaction lock.
7. Запускается таймер demo задержки.
8. После задержки транзакция завершается успешно или ошибкой.

⸻

Transaction Lock

Пока есть активная транзакция:

activeTransactionId !== null

Запрещено:

* запускать BUY;
* запускать SELL;
* выполнять manual actions;
* выполнять automatic actions.

При этом:

* данные продолжают поступать;
* график продолжает обновляться;
* условия продолжают вычисляться.

⸻

Pending Transaction Line

Во время выполнения транзакции на графике отображается толстая горизонтальная линия.

⸻

Визуализация Pending линии

Линия должна:

* начинаться в точке старта транзакции;
* находиться на уровне цены покупки или продажи;
* идти вправо по времени;
* отображаться толще обычных линий;
* иметь подпись:

BUY pending
SELL pending

⸻

Завершение линии

При завершении транзакции линия заканчивается:

SUCCESS marker

или

FAILED marker

⸻

PendingTransactionLine

interface PendingTransactionLine {
transactionId: string;
actionType:
| 'BUY'
| 'SELL';
status:
| 'PENDING'
| 'SUCCESS'
| 'FAILED';
startStep: number;
startTimestamp: number;
startPrice: number;
endStep?: number;
endTimestamp?: number;
endPrice?: number;
message?: string;
}

⸻

Transaction Result

При успешном выполнении:

* обновляется demo position;
* обновляется action history;
* создается marker;
* снимается transaction lock.

При ошибке:

* позиция не изменяется;
* создается error marker;
* снимается transaction lock.

⸻

Chart Events

Все события должны отображаться на графике.

⸻

Поддерживаемые события

type ChartEventType =
| 'BUY'
| 'SELL'
| 'BUY_PENDING'
| 'SELL_PENDING'
| 'TRANSACTION_SUCCESS'
| 'TRANSACTION_FAILED'
| 'CONDITION_TRIGGERED'
| 'CONDITION_SKIPPED'
| 'SLIPPAGE'
| 'ERROR'
| 'INFO';

⸻

Chart Event

interface ChartEvent {
id: string;
step: number;
timestamp: number;
type: ChartEventType;
status:
| 'PENDING'
| 'SUCCESS'
| 'FAILED'
| 'SKIPPED';
price?: number;
message?: string;
conditionId?: string;
transactionId?: string;
}

⸻

Обязательные события

На графике отображать:

* manual BUY;
* manual SELL;
* automatic BUY;
* automatic SELL;
* pending transaction;
* successful transaction;
* failed transaction;
* slippage;
* RPC error;
* insufficient liquidity;
* reverted transaction;
* skipped condition;
* triggered condition.

⸻

Marker UI

Каждый marker должен отображать:

* иконку;
* цвет;
* цену;
* время;
* описание события.

⸻

Tooltip

При наведении показывать:

Timestamp
Step
Price
PnL
Condition
Status
Message

⸻

Action History

Все события сохраняются в истории.

Поддерживать фильтрацию:

* BUY;
* SELL;
* SUCCESS;
* FAILED;
* MANUAL;
* AUTOMATIC.

⸻

UI/UX Requirements

Интерфейс должен быть похож на профессиональный trading terminal.

⸻

Основной layout

+------------------------------------------------------+
| Header                                               |
+------------------------------------------------------+
|                                                      |
|                 Quotes Chart                         |
|                                                      |
|                                                      |
+--------------------------------------+---------------+
| Player Controls                      | Conditions    |
| Timeline                             | Builder       |
| Action History                       | Demo Position |
|                                      | Active Rules  |
+--------------------------------------+---------------+

⸻

Цветовая схема

Темная тема:

Background: #0B1220
Card:       #111827
Border:     #1F2937
Primary:    #06B6D4
Success:    #10B981
Error:      #EF4444
Warning:    #F59E0B
Text:       #E5E7EB
Muted:      #9CA3AF

⸻

Анимации

Поддерживать:

* плавное обновление графика;
* анимацию появления markers;
* анимацию pending линии;
* анимацию смены step.

⸻

Performance

Приложение должно поддерживать:

* десятки тысяч точек;
* десятки источников котировок;
* real-time обновления.

⸻

Оптимизации

Использовать:

* React.memo;
* useMemo;
* useCallback;
* virtualization для больших списков.

⸻

Структура проекта

src/
app/
pages/
DashboardPage/
ConfigurationFormPage/
ConfigurationPlayerPage/
components/
dumb/
charts/
player/
forms/
conditions/
common/
containers/
store/
slices/
sagas/
selectors/
actions/
services/
socket/
parser/
tokenResolver/
types/
hooks/
utils/
stories/

⸻

Основные Redux Slices

configurationsSlice
marketDataSlice
playerSlice
conditionsSlice
demoTradingSlice
settingsSlice
uiSlice

⸻

Основные Redux Sagas

marketDataSaga
playerSaga
conditionsSaga
demoTradingSaga
configurationSaga

⸻

Storybook

Для каждого dumb-компонента создать Storybook stories.

Обязательные состояния:

* Default;
* Loading;
* Empty;
* Error;
* Disabled;
* Selected;
* Active;
* Pending.

⸻

Accessibility

Поддерживать:

* keyboard navigation;
* focus states;
* aria labels.

⸻

Acceptance Criteria

Проект считается готовым, если:

✅ Пользователь может создать конфигурацию.

✅ Пользователь может выбрать источники котировок.

✅ Пользователь может выбрать торговый рынок.

✅ Автоматически вычисляется profit currency.

✅ Работает weighted average.

✅ Работает Replay Mode.

✅ Работает Live Mode.

✅ Работает Demo Mode.

✅ Работает Conditions Builder.

✅ Формируется JSON конфигурации.

✅ Работает transaction lock.

✅ Pending транзакции отображаются на графике.

✅ BUY и SELL события отображаются на графике.

✅ Все действия сохраняются в истории.

✅ Поддерживаются несколько chart engines.

✅ Для каждого dumb-компонента создан Storybook.

✅ Все chart engines реализованы через единый интерфейс.

✅ Все асинхронные операции работают через Redux Saga.

✅ Container компоненты не выполняют API запросы и не работают напрямую с WebSocket.

✅ Код написан на TypeScript strict mode.

✅ Приложение готово для production использования.


Tests Requirements

Для проверки Acceptance Criteria нужно добавить набор тестов.

⸻

Unit Tests

Покрыть unit-тестами:

* parseQuoteKey
* определение sourceType
* извлечение baseAsset и quoteAsset
* автоматическое вычисление profitCurrency
* расчет weightedAveragePrice
* нормализацию весов
* validation формы конфигурации
* validation условий
* проверку operators
* расчет PnL
* расчет slippage
* расчет profitAfterFees
* transaction lock logic
* bot state machine
* reducer logic для всех slices

⸻

Redux Saga Tests

Покрыть saga-тестами:

* загрузку списка котировок;
* успешную WebSocket подписку;
* обработку dataChange;
* создание нового replay/live step;
* пересчет weighted average;
* проверку conditions;
* запуск automatic BUY;
* запуск automatic SELL;
* блокировку новой транзакции при активном activeTransactionId;
* создание SKIPPED action при transaction lock;
* завершение demo transaction через demoTransactionDelayMs;
* успешное завершение transaction;
* ошибочное завершение transaction;
* обновление action history;
* создание chart events.

⸻

Component Tests

Покрыть компонентными тестами:

* Dashboard отображает список конфигураций;
* Dashboard показывает empty state;
* кнопка Create Configuration открывает форму;
* Configuration Form валидирует обязательные поля;
* QuoteSourceSelector выбирает несколько источников;
* TradingMarketSelector выбирает один рынок;
* ProfitCurrencyField отображает вычисленную валюту;
* WeightedAveragePanel позволяет задать веса;
* PlayerControls поддерживает Play / Pause;
* PlayerControls поддерживает Step Forward / Step Backward;
* TimelineSlider меняет текущий step;
* ConditionsBuilder добавляет условие;
* ConditionsBuilder показывает triggered condition;
* DemoModeToggle включает demo режим;
* ActionHistoryPanel отображает manual и automatic actions.

⸻

Chart Component Tests

Проверить:

* QuotesChart выбирает правильный chart engine;
* каждый chart engine получает данные только через props;
* график показывает loading state;
* график показывает empty state;
* график показывает error state;
* график отображает weighted average line;
* график отображает BUY marker;
* график отображает SELL marker;
* график отображает pending transaction line;
* график отображает SUCCESS marker;
* график отображает FAILED marker.

⸻

Storybook Tests

Для Storybook проверить наличие stories:

* для всех dumb-компонентов;
* для всех chart engines;
* для общего QuotesChart;
* для состояний Default / Loading / Empty / Error;
* для Pending BUY / Pending SELL;
* для Successful transaction line;
* для Failed transaction line.

⸻

Integration Tests

Покрыть сценарии:

Create Configuration Flow

1. Открыть Dashboard.
2. Нажать Create Configuration.
3. Ввести название.
4. Выбрать несколько quote sources.
5. Выбрать trading market.
6. Проверить auto profit currency.
7. Настроить weighted average.
8. Добавить condition.
9. Сохранить конфигурацию.
10. Проверить, что конфигурация появилась на Dashboard.

⸻

Player Replay Flow

1. Открыть конфигурацию.
2. Открыть Player.
3. Загрузить replay steps.
4. Проверить первый step.
5. Нажать Play.
6. Проверить движение steps.
7. Нажать Pause.
8. Нажать Step Forward.
9. Нажать Step Backward.
10. Проверить обновление графика.

⸻

Live Mode Flow

1. Включить Live Mode.
2. Dispatch subscribeToMarketDataRequested.
3. Получить mock dataChange.
4. Проверить создание нового step.
5. Проверить обновление графика.
6. Проверить обновление timeline slider.

⸻

Demo Transaction Flow

1. Включить Demo Mode.
2. Нажать Manual Buy.
3. Проверить создание transaction PENDING.
4. Проверить появление pending line на графике.
5. Проверить, что новая транзакция заблокирована.
6. Дождаться demoTransactionDelayMs.
7. Проверить статус SUCCESS.
8. Проверить обновление demo position.
9. Проверить action history.
10. Проверить marker на графике.

⸻

Transaction Lock Flow

1. Запустить BUY.
2. Пока BUY в статусе PENDING, попытаться запустить SELL.
3. Проверить, что SELL не выполняется.
4. Проверить, что создано событие SKIPPED.
5. Проверить причину Transaction lock active.

⸻

E2E Tests

Использовать Playwright или Cypress.

Покрыть end-to-end:

* создание конфигурации;
* редактирование конфигурации;
* экспорт JSON;
* открытие Player;
* Replay playback;
* Live mode с mocked WebSocket;
* manual BUY;
* manual SELL;
* automatic BUY по condition;
* automatic SELL по condition;
* transaction pending line;
* transaction success marker;
* transaction failed marker;
* Action History;
* Conditions Builder.

⸻

Mocking Requirements

Для тестов использовать mock данные:

* mock quote keys;
* mock parsed quote keys;
* mock replay steps;
* mock WebSocket dataChange events;
* mock conditions;
* mock transactions;
* mock action history;
* mock chart events.

⸻

Test Tools

Использовать:

* Vitest или Jest;
* React Testing Library;
* Redux Saga Test Plan;
* MSW для REST API mocks;
* mock-socket или socket.io-client mock для WebSocket;
* Playwright или Cypress для E2E;
* Storybook Test Runner.

⸻

Coverage Requirements

Минимальное покрытие:

Statements: 80%
Branches:   75%
Functions:  80%
Lines:      80%

Для критичной бизнес-логики:

parser:              95%
weighted average:    95%
conditions engine:   90%
demo trading engine: 90%
transaction lock:    95%

⸻

Definition of Done for Tests

Проект считается покрытым тестами, если:

* все Acceptance Criteria имеют минимум один тест;
* unit tests проходят;
* saga tests проходят;
* component tests проходят;
* Storybook stories открываются без ошибок;
* E2E happy path проходит;
* transaction lock проверен отдельно;
* pending line проверена отдельно;
* JSON export проверен отдельно;
* coverage не ниже минимального порога.
