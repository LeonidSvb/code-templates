# VAPI Scripts Development Standards

## Философия проекта

Этот документ описывает проверенные практики для VAPI аналитических скриптов, основанные на реальном опыте разработки системы сбора и анализа данных звонков.

## Архитектура проекта

### Структура директорий

```
production_scripts/
├── vapi_collection/        # Сбор данных VAPI
├── qci_analysis/          # Анализ качества звонков
├── prompt_optimization/   # Оптимизация промптов
├── supabase_migration/    # Миграция в Supabase
├── shared/                # Общие утилиты
│   ├── logger.js         # Стандартизированное логирование
│   ├── prompt_parser.js  # Парсинг промптов
│   ├── api/              # API клиенты
│   └── utils/            # Вспомогательные утилиты
└── cron/                  # Автоматизированные задачи
```

### Принципы организации

1. **Доменная структура**: Каждый модуль отвечает за свою бизнес-область
2. **Общие ресурсы**: Все переиспользуемое в `shared/`
3. **Результаты внутри**: Каждый модуль содержит свои `results/`
4. **Чистая архитектура**: Никаких тестовых файлов в production

## Стандарт структуры модуля

### Модуль Level 1: Простой скрипт (до 300 строк)

```
simple_module/
├── src/
│   └── main_script.js     # Единственный файл
├── results/               # Результаты
├── logs/                  # Логи выполнения
└── README.md              # Документация
```

### Модуль Level 2: Комплексный модуль (300+ строк)

```
complex_module/
├── src/
│   ├── main_processor.js      # Основная логика
│   ├── data_aggregator.js     # Агрегация данных
│   ├── analyzer.js            # Анализ
│   └── dashboard_generator.js # Визуализация
├── results/                   # Результаты
├── logs/                      # Логи
├── dashboard/                 # HTML дашборды
├── README.md                  # Документация
└── history.txt                # История изменений
```

## Стандарт CONFIG объекта

### Проверенная структура

```javascript
require('dotenv').config({ path: '../../../.env' });

// DEFAULT CONFIG для терминального использования
const DEFAULT_CONFIG = {
    START_DATE: '2025-09-01',
    END_DATE: '2025-09-26',
    FILTERS: {
        MIN_COST: 0
    },
    OUTPUT: {
        SAVE_TO_FILE: true,
        OUTPUT_DIR: 'production_scripts/module_name/results',
        VERBOSE: true
    },
    PROCESSING: {
        LIMIT: null // null = без лимита, число = лимит для тестов
    }
};

// FIXED CONFIG - технические настройки
const FIXED_CONFIG = {
    BATCH_SIZE: 50,
    CONCURRENT_REQUESTS: 10,
    RETRY_ATTEMPTS: 3,
    API_TIMEOUT: 30000
};

// УНИВЕРСАЛЬНАЯ ФУНКЦИЯ - для терминала и API
function getConfig(runtimeParams = null) {
    if (runtimeParams) {
        // RUNTIME MODE (из API/Frontend)
        return {
            START_DATE: runtimeParams.startDate || DEFAULT_CONFIG.START_DATE,
            END_DATE: runtimeParams.endDate || DEFAULT_CONFIG.END_DATE,
            FILTERS: {
                MIN_COST: runtimeParams.minCost || 0
            },
            OUTPUT: {
                SAVE_TO_FILE: runtimeParams.saveToFile !== false,
                OUTPUT_DIR: DEFAULT_CONFIG.OUTPUT.OUTPUT_DIR,
                VERBOSE: runtimeParams.verbose !== false
            },
            PROCESSING: {
                LIMIT: runtimeParams.limit || null
            },
            ...FIXED_CONFIG
        };
    }

    // DEFAULT MODE (терминальное использование)
    return { ...DEFAULT_CONFIG, ...FIXED_CONFIG };
}
```

## Стандарт логирования

### Использование существующего логгера

