const catchAsync = require('../utils/catchAsync')
const Reply = require('./../models/replyModel')
const AppError = require('./../utils/appError')
const factory = require('./handlerFactory')

exports.getAllReply = catchAsync(async (req, res, next) => {
  const data = await Reply.find()

  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  })
})

exports.getReply = factory.getOne(Reply)
exports.createReply = factory.createOne(Reply)
exports.updateRelpy = factory.updateOne(Reply)
exports.deleteReply = factory.deleteOne(Reply)
