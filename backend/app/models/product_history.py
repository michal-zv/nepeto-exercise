from datetime import datetime, timezone
import uuid
from sqlalchemy import Column, DateTime, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.extensions import db

class ProductHistory(db.Model):
    __tablename__ = "product_history"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_fk_id = Column(UUID(as_uuid=True), ForeignKey("products.id"), nullable=False)
    old_price = Column(String, nullable=False)
    changed_at = Column(
        DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )

    product = relationship("Product", back_populates="price_history")