```javascript
const logger = require('../shared/logger');

// Инициализация с именем модуля
const moduleLogger = new logger('MODULE_NAME');

// Использование
moduleLogger.info('Начинаем обработку данных...');
moduleLogger.progress('Обработка батча 1/10...');
moduleLogger.success('Батч обработан: 100 записей');
moduleLogger.cost(0.0234);    // Стоимость API вызовов
moduleLogger.timing(2.5);     // Время выполнения
moduleLogger.error('Ошибка обработки записи 45');
```

## Стандарт отображения результатов

### Приоритетный порядок (КРИТИЧНО)

1. **ДАННЫЕ ПЕРВЫМИ**: Всегда показывать фактические результаты перед метаданными
2. **ХРОНОЛОГИЧЕСКИ**: От новых к старым (самые последние первыми)
3. **ЧЕТКИЕ СЕКЦИИ**: Визуальные разделители между типами результатов
4. **МЕТРИКИ ПРОИЗВОДИТЕЛЬНОСТИ**: Время, стоимость, эффективность

### Пример структуры вывода

```javascript
function displayResults(results) {
    console.log('\n========================================');
    console.log('📊 РЕЗУЛЬТАТЫ ОБРАБОТКИ');
    console.log('========================================');

    // 1. ФАКТИЧЕСКИЕ ДАННЫЕ (ПЕРВЫМИ!)
    console.log('\n🎯 КЛЮЧЕВЫЕ НАХОДКИ:');
    results.findings.forEach(finding => {
        console.log(`  • ${finding.insight}: ${finding.value}`);
    });

    // 2. МЕТРИКИ ПРОИЗВОДИТЕЛЬНОСТИ
    console.log('\n📈 МЕТРИКИ ПРОИЗВОДИТЕЛЬНОСТИ:');
    console.log(`  • Записей обработано: ${results.total}`);
    console.log(`  • Процент успешных: ${results.successRate}%`);
    console.log(`  • Средний балл: ${results.avgScore}/100`);

    // 3. МЕТАДАННЫЕ (ПОСЛЕДНИМИ)
    console.log('\n📋 ИНФОРМАЦИЯ О ПРОЦЕССЕ:');
    console.log(`  • Длительность: ${results.duration}с`);
    console.log(`  • Стоимость API: $${results.cost}`);
    console.log(`  • Временная метка: ${results.timestamp}`);
}
```

## Обработка ошибок

### Паттерн graceful degradation

```javascript
async function robustOperation(data) {
    try {
        // Основная операция
        return await primaryMethod(data);
    } catch (primaryError) {
        logger.warning(`Основной метод не сработал: ${primaryError.message}`);

        try {
            // Резервная операция
            return await fallbackMethod(data);
        } catch (fallbackError) {
            logger.error(`Резервный метод тоже не сработал: ${fallbackError.message}`);

            // Возвращаем частичные результаты вместо полного провала
            return {
                success: false,
                partial: true,
                data: data.slice(0, 10),
                error: fallbackError.message
            };
        }
    }
}
```

### Контроль стоимости

```javascript
class CostAwareProcessor {
    constructor() {
        this.totalCost = 0;
        this.maxCost = CONFIG.MAX_COST || 10.00;
    }

    async processWithCostLimit(items) {
        const results = [];

        for (const item of items) {
            if (this.totalCost >= this.maxCost) {
                logger.warning(`Достигнут лимит стоимости: $${this.totalCost}`);
                break;
            }

            try {
                const result = await this.processItem(item);
                this.totalCost += result.cost;
                results.push(result);
            } catch (error) {
                logger.warning(`Пропускаем элемент ${item.id}: ${error.message}`);
                continue; // Одна ошибка не останавливает всё
            }
        }

        return results;
    }
}
```

## Паттерн пайплайна данных

### Обработка по стадиям

