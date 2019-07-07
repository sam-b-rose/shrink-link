import { Router } from 'express'
import { getUrl, createUrl } from './url.controllers'

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

export default router
