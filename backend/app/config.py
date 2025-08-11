import os

class Config:
    DB_HOST = os.getenv('DB_HOST', 'db')
    DB_PORT = os.getenv('DB_PORT', '26257')
    DB_USER = os.getenv('DB_USER', 'root')
    DB_NAME = os.getenv('DB_NAME', 'nepeto_exercise')

    SQLALCHEMY_DATABASE_URI = (
        f"cockroachdb://{DB_USER}@{DB_HOST}:{DB_PORT}/{DB_NAME}?sslmode=disable"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False