# Use the latest LTS version of Node.js
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Set CI=false to avoid build issues in non-interactive environments
ENV DISABLE_ESLINT_PLUGIN=true

# Set the environment variables at build time
ARG REACT_APP_API_URL
ARG REACT_APP_NAME
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ENV REACT_APP_NAME=${REACT_APP_NAME}

# Build the application
RUN npm run build

# Use Nginx to serve the built application
FROM nginx:latest AS prod

# Copy the build output to Nginx's default directory
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]