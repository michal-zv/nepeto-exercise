from flask import Blueprint, jsonify, request
from app.services.product import get_all_products, get_product_by_id, create_many_products
from app.scrapers.walmart import set_url, get_info
# from app.models.product import Product

product_bp = Blueprint("products", __name__)

# todo POST /api/search/{name || item id}
@product_bp.route("/search", methods=["POST"])
def create_products(q):
    # todo check if name || item id

    url = set_url(q)
    data = get_info(url)
    
    # todo maybe check if json correct

    create_many_products(data)


@product_bp.route("/", methods=["GET"])
def get_products():
    products = get_all_products()
    return jsonify(products)

@product_bp.route("/<uuid:id>", methods=["GET"])
def get_product(id):
    product = get_product_by_id(id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(product)

@product_bp.route("/<uuid:id>", methods=["PUT"])
def update_product(id):
    # product = services.product.get_product_by_id(id)
    # if not product:
    #     return jsonify({"error": "Product not found"}), 404
    # data = request.get_json()
    # updated_product = services.product.update_product(product, data)
    # return jsonify(updated_product)
    pass

@product_bp.route("/<uuid:id>", methods=["GET"])
def delete_products(id):
    # product = services.product.get_product_by_id(id)
    # if not product:
    #     return jsonify({"error": "Product not found"}), 404
    # services.product.delete_product(product)
    # return jsonify({"message": "Product deleted"})
    pass