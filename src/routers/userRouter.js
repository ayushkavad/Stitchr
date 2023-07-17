const express = require('express')
const {
  signup,
  login,
  forgotPassword,
} = require('../controllers/authController')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/forgotPassword', forgotPassword)

module.exports = router
