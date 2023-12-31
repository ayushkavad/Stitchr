const User = require('./../models/userModel')
const Post = require('./../models/postModel')
const factory = require('./handlerFactory')

exports.follow = factory.userFollowUnfollow(User)
exports.unfollow = factory.userFollowUnfollow(User)
exports.like = factory.userLikeDislike({ User, Post })
exports.dislike = factory.userLikeDislike({ User, Post })
