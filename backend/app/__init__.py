from flask import Flask
from flask_cors import CORS
from app.config import Config
from app.extensions import db as sqlalchemy_db
import app.models
from app.routes.product import product_bp
from app.db.utils import create_db_if_not_exists

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    create_db_if_not_exists()

    sqlalchemy_db.init_app(app)

    with app.app_context():
        sqlalchemy_db.create_all()

    CORS(app, resources={r"/api/*": {"origins": "*"}})

    app.register_blueprint(product_bp, url_prefix="/api")

    return app