const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync')
const User = require('./../models/userModel')

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
  // fetch email and password from body
  const { email, password } = req.body
  // find user with that email
  const user = await User.findOne({ email }).select('+password')
  // check whether user is exiest or not
  if (!user && (await user.correctPassword(password, user.password))) {
    return next(new AppError(`No user found with that email ID.`, 404))
  }
  // if user is exist then send token
  createSendToken(user, 200, res)
})
