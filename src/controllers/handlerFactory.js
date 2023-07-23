const AppError = require('./../utils/appError')
const catchAsync = require('./../utils/catchAsync')
const APIFeatures = require('./../utils/apiFeatures')

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {}
    if (req.params.postId) filter = { post: req.params.postId }
    if (req.params.commentId) filter = { comment: req.params.commentId }

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limit()
      .paginate()

    const doc = await features.query

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    })
  })

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id).select('-__v')

    if (!doc) {
      return next(new AppError('No document found with that ID!', 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    })
  })

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (!req.body.user) req.body.user = req.user.id
    const doc = await Model.create(req.body)

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    })
  })

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!doc) {
      return next(new AppError('No document found with that ID!', 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    })
  })

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id)

    if (!doc) {
      return next(new AppError('No document found with that ID!', 404))
    }

    res.status(204).json({
      status: 'success',
      data: null,
    })
  })

// exports.userFollowUnfollow = (Model) =>
//   catchAsync(async (req, res, next) => {
//     const currentUser = await Model.findById(req.user.id)
//     const user = await Model.findById(req.params.id)

//     if (!currentUser || !user) {
//       return next(new AppError('No user found with that ID!', 404))
//     }

//     try {
//       if (req.originalUrl.includes('/follow')) {
//         currentUser.following.push(user._id)
//         user.followers.push(currentUser._id)
//       } else if (req.originalUrl.includes('/unfollow')) {
//         currentUser.following.pull(user._id)
//         user.followers.pull(currentUser._id)
//       }

//       await currentUser.save({ validateBeforeSave: false })
//       await user.save({ validateBeforeSave: false })

//       res.status(201).json({
//         status: 'success',
//         message: `You ${req.originalUrl.includes(
//           '/follow' ? 'Followd' : 'Unfollowed'
//         )} successfully.`,
//       })
//     } catch (err) {
//       return next(new AppError('Internal server error. Please try again!', 500))
//     }
//   })

// exports.userLikeDislike = (Model) => {
//   const { User, Post } = Model
//   catchAsync(async (req, res, next) => {
//     const currentUser = await User.findById(req.user.id)
//     const post = await Post.findById(req.params.id)

//     if (!currentUser || !post) {
//       return next(new AppError('No post found with that ID', 404))
//     }

//     try {
//       if (req.originalUrl.includes('/like')) {
//         post.likes.push(currentUser._id)
//         currentUser.likePhotos.push(post._id)
//       } else if (req.originalUrl.includes('/dislike')) {
//         post.likes.pull(currentUser._id)
//         currentUser.likePhotos.pull(post._id)
//       }

//       await post.save({ validateBeforeSave: false })
//       await currentUser.save({ validateBeforeSave: false })

//       res.status(201).json({
//         status: 'success',
//         message: `You ${req.originalUrl('/like') ? 'like' : 'dislike'} it!`,
//       })
//     } catch (err) {
//       return next(new AppError('Internal server error. Please try again!', 500))
//     }
//   })
// }
