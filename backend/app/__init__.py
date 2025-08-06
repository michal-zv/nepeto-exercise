from flask import Flask
from flask_cors import CORS
from app.config import Config
from app.extensions import db
import app.models
from app.routes.product import product_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # DB
    db.init_app(app)

    # CORS
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # blueprints
    app.register_blueprint(product_bp, url_prefix="/api")

    return app