const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const AppError = require('../utils/appError')
const catchAsync = require('./../utils/catchAsync')

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
