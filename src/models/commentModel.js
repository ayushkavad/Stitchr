const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
  },
})

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  })
  next()
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment

// login user can comment
// take user id from login user
// take post id from req.params.postId

// {{URL}}api/v1/posts/:id/comment
