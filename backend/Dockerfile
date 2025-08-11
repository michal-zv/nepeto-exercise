FROM python:3.13-slim

# Install netcat and PostgreSQL client for connectivity checks
RUN apt-get update && apt-get install -y \
  netcat-openbsd \
  postgresql-client \
  && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app source code
COPY . .

# Ensure Unix line endings and execute permission
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN sed -i 's/\r$//' docker-entrypoint.sh && chmod +x docker-entrypoint.sh

# Run the entrypoint script
ENTRYPOINT ["./docker-entrypoint.sh"]
