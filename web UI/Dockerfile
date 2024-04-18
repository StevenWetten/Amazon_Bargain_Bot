# Start with a base image of Nginx running on Alpine Linux
FROM node:10-alpine

#Allow to connect to mysql
RUN npm install mysql

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Remove any existing files in the working directory
RUN rm -rf ./*

# Copy the static content from your project directory into the working directory in the container
COPY . .

# Expose port 80 on the container
EXPOSE 80

# Start Nginx and ensure the daemon stays in the foreground so Docker can track the process properly
CMD ["nginx", "-g", "daemon off;"]
