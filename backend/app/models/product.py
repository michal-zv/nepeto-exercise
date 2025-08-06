from datetime import datetime, timezone
import uuid
from sqlalchemy import Column, DateTime, Numeric, String, event
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.extensions import db
from app.models.product_history import ProductHistory

class Product(db.Model):
    __tablename__ = "products"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(String, nullable=False) # todo maybe should be unique?
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

    # relationship
    price_history = relationship('ProductHistory',back_populates="product", lazy=True, cascade="all, delete-orphan")


# track price history
@event.listens_for(Product.current_price, 'set')
def track_current_price_change(target, value, old_value, initiator):
    if old_value is not None and value != old_value:
        if target.id is not None:
            history = ProductHistory(
                product_fk_id=target.id,
                old_price=str(old_value),
                changed_at=datetime.now(timezone.utc)
            )
            db.session.add(history)