```javascript
// Стадия 1: Сбор
class DataCollector {
    async collect(config) {
        logger.info('Собираем данные...');
        const rawData = await this.fetchFromAPI(config);
        return this.saveResults(rawData, 'raw_data');
    }
}

// Стадия 2: Обработка
class DataProcessor {
    async process(inputFile) {
        logger.info('Обрабатываем данные...');
        const rawData = this.loadData(inputFile);
        const processed = this.transform(rawData);
        return this.saveResults(processed, 'processed_data');
    }
}

// Стадия 3: Анализ
class DataAnalyzer {
    async analyze(inputFile) {
        logger.info('Анализируем данные...');
        const data = this.loadData(inputFile);
        const insights = await this.generateInsights(data);
        return this.saveResults(insights, 'analysis_results');
    }
}

// Оркестрация пайплайна
async function runPipeline() {
    const collector = new DataCollector();
    const processor = new DataProcessor();
    const analyzer = new DataAnalyzer();

    try {
        const rawFile = await collector.collect(CONFIG);
        const processedFile = await processor.process(rawFile);
        const analysisFile = await analyzer.analyze(processedFile);

        logger.success(`Пайплайн завершен! Результаты: ${analysisFile}`);
    } catch (error) {
        logger.error(`Пайплайн не удался: ${error.message}`);
    }
}
```

## Управление переменными окружения

### Проверенный паттерн загрузки

```javascript
// В начале каждого скрипта
require('dotenv').config({ path: '../../../.env' });

// Валидация критических переменных
const requiredVars = ['OPENAI_API_KEY', 'VAPI_API_KEY'];
const missing = requiredVars.filter(key => !process.env[key]);
if (missing.length > 0) {
    console.error('❌ Отсутствуют переменные окружения:', missing);
    process.exit(1);
}
```

### Что идет в .env (секреты):
```bash
OPENAI_API_KEY=sk-...
VAPI_API_KEY=...
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
NODE_ENV=production
```

### Что идет в CONFIG (бизнес-логика):
```javascript
const CONFIG = {
    // Из .env (секреты)
    OPENAI_KEY: process.env.OPENAI_API_KEY,

    // Специфично для этого скрипта
    MODEL: 'gpt-4o',
    TEMPERATURE: 0.1,
    MAX_TOKENS: 4000,
    BATCH_SIZE: 10,
    MIN_SCORE: 50,
    RETRY_ATTEMPTS: 3
};
```

## NPM Scripts стандарт

### package.json скрипты

```json
{
    "scripts": {
        "collect": "node production_scripts/vapi_collection/src/collect_vapi_data.js",
        "analyze": "node production_scripts/qci_analysis/src/analyzer.js",
        "optimize": "node production_scripts/prompt_optimization/src/data_aggregator.js",
        "sync": "node production_scripts/supabase_migration/src/sync_assistant_prompts.js",

        "dev:collect": "nodemon production_scripts/vapi_collection/src/collect_vapi_data.js",
        "full-pipeline": "npm run collect && npm run analyze && npm run optimize",

        "test:env": "node -e \"console.log('✅ ENV проверка:', !!process.env.OPENAI_API_KEY)\"",
        "setup": "npm install && npm run test:env"
    }
}
```

## Стандарт заголовка скрипта

```javascript
#!/usr/bin/env node
/**
 * SCRIPT_NAME - Краткое описание
 *
 * PURPOSE: Что делает скрипт
 * USAGE: npm run script-name (всегда запускать из корня проекта)
 * OUTPUT: Что производит скрипт
 *
 * VERSION: 1.0.0
 * CREATED: 2025-09-26
 * UPDATED: 2025-09-26
 *
 * CHANGELOG:
 * - v1.0.0: Первоначальная реализация
 */
```

## Батчевая обработка

### Оптимизированный паттерн

