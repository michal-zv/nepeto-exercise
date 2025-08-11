from sqlalchemy import create_engine, text
import os

def create_db_if_not_exists():
    db_user = os.getenv("DB_USER", "root")
    db_host = os.getenv("DB_HOST", "db")
    db_port = os.getenv("DB_PORT", "26257")
    db_name = os.getenv("DB_NAME", "mydb")

    url = f"cockroachdb://{db_user}@{db_host}:{db_port}/?sslmode=disable"
    engine = create_engine(url)

    with engine.connect() as connection:
        connection.execute(text(f"CREATE DATABASE IF NOT EXISTS {db_name};"))
        connection.commit()
