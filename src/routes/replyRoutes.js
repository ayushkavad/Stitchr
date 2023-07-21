const express = require('express')
const {
  getAllReply,
  getReply,
  createReply,
  updateRelpy,
  deleteReply,
} = require('./../controllers/replyController')
const { protect, isOwner } = require('./../middlewares/auth')

const router = express.Router()

router.route('/').get(protect, getAllReply).post(protect, createReply)
router
  .route('/:id')
  .get(protect, getReply)
  .patch(protect, isOwner, updateRelpy)
  .delete(protect, isOwner, deleteReply)

module.exports = router
