const { Router } = require('express')
const { getUrl, createUrl } = require('./url.controllers')

const router = Router()

/* --- Encode --- */
// /api/url
router.route('/').post(createUrl)

/* --- Decode & Passcode --- */
// /api/url/:hash
router
  .route('/:hash')
  .get(getUrl)
  .post(getUrl)

module.exports = router
