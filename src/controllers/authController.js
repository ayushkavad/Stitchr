const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync')
const User = require('./../models/userModel')
const AppError = require('../utils/appError')

const signInToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  })
}

const createSendToken = (user, statusCode, res) => {
  const token = signInToken(user._id)

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      data: user,
    },
  })
}

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  })

  createSendToken(user, 201, res)
})

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select('+password')

  if (!user && (await user.correctPassword(password, user.password))) {
    return next(new AppError(`No user found with that email ID.`, 404))
  }
  createSendToken(user, 200, res)
})
