from datetime import datetime, timezone
import uuid
from sqlalchemy import Column, DateTime, Numeric, String
from sqlalchemy.dialects.postgresql import UUID
from app.extensions import db

class Product(db.Model):
    __tablename__ = "products"

    product_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    current_price = Column(String, nullable=False)
    rating = Column(Numeric, nullable=False)
    image_url = Column(String, nullable=False)
    product_url = Column(String, nullable=False)
    category = Column(String)
    created_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    last_update = Column(
        DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )

