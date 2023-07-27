const express = require('express')
const {
  getAllComment,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} = require('./../controllers/commentController')
const { protect, isOwner } = require('../middlewares/auth')
const { setDefaultValueComment } = require('../middlewares/setParams')
const Comment = require('./../models/commentModel')
const replyRouter = require('./replyRoutes')
const router = express.Router({ mergeParams: true })

router.use('/:commentId/replies', replyRouter)

router
  .route('/')
  .get(protect, getAllComment)
  .post(protect, setDefaultValueComment, createComment)
router
  .route('/:id')
  .get(protect, getComment)
  .patch(protect, isOwner(Comment), updateComment)
  .delete(protect, isOwner(Comment), deleteComment)

module.exports = router
