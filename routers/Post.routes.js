const express = require('express')
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('./../controllers/Post.controller')

const router = express.Router()

router.route('/').get(getAll).post(createOne)
router.route('/:id').get(getOne).patch(updateOne).delete(deleteOne)

module.exports = router
