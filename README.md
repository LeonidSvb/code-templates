# Code Templates - Leo's Project Starter Kit

**Quick Start:** [QUICK-START.md](QUICK-START.md)

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
- `changelog-guide.md` - Keep a Changelog standard
- `git-commits.md` - Commit messages, branching

### `snippets/` - Reusable Modules
**Ready code - copy and use:**
- `logging/` - Universal logger (Python)
- `supabase-auth/` - Supabase SSR setup
- `api-wrappers/` - API clients

### `agents/` - Claude Code Agents
- `apollo-lead-collector.md` - Apollo automation
- `cold-outreach-strategist.md` - Outreach planning
- `excel-sheets-generator.md` - Excel generation

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

**Files and folders:**
- **Python:** `snake_case` (modules, scripts)
- **Next.js:** `kebab-case` (components, pages)
- **Documentation:** `kebab-case` (all .md files)
- **React Components:** `PascalCase.tsx`

**Sprints:**
- Format: `01-sprint-name/`, `02-sprint-name/`

**Tasks:**
- Format: `001-⏸️-task-name.md`, `002-▶️-task-name.md`
- Status: ⏸️ Pending, ▶️ In Progress, ✅ Done

---

## External Resources

**Programming Rules source:**
- [Cursor Directory](https://cursor.directory/rules) - where rules are from
- Update rules/ from cursor.directory when new ones appear

**Industry Standards:**
- Keep a Changelog: https://keepachangelog.com/
- Semantic Versioning: https://semver.org/

---

**Last Updated:** 2025-10-06
**Maintained by:** Leo
