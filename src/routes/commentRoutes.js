const express = require('express')
const {
  getAllComment,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} = require('./../controllers/commentController')
const { protect, isOwner } = require('../middlewares/auth')
const router = express.Router({ mergeParams: true })

router.route('/').get(protect, getAllComment).post(protect, createComment)
router
  .route('/:id')
  .get(protect, getComment)
  .patch(protect, isOwner, updateComment)
  .delete(protect, isOwner, deleteComment)

module.exports = router
