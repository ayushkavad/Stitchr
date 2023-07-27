const express = require('express')
const {
  getAllPost,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController')
const { protect, isOwner } = require('./../middlewares/auth')
const { setDefaultValuePost } = require('../middlewares/setParams')
const { uploadImageCover } = require('./../utils/upload')
const Post = require('./../models/postModel')
const commentRoutes = require('./../routes/commentRoutes')

const router = express.Router()

router.use('/:postId/comments', commentRoutes)

router
  .route('/')
  .get(protect, getAllPost)
  .post(protect, uploadImageCover, setDefaultValuePost, createPost)
router
  .route('/:id')
  .get(protect, getPost)
  .patch(protect, isOwner(Post), updatePost)
  .delete(protect, isOwner(Post), deletePost)

module.exports = router
