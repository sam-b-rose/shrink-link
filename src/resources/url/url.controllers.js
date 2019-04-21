const capitalize = require('lodash/capitalize')
const isPast = require('date-fns/is_past')
const addMinutes = require('date-fns/add_minutes')
const addHours = require('date-fns/add_hours')
const addDays = require('date-fns/add_days')
const addWeeks = require('date-fns/add_weeks')
const addMonths = require('date-fns/add_months')

const { Url } = require('./url.model')
const { uid } = require('../../utils/uid')
const { encode, decode } = require('../../utils/base62')
const { encodePasscode, passcodesMatch } = require('../../utils/passcode')

const dateActions = {
  addMinutes,
  addHours,
  addDays,
  addWeeks,
  addMonths,
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
  const _id = uid()
  const expires = duration ? addTime(duration, unit) : null

  // Save
  const encodedPasscode = encodePasscode(passcode)
  const doc = new Url({
    _id,
    url,
    expires,
    passcode: encodedPasscode,
  })
  await doc.save()

  // Convert
  const hash = encode(_id)

  // return encoded string
  res.json({
    hash,
    expires,
  })
}

/**
 * Returns the Url info given the encoded string (s)
 * If Url not found or expired, returns 404 with error message
 */
const getUrl = async (req, res) => {
  // Decode string
  const { hash: urlHash } = req.params
  const { passcode } = req.body
  const _id = decode(urlHash)

  // Get URL from DB
  const doc = await Url.findOne({ _id })

  // Not found
  if (!doc) {
    return res.status(404).json({ message: 'URL not found' })
  }

  // Check if valid
  if (doc.expires && isPast(doc.expires)) {
    // Remove & return if not
    return res.status(404).json({ message: 'URL has expired' })
  }

  // Check for passcode
  const docHashedPasscode = doc.passcode
  if (docHashedPasscode && !passcodesMatch(docHashedPasscode, passcode)) {
    return res.status(403).json({ hasPasscode: true })
  }

  const { url } = doc
  return res.status(200).json({ url })
}

module.exports = {
  createUrl,
  getUrl,
}
