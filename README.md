# ShrinkL.ink

Shrink long URLs – they exist only as long as you need and can be passcode protected.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://samrose3.github.io/shrink-link)

## Features

- Shrink absurdly long URLs into small, sharable ones.
- Add a timed duration of when the URL can be accessed. Use cases:
  - sharing a prototype with sponsor users
  - showing website progress to a client
- Apply a passcode to protect access to the URL. Serves as an extra layer of privacy when sharing links.
- Redirect and frame links:
  - Redirect link takes the user directly to the original link
  - Frame link embeds the original link in an [iframe](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XUL/iframe) to help hide the URL from the user
- Local history of created links with expiration status

## Getting Started

Clone the repo and install dependencies.

```bash
git clone https://github.com/samrose3/shrink-link.git
cd shrink-link
npm install
```

### Developing

#### Using Docker Compose

You can run the app in development mode using the `docker-compose.dev.yml` configuration. This will

- run the Express server
- spin up and link a MongoDB instance

##### Starting

```bash
docker-compose -f "docker-compose.dev.yml" up -d --build
```

The app should now be running on [`http://localhost:3000`](http://localhost:3000).

##### Stopping

You can stop the Docker containers with a Compose `down` command.

```bash
docker-compose -f "docker-compose.dev.yml" down
```

#### Without Docker

You can also run the app without Docker, just make sure you provide a MongoDB URL as an environment variable. Copy the `.env.sample` file, rename it to `.env`, then replace the `MONGO_URL` with your own URL.

##### Creating a MongoDB instance

Create a local or hosted [MongoDB](https://www.mongodb.com/) database before running the app. You can create a free sandbox database on [mlab.com](https://mlab.com) if you want an alternative to a local DB.

Create a `.env` file in the root directory containing your MongoDB URL with credentials. Follow the `.env.sample` file.

```text
# .env
MONGO_URL=mongodb://<user>:<password>@<hostname>:<port>/shrink-link
```

Make sure your database is running, then start the app in development mode.

```bash
npm run dev
```

The app should now be running on [`http://localhost:3000`](http://localhost:3000).

### Running the production build

You can also use Docker Compose to run the app and the database. This uses the `docker-compose.yml` configuration. Running the app production mode creates an optimized build and does not activate [hot reloading](https://www.quora.com/Whats-hot-loading-in-Webpack-and-how-does-it-work).

Run a production build of the application locally.

```bash
docker-compose -f "docker-compose.yml" up -d --build
```
