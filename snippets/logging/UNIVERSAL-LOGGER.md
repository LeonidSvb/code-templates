# Universal Logging System

**Ready-to-use logging solution for any project**

Zero-config, daily rotation, JSON structured logs. Works with Python, FastAPI, Next.js.

---

## Quick Copy-Paste

### Option 1: Modular (Recommended)

**When:** Multi-module projects (like Cold Outreach Platform)

**Structure:**
```
your-project/
├── modules/
│   ├── logging/
│   │   ├── shared/
│   │   │   └── universal_logger.py    # Copy this file
│   │   ├── logs/                       # Auto-created
│   │   │   ├── 2025-10-06.log         # Daily logs
│   │   │   └── errors/
│   │   │       └── 2025-10-06.log     # Errors only
│   │   └── README.md                   # Optional docs
│   ├── your_module/
│   │   └── script.py                   # Uses logger
│   └── another_module/
│       └── api.py                      # Uses logger
```

**Copy file:**
```bash
# Copy universal_logger.py to your project
cp universal_logger.py your-project/modules/logging/shared/

# Done! Logs auto-save to modules/logging/logs/
```

---

### Option 2: Root (Simple Projects)

**When:** Single-file scripts, small projects, no modules

**Structure:**
```
your-project/
├── logger.py              # Copy universal_logger.py here (rename)
├── logs/                  # Auto-created
│   ├── 2025-10-06.log
│   └── errors/
│       └── 2025-10-06.log
└── main.py                # Your script
```

**Copy file:**
```bash
# Copy and rename to logger.py
cp universal_logger.py your-project/logger.py

# Edit line 31-32 in logger.py:
# From:
module_dir = Path(__file__).parent.parent  # modules/logging/
# To:
module_dir = Path(__file__).parent  # project root
```

---

## Usage Examples

### Python Script

```python
from modules.logging.shared.universal_logger import get_logger

logger = get_logger(__name__)

# Basic logging
logger.info("Script started")
logger.info("Processing leads", count=100, status="active")

# Warning
logger.warning("Rate limit approaching", remaining=5, limit=100)

# Error with exception
try:
    result = risky_operation()
except Exception as e:
    logger.error("Operation failed", error=e, attempt=3)
    raise

# Debug (development only)
logger.debug("Debug info", variable=some_value)
```

**Output (JSON):**
```json
{"timestamp": "2025-10-06T18:40:47", "module": "apollo_collector", "level": "INFO", "message": "Processing leads", "count": 100, "status": "active"}
```

---

### FastAPI Backend

```python
from fastapi import FastAPI
from modules.logging.shared.universal_logger import get_logger

logger = get_logger("backend")
app = FastAPI()

@app.get("/api/users")
async def get_users():
    logger.info("API request received", endpoint="/api/users", method="GET")

    try:
        users = await fetch_users()
        logger.info("API response sent", status=200, count=len(users))
        return users
    except Exception as e:
        logger.error("API request failed", error=e, endpoint="/api/users")
        raise
```

**Auto-log middleware (optional):**
```python
from starlette.middleware.base import BaseHTTPMiddleware
import time

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        logger = get_logger("fastapi_backend")
        start_time = time.time()

        logger.info("API Request",
                   method=request.method,
                   path=request.url.path,
                   client_ip=request.client.host)

        response = await call_next(request)

        duration = (time.time() - start_time) * 1000  # ms
        logger.info("API Response",
                   method=request.method,
                   path=request.url.path,
                   status_code=response.status_code,
                   duration_ms=round(duration, 2))

        return response

app.add_middleware(LoggingMiddleware)
```

---

### Next.js Frontend

**Client-side logger wrapper:**

```typescript
// lib/logger.ts
const API_ENDPOINT = '/api/logs'  // Optional: send to backend

export const logger = {
  info(message: string, data?: Record<string, any>) {
    console.log(`[INFO] ${message}`, data)

    // Optional: Send to backend
    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        level: 'INFO',
        message,
        ...data,
        timestamp: new Date().toISOString()
      })
    }).catch(() => {}) // Ignore errors in logging
  },

  error(message: string, error?: Error, data?: Record<string, any>) {
    console.error(`[ERROR] ${message}`, error, data)

    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        level: 'ERROR',
        message,
        error: error?.message,
        stack: error?.stack,
        ...data,
        timestamp: new Date().toISOString()
      })
    }).catch(() => {})
  }
}
```

