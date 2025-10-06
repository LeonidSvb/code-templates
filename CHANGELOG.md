# Changelog - Code Templates

**RULES: Follow [Keep a Changelog](https://keepachangelog.com/) standard strictly. Only 6 categories: Added/Changed/Deprecated/Removed/Fixed/Security. Be concise, technical, no fluff.**

---

## [Unreleased]

### Next Session Plan
**Goal:** Add more snippets and examples

**Priority Tasks:**
1. Add universal-logger.py to snippets/
2. Add Supabase auth examples to snippets/
3. Create more project-types examples

---

## [1.1.0] - 2025-10-06 - Naming Conventions & Changelog

### Added
- `CHANGELOG.md` - Track all changes to code-templates repository
- `workflows/naming-conventions.md` - Unified naming standard for files and folders
- Documentation about project naming best practices

### Changed
- Updated `README.md` with links to CHANGELOG and naming conventions
- Updated `workflows/` section in README

---

## [1.0.0] - 2025-10-06 - Initial Restructure

### Added
- Modular structure: `base/`, `rules/`, `project-types/`, `workflows/`, `snippets/`, `agents/`
- `README.md` - Main index with all links and examples
- `QUICK-START.md` - 5-minute project setup guide
- `base/CLAUDE.md` - Core principles (Simplicity, DRY, Environment Awareness)
- `base/CHANGELOG.md` - Template for project changelogs
- `base/.gitignore` - Python + Node gitignore template
- `base/.env.example` - Environment variables template
- `rules/python.md` - Python-specific rules
- `rules/fastapi.md` - FastAPI backend rules
- `rules/nextjs.md` - Next.js frontend rules
- `rules/typescript.md` - TypeScript rules
- `rules/supabase.md` - Supabase integration rules
- `rules/README.md` - Index of all programming rules
- `project-types/simple-nextjs/` - Next.js + TypeScript template
- `project-types/simple-python/` - Python scripts template
- `project-types/fullstack-modular/` - Fullstack template (Next.js + FastAPI)
- `project-types/mvp-landing/` - Landing page template
- `workflows/sprints.md` - Sprint structure guide
- `workflows/architecture/` - Architecture philosophy docs
- `workflows/guides/` - Implementation guides
- `workflows/adr-template.md` - ADR template
- `workflows/prd-template.md` - PRD template
- `workflows/task-template.md` - Task template
- `agents/excel-sheets-generator.md` - Excel generation agent

### Changed
- Restructured from flat to modular organization
- Moved existing files to `workflows/` directory
- Split Outreach CLAUDE.md into modular rules

### Removed
- `crypto-lead-generation-offer.html` - Outdated HTML file
- `.claude/` folder - Moved agents to `agents/`
- `templates/` folder - Moved to `workflows/`
- `architecture/` folder - Moved to `workflows/architecture/`
- `guides/` folder - Moved to `workflows/guides/`

---

**Maintained by:** Leo
**Last Updated:** 2025-10-06
