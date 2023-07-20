const express = require('express')
const {
  getAllComment,
  getOneComment,
  createComment,
  updateComment,
  deleteComment,
} = require('./../controllers/commentController')
const router = express.Router()

router.route('/').get(getAllComment).post(createComment)
router
  .route('/:id')
  .get(getOneComment)
  .patch(updateComment)
  .delete(deleteComment)

module.exports = router
