from flask import Flask
from app.config import Config
from app.extensions import db
from app.models.product import Product
from app.routes.product import product_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # DB
    db.init_app(app)

    # blueprints
    app.register_blueprint(product_bp, url_prefix="/api/products")

    with app.app_context():
        db.create_all()

    return app