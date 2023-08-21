# Use an official Node.js runtime as the base image
FROM node:20-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight web server to serve the React app
FROM nginx:alpine

# Copy the built React app from the previous stage into the web server's default directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the default port for the web server (usually 80)
EXPOSE 80

# Start the web server
CMD ["nginx", "-g", "daemon off;"]
