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
