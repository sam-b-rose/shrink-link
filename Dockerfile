FROM node:10.13-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm ci

# Bundle app source
COPY . .

# Build Next.js application
RUN npm run build

EXPOSE 3000
CMD npm start
