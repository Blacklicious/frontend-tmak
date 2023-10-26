# Use the official Node.js runtime as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
#COPY package*.json ./

# Clone your GitHub repository
RUN git clone https://github.com/Blacklicious/frontend-tmak.git .

# Regenerate the package-lock.json:
RUN rm package-lock.json

# Install dependencies
RUN npm install
RUN npm install --save-dev @types/react-slick

# Copy the rest of the app's files to the container
#COPY . .


# Set the environment variable for the backend URL
ENV NEXT_PUBLIC_BACKEND_URL=https://api.nzirani.com

# Build the Next.js app
RUN npm run build

# Expose port 3000 to be accessed from outside the container
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
