# Use Python base image
FROM python:3.11

# Set the working directory
WORKDIR /app

# Copy requirements and install dependencies in one step
COPY requirements.txt .  
RUN pip install --no-cache-dir -r requirements.txt && rm -rf /root/.cache/pip

# Copy the backend code (make sure to add .dockerignore to avoid unnecessary files)
COPY . .

# Expose the FastAPI port
EXPOSE 8000

# Run the FastAPI app (using --host 0.0.0.0 to make it accessible externally)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
