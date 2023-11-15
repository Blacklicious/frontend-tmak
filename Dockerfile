# Use the official Node.js runtime as the base image
FROM node:21-slim

# Set the working directory inside the container
WORKDIR /app

# Copy only the package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Copy the rest of the code
COPY . .

# Install dependencies
RUN npm install
RUN npm install sharp

# Set the environment variable for the backend URL
ENV NEXT_PUBLIC_BACKEND_URL=https://api.nzirani.com


# Build the Next.js app
RUN npm run build

# Expose port 3000 to be accessed from outside the container
ENV PORT 8080
EXPOSE 8080

# The command that gets executed by default when using the entrypoint
CMD ["npm", "start"]
