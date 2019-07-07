import crypto from 'crypto'

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
const tostr = (bytes: Buffer): string => {
  let r = []
  for (let i = 0; i < bytes.length; i++) {
    //@ts-ignore
    r.push(UIDCHARS[bytes[i] % UIDCHARS.length])
  }
  return r.join('')
}

/**
 * Generate an Unique Id
 *
 * @param {Number} length (optional) The number of chars of the uid
 * @param {Number} cb (optional)  Callback for async uid generation
 * @api public
 */

export const uid = (
  length: number = 10,
  cb?: (err: Error | null, uid?: string) => string
): string | void => {
  if (typeof cb !== 'function') {
    return tostr(crypto.pseudoRandomBytes(length))
  } else {
    crypto.pseudoRandomBytes(length, function(err, bytes): string | void {
      if (err) return cb(err)
      cb(null, tostr(bytes))
    })
  }
}
