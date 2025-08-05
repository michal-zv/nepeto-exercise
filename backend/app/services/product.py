from app.extensions import db
from app.models.product import Product
from sqlalchemy.exc import SQLAlchemyError

def create_product(product):
    try:
        db.session.add(product)
        db.session.commit()
    except SQLAlchemyError:
        db.session.rollback()
        raise
    return product

def create_many_products(products):
    try:
        db.session.add_all(products)
        db.session.commit()
    except SQLAlchemyError:
        db.session.rollback()
        raise
    return products

def get_all_products():
    return Product.query.all()

def get_product_by_id(id):
    return Product.query.get(id)

def update_product(product, data):
    allowed_fields = {"title", "current_price", "rating", "rating", "image_url", "product_url", "category", "created_at", "last_update"}
    # todo maybe a util func
    for key in allowed_fields:
      if key in data:
        setattr(product, key, data[key])
    try:
        db.session.commit()
        return product
    except SQLAlchemyError:
        db.session.rollback()
        raise

def delete_product(product):
    db.session.delete(product)
    try:
        db.session.commit()
    except SQLAlchemyError:
        db.session.rollback()
        raise
    
    
    