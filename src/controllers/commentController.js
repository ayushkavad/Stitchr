const catchAsync = require('../utils/catchAsync')
const Comment = require('./../models/commentModel')
const AppError = require('./../utils/appError')

exports.getAllComment = catchAsync(async (req, res, next) => {
  const data = await Comment.find()

  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  })
})

exports.getOneComment = catchAsync(async (req, res, next) => {
  const data = await Comment.findById(req.params.id)

  if (!data) {
    return next(new AppError('No document found with that ID.', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  })
})

exports.createComment = catchAsync(async (req, res, next) => {
  const data = await Comment.create(req.body)

  if (!data) {
    return next(new AppError('No document found with that ID.', 404))
  }

  res.status(201).json({
    status: 'success',
    data: {
      data,
    },
  })
})

exports.updateComment = catchAsync(async (req, res, next) => {
  const data = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!data) {
    return next(new AppError('No document found with that ID.', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  })
})

exports.deleteComment = catchAsync(async (req, res, next) => {
  const data = await Comment.findByIdAndDelete(req.params.id)

  if (!data) {
    return next(new AppError('No document found with that ID.', 404))
  }

  res.status(204).json({
    status: 'success',
    data: {
      data: null,
    },
  })
})
