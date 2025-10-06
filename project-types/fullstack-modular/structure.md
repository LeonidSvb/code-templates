# Fullstack Modular Project Structure

Reference implementation: Outreach project

## Project Architecture

```
project/
├── modules/              # MODULAR ARCHITECTURE
│   ├── shared/           # Common utilities
│   │   └── logger.py     # Universal logger
│   ├── module-name/      # Feature modules
│   │   ├── docs/         # Documentation
│   │   ├── scripts/      # Executable scripts
│   │   ├── tests/        # Integration tests
│   │   ├── results/      # JSON outputs
│   │   └── data/         # Input files & cache
│
├── data/                 # DATA MANAGEMENT
│   ├── raw/             # Original CSVs
│   ├── processed/       # Final processed data
│   └── logs/            # Auto-logger outputs
│
├── frontend/             # NEXT.JS APP
│   ├── src/
│   │   ├── app/         # App Router pages
│   │   ├── components/  # React components
│   │   │   └── ui/      # shadcn/ui components
│   │   └── lib/         # Utilities
│
├── backend/              # FASTAPI BACKEND
│   ├── main.py
│   ├── routers/
│   ├── models/
│   └── services/
│
├── docs/                 # DOCUMENTATION
│   ├── PRD.md           # Product requirements
│   ├── ADR.md           # Architecture decisions
│   └── guides/          # Implementation guides
│
├── sprints/              # SPRINT MANAGEMENT
│   └── 01-sprint-name/
│       ├── README.md
│       ├── docs/
│       └── tasks/
│
└── archive/              # ARCHIVED FILES
```

## Module Structure

Each module follows this pattern:

```
modules/module-name/
├── docs/               # Documentation
│   └── README.md
├── scripts/            # Executable scripts
│   └── script.py
├── tests/              # Integration tests
│   └── test_script.py
├── results/            # JSON outputs (timestamped)
│   └── results_20250106_120000.json
└── data/               # Input files & cache
    └── cache/
```

## Naming Conventions

**Python:**
- Scripts: `{purpose}.py` (e.g., `apollo_lead_collector.py`)
- Results: `{script_name}_{YYYYMMDD_HHMMSS}.json`
- Directories: `snake_case`

**Next.js:**
- Components: `{ComponentName}.tsx` (PascalCase)
- Directories: `kebab-case` (e.g., `script-runner/`)

## Key Principles

1. **Modularity** - Each feature is isolated module
2. **Embedded Configs** - No external config files
3. **Results Tracking** - Timestamped JSON outputs
4. **Clean Separation** - Frontend/Backend/Data clearly separated
5. **Documentation-First** - Each module has docs/

## Environment Files
- Core tools: `../../.env` for root config
- Service scripts: `../../../.env` for root config
- Frontend API routes: `http://localhost:8000` (FastAPI backend)
