const jwt = require('jsonwebtoken')
const Auth = require('../models/auth.model')

const signInToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  })
}

const createSendToken = async (user, statusCode, res) => {
  const token = signInToken(user._id)

  await res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  })
}

exports.signup = async (req, res, next) => {
  const newUser = await Auth.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  })

  createSendToken(newUser, 201, res)
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return Error(`Please provide your email and password`)
  }

  const user = await Auth.findOne({ email }).select('+password')

  if (!user && !(await user.correctPassword(password, user.password))) {
    return Error('Please provide valid password')
  }

  createSendToken(user, 200, res)
}
