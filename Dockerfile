FROM node:16-alpine

# Copy the source files for the app into the container
COPY . /app

# Set the working directory for the container
WORKDIR /app

# Install the dependencies for the app
RUN npm install

# Expose the port that the app will be running on
EXPOSE 3001

# Specify the command to run when the container is started
CMD ["npm", "run", "dev"]
