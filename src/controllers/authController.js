const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const catchAsync = require('../utils/catchAsync')
const User = require('./../models/userModel')
const AppError = require('../utils/appError')
const sendMail = require('../utils/email')

const signInToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  })
}

const createSendToken = (user, statusCode, res) => {
  const token = signInToken(user._id)

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

  res.cookie('jwt', token, cookieOptions)

  user.password = undefined

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
    role: req.body.role,
  })

  createSendToken(user, 201, res)
})

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password)
    return next(new AppError('Please provide email or password', 400))

  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Please provide valid email and password', 401))

  createSendToken(user, 200, res)
})

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    return next(new AppError('No user found with that email.', 404))
  }

  const resetToken = await user.createPasswordResetToken()
  await user.save({ validateBeforeSave: false })

  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`

  try {
    await sendMail({ email, resetURL })
    res.status(200).json({
      ststus: 'success',
      json: 'sent reset token through email',
    })
  } catch (err) {
    console.log(err)
    user.passwordResetToken = undefined
    user.passwordResetTokenExpires = undefined
    await user.save({ validateBeforeSave: false })
    return next(
      new AppError(
        'There was an error in sending email. please try again!',
        500
      )
    )
  }
})

exports.resetPassword = catchAsync(async (req, res, next) => {
  console.log(req.params)
  const hashToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordChangedAt: { $gt: Date.now() },
  })

  if (!user) {
    return next(new AppError('Invalid token or expired!', 400))
  }

  user.password = req.body.password
  user.passwordConfirm = req.body.passwordConfirm
  user.passwordResetToken = undefined
  user.passwordChangedAt = undefined
  await user.save()

  createSendToken(user, 200, res)
})

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password')

  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError('Your current password is wrong.', 401))
  }

  user.password = req.body.password
  user.passwordConfirm = req.body.passwordConfirm
  await user.save()

  createSendToken(user, 200, res)
})
