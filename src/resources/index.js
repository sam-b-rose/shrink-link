const { Router } = require('express')
const urlRouter = require('./url/url.router')

const router = Router()

router.use('/url', urlRouter)

module.exports = router
