module.exports = {
  dbUrl: process.env.MONGO_URL || process.env.DB_URL || 'mongodb://localhost:27017/shrink-link'
}
