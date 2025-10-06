# FastAPI Rules

## Function Structure
- `def` for pure functions, `async def` for async operations
- Type hints for all function signatures
- Pydantic models instead of dictionaries for validation
- File structure: router, sub-routes, utilities, types

## Routes and Endpoints
- Functional components and Pydantic models
- Declarative route definitions with type annotations
- Minimize `@app.on_event("startup")`, use lifespan context managers
- Middleware for logging, monitoring, optimization

## Validation
- Pydantic `BaseModel` for input/output
- Schema classes for each data model
- Validation at route level, business logic separate

## API Response Format
```python
# Success
{"success": true, "data": {...}, "message": "Success"}

# Error
{"success": false, "error": "Error message", "details": {...}}
```

## Async Patterns
- `async def` for I/O-bound tasks
- httpx for async HTTP requests
- Connection pooling for database
- Background tasks for long operations

## Dependencies
- FastAPI
- Pydantic v2
- httpx (HTTP requests)
- python-dotenv (.env files)

## Example Route
```python
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class UserRequest(BaseModel):
    name: str
    email: str

class UserResponse(BaseModel):
    success: bool
    data: dict
    message: str

@router.post("/users", response_model=UserResponse)
async def create_user(user: UserRequest):
    if not user.email:
        raise HTTPException(status_code=400, detail="Email required")

    # Business logic here
    return {
        "success": True,
        "data": {"id": 1, "name": user.name},
        "message": "User created"
    }
```

## CORS Configuration
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
