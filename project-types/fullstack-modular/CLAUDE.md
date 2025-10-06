# Coding Pattern Preferences - Base Rules

## Core Principles

### Simplicity First
- Always prefer simple solutions over complex ones
- Avoid over-engineering or premature optimization
- Choose straightforward implementations that are easy to understand and maintain

### DRY (Don't Repeat Yourself)
- Avoid duplication of code whenever possible
- Before writing new functionality, check for similar existing code in the codebase
- Refactor common patterns into reusable utilities or components
- Share logic across components rather than duplicating it

### Environment Awareness
- Write code that works consistently across different environments: dev, test, and prod
- Use environment variables for configuration differences
- Avoid hardcoding values that might differ between environments
- Test code behavior in all target environments

### Focused Changes
- Only make changes that are requested or directly related to the task at hand
- Be confident that changes are well understood and necessary
- Avoid scope creep or tangential improvements unless explicitly requested

### Conservative Technology Choices
- When fixing issues or bugs, exhaust all options within the existing implementation first
- Avoid introducing new patterns or technologies without strong justification
- If new patterns are introduced, ensure old implementations are properly removed to prevent duplicate logic
- Maintain consistency with existing codebase patterns

## Code Organization

### Clean Codebase
- Keep the codebase very clean and organized
- Follow existing file structure and naming conventions
- Group related functionality together
- Remove unused code and imports

### File Size Limits
- Keep files under 200-300 lines of code
- Refactor larger files by splitting them into smaller, focused modules
- Break down complex components into smaller, composable pieces

## Error Handling

### Guard Clauses (Early Returns)
- Handle errors and edge cases at the beginning of functions
- Use early returns for errors
- Avoid deep nesting of if statements
- Place "happy path" last

### Error Messages
- Write clear messages: "Failed to save user data", not "Error 500"
- Log errors with context
- Don't swallow errors - show to user or log them
- Fail fast and clearly

## Data and Testing

### No Fake Data in Production
- Mocking data is only acceptable for tests
- Never add stubbing or fake data patterns that affect dev or prod environments
- Use real data sources and proper error handling for development and production

### Environment Files
- Never overwrite `.env` files without explicit permission and confirmation
- Always ask before modifying environment configuration
- Back up existing environment files when changes are necessary

## Git and Version Control

### Commit Standards
- Clear descriptive commit messages: "fix user login bug", not "fix"
- Atomic commits - one commit = one feature/fix
- Review changes through git diff before committing
- Never commit: secrets, .env files, temporary files

### Branch Management
- Descriptive branch names: `feature/add-auth`, `fix/login-crash`
- One branch = one task, don't mix features
- Delete merged branches to keep repository clean
- For solo projects can work in main, but make frequent commits

## Performance

### Optimization
- Optimize for readability first, performance later
- Don't add libraries without necessity - each adds weight
- Profile before optimizing, don't guess
- For small projects: readability > performance

### Batch Processing
- Plan changes ahead - what needs to change across all files
- Make bulk changes in one batch, not file by file
- Use find/replace, regex for bulk edits
- Commit batches of changes, not each file separately

## Critical Rules

- **NEVER use emojis** in code (encoding issues on Windows)
- **All comments in English** (for all stacks)
- **Real data only** (no mocks in production)
# Python Rules

## Core Principles
- Write clear technical code with precise examples
- Functional programming; avoid classes where possible
- Descriptive variable names: `is_active`, `has_permission`
- `snake_case` for directories and files

## Code Structure

### Function Style
- `def` for pure functions, `async def` for async operations
- Type hints for all function signatures
- Guard clauses (early returns) for error handling
- Place "happy path" last

### Error Handling
```python
def process_csv(file_path: str):
    if not file_path:
        raise ValueError("File path is required")
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File not found: {file_path}")

    # Happy path
    return pd.read_csv(file_path)
```

## Dependencies (Common)
- pandas (CSV processing)
- python-dotenv (.env files)
- requests (HTTP)
- pytest (testing)

## CSV/Pandas Processing
- pandas for data manipulation and analysis
- Method chaining for transformations
- `loc` and `iloc` for explicit data selection
- `groupby` for aggregation
- Auto-detect delimiter
- Validate column types
- Handle encoding (UTF-8, latin1)

## Web Scraping (HTTP-Only)
- **ONLY built-in Python libraries** (urllib, requests)
- **NEVER external services** like Firecrawl, Selenium
- requests for HTTP GET/POST
- BeautifulSoup for parsing HTML
- Rate limiting and random delays between requests
- Retry with exponential backoff

## Script Template
```python
#!/usr/bin/env python3
"""
=== SCRIPT NAME ===
Version: 1.0.0 | Created: YYYY-MM-DD

PURPOSE:
Brief description

FEATURES:
- Key capabilities

USAGE:
1. Configure CONFIG section
2. Run: python script_name.py
3. Results saved to results/

IMPROVEMENTS:
v1.0.0 - Initial version
"""

CONFIG = {
    "API_SETTINGS": {...},
    "PROCESSING": {...},
    "OUTPUT": {...}
}

def main():
    try:
        # Main logic here
        print("Script completed successfully")
    except Exception as e:
        print(f"Script failed: {e}")
        raise

if __name__ == "__main__":
    main()
```

## Testing
- pytest for unit tests
- **ONLY real data** (no mocks in production)
- Test edge cases and error handling
- Integration tests for API endpoints

## Critical Rules
- **NO emojis in code** (Windows encoding issues)
- **All comments in English**
- **Embedded configs** (no external config files where possible)
- **Real data only** (no fake data in dev/prod)
# FastAPI Rules

## Function Structure
- `def` for pure functions, `async def` for async operations
- Type hints for all function signatures
- Pydantic models instead of dictionaries for validation
- File structure: router, sub-routes, utilities, types

