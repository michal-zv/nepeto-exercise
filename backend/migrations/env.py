from logging.config import fileConfig
import os
import sys
from dotenv import load_dotenv

from sqlalchemy import engine_from_config, pool
from alembic import context

# Load environment variables
load_dotenv()

# --- Setup path to import your Flask app
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app
from app.extensions import db
import app.models  # import all models so Alembic sees them

# --- Create and push Flask app context
app = create_app()
app.app_context().push()

# --- Alembic Config
config = context.config

# --- Logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# --- Set SQLAlchemy metadata for autogenerate
target_metadata = db.metadata

# --- Override DB URL from Flask config (.env)
config.set_main_option("sqlalchemy.url", app.config["SQLALCHEMY_DATABASE_URI"])


def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,  # auto-detect column type changes
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
