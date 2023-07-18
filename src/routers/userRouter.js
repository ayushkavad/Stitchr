const express = require('express')
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require('../controllers/authController')
const { updateMe, deleteMe } = require('../controllers/userController')
const { protect } = require('./../middlewares/auth')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword/:token', resetPassword)

router.patch('/updatePassword', protect, updatePassword)
router.patch('/updateMe', protect, updateMe)

router.delete('/deleteMe', protect, deleteMe)

module.exports = router
