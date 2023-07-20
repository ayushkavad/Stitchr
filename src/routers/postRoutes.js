const express = require('express')
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('../controllers/postController')
const { uploadImageCover } = require('./../utils/upload')
const { protect, postOwner, isOwner } = require('./../middlewares/auth')

const router = express.Router()

router
  .route('/')
  .get(getAll)
  .post(protect, uploadImageCover, postOwner, createOne)
router
  .route('/:id')
  .get(protect, getOne)
  .patch(protect, updateOne)
  .delete(protect, isOwner, deleteOne)

module.exports = router