**Usage:**
```typescript
'use client'

import { logger } from '@/lib/logger'

export function FileUpload() {
  const handleUpload = async (file: File) => {
    logger.info('CSV upload started', { filename: file.name })

    try {
      const result = await uploadFile(file)
      logger.info('CSV upload successful', {
        filename: file.name,
        rows: result.count
      })
    } catch (error) {
      logger.error('CSV upload failed', error as Error, {
        filename: file.name
      })
    }
  }
}
```

**Backend endpoint (optional):**
```python
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class LogEntry(BaseModel):
    level: str
    message: str
    timestamp: str

@router.post("/api/logs")
async def receive_log(entry: LogEntry):
    logger = get_logger("frontend")

    if entry.level == "ERROR":
        logger.error(entry.message)
    else:
        logger.info(entry.message)

    return {"success": True}
```

---

### Performance Tracking with @auto_log

```python
from modules.logging.shared.universal_logger import auto_log

@auto_log
def process_csv(file_path: str):
    # Automatically logs:
    # - Function start (DEBUG)
    # - Function completion with duration (INFO)
    # - Errors with duration (ERROR)

    df = pd.read_csv(file_path)
    return transform_data(df)

@auto_log
async def fetch_leads_from_api(limit: int):
    # Works with async functions too
    response = await httpx.get(f'/api/leads?limit={limit}')
    return response.json()
```

**Output:**
```json
{"timestamp": "2025-10-06T10:00:00", "module": "data_processor", "level": "DEBUG", "message": "process_csv started"}
{"timestamp": "2025-10-06T10:00:03", "module": "data_processor", "level": "INFO", "message": "process_csv completed", "duration_seconds": 3.24}
```

---

## Node.js / Express Backend

**Copy logger to Node project:**

```javascript
// logger.js
const fs = require('fs')
const path = require('path')

class Logger {
  constructor(moduleName) {
    this.moduleName = moduleName
    this.logsDir = path.join(__dirname, 'logs')
    this.errorsDir = path.join(this.logsDir, 'errors')

    // Create directories
    if (!fs.existsSync(this.logsDir)) fs.mkdirSync(this.logsDir, { recursive: true })
    if (!fs.existsSync(this.errorsDir)) fs.mkdirSync(this.errorsDir, { recursive: true })
  }

  _getCurrentDay() {
    return new Date().toISOString().split('T')[0] // YYYY-MM-DD
  }

  _writeLog(level, message, extra = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      module: this.moduleName,
      level,
      message,
      ...extra
    }

    const day = this._getCurrentDay()
    const logLine = JSON.stringify(entry) + '\n'

    // Write to main log
    fs.appendFileSync(path.join(this.logsDir, `${day}.log`), logLine)

    // Write errors to separate file
    if (level === 'ERROR') {
      fs.appendFileSync(path.join(this.errorsDir, `${day}.log`), logLine)
    }
  }

  info(message, extra) {
    this._writeLog('INFO', message, extra)
  }

  error(message, error, extra = {}) {
    const errorData = error ? {
      error_type: error.name,
      error_details: error.message,
      stack: error.stack
    } : {}
    this._writeLog('ERROR', message, { ...errorData, ...extra })
  }

  warning(message, extra) {
    this._writeLog('WARNING', message, extra)
  }

  debug(message, extra) {
    this._writeLog('DEBUG', message, extra)
  }
}

const loggers = {}

function getLogger(moduleName) {
  if (!loggers[moduleName]) {
    loggers[moduleName] = new Logger(moduleName)
  }
  return loggers[moduleName]
}

module.exports = { getLogger }
```

**Usage:**
```javascript
const { getLogger } = require('./logger')
const logger = getLogger('api-server')

app.get('/api/users', async (req, res) => {
  logger.info('API request received', { endpoint: '/api/users' })

  try {
    const users = await User.find()
    logger.info('API response sent', { status: 200, count: users.length })
    res.json(users)
  } catch (error) {
    logger.error('API request failed', error, { endpoint: '/api/users' })
    res.status(500).json({ error: 'Internal error' })
  }
})
```

---

## Log Format

**Single-line JSON:**
```json
{"timestamp": "2025-10-06T18:40:47.080064", "module": "fastapi_backend", "level": "INFO", "message": "API Request", "method": "GET", "path": "/api/csv/leads", "client_ip": "127.0.0.1"}
```

**Benefits:**
- ✅ Easy parsing (`jq`, `grep`, Python)
- ✅ Structured search (find all errors, specific endpoints)
- ✅ Import to analytics tools (Datadog, Elasticsearch)

