"""
Database configuration and utilities for SignMeUp.
Modified to use SQLite for local development.
"""
import asyncio
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase
import os
from pathlib import Path

# Create database directory if it doesn't exist
db_dir = Path("data")
db_dir.mkdir(exist_ok=True)

# SQLite database URL for local development
DATABASE_URL = f"sqlite+aiosqlite:///./data/signmeup.db"

# Create async engine
engine = create_async_engine(
    DATABASE_URL,
    echo=True,  # Set to False in production
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

# Create session maker
async_session_maker = async_sessionmaker(
    engine, 
    class_=AsyncSession, 
    expire_on_commit=False
)


class Base(DeclarativeBase):
    """Base class for all database models."""
    pass


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    """Get async database session."""
    async with async_session_maker() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


# Alias for backward compatibility
get_db = get_async_session


async def create_tables():
    """Create all database tables."""
    try:
        from app.models import User, Identity, Account, SignupScript, ApiKey
        
        async with engine.begin() as conn:
            # Create all tables
            await conn.run_sync(Base.metadata.create_all)
        
        print("✅ Database tables created successfully!")
        
    except Exception as e:
        print(f"❌ Error creating database tables: {e}")
        raise


async def init_database():
    """Initialize database with sample data."""
    try:
        await create_tables()
        
        # Add sample data for demo
        async with async_session_maker() as session:
            from app.models import User, Identity, Account
            from app.utils.encryption import EncryptionManager
            import hashlib
            from datetime import datetime
            
            # Check if data already exists
            existing_user = await session.get(User, 1)
            if existing_user:
                print("✅ Database already initialized with sample data")
                return
            
            # Create demo user
            demo_user = User(
                email="demo@signmeup.com",
                username="demo_user",
                hashed_password=hashlib.sha256("demo123".encode()).hexdigest(),
                master_key_hash=hashlib.sha256("masterkey123".encode()).hexdigest(),
                is_active=True
            )
            session.add(demo_user)
            await session.flush()  # Get the user ID
            
            # Initialize encryption manager with a demo master key
            demo_master_key = "demo_master_key_123"
            encryption_manager = EncryptionManager(demo_master_key)
            
            # Create demo identities with simple data structure
            professional_identity = Identity(
                user_id=demo_user.id,
                name="Professional Identity",
                description="For business and professional accounts",
                encrypted_first_name=encryption_manager.encrypt("Alex"),
                encrypted_last_name=encryption_manager.encrypt("Johnson"),
                encrypted_email=encryption_manager.encrypt("alex.johnson.pro@email.com"),
                encrypted_phone=encryption_manager.encrypt("+1-555-0123"),
                encrypted_address_line1=encryption_manager.encrypt("123 Tech Street"),
                encrypted_city=encryption_manager.encrypt("San Francisco"),
                encrypted_state=encryption_manager.encrypt("CA"),
                encrypted_zip_code=encryption_manager.encrypt("94105"),
                encrypted_country=encryption_manager.encrypt("USA"),
                encrypted_profession=encryption_manager.encrypt("Software Developer"),
                encrypted_company=encryption_manager.encrypt("TechCorp Inc."),
                encrypted_bio=encryption_manager.encrypt("Experienced software developer specializing in full-stack applications")
            )
            
            personal_identity = Identity(
                user_id=demo_user.id,
                name="Personal Identity", 
                description="For social media and personal accounts",
                encrypted_first_name=encryption_manager.encrypt("Alex"),
                encrypted_last_name=encryption_manager.encrypt("J"),
                encrypted_email=encryption_manager.encrypt("alexj.personal@email.com"),
                encrypted_phone=encryption_manager.encrypt("+1-555-0124"),
                encrypted_address_line1=encryption_manager.encrypt("California, USA"),
                encrypted_profession=encryption_manager.encrypt("Tech Enthusiast"),
                encrypted_bio=encryption_manager.encrypt("Tech enthusiast who loves exploring new technologies")
            )
            
            session.add_all([professional_identity, personal_identity])
            await session.flush()
            
            # Create demo accounts
            accounts = [
                Account(
                    identity_id=professional_identity.id,
                    website_name="GitHub",
                    website_url="https://github.com",
                    website_domain="github.com",
                    encrypted_username=encryption_manager.encrypt("alex_johnson_dev"),
                    encrypted_email=encryption_manager.encrypt("alex.johnson.pro@email.com"),
                    encrypted_password=encryption_manager.encrypt("SecurePass123!"),
                    is_active=True,
                    signup_completed=True,
                    signup_method="automated",
                    encrypted_notes=encryption_manager.encrypt("Used for software development projects")
                ),
                Account(
                    identity_id=professional_identity.id,
                    website_name="LinkedIn",
                    website_url="https://linkedin.com",
                    website_domain="linkedin.com",
                    encrypted_username=encryption_manager.encrypt("alex-johnson-dev"),
                    encrypted_email=encryption_manager.encrypt("alex.johnson.pro@email.com"),
                    encrypted_password=encryption_manager.encrypt("LinkedInPass456!"),
                    is_active=True,
                    signup_completed=True,
                    signup_method="automated",
                    encrypted_notes=encryption_manager.encrypt("Professional networking account")
                ),
                Account(
                    identity_id=personal_identity.id,
                    website_name="Twitter",
                    website_url="https://twitter.com",
                    website_domain="twitter.com",
                    encrypted_username=encryption_manager.encrypt("alexj_tech"),
                    encrypted_email=encryption_manager.encrypt("alexj.personal@email.com"),
                    encrypted_password=encryption_manager.encrypt("TwitterPass789!"),
                    is_active=True,
                    signup_completed=False,
                    signup_method="automated",
                    encrypted_notes=encryption_manager.encrypt("Email verification pending")
                ),
                Account(
                    identity_id=personal_identity.id,
                    website_name="Reddit",
                    website_url="https://reddit.com",
                    website_domain="reddit.com",
                    encrypted_username=encryption_manager.encrypt("alexj_techie"),
                    encrypted_email=encryption_manager.encrypt("alexj.personal@email.com"),
                    encrypted_password=encryption_manager.encrypt("RedditPass101!"),
                    is_active=True,
                    signup_completed=True,
                    signup_method="automated",
                    encrypted_notes=encryption_manager.encrypt("Community discussions and tech news")
                ),
                Account(
                    identity_id=professional_identity.id,
                    website_name="StackOverflow",
                    website_url="https://stackoverflow.com",
                    website_domain="stackoverflow.com",
                    encrypted_username=encryption_manager.encrypt("alex_johnson_dev"),
                    encrypted_email=encryption_manager.encrypt("alex.johnson.pro@email.com"),
                    encrypted_password=encryption_manager.encrypt("StackPass202!"),
                    is_active=True,
                    signup_completed=True,
                    signup_method="automated",
                    encrypted_notes=encryption_manager.encrypt("Technical Q&A and problem solving")
                )
            ]
            
            session.add_all(accounts)
            await session.commit()
            
        print("✅ Database initialized with sample data!")
        
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        raise


if __name__ == "__main__":
    asyncio.run(init_database()) 