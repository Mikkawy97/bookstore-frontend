   # Use the official Node.js image to build the app
   FROM node:14 AS build

   # Set working directory
   WORKDIR /app

   # Copy package.json and package-lock.json to the container
   COPY package*.json ./

   # Install dependencies
   RUN npm install

   # Copy the rest of the application code
   COPY . .

   # Build the application
   RUN npm run build

   # Use Nginx to serve the React app
   FROM nginx:alpine

   # Copy the built React app to the Nginx html folder
   COPY --from=build /app/build /usr/share/nginx/html

   # Copy a custom Nginx configuration file
   COPY nginx.conf /etc/nginx/conf.d/default.conf

   # Expose the port
   EXPOSE 80

   # Default command to run Nginx
   CMD ["nginx", "-g", "daemon off;"]
   