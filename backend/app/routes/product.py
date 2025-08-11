from flask import Blueprint, jsonify
from marshmallow import ValidationError
from app.services.product import get_all, get_by_id, create_many, update, delete
from app.scrapers.walmart import get_price, parse_product_info
from app.schemas.product import ProductCreateSchema, ProductReadSchema, ProductUpdateSchema

product_bp = Blueprint("products", __name__)
product_schema = ProductReadSchema(many=True)


@product_bp.route("/search/<string:query>", methods=["POST"])
def create_products(query):
    try:
        data = parse_product_info(query)
    except Exception as err:
        return {"message": "Something went wrong while parsing"}, 500

    # validate
    try:
        validated_data = ProductCreateSchema(many=True).load(data)
    except ValidationError as err:
        return jsonify({"error": err.messages}), 400
    
    products, created_count, updated_count = create_many(validated_data)
    return jsonify({
        "products": product_schema.dump(products),
        "created": created_count,
        "updated": updated_count
    }), 200

@product_bp.route("/products", methods=["GET"])
def get_products():
    products = get_all()
    return jsonify(product_schema.dump(products)), 200


@product_bp.route("/products/<uuid:id>", methods=["GET"])
def get_product(id):
    product = get_by_id(id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    res = ProductReadSchema().dump(product)
    return jsonify(res), 200


@product_bp.route("/products/<uuid:id>", methods=["PUT"])
def update_product(id):
    product = get_by_id(id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    price = get_price(product.product_id)

    # validate
    try:
        validated_data = ProductUpdateSchema().load({"current_price": price})
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400

    updated_product = update(product, validated_data)

    res = ProductReadSchema().dump(updated_product)
    return jsonify(res), 200


@product_bp.route("/products/<uuid:id>", methods=["DELETE"])
def delete_products(id):
    product = get_by_id(id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    
    delete(product)
    return {"message": "Product deleted", "id": id}, 200
