# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Set environment variable for MongoDB connection string
ENV MONGODB_URI mongodb+srv://mubeatrack:<PASSWORD>@mubeatrack.f4asqw2.mongodb.net/mubeatrack?retryWrites=true&w=majority

# Expose the port that the app is listening on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
