const express = require('express')
const {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require('./../controllers/authController')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)

router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)

module.exports = router
