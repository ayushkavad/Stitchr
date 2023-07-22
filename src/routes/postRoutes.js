const express = require('express')
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('../controllers/postController')
const Post = require('./../models/postModel')
const { uploadImageCover } = require('./../utils/upload')
const { protect, isOwner } = require('./../middlewares/auth')
const commentRoutes = require('./../routes/commentRoutes')

const router = express.Router()

router.use('/:postId/comments', commentRoutes)

router
  .route('/')
  .get(protect, getAll)
  .post(protect, uploadImageCover, createOne)
router
  .route('/:id')
  .get(getOne)
  .patch(protect, isOwner(Post), updateOne)
  .delete(protect, isOwner(Post), deleteOne)

module.exports = router
