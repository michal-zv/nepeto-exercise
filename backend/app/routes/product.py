from flask import Blueprint, jsonify, request
from marshmallow import ValidationError
from app.services.product import get_all, get_by_id, create_many, update, delete
from app.scrapers.walmart import set_url, get_info
from app.schemas.product import ProductCreateSchema, ProductReadSchema, ProductUpdateSchema
# from app.models.product import Product

product_bp = Blueprint("products", __name__)

# todo POST /api/search/{name || item id}
@product_bp.route("/search", methods=["POST"])
def create_products(q):
    # todo check if name || item id

    url = set_url(q)
    data = get_info(url)

    # validate
    try:
        validated_data = ProductCreateSchema(many=True).load(data)
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400
    
    products = create_many(validated_data)
    return jsonify(products), 201


@product_bp.route("/", methods=["GET"])
def get_products():
    products = get_all()
    return jsonify(products)


@product_bp.route("/<uuid:id>", methods=["GET"])
def get_product(id):
    product = get_by_id(id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    res = ProductReadSchema.dump(product)
    return jsonify(res)


@product_bp.route("/<uuid:id>", methods=["PUT"])
def update_product(id):
    body = request.get_json()

    product = get_by_id(id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    # validate
    try:
        validated_data = ProductUpdateSchema().load(body)
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400

    updated_product = update(product, validated_data)
    return jsonify(updated_product), 200


@product_bp.route("/<uuid:id>", methods=["GET"])
def delete_products(id):
    product = get_by_id(id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    delete(product)
    return jsonify({"message": "Product deleted"})