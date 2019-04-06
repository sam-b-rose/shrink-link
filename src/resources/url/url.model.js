const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
      unique: true,
      index: true
    },
    created: {
      type: Date,
      default: Date.now
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    expires: {
      type: Date,
      default: null
    },
    passcode: {
      type: String,
      default: '',
      trim: true
    }
  }
)

const Url = mongoose.model('url', urlSchema)

module.exports = {
  Url
}
