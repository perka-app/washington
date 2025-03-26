#!/bin/bash

REACT_APP_API_URL=http://localhost:3000
REACT_APP_NAME="PERKA DASHBOARD"

# Stop the existing Docker container
docker stop perka-washington || true

# Remove the existing Docker container
docker rm perka-washington || true

# Rebuild the Docker image with REACT_APP_NAME and REACT_APP_API_URL
docker build \
  --build-arg REACT_APP_API_URL=$REACT_APP_API_URL \
  --build-arg REACT_APP_NAME="$REACT_APP_NAME" \
  -t perka-washington:latest .

# Run a new Docker container
docker run --name perka-washington -d -p 80:80 perka-washington:latest