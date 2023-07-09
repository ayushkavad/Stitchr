const express = require('express')
const {
  getAll,
  getOne,
  resizeImageCover,
  uploadImageCover,
  createOne,
  updateOne,
  deleteOne,
} = require('../controllers/post.controller')

const router = express.Router()

router.route('/').get(getAll).post(uploadImageCover, createOne)
router.route('/:id').get(getOne).patch(updateOne).delete(deleteOne)

module.exports = router
