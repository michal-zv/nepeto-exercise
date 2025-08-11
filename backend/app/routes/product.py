from flask import Blueprint, jsonify, current_app
from marshmallow import ValidationError
from app.services.product import get_all, get_by_id, create_many, update, delete
from app.scrapers.walmart import get_price, parse_product_info
from app.schemas.product import ProductCreateSchema, ProductReadSchema, ProductUpdateSchema

product_bp = Blueprint("products", __name__)
product_schema = ProductReadSchema(many=True)


@product_bp.route("/search/<string:query>", methods=["POST"])
def create_products(query):
    current_app.logger.info(f"Received create_products request with query: {query}")

    try:
        data = parse_product_info(query)
        current_app.logger.info(f"Parsed product info successfully for query: {query}")
    except Exception as err:
        current_app.logger.error(f"Error parsing product info for query '{query}': {err}")
        return jsonify({"error": "Something went wrong while parsing"}), 500

    try:
        validated_data = ProductCreateSchema(many=True).load(data)
        current_app.logger.info(f"Validated product data for query: {query}")
    except ValidationError as err:
        current_app.logger.warning(f"Validation error for product data on query '{query}': {err.messages}")
        return jsonify({"error": err.messages}), 400
    
    products, created_count, updated_count = create_many(validated_data)
    current_app.logger.info(f"Created {created_count} and updated {updated_count} products for query: {query}")

    return jsonify({
        "products": product_schema.dump(products),
        "created": created_count,
        "updated": updated_count
    }), 200


@product_bp.route("/products", methods=["GET"])
def get_products():
    current_app.logger.info("Fetching all products")
    products = get_all()
    return jsonify(product_schema.dump(products)), 200


@product_bp.route("/products/<uuid:id>", methods=["GET"])
def get_product(id):
    current_app.logger.info(f"Fetching product with id: {id}")
    product = get_by_id(id)
    if not product:
        current_app.logger.warning(f"Product not found with id: {id}")
        return jsonify({"error": "Product not found"}), 404
    
    res = ProductReadSchema().dump(product)
    return jsonify(res), 200


@product_bp.route("/products/<uuid:id>", methods=["PUT"])
def update_product(id):
    current_app.logger.info(f"Updating product with id: {id}")
    product = get_by_id(id)
    if not product:
        current_app.logger.warning(f"Product not found for update with id: {id}")
        return jsonify({"error": "Product not found"}), 404
    
    price = get_price(product.product_id)

    try:
        validated_data = ProductUpdateSchema().load({"current_price": price})
        current_app.logger.info(f"Validated update data for product id: {id}")
    except ValidationError as err:
        current_app.logger.warning(f"Validation error during product update for id '{id}': {err.messages}")
        return jsonify({"errors": err.messages}), 400

    updated_product = update(product, validated_data)
    current_app.logger.info(f"Product with id {id} updated successfully")

    res = ProductReadSchema().dump(updated_product)
    return jsonify(res), 200


@product_bp.route("/products/<uuid:id>", methods=["DELETE"])
def delete_products(id):
    current_app.logger.info(f"Deleting product with id: {id}")
    product = get_by_id(id)
    if not product:
        current_app.logger.warning(f"Product not found for deletion with id: {id}")
        return jsonify({"error": "Product not found"}), 404
    
    delete(product)
    current_app.logger.info(f"Product with id {id} deleted successfully")
    return jsonify({"message": "Product deleted", "id": id}), 200
