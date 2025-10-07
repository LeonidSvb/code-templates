# Code Templates - Leo's Project Starter Kit

**Quick Start:** [QUICK-START.md](QUICK-START.md) | **Changelog:** [CHANGELOG.md](CHANGELOG.md)

---

## How to Use

1. **Copy base files** from `base/`
2. **Choose project type** from `project-types/`
3. **Add needed rules** from `rules/` to CLAUDE.md
4. **Copy snippets** if you need modules
5. **Follow workflows/** for processes

---

## Structure

### `base/` - Base Files (copy ALWAYS)
- `CLAUDE.md` - Core principles (Simplicity, DRY, No Emojis)
- `CHANGELOG.md` - Changelog template
- `.gitignore` - Python + Node
- `.env.example` - Environment variables

### `rules/` - Programming Rules (choose what you need)
**Modular rules - copy only what you use:**

| File | Description | When to use |
|------|-------------|-------------|
| `python.md` | Python rules (functions, naming, guard clauses) | Any Python project |
| `fastapi.md` | FastAPI backend (routes, Pydantic, async) | Backend API |
| `nextjs.md` | Next.js (RSC, Client Components, Tailwind) | Frontend |
| `typescript.md` | TypeScript (interfaces, types, no enums) | TypeScript projects |
| `supabase.md` | Supabase auth + SSR | When using Supabase |

**How to add to project:**
```bash
# Example: Fullstack Next.js + FastAPI
cat base/CLAUDE.md > ./CLAUDE.md
cat rules/python.md >> ./CLAUDE.md
cat rules/fastapi.md >> ./CLAUDE.md
cat rules/nextjs.md >> ./CLAUDE.md
cat rules/typescript.md >> ./CLAUDE.md
```

### `project-types/` - Ready Templates
**Quick templates - copy CLAUDE.md and you're done:**

| Project Type | Files | Stack |
|--------------|-------|-------|
| `simple-nextjs/` | CLAUDE.md | Next.js + TypeScript |
| `simple-python/` | CLAUDE.md | Python scripts |
| `fullstack-modular/` | CLAUDE.md, structure.md | Next.js + FastAPI (like Outreach) |
| `mvp-landing/` | CLAUDE.md | Landing page only |

### `workflows/` - Work Processes
- `sprints.md` - Sprint structure (emoji statuses, tasks)
- `naming-conventions.md` - File and folder naming standards
- `adr-template.md` - Architecture Decision Records template
- `prd-template.md` - Product Requirements Document template
- `task-template.md` - Task template for sprints
- `architecture/` - Architecture philosophy and standards
- `guides/` - Implementation guides (analytics, Excel, HTML, MCP)

### `snippets/` - Reusable Modules
**Ready code - copy and use:**
- `logging/` - **Universal logger** (Python, Node.js, Next.js) ⭐ NEW
  - `universal_logger.py` - Production-ready logger
  - `UNIVERSAL-LOGGER.md` - Complete docs with examples
- `supabase-auth/` - Supabase SSR setup
- `api-wrappers/` - API clients

### `agents/` - Claude Code Agents
- `apollo-lead-collector.md` - Apollo automation
- `cold-outreach-strategist.md` - Outreach planning
- `excel-sheets-generator.md` - Excel generation

### `raw-insights/` - Session Learnings ⭐ NEW
**Unstructured insights from coding sessions - organize weekly:**
- `2025-10-06-frontend-routes-documentation.md` - Frontend route organization
  - ROUTES.md pattern (complete route map)
  - routes.ts constants (TypeScript)
  - Industry standards & real examples

---

## Quick Examples

### Example 1: Simple Next.js Landing Page
```bash
# Option 1: Use ready template
cp project-types/mvp-landing/CLAUDE.md ./CLAUDE.md

# Option 2: Build yourself
cp base/CLAUDE.md ./CLAUDE.md
cat rules/nextjs.md >> ./CLAUDE.md
cat rules/typescript.md >> ./CLAUDE.md

# Add base files
cp base/CHANGELOG.md ./CHANGELOG.md
cp base/.gitignore ./.gitignore
cp base/.env.example ./.env
```

### Example 2: Fullstack Modular Project (like Outreach)
```bash
# Quick (use ready template)
cp project-types/fullstack-modular/CLAUDE.md ./CLAUDE.md
cp project-types/fullstack-modular/structure.md ./docs/

# Add base files
cp base/CHANGELOG.md ./CHANGELOG.md
cp base/.gitignore ./.gitignore
cp base/.env.example ./.env
```

### Example 3: Python Script Only
```bash
cp project-types/simple-python/CLAUDE.md ./CLAUDE.md
cp base/.gitignore ./.gitignore
```

---

## Naming Conventions

**See full guide:** [workflows/naming-conventions.md](workflows/naming-conventions.md)

**Quick reference:**
- **Python:** `snake_case` (modules, scripts)
- **Next.js:** `kebab-case` (components, pages)
- **Documentation:** `kebab-case` (all .md files)
- **React Components:** `PascalCase.tsx`
- **Sprints:** `01-sprint-name/`, `02-sprint-name/`
- **Tasks:** `001-task-name.md` (without emoji in filename)

---

## External Resources

**Programming Rules source:**
- [Cursor Directory](https://cursor.directory/rules) - where rules are from
- Update rules/ from cursor.directory when new ones appear

**Industry Standards:**
- Keep a Changelog: https://keepachangelog.com/
- Semantic Versioning: https://semver.org/

---

---

## Latest Additions (2025-10-06)

### 🔥 Universal Logging System
**Location:** `snippets/logging/`

Zero-config logger for any project:
- **Python:** `from universal_logger import get_logger`
- **FastAPI:** Auto-log every API request
- **Next.js:** Frontend wrapper included
- **Node.js/Express:** Copy-paste ready

**Features:**
- Daily log rotation (YYYY-MM-DD.log)
- Separate error logs
- JSON structured output
- @auto_log decorator for performance
- Works in modular + root projects

**Quick start:**
```bash
# Copy logger
cp snippets/logging/universal_logger.py your-project/

# Use in Python
from universal_logger import get_logger
logger = get_logger(__name__)
logger.info("Hello!", count=100)

# Logs saved to: logs/2025-10-06.log
```

See: `snippets/logging/UNIVERSAL-LOGGER.md` for full docs

### 📁 Frontend Routes Documentation
**Location:** `raw-insights/2025-10-06-frontend-routes-documentation.md`

Industry-standard pattern for organizing frontend routes:
- `ROUTES.md` - Map of all pages/APIs
- `routes.ts` - TypeScript constants
- No more hardcoded URLs
- Easy refactoring

Perfect for Next.js, React, any SPA.

---

**Last Updated:** 2025-10-06
**Maintained by:** Leo
