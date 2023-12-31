const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const User = require('./../models/userModel')
const factory = require('./handlerFactory')

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

exports.getAllUsers = factory.getAll(User)
exports.getUser = factory.getOne(User)
// Only admin can perform this action
exports.updateUser = factory.updateOne(User)
exports.deleteUser = factory.deleteOne(User)
