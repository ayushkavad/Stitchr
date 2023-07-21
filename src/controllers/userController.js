const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const User = require('./../models/userModel')

const filrerFields = (obj, ...allowedFields) => {
  const newObj = {}
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el]
  })

  return newObj
}

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id
  next()
}

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const data = await User.find()

  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  })
})

exports.getUser = catchAsync(async (req, res, next) => {
  const data = await User.findById(req.params.id)

  if (!data) {
    return next(new AppError('No Document found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  })
})

exports.updateUser = catchAsync(async (req, res, next) => {
  const data = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!data) {
    return next(new AppError('No Document found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  })
})

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        `You cann't update your password. Please use '/updatePassword' endpoint to update your password`,
        500
      )
    )
  }

  const filterObj = filrerFields(req.body, 'name', 'email')
  if (req.file) filterObj.photo = req.file.filename

  const data = await User.findByIdAndUpdate(req.user.id, filterObj, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  })
})

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false })

  res.status(204).json({
    status: 'success',
    data: null,
  })
})

exports.deleteUser = catchAsync(async (req, res, next) => {
  const data = await User.findByIdAndDelete(req.params.id)

  if (!data) {
    return next(new AppError('No Document found with that ID.', 404))
  }
  res.status(204).json({
    status: 'success',
    data: {
      data: null,
    },
  })
})
