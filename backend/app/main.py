from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
import os
from dotenv import load_dotenv

from app.routers import auth, identities, accounts, automation, chat
from app.utils.logging import setup_logging

# Load environment variables
load_dotenv()

# Setup logging
setup_logging()

# Create FastAPI application
app = FastAPI(
    title="SignMeUp API",
    description="Intelligent Identity & Account Management System",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add trusted host middleware for security
app.add_middleware(
    TrustedHostMiddleware, 
    allowed_hosts=["localhost", "127.0.0.1", "*.localhost"]
)

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(identities.router, prefix="/api/v1/identities", tags=["Identities"])
app.include_router(accounts.router, prefix="/api/v1/accounts", tags=["Accounts"])
app.include_router(automation.router, prefix="/api/v1/automation", tags=["Automation"])
app.include_router(chat.router, prefix="/api/v1/chat", tags=["Chat"])


@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "message": "SignMeUp API is running",
        "version": "1.0.0",
        "status": "healthy"
    }


@app.get("/health")
async def health_check():
    """Detailed health check endpoint."""
    return {
        "status": "healthy",
        "database": "connected (SQLite)",
        "services": {
            "automation": "available",
            "encryption": "enabled",
            "ai": "connected"
        }
    }


# Demo endpoints (kept for backward compatibility)
@app.get("/api/v1/demo/identities")
async def demo_identities():
    """Demo identities endpoint."""
    return [
        {
            "id": 1,
            "name": "Professional Identity",
            "description": "For business and professional accounts",
            "created_at": "2024-01-01T00:00:00"
        },
        {
            "id": 2,
            "name": "Personal Identity", 
            "description": "For personal social media accounts",
            "created_at": "2024-01-01T00:00:00"
        }
    ]


@app.get("/api/v1/demo/accounts")
async def demo_accounts():
    """Demo accounts endpoint."""
    return [
        {
            "id": 1,
            "website_name": "GitHub",
            "website_url": "https://github.com",
            "is_active": True,
            "signup_completed": True,
            "created_at": "2024-01-01T00:00:00"
        },
        {
            "id": 2,
            "website_name": "LinkedIn",
            "website_url": "https://linkedin.com", 
            "is_active": True,
            "signup_completed": False,
            "created_at": "2024-01-01T00:00:00"
        }
    ]


@app.post("/api/v1/demo/chat")
async def demo_chat(message: dict):
    """Demo chat endpoint."""
    user_message = message.get("message", "")
    
    if "sign me up" in user_message.lower():
        response = "I'd be happy to help you sign up! In the full version, I would analyze the website, create automation scripts, and handle the signup process for you."
    elif "identity" in user_message.lower():
        response = "You can create multiple identities to use for different types of accounts. Each identity can have its own personal information, preferences, and use cases."
    else:
        response = "Hello! I'm the SignMeUp assistant. I can help you manage identities and automate account creation. Try asking me to 'sign me up for a service' or about 'creating identities'."
    
    return {
        "response": response,
        "action_type": "demo",
        "suggested_actions": [
            "Learn about identities",
            "See demo automation",
            "View sample accounts"
        ]
    }


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "app.main:app",
        host=os.getenv("HOST", "localhost"),
        port=int(os.getenv("PORT", 8000)),
        reload=os.getenv("DEBUG", "False").lower() == "true",
    ) 