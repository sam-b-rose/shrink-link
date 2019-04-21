const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')
const base = alphabet.length

/*
 * Convert an ID to a String
 */
const encode = i => {
  if (!i) return alphabet[0]
  let s = ''
  while (i > 0) {
    s += alphabet[i % base]
    i = parseInt(i / base, 10)
  }
  return s
    .split('')
    .reverse()
    .join('')
}

/*
 * Convert a String to an ID
 */
const decode = s => {
  return s.split('').reduce((id, c) => id * base + alphabet.indexOf(c), 0)
}

module.exports = {
  encode,
  decode,
}