```javascript
async function processBatch(items, batchSize = 50) {
    const results = [];

    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        logger.progress(`Обрабатываем батч ${i/batchSize + 1}/${Math.ceil(items.length/batchSize)}`);

        const batchResults = await Promise.all(
            batch.map(item => processItem(item))
        );

        results.push(...batchResults);

        // Небольшая пауза между батчами для API лимитов
        if (i + batchSize < items.length) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    return results;
}
```

## Интеграция с AI

### Централизованные промпты

```javascript
// shared/prompt_parser.js - используем существующий
const promptParser = require('../shared/prompt_parser');

// Загрузка промпта с переменными
const prompt = promptParser.loadPrompt('./prompts.md', 'ANALYSIS_PROMPT', {
    domain: 'VAPI звонки',
    metricA: 'Качество обслуживания',
    metricB: 'Конверсия'
});
```

## Кеширование

### Простой паттерн кеша

```javascript
class SimpleCache {
    constructor(cacheDir = './cache') {
        this.cacheDir = cacheDir;
        this.memoryCache = new Map();
    }

    async get(key, generator) {
        // Проверяем память
        if (this.memoryCache.has(key)) {
            logger.debug(`Кеш попадание (память): ${key}`);
            return this.memoryCache.get(key);
        }

        // Проверяем диск
        const cacheFile = `${this.cacheDir}/${key}.json`;
        if (require('fs').existsSync(cacheFile)) {
            logger.debug(`Кеш попадание (диск): ${key}`);
            const data = JSON.parse(require('fs').readFileSync(cacheFile));
            this.memoryCache.set(key, data);
            return data;
        }

        // Генерируем и кешируем
        logger.debug(`Кеш промах: ${key}`);
        const data = await generator();
        this.memoryCache.set(key, data);
        require('fs').writeFileSync(cacheFile, JSON.stringify(data));
        return data;
    }
}
```

## Когда использовать каждый уровень

### Level 1 (Простой скрипт):
- Разовый экспорт данных
- Простые API вызовы
- Базовые трансформации файлов
- Время выполнения < 5 минут

### Level 2 (Комплексный модуль):
- Регулярный сбор данных
- Многоступенчатые трансформации
- Нужны общие утилиты
- Время выполнения 5-30 минут
- 2-5 стадий обработки

## Антипаттерны (чего избегать)

1. **Преждевременная модуляризация**: Не разбивать скрипт на 100 строк на 5 файлов
2. **Разбросанная конфигурация**: Конфиг в одном месте, не раскидывать
3. **Переинжиниринг**: YAGNI - Тебе это не понадобится
4. **Callback Hell**: Использовать async/await, не вложенные коллбеки
5. **Поглощение ошибок**: Всегда логировать ошибки, даже если обработанные
6. **Магические числа**: Использовать именованные константы в CONFIG

## Чеклист реализации

### Для новых скриптов
- [ ] Определить уровень сложности (1 или 2)
- [ ] Создать структуру директорий
- [ ] Настроить загрузку .env из корня проекта
- [ ] Добавить NPM скрипт в package.json
- [ ] Настроить CONFIG объект с валидацией env
- [ ] Подключить логгер из shared/
- [ ] Создать main entry point
- [ ] Добавить обработку ошибок
- [ ] Настроить вывод результатов
- [ ] Написать README с инструкциями
- [ ] Тестировать с малым датасетом

### Для рефакторинга
- [ ] Определить повторяющиеся паттерны кода
- [ ] Вынести общие утилиты в shared/
- [ ] Централизовать конфигурацию
- [ ] Стандартизировать логирование
- [ ] Создать консистентное именование файлов
- [ ] Архивировать старые версии
- [ ] Обновить документацию
- [ ] Добавить номер версии

## Заключение

Эти стандарты основаны на реальном опыте разработки VAPI аналитических скриптов. Ключевой принцип: **начинать просто и эволюционировать по мере необходимости**.

Помните: **Лучшая архитектура - это самая простая, которая решает вашу текущую проблему.**

---

*Документ создан на основе реального кода production_scripts/ проекта VAPI Analytics*