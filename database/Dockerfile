# Use the official PostgreSQL image from Docker Hub
FROM postgres:latest

# Set environment variables for PostgreSQL
ENV POSTGRES_USER=your_username
ENV POSTGRES_PASSWORD=your_password
ENV POSTGRES_DB=your_database

# Expose the default PostgreSQL port
EXPOSE 5432

# Add any custom initialization scripts (optional)
# COPY init.sql /docker-entrypoint-initdb.d/

# Default command (inherited from the base image)
CMD ["postgres"]