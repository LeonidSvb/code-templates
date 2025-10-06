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
