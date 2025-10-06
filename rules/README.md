# Programming Rules Index

**Source:** [Cursor Directory](https://cursor.directory/rules)

**How to use:**
1. Choose needed files below
2. Add to your `CLAUDE.md`: `cat rules/python.md >> ./CLAUDE.md`
3. Or use ready template from `project-types/`

---

## Available Rules

### Backend
- **`python.md`** - Python fundamentals (snake_case, guard clauses, functional style)
  - When: any Python code
  - Includes: naming, error handling, dependencies

- **`fastapi.md`** - FastAPI backend (async, Pydantic, routes)
  - When: REST API with FastAPI
  - Includes: routes, validation, middleware

### Frontend
- **`nextjs.md`** - Next.js (App Router, RSC, Tailwind)
  - When: Next.js applications
  - Includes: Server Components, routing, styling

- **`typescript.md`** - TypeScript (interfaces, types, no enums)
  - When: TypeScript code
  - Includes: type safety, naming conventions

### Integrations
- **`supabase.md`** - Supabase (auth, SSR, cookies)
  - When: using Supabase
  - Includes: client setup, auth patterns

---

## Quick Combinations

| Project Type | Rules to combine |
|--------------|------------------|
| Next.js Landing | `nextjs.md` + `typescript.md` |
| Python Scripts | `python.md` |
| FastAPI Backend | `python.md` + `fastapi.md` |
| Fullstack App | `python.md` + `fastapi.md` + `nextjs.md` + `typescript.md` + `supabase.md` |

---

## Updating Rules

**Periodically check cursor.directory for updates:**

```bash
# Example: update Python rules
# 1. Open https://cursor.directory/rules/python
# 2. Copy new rules
# 3. Update file:
vim rules/python.md
```

**Last sync:** 2025-10-06 (from Outreach CLAUDE.md)
