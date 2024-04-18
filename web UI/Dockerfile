# Use an official Node.js 10 image based on Alpine
FROM node:10-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Install Node.js dependencies
# Ensure package.json and package-lock.json are copied where available
COPY package*.json ./

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside Docker image
COPY . .

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define command to run the app using CMD which defines your runtime
CMD ["node", "app.js"]
