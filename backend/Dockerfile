# Use an official Node.js runtime as a parent image.
# Using a specific version like '18-slim' is recommended for smaller image size and predictability.
FROM node:18-slim

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory.
# This step is layered to leverage Docker's cache. This only runs again if dependencies change.
COPY package*.json ./

# Install production dependencies. 'npm ci' is often preferred in CI environments for faster,
# more reliable builds and it installs only from package-lock.json.
# The --only=production flag ensures devDependencies (like nodemon) are not installed.
RUN npm ci --only=production

# Bundle your app's source code inside the Docker image.
# This copies the 'src' directory and any other necessary files into the container.
COPY src ./src

# Your app in index.js will listen on the port provided by the PORT environment variable,
# which defaults to 8080 on Cloud Run. Exposing it is good practice.
EXPOSE 8080

# Define the command to run your app. This uses the "start" script from your package.json.
CMD [ "npm", "start" ]
