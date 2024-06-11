# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Install dependencies
RUN apk update && \
    apk add --no-cache g++ make python3

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Rebuild native modules (e.g., bcrypt) to match the container's architecture
RUN npm rebuild bcrypt --build-from-source

# Change the user to node (optional for security)
# USER node

# Make port 4000 available to the world outside this container
EXPOSE 4000

# Run the app
CMD ["npm", "run", "dev"]

