FROM node:10.13-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm ci

# Build Next.js application
RUN npm build

# Bundle app source
COPY . .

EXPOSE 3000
CMD npm start
