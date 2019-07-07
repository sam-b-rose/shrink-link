import capitalize from 'lodash/capitalize'
import isPast from 'date-fns/is_past'
import addMinutes from 'date-fns/add_minutes'
import addHours from 'date-fns/add_hours'
import addDays from 'date-fns/add_days'
import addWeeks from 'date-fns/add_weeks'
import addMonths from 'date-fns/add_months'

import { Url } from './url.model'
import { uid } from '../../utils/uid'
import { encode, decode } from '../../utils/base62'
import { encodePasscode, passcodesMatch } from '../../utils/passcode'

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
  return dateActions[action](new Date(), Number(duration))
}

/**
 * Creates a new Url
 * Saves the Url to the database
 * Returns the encoded string (s) and the expires timestamp
 */
export const createUrl = async (req, res) => {
  const { url, duration, unit, passcode } = req.body
  const id = uid()
  const expires = duration ? addTime(duration, unit) : null

  // Save
  const encodedPasscode = encodePasscode(passcode)
  const doc = new Url({
    id,
    url,
    expires,
    passcode: encodedPasscode
  })
  await doc.save()

  // Convert
  const hash = encode(Number(id))

  // return encoded string
  res.json({
    hash,
    expires
  })
}

/**
 * Returns the Url info given the encoded string (s)
 * If Url not found or expired, returns 404 with error message
 */
export const getUrl = async (req, res) => {
  // Decode string
  const { hash: urlHash } = req.params
  const { passcode } = req.body
  const id = decode(urlHash)

  // Get URL from DB
  const doc = await Url.findOne({ id })

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
