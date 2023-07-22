const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const User = require('./../models/userModel')

exports.follow = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user.id)
  const userToFollow = await User.findById(req.params.id)

  if (!currentUser || !userToFollow) {
    return next(new AppError('User is not found!', 404))
  }

  try {
    currentUser.following.push(userToFollow._id)
    userToFollow.followers.push(currentUser._id)

    await currentUser.save({ validateBeforeSave: false })
    await userToFollow.save({ validateBeforeSave: false })

    res.status(201).json({
      status: 'success',
      message: 'Followed successfully.',
    })
  } catch (err) {
    console.log(err)
    return next(new AppError('Internal server error. Please try again!', 500))
  }
})

exports.unfollow = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user.id)
  const userToUnfollow = await User.findById(req.params.id)

  if (!currentUser || !userToUnfollow) {
    return next(new AppError('User is not found!', 404))
  }

  try {
    currentUser.following.pull(userToUnfollow._id)
    userToUnfollow.followers.pull(currentUser._id)

    await currentUser.save({ validateBeforeSave: false })
    await userToUnfollow.save({ validateBeforeSave: false })

    res.status(201).json({
      status: 'success',
      message: 'Unfollowed successfully.',
    })
  } catch (err) {
    return next(new AppError('Internal server error. Please try again!', 500))
  }
})
