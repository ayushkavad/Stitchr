const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const AppError = require('../utils/appError')
const catchAsync = require('./../utils/catchAsync')
const Post = require('../models/postModel')

exports.protect = catchAsync(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(
      new AppError(`You are not login. Please login to get access!`, 401)
    )
  }

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  const currentUser = await User.findById(decode.id)

  if (!currentUser) {
    return next(
      new AppError(`The user belong to this token doesn't exist!`, 401)
    )
  }

  if (currentUser.changePasswordAfter(decode.iat)) {
    return next(
      new AppError(
        `You recently changed your password. Please try again later!`,
        401
      )
    )
  }

  req.user = currentUser
  next()
})

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      )
    }
    next()
  }
}

exports.postOwner = (req, res, next) => {
  if (!req.body.user && req.user.id) {
    req.body.user = req.user.id
  }
  next()
}

exports.isOwner = async (req, res, next) => {
  const data = await Post.findById(req.params.id)
  if (req.user.id !== data.user.id)
    return next(new AppError('You are not allow to perform this action.', 400))

  next()
}
