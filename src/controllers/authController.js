const { promisify } = require('util')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const Auth = require('./../models/authModel')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
const sendEmail = require('./../utils/email')

const signInToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
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
    user,
  })
}

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await Auth.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  })

  createSendToken(newUser, 201, res)
})

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })

  res.status(200).json({ status: 'success' })
}

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password)
    return next(new AppError('Please provide email or password', 400))

  const user = await Auth.findOne({ email }).select('+password')

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect user or password', 401))

  createSendToken(user, 200, res)
})

exports.protect = catchAsync(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt
  }

  console.log(token)

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    )
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  const currentUser = await Auth.findById(decoded.id)
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    )
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    )
  }

  req.user = currentUser
  res.locals.user = currentUser
  next()
})

exports.isLoggedIn = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      )

      const currentUser = await Auth.findById(decoded.id)
      if (!currentUser) return next()

      if (currentUser.changedPasswordAfter(decoded.iat)) return next()

      res.locals.user = currentUser
      return next()
    }
  } catch (err) {
    return next()
  }

  next()
}

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await Auth.findOne({ email: req.body.email })
  if (!user) {
    return next(new AppError('There is no user with email address.', 404))
  }

  const resetToken = user.createPasswordResetToken()
  await user.save({ validateBeforeSave: false })

  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    })

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    })
  } catch (err) {
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save({ validateBeforeSave: false })

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    )
  }
})

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

  const user = await Auth.findOne({
    passwordResetToken: hashToken,
    passwordResetExpires: { $gt: Date.now() },
  })

  if (!user) return next(new AppError('Token is invaild or expired', 400))

  user.password = req.body.password
  user.passwordConfirm = req.body.passwordConfirm
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  await user.save()

  createSendToken(user, 200, res)
})

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await Auth.findById(req.user._id).select('+password')

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong', 401))
  }

  user.password = req.body.password
  user.passwordConfirm = req.body.passwordConfirm
  await user.save()

  createSendToken(user, 200, res)
})
