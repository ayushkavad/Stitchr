const express = require('express')
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require('../controllers/authController')
const { updateMe, deleteMe } = require('../controllers/userController')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword/:token', resetPassword)

router.patch('/updatePassword', updatePassword)

router.patch('/updateMe', updateMe)
router.delete('/deleteMe', deleteMe)

module.exports = router
