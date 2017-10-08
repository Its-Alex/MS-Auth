const express = require('express')
const router = express.Router()

router.post('/signup', require('../controllers/signup.js'))
router.post('/signin', require('../controllers/signin.js'))

router.use(require('../utils/middleware.js')('user'))

router.get('/', require('../controllers/get.js'))
router.patch('/update', require('../controllers/update.js'))

module.exports = router
