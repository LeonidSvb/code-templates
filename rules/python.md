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
