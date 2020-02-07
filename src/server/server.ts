import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import consola from 'console'
import next, { Server } from 'next'

import config from './config'
import nextConfig from '../../next.config'
import apiRouter from './resources'
import { connect } from './utils/db'

const app: Server = next({ dev: config.isDev, ...nextConfig })
const handle = app.getRequestHandler()

export const start = async (): Promise<void> => {
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
    server.get(
      '/f/:hash',
      (req, res): Promise<void> => {
        return app.render(req, res, '/viewer', {
          hash: req.params.hash,
          type: 'frame'
        })
      }
    )

    server.get(
      '/r/:hash',
      (req, res): Promise<void> => {
        return app.render(req, res, '/viewer', {
          hash: req.params.hash,
          type: 'redirect'
        })
      }
    )

    server.get(
      '*',
      (req, res): Promise<void> => {
        return handle(req, res)
      }
    )

    server.listen(config.port, (): void => {
      consola.log(`Read on http://localhost:${config.port}`)
    })
  } catch (e) {
    consola.error(e)
  }
}
