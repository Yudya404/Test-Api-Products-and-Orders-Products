# Use Node.js LTS version
FROM node:17

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]
