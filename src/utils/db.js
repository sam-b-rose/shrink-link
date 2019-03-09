const mongoose = require('mongoose')
const config = require('../config')

const connect = (url = config.dbUrl, opts = {}) => {
  return mongoose.connect(
    url,
    { ...opts, useNewUrlParser: true }
  )
}

module.exports = {
  connect
}
