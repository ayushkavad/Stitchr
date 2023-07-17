const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const User = require('./../models/userModel')

const filrer = (obj, ...otherFields) => {
  const newObj = {}
  Object.keys(obj).forEach((el) => {
    if (!otherFields.includes(el)) {
      newObj[el] = obj[el]
    }
  })

  return newObj
}

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        `You cann't update your password. Please use /updatePassword endpoint to update your password`,
        500
      )
    )
  }

  const filterObj = filter(req.body, 'name', 'email')
  const user = await User.findByIdAndUpdate(req.params.id, filterObj, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})
