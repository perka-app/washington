#!/usr/bin/env bash

USERNAME=maksimpegov
IMAGE=perka-washington

# Set environment variables for the build
REACT_APP_API_URL=http://localhost:3000
REACT_APP_NAME="PERKA DASHBOARD"

# Build and push the Docker image with build arguments
docker buildx build --platform linux/amd64 \
  --build-arg REACT_APP_API_URL=$REACT_APP_API_URL \
  --build-arg REACT_APP_NAME="$REACT_APP_NAME" \
  -t $USERNAME/$IMAGE:latest . && \
docker push $USERNAME/$IMAGE:latest