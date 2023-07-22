const express = require('express')
const { follow, unfollow } = require('./../controllers/activityController')
const { protect } = require('../middlewares/auth')

const router = express.Router()

router.post('/follow/:id', protect, follow)
router.post('/unfollow/:id', protect, unfollow)

module.exports = router
