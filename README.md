# ShrinkL.ink

Shrink long URLs – they exist only as long as you need and can be password protected.

[![Website](https://img.shields.io/website/https/shrink-link.samrose3.com.svg)](https://shrink-link.samrose3.com)
[![GitHub tag (latest SemVer)](https://img.shields.io/github/tag/samrose3/shrink-link.svg)](https://github.com/samrose3/shrink-link/releases)
[![CodeFactor](https://www.codefactor.io/repository/github/samrose3/shrink-link/badge)](https://www.codefactor.io/repository/github/samrose3/shrink-link)
[![Known Vulnerabilities](https://snyk.io/test/github/samrose3/shrink-link/badge.svg?targetFile=package.json)](https://snyk.io/test/github/samrose3/shrink-link?targetFile=package.json)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![GitHub](https://img.shields.io/github/license/samrose3/shrink-link.svg)](https://github.com/samrose3/shrink-link/blob/master/LICENSE)
[![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)](https://samrose3.github.io/shrink-link)

<a href="https://shrink-link.samrose3.com" rel="nofollow"><img src="https://user-images.githubusercontent.com/11774595/56473327-6d35e580-642f-11e9-9d95-ebc342d0e766.png" alt="preview" style="max-width:100%;"></a>

## Features

* Shrink absurdly long URLs into small, sharable ones.
* Add a timed duration of when the URL can be accessed. Use cases:
  * sharing a prototype with sponsor users
  * showing website progress to a client
* Apply a passcode to protect access to the URL. Serves as an extra layer of privacy when sharing links.
* Redirect and frame links:
  * Redirect link takes the user directly to the original link
  * Frame link embeds the original link in an [iframe](https://developer.mozilla.org/en*US/docs/Mozilla/Tech/XUL/iframe) to help hide the URL from the user
* Local history of created links with expiration status

## Getting Started

Clone the repo and install dependencies.

```shell
git clone https://github.com/samrose3/shrink-link.git
cd shrink-link
npm install
```

### Developing

#### Using Docker Compose

You can run the app in development mode using the `docker-compose.dev.yml` configuration. This will do the following in two docker containers:

* Run the Express server
* Spin up and link a MongoDB instance

##### Starting

```shell
docker-compose -f "docker-compose.dev.yml" up -d --build
```

The app should now be running on [`http://localhost:3000`](http://localhost:3000).

##### Stopping

You can stop the Docker containers with a Compose `down` command.

```shell
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

```shell
npm run dev
```

The app should now be running on [`http://localhost:3000`](http://localhost:3000).

### Running the production build

You can also use Docker Compose to run the app and the database. This uses the `docker-compose.yml` configuration. Running the app production mode creates an optimized build and does not activate [hot reloading](https://www.quora.com/Whats-hot-loading-in-Webpack-and-how-does-it-work).

Run a production build of the application locally.

```shell
docker-compose -f "docker-compose.yml" up -d --build
```
