const express = require('express')
const { json, urlencoded } = require('body-parser')
const morgan = require('morgan')
const next = require('next')
const dotenv = require('dotenv')

const nextConfig = require('./next.config')
const config = require('./config')
const { connect } = require('./utils/db')
const apiRouter = require('./resources')

dotenv.config()

const app = next({ dev: config.isDev, ...nextConfig })
const handle = app.getRequestHandler()

const start = async () => {
  try {
    await connect()
    await app.prepare()

    const server = express()

    server.disable('x-powered-by')

    // Middleware
    server.use(json())
    server.use(urlencoded({ extended: true }))
    server.use(morgan('dev'))

    // API Routes
    server.use('/api', apiRouter)

    // Next.js Routes
    server.get('/f/:s', (req, res) => {
      return app.render(req, res, '/viewer', { s: req.params.s, type: 'frame' })
    })

    server.get('/r/:s', (req, res) => {
      return app.render(req, res, '/viewer', { s: req.params.s, type: 'redirect' })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(config.port, () => {
      console.log(`Read on http://localhost:${config.port}`)
    })
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  start
}
