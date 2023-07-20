const express = require('express')
const {
  getAllComment,
  getOneComment,
  createComment,
  updateComment,
  deleteComment,
} = require('./../controllers/commentController')
const { protect } = require('../middlewares/auth')
const router = express.Router({ mergeParams: true })

router.route('/').get(getAllComment).post(protect, createComment)
router.route('/:id').get(getOneComment)

router
  .route('/:postId/comments/:commentId')
  .patch(protect, updateComment)
  .delete(protect, deleteComment)

module.exports = router
