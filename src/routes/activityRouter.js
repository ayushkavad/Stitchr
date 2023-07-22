const express = require('express')
const {
  follow,
  unfollow,
  like,
  dislike,
} = require('./../controllers/activityController')
const { protect } = require('../middlewares/auth')

const router = express.Router()

router.post('/follow/:id', protect, follow)
router.post('/unfollow/:id', protect, unfollow)
router.post('/like/:id', protect, like)
router.post('/dislike/:id', protect, dislike)
module.exports = router
