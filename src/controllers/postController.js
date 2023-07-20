const Post = require('./../models/postModel')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
const APIFeatures = require('./../utils/apiFeatures')

exports.getAll = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Post.find(), req.query)
    .filter()
    .sort()
    .limit()
    .paginate()

  const data = await features.query

  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  })
})

exports.getOne = catchAsync(async (req, res, next) => {
  const data = await Post.findById(req.params.id)
    .select('-__v')
    .populate('comments')

  if (!data) {
    return next(new AppError('No document found with that ID!', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  })
})

exports.createOne = catchAsync(async (req, res, next) => {
  if (!req.body.mediaContent) req.body.mediaContent = req.file?.path
  const data = await Post.create(req.body)

  res.status(201).json({
    status: 'success',
    data: {
      data,
    },
  })
})

exports.updateOne = catchAsync(async (req, res, next) => {
  const data = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!data) {
    return next(new AppError('No document found with that ID!', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  })
})

exports.deleteOne = catchAsync(async (req, res, next) => {
  const data = await Post.findByIdAndDelete(req.params.id)

  if (!data) {
    return next(new AppError('No document found with that ID!', 404))
  }

  res.status(204).json({
    status: 'success',
    data: {
      data: null,
    },
  })
})
