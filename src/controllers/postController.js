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

exports.getPost = factory.getOne(Post)
exports.createPost = factory.createOne(Post)
exports.updatePost = factory.updateOne(Post)
exports.deletePost = factory.deleteOne(Post)
