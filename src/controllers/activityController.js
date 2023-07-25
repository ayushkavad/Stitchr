const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const User = require('./../models/userModel')
const Post = require('./../models/postModel')
const factory = require('./handlerFactory')

exports.follow = factory.userFollowUnfollow(User)
exports.unfollow = factory.userFollowUnfollow(User)

// exports.follow = catchAsync(async (req, res, next) => {
//   const currentUser = await User.findById(req.user.id)
//   const userToFollow = await User.findById(req.params.id)

//   if (!userToFollow) {
//     return next(new AppError('User is not found!', 404))
//   }

//   try {
//     currentUser.following.push(userToFollow._id)
//     userToFollow.followers.push(currentUser._id)

//     await currentUser.save({ validateBeforeSave: false })
//     await userToFollow.save({ validateBeforeSave: false })

//     res.status(201).json({
//       status: 'success',
//       message: 'Followed successfully.',
//     })
//   } catch (err) {
//     console.log(err)
//     return next(new AppError('Internal server error. Please try again!', 500))
//   }
// })

// exports.unfollow = catchAsync(async (req, res, next) => {
//   const currentUser = await User.findById(req.user.id)
//   const userToUnfollow = await User.findById(req.params.id)

//   if (!currentUser || !userToUnfollow) {
//     return next(new AppError('No user found with that ID!', 404))
//   }

//   try {
//     currentUser.following.pull(userToUnfollow._id)
//     userToUnfollow.followers.pull(currentUser._id)

//     await currentUser.save({ validateBeforeSave: false })
//     await userToUnfollow.save({ validateBeforeSave: false })

//     res.status(201).json({
//       status: 'success',
//       message: 'Unfollowed successfully.',
//     })
//   } catch (err) {
//     return next(new AppError('Internal server error. Please try again!', 500))
//   }
// })

// exports.like = factory.userLikeDislike({ User, Post })
// exports.dislike = factory.userLikeDislike({ User, Post })

exports.like = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user.id)
  const postTolike = await Post.findById(req.params.id)

  if (!postTolike) {
    return next(new AppError('No post found with that ID', 404))
  }

  try {
    postTolike.likes.push(currentUser._id)
    currentUser.likePhotos.push(postTolike._id)

    await postTolike.save({ validateBeforeSave: false })
    await currentUser.save({ validateBeforeSave: false })

    res.status(201).json({
      status: 'success',
      message: 'You like it!',
    })
  } catch (err) {
    return next(new AppError('Internal server error. Please try again!', 500))
  }
})

exports.dislike = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user.id)
  const postToDislike = await Post.findById(req.params.id)

  if (!postToDislike) {
    return next(new AppError('No post found with that ID', 404))
  }

  try {
    postToDislike.likes.pull(currentUser._id)
    currentUser.postToDislike.pull(postToDislike._id)

    await postToDislike.save({ validateBeforeSave: false })
    await currentUser.save({ validateBeforeSave: false })

    res.status(201).json({
      status: 'success',
      message: 'You Dislike it!',
    })
  } catch (err) {
    return next(new AppError('Internal server error. Please try again!', 500))
  }
})
