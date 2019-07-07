import { Router } from 'express'
import urlRouter from './url/url.router'

const router = Router()

router.use('/url', urlRouter)

export default router
