const express = require('express')
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('../controllers/postController')
const { uploadImageCover } = require('./../utils/upload')
const { protect, postOwner, isOwner } = require('./../middlewares/auth')
const commentRoutes = require('./../routes/commentRoutes')

const router = express.Router()

router.use('/:postId/comments', commentRoutes)

router
  .route('/')
  .get(getAll)
  .post(protect, uploadImageCover, postOwner, createOne)
router
  .route('/:id')
  .get(getOne)
  .patch(protect, updateOne)
  .delete(protect, isOwner, deleteOne)

module.exports = router
