const { Router } = require('express')
const {
  getUrl,
  createUrl,
} = require('./url.controllers')

const router = Router()

/* --- Encode / Decode --- */
// /api/url/encode
router
  .route('/encode')
  .post(createUrl)

// /api/url/decode/:string
router
  .route('/decode/:s')
  .get(getUrl)

module.exports = router
