from app.extensions import db
from app.models.product import Product
from sqlalchemy.exc import SQLAlchemyError

def create(product, commit=True):
    try:
        db.session.add(product)
        if commit:
            db.session.commit()
        return product
    except SQLAlchemyError:
        db.session.rollback()
        raise

def create_many(data):
    results = []
    created_count = 0
    updated_count = 0

    try:
        for item in data:
            product, created = upsert(item)
            results.append(product)
            if created:
                created_count += 1
            else:
                updated_count += 1
        db.session.commit()
        return results, created_count, updated_count
    except SQLAlchemyError:
        db.session.rollback()
        raise

def get_all():
    return Product.query.all()

def get_by_id(id):
    return Product.query.get(id)

def update(product, data, commit=True):
    allowed_fields = {"title", "current_price", "rating", "rating", "image_url", "product_url", "category", "created_at", "last_update"}
    for key in allowed_fields:
      if key in data:
        setattr(product, key, data[key])
    try:
        if commit:
            db.session.commit()
        return product
    except SQLAlchemyError:
        db.session.rollback()
        raise

def delete(product):
    db.session.delete(product)
    try:
        db.session.commit()
    except SQLAlchemyError:
        db.session.rollback()
        raise
    
    
def upsert(data):
    """
    Upsert product by product_id.
    Does NOT commit — caller must commit.
    Returns (product, created)
    created=True means a new product was inserted.
    """
    product = get_by_product_id(data['product_id'])
    if product:
        update(product, data)
        return product, False  # updated
    else:
        product = Product(**data)
        create(product, commit=False)
        return product, True   # created


def get_by_product_id(product_id):
    return Product.query.filter_by(product_id=product_id).first()