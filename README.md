# ShrinkL.ink

Shrink long URLs – they exist only as long as you need and can be passcode protected.

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
yarn
```

### Developing

Create a local or hosted [MongoDB](https://www.mongodb.com/) database before running the app. You can create a free sandbox database on [mlab.com](https://mlab.com) if you want an alternative to a local DB.

Create a `.env` file in the root directory containing your MongoDB URL with credentials. Follow the `.env.sample` file.

```text
# .env
MONGO_URL='mongodb://<user>:<password>@<hostname>:<port>/shrink-link'
```

Make sure your database is running, then start the app in development mode.

```bash
yarn dev
```

The app should now be running on [`http://localhost:3000`](http://localhost:3000).

### Running the production build

You can also use Docker Compose to run the app and the database.

> This has not been configured for running the application in development mode. This has been used primarily to test the Docker build before pushing next images to Docker Hub.

Run a production build of the application locally.

```bash
docker-compose up
```