---

## Viewing Logs

### Command Line

```bash
# Today's logs
cat logs/2025-10-06.log

# Only errors
cat logs/errors/2025-10-06.log

# Search for specific text
grep "API failed" logs/2025-10-06.log

# Count errors today
grep -c "ERROR" logs/2025-10-06.log

# Real-time monitoring (PowerShell)
Get-Content logs/2025-10-06.log -Wait

# Real-time monitoring (Bash)
tail -f logs/2025-10-06.log
```

### Python Analysis

```python
import json

with open('logs/2025-10-06.log') as f:
    for line in f:
        log = json.loads(line)
        if log['level'] == 'ERROR':
            print(f"{log['timestamp']} - {log['message']}")
```

### VS Code

```bash
code logs/2025-10-06.log
```

---

## Features

### ✅ Daily Rotation
- Auto-creates new log file each day
- Format: `YYYY-MM-DD.log`
- Old logs kept forever (or delete manually)

### ✅ Separate Error Logs
- Errors duplicated to `logs/errors/`
- Quick debugging: only check error file
- Same daily rotation

### ✅ JSON Structured
- Easy parsing and analysis
- Import to databases
- Search specific fields

### ✅ Zero Maintenance
- No manual file management
- No log file size limits (handle manually if needed)
- No configuration needed

### ✅ Multi-Language
- Python (native)
- Node.js (provided)
- TypeScript/Next.js (wrapper)
- Any language (copy pattern)

---

## Installation

### For Modular Projects

```bash
# 1. Copy logger file
mkdir -p modules/logging/shared
cp universal_logger.py modules/logging/shared/

# 2. Use in any module
# (logs auto-save to modules/logging/logs/)
```

### For Simple Projects

```bash
# 1. Copy and rename
cp universal_logger.py logger.py

# 2. Edit line 31-32:
# Change: module_dir = Path(__file__).parent.parent
# To:     module_dir = Path(__file__).parent

# 3. Use in scripts
# (logs auto-save to ./logs/)
```

---

## Configuration (Optional)

**Change log location:**

Edit line 31-33 in `universal_logger.py`:

```python
# Default (modular):
module_dir = Path(__file__).parent.parent  # modules/logging/
self.logs_dir = module_dir / "logs"

# Root level:
module_dir = Path(__file__).parent  # project root
self.logs_dir = module_dir / "logs"

# Custom path:
self.logs_dir = Path("/var/log/myapp")
```

**Change log format:**

Edit `_log()` method to add/remove fields:

```python
log_entry = {
    "timestamp": datetime.now().isoformat(),
    "module": self.module_name,
    "level": level,
    "message": message,
    "environment": "production",  # Add custom field
    "version": "1.0.0"             # Add version
}
```

---

## Comparison with Other Solutions

| Feature | Universal Logger | Python logging | Winston (Node) | Pino (Node) |
|---------|-----------------|----------------|----------------|-------------|
| Setup time | 0 min | 10 min | 15 min | 10 min |
| Config needed | No | Yes | Yes | Yes |
| Daily rotation | Built-in | Manual | Plugin | Plugin |
| JSON output | Built-in | Manual | Built-in | Built-in |
| Error separation | Built-in | Manual | Manual | Manual |
| Multi-language | Yes | No | No | No |

---

## Real-World Example

**Cold Outreach Platform (this project):**

```
modules/logging/logs/
├── 2025-10-04.log (15 KB, 200 entries)
├── 2025-10-06.log (8 KB, 100 entries)
└── errors/
    └── (empty - no errors)
```

**Stats:**
- 300+ log entries over 2 days
- FastAPI backend: every request logged
- Python scripts: all operations tracked
- Zero errors in production

---

## Troubleshooting

**Logs not created?**

Check permissions:
```python
# Add debug print
print(f"Logs dir: {self.logs_dir}")
print(f"Exists: {self.logs_dir.exists()}")
```

**Duplicate logs?**

Clear handlers before adding new:
```python
if self.logger.handlers:
    self.logger.handlers.clear()
```

**Logs in wrong timezone?**

Change datetime:
```python
from zoneinfo import ZoneInfo
datetime.now(ZoneInfo("Asia/Jakarta"))  # Bali time
```

---

## License

Free to use in any project. No attribution needed.

---

## Source

Extracted from: [Cold Outreach Platform](https://github.com/LeonidSvb/cold-outreach)
Created: 2025-10-04
Last Updated: 2025-10-06
