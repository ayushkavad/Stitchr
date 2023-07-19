const express = require('express')
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require('../controllers/authController')
const {
  getAllUsers,
  getUser,
  getMe,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
} = require('../controllers/userController')
const { protect, restrictTo } = require('./../middlewares/auth')
const { uploadUserPhoto } = require('./../utils/upload')
const { resizeUserPhoto } = require('./../middlewares/resize')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword/:token', resetPassword)

router.patch('/updatePassword', protect, updatePassword)
router.patch('/updateMe', protect, uploadUserPhoto, resizeUserPhoto, updateMe)

router.get('/me', protect, getMe, getUser)
router.delete('/deleteMe', protect, deleteMe)

router.route('/').get(protect, getAllUsers)
router
  .route('/:id')
  .get(protect, getUser)
  .patch(protect, restrictTo('admin'), updateUser) // Only for administrator
  .delete(protect, restrictTo('admin'), deleteUser) // Only for administrator

module.exports = router
