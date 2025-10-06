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
