from marshmallow import EXCLUDE, Schema, fields

class ProductSchema(Schema):
    # product_id = fields.UUID(required=True)
    title = fields.Str(required=True)
    current_price = fields.Float(required=True)
    rating = fields.Float(required=True)
    image_url = fields.Str(required=True)
    product_url = fields.Str(required=True)
    category = fields.Str()

    class Meta:
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
    # title = fields.Str()
    # current_price = fields.Float()
    # rating = fields.Float()
    # image_url = fields.Str()
    # product_url = fields.Str()
    # category = fields.Str()
    created_at = fields.DateTime()
    last_update = fields.DateTime()