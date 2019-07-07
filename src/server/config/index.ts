import dotenv from 'dotenv'
dotenv.config()

const env = process.env.NODE_ENV || 'development'
const dbUrl =
  process.env.MONGO_URL ||
  process.env.DB_URL ||
  'mongodb://localhost:27017/shrink-link'

export default {
  env,
  dbUrl,
  isDev: env === 'development',
  port: 3000
}
