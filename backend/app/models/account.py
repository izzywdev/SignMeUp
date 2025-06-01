from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, JSON, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class Account(Base):
    """Account model for storing website accounts."""
    
    __tablename__ = "accounts"
    
    id = Column(Integer, primary_key=True, index=True)
    identity_id = Column(Integer, ForeignKey("identities.id"), nullable=False)
    
    # Website information
    website_name = Column(String(200), nullable=False)
    website_url = Column(String(500), nullable=False)
    website_domain = Column(String(200), index=True)  # For easy searching
    
    # Account credentials (encrypted)
    encrypted_username = Column(Text)
    encrypted_email = Column(Text)
    encrypted_password = Column(Text)
    
    # Account status
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    signup_completed = Column(Boolean, default=False)
    
    # Account metadata
    account_type = Column(String(100))  # free, premium, etc.
    signup_method = Column(String(50))  # manual, automated
    
    # Additional encrypted information
    encrypted_security_questions = Column(Text)  # JSON of security Q&A
    encrypted_notes = Column(Text)  # Additional notes
    
    # Automation information
    signup_script_id = Column(Integer, ForeignKey("signup_scripts.id"))
    signup_attempts = Column(Integer, default=0)
    last_signup_attempt = Column(DateTime(timezone=True))
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_accessed = Column(DateTime(timezone=True))
    
    # Relationships
    identity = relationship("Identity", back_populates="accounts")
    signup_script = relationship("SignupScript", back_populates="accounts")
    api_keys = relationship("ApiKey", back_populates="account", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Account(id={self.id}, website='{self.website_name}', identity_id={self.identity_id})>" 