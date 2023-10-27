# Use the official Node.js runtime as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Install git
RUN apt-get update && apt-get install -y git

# Clone the GitHub repository
RUN git clone https://github.com/Blacklicious/frontend-tmak.git .

# Remove package-lock.json
RUN rm package-lock.json

# Install dependencies
RUN npm install
RUN npm install --save-dev @types/react-slick

# Set the environment variable for the backend URL
ENV NEXT_PUBLIC_BACKEND_URL=https://api.nzirani.com

# Build the Next.js app
RUN npm run build

# Expose port 3000 to be accessed from outside the container
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]