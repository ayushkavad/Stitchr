const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync')

const signInToken = (id) => {
  jwt.sign({ id }, process.env.JWT_SECRET, {
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
    password: req.body.email,
    passwordConfirm: req.body.email,
  })

  createSendToken(user, 201, res)
})
