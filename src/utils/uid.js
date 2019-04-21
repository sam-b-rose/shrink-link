const crypto = require('crypto')

/**
 * 52 characters in the ascii range that can be used.
 */
const UIDCHARS = '0123456789'

/**
 * Make a Buffer into a string ready for use in URLs
 *
 * @param {String}
 * @returns {String}
 * @api private
 */
const tostr = bytes => {
  let r = []
  for (let i = 0; i < bytes.length; i++) {
    r.push(UIDCHARS[bytes[i] % UIDCHARS.length])
  }
  return r.join('')
}

/**
 * Generate an Unique Id
 *
 * @param {Number} length  The number of chars of the uid
 * @param {Number} cb (optional)  Callback for async uid generation
 * @api public
 */

const uid = (length = 10, cb) => {
  if (typeof cb !== 'function') {
    return tostr(crypto.pseudoRandomBytes(length))
  } else {
    crypto.pseudoRandomBytes(length, function(err, bytes) {
      if (err) return cb(err)
      cb(null, tostr(bytes))
    })
  }
}

module.exports = {
  uid,
}
