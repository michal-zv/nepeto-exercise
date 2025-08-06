from marshmallow import EXCLUDE, Schema, fields
from app.models.product_history import ProductHistory


class ProductHistorySchema(Schema):
    old_price = fields.String(required=True)
    changed_at = fields.DateTime()

    class Meta:
        model = ProductHistory
        load_instance = True
        unknown = EXCLUDE  # ignore unexpected fields