## Routes and Endpoints
- Functional components and Pydantic models
- Declarative route definitions with type annotations
- Minimize `@app.on_event("startup")`, use lifespan context managers
- Middleware for logging, monitoring, optimization

## Validation
- Pydantic `BaseModel` for input/output
- Schema classes for each data model
- Validation at route level, business logic separate

## API Response Format
```python
# Success
{"success": true, "data": {...}, "message": "Success"}

# Error
{"success": false, "error": "Error message", "details": {...}}
```

## Async Patterns
- `async def` for I/O-bound tasks
- httpx for async HTTP requests
- Connection pooling for database
- Background tasks for long operations

## Dependencies
- FastAPI
- Pydantic v2
- httpx (HTTP requests)
- python-dotenv (.env files)

## Example Route
```python
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class UserRequest(BaseModel):
    name: str
    email: str

class UserResponse(BaseModel):
    success: bool
    data: dict
    message: str

@router.post("/users", response_model=UserResponse)
async def create_user(user: UserRequest):
    if not user.email:
        raise HTTPException(status_code=400, detail="Email required")

    # Business logic here
    return {
        "success": True,
        "data": {"id": 1, "name": user.name},
        "message": "User created"
    }
```

## CORS Configuration
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
# Next.js Rules

## Core Principles
- Write concise technical TypeScript code
- Functional and declarative programming
- Descriptive variable names: `isLoading`, `hasError`
- File structure: component, subcomponents, helpers, types

## React Server Components (RSC)
- **Minimize `'use client'`** - use Server Components by default
- `'use client'` only for Web API access in small components
- Avoid for data fetching or state management
- Wrap client components in Suspense with fallback

```typescript
// ✅ Server Component (default)
async function DashboardPage() {
  const data = await fetchData();
  return <Dashboard data={data} />;
}

// ✅ Client Component (minimal)
'use client';
export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  // Only client-side logic
}
```

## UI and Styling

### Tailwind CSS
- Tailwind for all styles; avoid CSS files
- **Desktop-first approach** (NOT mobile-first)
- `cn()` utility from `lib/utils.ts` for conditional classes

```typescript
import { cn } from "@/lib/utils";

export function Button({ variant, isLoading, children }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-medium",
        variant === 'primary' && "bg-blue-600 text-white",
        isLoading && "opacity-50 cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );
}
```

### shadcn/ui
- shadcn/ui + Radix UI for components
- Follow shadcn/ui conventions
- Customization in `components/ui/`

## Performance Optimization

### Images
- Next.js Image component
- WebP format, size data
- Lazy loading for images

### Code Splitting
- Dynamic imports for heavy components
- Lazy loading for non-critical components

```typescript
import dynamic from 'next/dynamic';

const CSVTransformer = dynamic(() => import('./CSVTransformer'), {
  loading: () => <Spinner />,
  ssr: false
});
```

## Data Fetching

### Server-Side
- Server Components for data fetching
- Proper error handling and loading states
- React Suspense for async components

```typescript
async function DashboardPage() {
  const data = await fetch('http://localhost:8000/api/data', {
    cache: 'no-store'
  });
  return <Dashboard data={await data.json()} />;
}
```

### Client-Side
- SWR or TanStack Query
- Proper caching strategies

```typescript
'use client';
import useSWR from 'swr';

export function FileList() {
  const { data, error, isLoading } = useSWR('/api/files', fetcher);
  if (isLoading) return <Skeleton />;
  return <FileListView files={data} />;
}
```

## State Management
- `nuqs` for URL search parameter state
- `useState` only for truly local UI state
- Avoid `useEffect` when possible
- Zustand for complex global state (if needed)

## Backend Integration (FastAPI)
- Next.js API routes as proxy to FastAPI backend
- Backend URL: `http://localhost:8000` (dev)
- Proper CORS handling in FastAPI
- Environment variables for API endpoints

```typescript
// src/app/api/upload/route.ts
export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const response = await fetch('http://localhost:8000/api/upload', {
    method: 'POST',
    body: formData,
  });

  return NextResponse.json(await response.json());
}
```

## Component Structure
```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

// Types/Interfaces
interface FileUploadProps {
  onUpload: (file: File) => void;
}

// Main Component
export function FileUpload({ onUpload }: FileUploadProps) {
  // State
  const [file, setFile] = useState<File | null>(null);

  // Event handlers
  const handleUpload = () => {
    if (file) onUpload(file);
  };

  // Render
  return <div>...</div>;
}

// Helper functions
function formatSize(bytes: number) {
  return `${bytes / 1024} KB`;
}
```

## Naming Conventions
- Components: PascalCase (`FileUpload.tsx`)
- Directories: kebab-case (`script-runner/`)
- Variables: camelCase (`isLoading`, `hasError`)
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
# Supabase Integration Rules

## Critical Rules
- Use `@supabase/ssr` (NOT deprecated `auth-helpers-nextjs`)
- Use ONLY `getAll` and `setAll` methods
- **NEVER use** `get`, `set`, `remove` methods

## Browser Client Setup
```typescript
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

## Server Client Setup
```typescript
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignore if called from Server Component
          }
        },
      },
    }
  );
}
```

## Environment Variables
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # Only for server-side admin operations
```

## Usage in Server Components
```typescript
// app/page.tsx
import { createClient } from '@/lib/supabase/server';

export default async function Page() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  return <div>Hello {user?.email}</div>;
}
```

## Usage in Client Components
```typescript
'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export function UserProfile() {
  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }
    getUser();
  }, []);

  return <div>{user?.email}</div>;
}
```

## Authentication Patterns
```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password',
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password',
});

// Sign out
const { error } = await supabase.auth.signOut();
```
