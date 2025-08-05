from marshmallow import EXCLUDE, Schema, fields
from app.models.product import Product

class ProductSchema(Schema):
    title = fields.Str(required=True)
    current_price = fields.Str(required=True)
    rating = fields.Float(required=True, as_string=True)
    image_url = fields.Str(required=True)
    product_url = fields.Str(required=True)
    category = fields.Str()

    class Meta:
        model=Product
        load_instance = True
        unknown = EXCLUDE  # ignore unexpected fields

class ProductCreateSchema(ProductSchema):
    pass

class ProductUpdateSchema(Schema):
    title = fields.Str()
    current_price = fields.Float()
    rating = fields.Float()
    image_url = fields.Str()
    product_url = fields.Str()
    category = fields.Str()

class ProductReadSchema(ProductSchema): 
    product_id = fields.UUID()
    created_at = fields.DateTime()
    last_update = fields.DateTime()