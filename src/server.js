const express = require('express')
const consola = require('consola')
const { json, urlencoded } = require('body-parser')
const morgan = require('morgan')
const next = require('next')

const nextConfig = require('./next.config')
const config = require('./config')
const { connect } = require('./utils/db')
const apiRouter = require('./resources')

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
    server.get('/f/:hash', (req, res) => {
      return app.render(req, res, '/viewer', { hash: req.params.hash, type: 'frame' })
    })

    server.get('/r/:hash', (req, res) => {
      return app.render(req, res, '/viewer', { hash: req.params.hash, type: 'redirect' })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(config.port, () => {
      consola.success(`Read on http://localhost:${config.port}`)
    })
  } catch (e) {
    consola.error(e)
  }
}

module.exports = {
  start
}
