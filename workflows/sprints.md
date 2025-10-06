# Sprint Structure Template

Стандартная структура организации спринтов в проекте.

## Структура проекта

```
project/
├── docs/              # Общая документация
│   ├── README.md      # Индекс документации
│   ├── reports/       # Отчеты и анализ
│   ├── guides/        # Руководства и инструкции
│   └── calls/         # Записи звонков и решения
├── sprints/           # СПРИНТЫ В КОРНЕ ПРОЕКТА
│   ├── README.md      # Индекс всех спринтов
│   └── 01-sprint-name/
│       ├── README.md
│       ├── docs/
│       └── tasks/
└── src/               # Исходный код
```

## Структура спринта

```
sprints/
└── 01-sprint-name/
    ├── README.md              # Описание спринта, план, метрики
    ├── docs/                  # Технические решения
    │   ├── architecture.md
    │   ├── api-design.md
    │   └── database-schema.md
    └── tasks/                 # Конкретные задачи
        ├── _template.md       # Шаблон задачи
        ├── 001-⏸️-task-name.md
        ├── 002-▶️-task-name.md
        └── 003-✅-task-name.md
```

## Эмодзи статусы задач

- `⏸️` - Pending (не начата)
- `▶️` - In Progress (в работе)
- `✅` - Done (завершена)

## README.md спринта

```markdown
# Sprint 01: Sprint Name

**Дата:** 2025-10-06
**Таймлайн:** 2 дня
**Цель:** Краткое описание цели спринта

---

## Цель спринта

Детальное описание того, что нужно достичь.

### Критерии успеха
- ✅ Критерий 1
- ✅ Критерий 2
- ✅ Критерий 3

---

## Scope

### Что делаем
- Пункт 1
- Пункт 2

### Что НЕ делаем (Out of scope)
- Пункт 1
- Пункт 2

---

## План реализации

### День 1: Описание
- ✅ Задача 1
- ✅ Задача 2

### День 2: Описание
- ✅ Задача 3
- ✅ Задача 4

---

## Tasks

- ⏸️ [001-task-name.md](tasks/001-task-name.md)
- ▶️ [002-task-name.md](tasks/002-task-name.md)
- ✅ [003-task-name.md](tasks/003-task-name.md)

---

## Документация

- [architecture.md](docs/architecture.md) - Архитектурные решения
- [api-design.md](docs/api-design.md) - Дизайн API

---

## Вопросы для уточнения

1. Вопрос 1?
2. Вопрос 2?
```

## Шаблон задачи (_template.md)

```markdown
# Task Template

**Status:** ⏸️ Pending | ▶️ In Progress | ✅ Done

---

## Goal

Краткое описание цели задачи (1-2 предложения).

## Acceptance Criteria

- [ ] Критерий 1
- [ ] Критерий 2
- [ ] Критерий 3

## Technical Details

### Approach
Как будет реализовано.

### Files to Change
- `path/to/file1.js`
- `path/to/file2.ts`

### Code Example (optional)
\`\`\`javascript
// Пример кода
\`\`\`

### Dependencies
- Requires: Task #X (должна быть завершена)
- Blocks: Task #Y (блокирует)

## Testing

- [ ] Мануальный тест 1
- [ ] Мануальный тест 2
- [ ] Edge cases покрыты

## Notes

Дополнительный контекст, ссылки, решения.
```

## Naming Convention

### Спринты
- Формат: `01-sprint-name`, `02-sprint-name`
- Всегда начинаются с номера (01, 02, 03...)
- Название lowercase с дефисами

### Задачи
- Формат: `001-⏸️-task-name.md`
- Номер из 3 цифр (001, 002, 003...)
- Эмодзи статуса в названии файла
- Название lowercase с дефисами

### Документация
- Всегда lowercase: `api-design.md`, `database-schema.md`
- Дефисы вместо пробелов
- Без КАПСА

## docs/ vs sprints/

### docs/ - Общая документация проекта
- **reports/** - Что УЖЕ сделано (анализ, отчеты)
- **guides/** - КАК делать (инструкции, setup)
- **calls/** - Решения со звонков

### sprints/ - Текущая и прошлая работа
- **ЧТО делаем СЕЙЧАС**
- Каждый спринт = изолированная папка
- После завершения остается как архив

## Индекс спринтов (sprints/README.md)

```markdown
# Архив спринтов

## Активные спринты

- **[01-sprint-name](01-sprint-name/README.md)** - Краткое описание

## Завершенные спринты

- **[00-initial-setup](00-initial-setup/README.md)** - Краткое описание (Завершен: 2025-09-01)

---

**Последнее обновление:** 2025-10-06
```

## Индекс документации (docs/README.md)

```markdown
# Документация проекта

## Структура

### 📊 Reports
- [report-name.md](reports/report-name.md) - Описание

### 📖 Guides
- [guide-name.md](guides/guide-name.md) - Описание

### 📞 Calls
- [2025-10-02/](calls/2025-10-02/) - Описание

---

**Примечание:** Спринты находятся в корне проекта в папке `sprints/`
```

## Best Practices

### ✅ DO
- Держать sprints/ в корне проекта
- Использовать эмодзи для статусов задач
- Обновлять статусы в названиях файлов
- Писать конкретные acceptance criteria
- Документировать технические решения в docs/
- Добавлять вопросы для уточнения

### ❌ DON'T
- Не держать спринты в docs/
- Не использовать КАПС в названиях
- Не смешивать разные фичи в одном спринте
- Не забывать обновлять README.md спринта
- Не делать задачи без acceptance criteria

## Workflow

1. **Создать спринт**
   ```bash
   mkdir -p sprints/01-sprint-name/{docs,tasks}
   cp sprints/_template/README.md sprints/01-sprint-name/
   cp sprints/_template/_task.md sprints/01-sprint-name/tasks/_template.md
   ```

2. **Создать задачи**
   - Скопировать `_template.md`
   - Переименовать в `001-⏸️-task-name.md`
   - Заполнить секции

3. **Начать работу**
   - Переименовать `001-⏸️-task-name.md` → `001-▶️-task-name.md`
   - Обновить статус внутри файла на `▶️ In Progress`

4. **Завершить задачу**
   - Переименовать `001-▶️-task-name.md` → `001-✅-task-name.md`
   - Обновить статус внутри файла на `✅ Done`
   - Отметить в README.md спринта

5. **Завершить спринт**
   - Обновить sprints/README.md (перенести в "Завершенные")
   - Обновить CHANGELOG.md
   - Создать коммит

## Пример готового спринта

```
sprints/01-hubspot-metrics/
├── README.md
├── docs/
│   ├── hubspot-fields.md
│   ├── sql-queries.md
│   └── make-scenarios.md
└── tasks/
    ├── _template.md
    ├── 001-✅-create-hubspot-fields.md
    ├── 002-✅-setup-make-automation.md
    ├── 003-▶️-sql-queries.md
    └── 004-⏸️-dashboard-integration.md
```

---

**Создано:** 2025-10-06
**Автор:** Leo
**Использование:** Ссылайся на этот файл при создании новых спринтов
