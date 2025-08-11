#!/bin/sh

echo "Waiting for database to be ready..."
until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER"; do
  echo "Waiting for database at $DB_HOST:$DB_PORT..."
  sleep 2
done
echo "Database is ready!"

echo "Starting Flask app..."
exec flask run --host=0.0.0.0 --port=5000
