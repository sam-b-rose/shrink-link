import { Schema, model } from 'mongoose'

const urlSchema = new Schema({
  id: {
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
    trim: true
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
})

export const Url = model('url', urlSchema)
