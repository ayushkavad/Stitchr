const Post = require('./../models/postModel')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
const APIFeatures = require('./../utils/apiFeatures')
const factory = require('./handlerFactory')

exports.getAll = catchAsync(async (req, res, next) => {
  let filter = {}
  if (req.params.postId) filter = { post: req.params.postId }
  const features = new APIFeatures(Post.find(filter), req.query)
    .filter()
    .sort()
    .limit()
    .paginate()

  const data = await features.query

  res.status(200).json({
    status: 'success',
    posts: data.length,
    data: {
      data,
    },
  })
})

exports.getOne = catchAsync(async (req, res, next) => {
  const data = await Post.findById(req.params.id).select('-__v')

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
  if (!req.body.user) req.body.user = req.user.id
  const data = await Post.create(req.body)

  res.status(201).json({
    status: 'success',
    data: {
      data,
    },
  })
})

// exports.updatePost = catchAsync(async (req, res, next) => {
//   const data = await Post.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   })

//   if (!data) {
//     return next(new AppError('No document found with that ID!', 404))
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       data,
//     },
//   })
// })

exports.updatePost = factory.updateOne(Post)
exports.deletePost = factory.deleteOne(Post)
// exports.deleteOne = catchAsync(async (req, res, next) => {
//   const data = await Post.findByIdAndDelete(req.params.id)

//   if (!data) {
//     return next(new AppError('No document found with that ID!', 404))
//   }

//   res.status(204).json({
//     status: 'success',
//     data: {
//       data: null,
//     },
//   })
// })
