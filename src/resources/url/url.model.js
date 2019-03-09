const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

autoIncrement.initialize(mongoose.connection);

const urlSchema = new mongoose.Schema(
  {
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

urlSchema.plugin(autoIncrement.plugin, 'Url');

const Url = mongoose.model('url', urlSchema)

module.exports = {
  Url
}
