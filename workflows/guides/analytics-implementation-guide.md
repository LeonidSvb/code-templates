# 📊 PostHog Analytics Implementation Guide

## ✅ Установлено
- ✅ posthog-js библиотека установлена (v1.268.5)

## 🔧 Что нужно сделать

### 1. Environment Variables (.env.local)
Добавить в файл `.env.local` (создать если его нет):
```
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

⚠️ **Важно**: Получи ключи на https://app.posthog.com после регистрации

### 2. Создать Analytics Utility (src/lib/analytics.ts)
**Файл**: `src/lib/analytics.ts`
```typescript
import posthog from 'posthog-js'

export const initAnalytics = () => {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
      capture_pageview: true,
      capture_pageleave: true,
    })
  }
}

export const track = (event: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.capture(event, properties)
  }
}

export const identify = (userId: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.identify(userId, properties)
  }
}

export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.setPersonProperties(properties)
  }
}
```

### 3. Инициализация в Layout (src/app/layout.tsx)
**Файл**: `src/app/layout.tsx`
**Найти**: функцию RootLayout
**Добавить**: в самое начало функции (после импортов, до return)

```typescript
// Добавить импорт вверху файла
import { initAnalytics } from '@/lib/analytics'
import { useEffect } from 'react'

// Добавить в начало функции RootLayout (до return)
useEffect(() => {
  initAnalytics()
}, [])
```

### 4. Инициализация для SSR (instrumentation.ts)
**Создать файл**: `instrumentation.ts` в корне проекта (рядом с package.json)
```typescript
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Server-side initialization if needed
    console.log('PostHog server instrumentation registered')
  }
}
```

### 5. События в главной логике (src/app/page.tsx)

**Файл**: `src/app/page.tsx`
**Добавить импорт** в начало файла (строка ~4):
```typescript
import { track } from '@/lib/analytics'
```

**Найти функцию `handleFlowSelect`** (строка ~145) и заменить на:
```typescript
const handleFlowSelect = (flow: FlowType) => {
  track('flow_selected', {
    flowType: flow,
    timestamp: new Date().toISOString()
  })
  setSelectedFlow(flow);
  setAppState('questionnaire');
  debugLog('Flow selected', { flow });
};
```

**Найти функцию `handleQuestionnaireComplete`** (строка ~151) и добавить в начало:
```typescript
const handleQuestionnaireComplete = async (data: QuestionnaireData) => {
  track('questionnaire_completed', {
    flowType: data.flowType,
    totalAnswers: Object.keys(data.answers).length,
    timestamp: new Date().toISOString()
  })

  setQuestionnaireData(data);
  setAppState('generating');
  setGenerationError(null);

  track('generation_started', {
    flowType: data.flowType,
    timestamp: new Date().toISOString()
  })

  // ... остальной код функции без изменений
```

**В том же `handleQuestionnaireComplete`** найти блок try/catch и добавить события:

В блоке **try** после успешного получения результата (примерно строка ~188):
```typescript
// Добавить после setTripGuide(guideWithExperts);
track('generation_completed', {
  guideId: result.tripGuide.id,
  expertIds: result.selectedExpertIds,
  expertCount: result.selectedExpertIds.length,
  flowType: data.flowType,
  timing: result.timing,
  timestamp: new Date().toISOString()
})
```

В блоке **catch** после console.error (примерно строка ~197):
```typescript
// Добавить после console.error
track('generation_failed', {
  flowType: data.flowType,
  error: error instanceof Error ? error.message : 'Unknown error',
  timestamp: new Date().toISOString()
})
```

**В функции `renderCurrentState`** добавить tracking для загрузки виджета.
Найти `case 'flow-selection':` (строка ~215) и заменить на:
```typescript
case 'flow-selection':
  // Track widget load only once
  useEffect(() => {
    track('widget_loaded', {
      embedded: isEmbedded,
      theme: widgetConfig.theme,
      timestamp: new Date().toISOString()
    })
  }, [])
  return <FlowSelector onFlowSelect={handleFlowSelect} />;
```

### 6. События в QuestionCard (src/components/Questionnaire/QuestionCard.tsx)

**Файл**: `src/components/Questionnaire/QuestionCard.tsx`
**Добавить импорт** в начало (строка ~4):
```typescript
import { track } from '@/lib/analytics'
```

**Найти `useEffect`** с автоматическим переходом (строка ~30) и добавить в начало:
```typescript
// Добавить в самое начало компонента (после useState)
useEffect(() => {
  track('question_viewed', {
    questionId: question.id,
    questionType: question.type,
    questionText: question.text.substring(0, 100), // первые 100 символов
    timestamp: new Date().toISOString()
  })
}, [question.id])
```

**Найти функцию `handleSingleChoice`** (строка ~45) и заменить на:
```typescript
const handleSingleChoice = (option: string) => {
  track('question_answered', {
    questionId: question.id,
    questionType: question.type,
    answer: option,
    timestamp: new Date().toISOString()
  })
  onChange(option);
};
```

**Найти функцию `handleMultipleChoice`** (строка ~49) и добавить в начало:
```typescript
const handleMultipleChoice = (option: string) => {
  const currentValue = Array.isArray(value) ? value : [];
  const newValue = currentValue.includes(option)
    ? currentValue.filter(v => v !== option)
    : [...currentValue, option];

  track('question_answered', {
    questionId: question.id,
    questionType: question.type,
    answer: newValue,
    action: currentValue.includes(option) ? 'remove' : 'add',
    selectedOption: option,
    timestamp: new Date().toISOString()
  })

  onChange(newValue);
};
```

**Найти функцию `handleTextChange`** (строка ~81) и заменить на:
```typescript
const handleTextChange = (text: string) => {
  track('question_answered', {
    questionId: question.id,
    questionType: question.type,
    answer: text.substring(0, 50), // первые 50 символов для privacy
    answerLength: text.length,
    timestamp: new Date().toISOString()
  })
  onChange(text);
};
```

### 7. События для Email Collection (src/components/EmailCollection/InlineEmailGate.tsx)

**Файл**: `src/components/EmailCollection/InlineEmailGate.tsx`
**Добавить импорт**:
```typescript
import { track, identify, setUserProperties } from '@/lib/analytics'
```

**Найти функцию отправки формы** и добавить события:

В функции где обрабатывается отправка email (найти по fetch запросу):
```typescript
// Добавить ДО отправки в GoHighLevel
track('email_gate_shown', {
  flowType: tripGuide.flowType,
  timestamp: new Date().toISOString()
})

// Добавить ПОСЛЕ успешной отправки в GoHighLevel
track('email_submitted', {
  email: email,
  firstName: firstName,
  lastName: lastName,
  flowType: tripGuide.flowType,
  emailDomain: email.split('@')[1],
  timestamp: new Date().toISOString()
})

// Identify пользователя в PostHog
identify(email, {
  firstName: firstName,
  lastName: lastName,
  flowType: tripGuide.flowType
})

setUserProperties({
  email: email,
  firstName: firstName,
  lastName: lastName,
  lastFlowType: tripGuide.flowType,
  totalExperts: tripGuide.expertIds?.length || 0
})
```

### 8. События для Expert Cards (src/components/Expert/ExpertCard.tsx)

**Файл**: `src/components/Expert/ExpertCard.tsx`
**Добавить импорт**:
```typescript
import { track } from '@/lib/analytics'
```

**Найти кнопку "Talk to [firstName]"** и добавить onClick:
```typescript
// Найти кнопку и добавить onClick handler
onClick={() => {
  track('expert_card_clicked', {
    expertId: expert.id,
    expertName: expert.authorName,
    profession: expert.profession,
    flowType: tripGuide?.flowType,
    timestamp: new Date().toISOString()
  })
  // Существующая логика клика (если есть)
}}
```

### 9. Performance Events (src/components/TripGuide/TripGuideLoading.tsx)

**Файл**: `src/components/TripGuide/TripGuideLoading.tsx`
**Добавить импорт**:
```typescript
import { track } from '@/lib/analytics'
```

**Добавить в начало компонента**:
```typescript
useEffect(() => {
  const startTime = Date.now()

  track('generation_loading_started', {
    destination: userDestination,
    timestamp: new Date().toISOString()
  })

  return () => {
    track('generation_loading_time', {
      destination: userDestination,
      loadingDuration: Date.now() - startTime,
      timestamp: new Date().toISOString()
    })
  }
}, [userDestination])
```

## 🎯 Критически важные события которые будут отслеживаться:

### Основная воронка:
1. `widget_loaded` - Загрузка виджета
2. `flow_selected` - Выбор типа путешествия
3. `question_viewed` - Просмотр каждого вопроса
4. `question_answered` - Ответ на каждый вопрос
5. `questionnaire_completed` - Завершение опросника
6. `generation_started` - Начало генерации
7. `generation_completed` / `generation_failed` - Результат генерации
8. `email_gate_shown` - Показ формы email
9. `email_submitted` - Отправка email
10. `expert_card_clicked` - Клик по эксперту

### Дополнительные метрики:
- `generation_loading_started` / `generation_loading_time` - Время ожидания
- User identification через email
- Device/browser data (автоматически)
- Session recordings (автоматически)

## 📱 После завершения:

1. **Зарегистрироваться на**: https://app.posthog.com
2. **Получить API ключи** из Project Settings
3. **Добавить ключи в .env.local**
4. **Запустить проект**: npm run dev
5. **Протестировать**: пройти весь flow
6. **Проверить события**: в PostHog dashboard

## 🎨 Настройка воронок в PostHog:

После получения первых данных создать в PostHog:

### Воронка 1: Основная конверсия
```
widget_loaded → flow_selected → questionnaire_completed → email_submitted
```

### Воронка 2: По вопросам
```
question_viewed (Q1) → question_answered (Q1) → question_viewed (Q2) → question_answered (Q2) → ...
```

### Воронка 3: Expert engagement
```
generation_completed → email_submitted → expert_card_clicked
```

## 🔍 Проверочный чеклист:
- [ ] .env.local с ключами
- [ ] instrumentation.ts создан
- [ ] analytics.ts создан
- [ ] layout.tsx обновлен
- [ ] page.tsx обновлен
- [ ] QuestionCard.tsx обновлен
- [ ] InlineEmailGate.tsx обновлен
- [ ] ExpertCard.tsx обновлен
- [ ] TripGuideLoading.tsx обновлен
- [ ] Проект запускается без ошибок
- [ ] События появляются в PostHog

**Общий объем изменений**: ~150 строк кода в 8 файлах
**Время реализации**: ~45-60 минут
**Результат**: Полное отслеживание воронки пользователя