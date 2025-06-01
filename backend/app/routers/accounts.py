from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

from app.database import get_db
from app.models.user import User
from app.models.account import Account
from app.routers.auth import get_current_user
from app.utils.logging import get_logger

logger = get_logger(__name__)
router = APIRouter()


class AccountResponse(BaseModel):
    id: int
    website_name: str
    website_url: str
    is_active: bool
    signup_completed: bool
    created_at: datetime


@router.get("/", response_model=List[AccountResponse])
async def list_accounts(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """List all accounts for the current user."""
    try:
        # This is a simplified version - in the full implementation,
        # you would decrypt account data and join with identities
        result = await db.execute(
            select(Account).join(Account.identity).where(
                Account.identity.has(user_id=current_user.id)
            )
        )
        accounts = result.scalars().all()
        
        return [
            AccountResponse(
                id=account.id,
                website_name=account.website_name,
                website_url=account.website_url,
                is_active=account.is_active,
                signup_completed=account.signup_completed,
                created_at=account.created_at
            )
            for account in accounts
        ]
        
    except Exception as e:
        logger.error(f"Error listing accounts: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error retrieving accounts"
        ) 