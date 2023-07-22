const express = require('express')
const {
  getAllReply,
  getReply,
  createReply,
  updateRelpy,
  deleteReply,
} = require('./../controllers/replyController')
const Reply = require('./../models/replyModel')
const { protect, isOwner } = require('./../middlewares/auth')

const router = express.Router({ mergeParams: true })

router.route('/').get(protect, getAllReply).post(protect, createReply)
router
  .route('/:id')
  .get(protect, getReply)
  .patch(protect, isOwner(Reply), updateRelpy)
  .delete(protect, isOwner(Reply), deleteReply)

module.exports = router
