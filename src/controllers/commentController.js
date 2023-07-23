const catchAsync = require('../utils/catchAsync')
const Comment = require('./../models/commentModel')
const AppError = require('./../utils/appError')
const factory = require('./handlerFactory')

exports.getAllComment = catchAsync(async (req, res, next) => {
  const data = await Comment.find()

  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  })
})

exports.getComment = factory.getOne(Comment)
exports.createComment = factory.createOne(Comment)
exports.updateComment = factory.updateOne(Comment)
exports.deleteComment = factory.deleteOne(Comment)
