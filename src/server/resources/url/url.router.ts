import { Router } from 'express'
import { getUrl, createUrl, deleteUrl } from './url.controllers'

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
  .delete(deleteUrl)

export default router
