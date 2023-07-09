const express = require('express')
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('../controllers/post.controller')
const { uploadImageCover } = require('../utils/upload')

const router = express.Router()

router.route('/').get(getAll).post(uploadImageCover, createOne)
router.route('/:id').get(getOne).patch(updateOne).delete(deleteOne)

module.exports = router
