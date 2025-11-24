# Use official Node.js LTS
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the app
COPY . .

# Set environment variable for production
ENV NODE_ENV=production

# Expose the port your app uses (default 3000)
EXPOSE 4000

# Start the app
CMD ["npm", "start"]
