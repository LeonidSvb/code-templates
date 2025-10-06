# TypeScript Rules

## Core Principles
- TypeScript for all code
- **Prefer `interface` over `type`**
- Avoid enums; use maps
- Always define proper types for props and state

## Interface Definition
```typescript
// ✅ Good
interface FileUploadProps {
  onUpload: (file: File) => void;
  maxSize?: number;
}

export function FileUpload({ onUpload, maxSize }: FileUploadProps) {
  // Component logic
}

// ❌ Avoid
type FileUploadProps = {
  onUpload: (file: File) => void;
  maxSize?: number;
}
```

## Type Safety
- Type hints for all function signatures
- No `any` types (use `unknown` if truly needed)
- Proper return types for functions
- Discriminated unions for complex types

```typescript
// Function with proper types
function processData(input: string): ProcessedData {
  return { id: 1, value: input };
}

// Discriminated union
interface SuccessResponse {
  success: true;
  data: unknown;
}

interface ErrorResponse {
  success: false;
  error: string;
}

type ApiResponse = SuccessResponse | ErrorResponse;
```

## Avoid Enums
```typescript
// ❌ Avoid enums
enum Status {
  Pending,
  Active,
  Done
}

// ✅ Use const objects
const STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  DONE: 'done'
} as const;

type Status = typeof STATUS[keyof typeof STATUS];
```

## Naming Conventions
- Interfaces: PascalCase (`UserProps`, `ApiResponse`)
- Types: PascalCase (`Status`, `UserData`)
- Variables: camelCase (`isLoading`, `hasError`)
- Constants: UPPER_SNAKE_CASE (`API_URL`, `MAX_SIZE`)

## Generic Types
```typescript
// Generic function
function identity<T>(value: T): T {
  return value;
}

// Generic interface
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}
```
