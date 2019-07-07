const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(
  ''
)
const base = alphabet.length

/*
 * Convert an ID to a String
 */
export const encode = (i: number): string => {
  if (!i) return alphabet[0]
  let s = ''
  while (i > 0) {
    s += alphabet[i % base]
    //@ts-ignore
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
export const decode = (s: string): number => {
  return s.split('').reduce((id, c) => id * base + alphabet.indexOf(c), 0)
}

export default {
  encode,
  decode
}
