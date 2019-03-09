const capitalize = require('lodash/capitalize')
const isPast = require('date-fns/is_past')
const addMinutes = require('date-fns/add_minutes')
const addHours = require('date-fns/add_hours')
const addDays = require('date-fns/add_days')
const addWeeks = require('date-fns/add_weeks')
const addMonths = require('date-fns/add_months')

const { Url } = require('./url.model')
const { encode, decode } = require('../../utils/base62')

const dateActions = {
  addMinutes,
  addHours,
  addDays,
  addWeeks,
  addMonths
}

/**
 * Adds duration to current time
 */
const addTime = (duration, unit) => {
  const action = `add${capitalize(unit)}`
  return dateActions[action](new Date(), parseInt(duration))
}

/**
 * Creates a new Url
 * Saves the Url to the database
 * Returns the encoded string (s) and the expires timestamp
 */
const createUrl = async (req, res) => {
  const { url, duration, unit, passcode } = req.body
  const expires = duration
    ? addTime(duration, unit)
    : null

  // Save
  const doc = new Url({
    url,
    expires,
    passcode: passcode.trim()
  });
  const { _id } = await doc.save()

  // Convert
  const s = encode(_id)

  // return encoded string
  res.json({
    s,
    expires,
  })
}

/**
 * Returns the Url info given the encoded string (s)
 * If Url not found or expired, returns 404 with error message
 */
const getUrl = async (req, res) => {
  // Decode string
  const { s } = req.params
  const _id = decode(s)

  // Get URL from DB
  const doc = await Url.findOne({ _id })

  // Not found
  if (!doc) return res.status(404).json({ url: null, message: 'URL not found' })

  // Check if valid
  if (doc.expires && isPast(doc.expires)) {
    // Remove & return if not
    // await Url.deleteOne({ _id })
    return res.status(404).json({ url: null, message: 'URL has expired' })
  }

  const { url, expires, passcode } = doc
  return res.status(400).json({ url, expires, passcode })
}

module.exports = {
  createUrl,
  getUrl
}
