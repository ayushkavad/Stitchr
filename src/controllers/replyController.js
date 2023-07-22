const catchAsync = require('../utils/catchAsync')
const Reply = require('./../models/replyModel')
const AppError = require('./../utils/appError')

exports.getAllReply = catchAsync(async (req, res, next) => {
  const data = await Reply.find()

  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  })
})

exports.getReply = catchAsync(async (req, res, next) => {
  const data = await Reply.findById(req.params.id)

  if (!data) {
    return next(new AppError('No Document found with that ID.', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  })
})

exports.createReply = catchAsync(async (req, res, next) => {
  console.log(req.params)
  if (!req.body.comment) req.body.comment = req.params.commentId
  if (!req.body.user) req.body.user = req.user.id

  const data = await Reply.create(req.body)

  res.status(201).json({
    status: 'success',
    data: {
      data,
    },
  })
})

exports.updateRelpy = catchAsync(async (req, res, next) => {
  const data = await Reply.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!data) {
    return next(new AppError('No Document found with that ID.', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  })
})

exports.deleteReply = catchAsync(async (req, res, next) => {
  const data = await Reply.findByIdAndDelete(req.params.id)

  if (!data) {
    return next(new AppError('No Document found with that ID.', 404))
  }

  res.status(204).json({
    status: 'success',
    data: {
      data,
    },
  })
})
