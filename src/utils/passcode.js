const bcrypt = require('bcryptjs');

/**
 * @param {String} passcode - plaintext passcode to be encrypted
 * @param {Number} [saltRounds] number of salting rounds for bcrypt
 * @return {String} hashed passcode
 */
const encodePasscode = (passcode, saltRounds = 10) => {
  if (!passcode) return '';
  const salt = bcrypt.genSaltSync(saltRounds);
  const passHash = bcrypt.hashSync(passcode, salt);
  return passHash;
}

/**
 * is the plaintextPasscode's hash same as the storedPasscodeHash?
 * @param {Number} storedPasscodeHash hashed passedcode in the database
 * @param {String} plaintextPasscode - plaintext passcode client is attempting to use
 * @return {Boolean} whether or not storedPasscodeHash is hashed version of plaintextPasscode
 */
const passcodesMatch = (storedPasscodeHash, plaintextPasscode) => {
  if (!plaintextPasscode || !storedPasscodeHash) return false;

  const matches = bcrypt.compareSync(plaintextPasscode, storedPasscodeHash);
  return matches;
}


module.exports = {
  encodePasscode,
  passcodesMatch,
}
