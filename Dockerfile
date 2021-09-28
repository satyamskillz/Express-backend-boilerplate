# Base on offical Node.js Alpine image
FROM node:alpine

# Set working directory
WORKDIR /usr/server

# Install KNEX globally
RUN yarn add global knex

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies
RUN yarn install --production

# Copy all files
COPY ./ ./

# Expose the listening port
EXPOSE 9999

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script when container starts
CMD [ "yarn", "start" ]